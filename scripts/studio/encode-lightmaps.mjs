// Turns the float bakes from bake-lightmaps.py into the WebP lightmaps the studio loads.
// Usage: node scripts/studio/encode-lightmaps.mjs   (needs sharp in artifacts/lightmap/tools)
// Each texel stores cbrt(irradiance/scale): far more precision in the dim corners than sRGB, decoded as t^3
// in explore/baked-light.mjs, where the printed scales go.
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../../',import.meta.url));
const tools=process.env.STUDIO_TOOLS||root+'artifacts/lightmap/tools/';
const sharp=createRequire(tools+'package.json')('sharp');
const version=process.env.LIGHTMAP_VERSION||'v1';

// Unbaked texels take the average of their baked neighbours at ever coarser levels, so mip
// filtering and bilinear taps at chart edges never pull in black.
export function pushPull(rgba,size){
 const levels=[{data:rgba,size}];
 while(levels.at(-1).size>1){
  const {data,size:s}=levels.at(-1),h=s>>1,next=new Float32Array(h*h*4);
  for(let y=0;y<h;y++)for(let x=0;x<h;x++){let r=0,g=0,b=0,w=0;
   for(const [dx,dy] of [[0,0],[1,0],[0,1],[1,1]]){const i=((y*2+dy)*s+x*2+dx)*4,a=data[i+3];r+=data[i]*a;g+=data[i+1]*a;b+=data[i+2]*a;w+=a}
   const o=(y*h+x)*4;if(w>0){next[o]=r/w;next[o+1]=g/w;next[o+2]=b/w;next[o+3]=Math.min(1,w)}}
  levels.push({data:next,size:h});
 }
 for(let l=levels.length-2;l>=0;l--){const {data,size:s}=levels[l],coarse=levels[l+1];
  for(let y=0;y<s;y++)for(let x=0;x<s;x++){const i=(y*s+x)*4;if(data[i+3]>=1)continue;
   const c=((y>>1)*coarse.size+(x>>1))*4,a=data[i+3];for(let k=0;k<3;k++)data[i+k]=data[i+k]*a+coarse.data[c+k]*(1-a);data[i+3]=1}}
 return rgba;
}
export const encode=(value,scale)=>Math.cbrt(Math.min(1,Math.max(0,value/scale)));
function downsample(rgba,size){const h=size>>1,out=new Float32Array(h*h*4);
 for(let y=0;y<h;y++)for(let x=0;x<h;x++)for(let k=0;k<4;k++)out[(y*h+x)*4+k]=(rgba[(y*2*size+x*2)*4+k]+rgba[(y*2*size+x*2+1)*4+k]+rgba[((y*2+1)*size+x*2)*4+k]+rgba[((y*2+1)*size+x*2+1)*4+k])/4;
 return out}
async function write(rgba,size,scale,file){
 // Blender stores rows bottom-up; glTF texture space starts at the top.
 const bytes=Buffer.alloc(size*size*3);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){const i=((size-1-y)*size+x)*4,o=(y*size+x)*3;for(let k=0;k<3;k++)bytes[o+k]=Math.round(255*encode(rgba[i+k],scale))}
 const info=await sharp(bytes,{raw:{width:size,height:size,channels:3}}).webp({quality:88,effort:6,smartSubsample:true}).toFile(file);
 console.log(file.replace(root,''),size,info.size,'bytes');
}

if(process.argv[1]===fileURLToPath(import.meta.url)){
 for(const mode of (process.env.LIGHTMAP_MODES||'night,day').split(',')){
  const raw=readFileSync(`${root}artifacts/lightmap/${mode}.f32`),rgba=new Float32Array(raw.buffer,raw.byteOffset,raw.length/4).slice(),size=Math.sqrt(rgba.length/4);
  const values=[];for(let i=0;i<rgba.length;i+=4)if(rgba[i+3]>0)values.push(Math.max(rgba[i],rgba[i+1],rgba[i+2]));
  values.sort((a,b)=>a-b);
  // Clip only the hottest texels, right beside the lamps, which saturate on screen anyway.
  const scale=Number(values[Math.floor(values.length*Number(process.env.LIGHTMAP_PERCENTILE||.99))].toPrecision(3));
  pushPull(rgba,size);
  await write(rgba,size,scale,`${root}explore/assets/lightmap-${version}-${mode}.webp`);
  await write(downsample(rgba,size),size/2,scale,`${root}explore/assets/lightmap-${version}-${mode}-mobile.webp`);
  console.log('SCALE',mode,scale);
 }
}
