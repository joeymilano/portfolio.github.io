// Rebuild the five studio GLBs with embedded KTX2 textures. Meshopt data is copied byte for byte.
// STUDIO_TOOLS=/path/to/tools/node_modules STUDIO_TOKTX=/path/to/toktx node scripts/studio/convert-ktx2-assets.mjs
// Outputs are immutable on the CDN: after every rebuild, bump their ?v= in runtime.mjs and its index.html reference.
// Never pass the custom-encoded lightmap WebPs through this converter.
import {readFileSync,writeFileSync,mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';

const toktx=process.env.STUDIO_TOKTX||'toktx';
const require=createRequire(join(resolve(process.env.STUDIO_TOOLS||'node_modules'),'package.json'));
const sharp=require('sharp');
const assets=resolve('explore/assets');
const names=['room-lit-packed','avatar-v2-packed','avatar-v2-mobile-packed','turntable-packed','arcade-packed'];
const pad=n=>(n+3)&~3;
const temporary=mkdtempSync(join(tmpdir(),'studio-ktx2-'));
try{
 for(const name of names){
  const file=readFileSync(join(assets,`${name}.glb`)),jsonSize=file.readUInt32LE(12),json=JSON.parse(file.subarray(20,20+jsonSize).toString());
  const binStart=28+jsonSize,bin=file.subarray(binStart,binStart+file.readUInt32LE(binStart-8));
  const images=json.images||[],imageViews=new Set(images.map(image=>image.bufferView));
  const cutoff=pad(Math.max(...images.map(image=>{const view=json.bufferViews[image.bufferView];return (view.byteOffset||0)+view.byteLength})));
  for(const view of json.bufferViews){
   const ext=view.extensions?.EXT_meshopt_compression;
   if(ext&&ext.byteOffset<cutoff)throw Error(`${name}: mesh data overlaps images`);
   if(!ext&&!imageViews.has(json.bufferViews.indexOf(view))&&(view.byteOffset||0)<cutoff)throw Error(`${name}: another view overlaps images`);
  }
  const chunks=[bin.subarray(cutoff)],encodings=[];
  for(let i=0;i<images.length;i++){
   const image=images[i],view=json.bufferViews[image.bufferView],ext=image.mimeType==='image/png'?'png':'jpg';
   const roles=(json.materials||[]).flatMap(material=>{
    const entries=[['color',material.pbrMetallicRoughness?.baseColorTexture],['normal',material.normalTexture],['roughness',material.pbrMetallicRoughness?.metallicRoughnessTexture]];
    return entries.filter(([,slot])=>slot&&json.textures[slot.index]?.source===i).map(([role])=>role);
   });
   if(roles.length!==1)throw Error(`${name}: image ${i} has unexpected roles ${roles}`);
   const role=roles[0],losslessDetail=name==='room-lit-packed'&&i===3,input=join(temporary,`${name}-${i}.${ext}`),output=join(temporary,`${name}-${i}.ktx2`);
   const source=bin.subarray(view.byteOffset,view.byteOffset+view.byteLength);
   // These maps occupy only a portion of the viewport, including the avatar close-up.
   const width=name==='arcade-packed'&&role!=='color'?512:name==='avatar-v2-packed'?1536:name==='avatar-v2-mobile-packed'?768:name==='arcade-packed'&&role==='color'?768:name==='turntable-packed'&&role==='color'?768:null;
   writeFileSync(input,width?await sharp(source).resize(width,width).toBuffer():source);
   const args=['--t2','--genmipmap','--assign_oetf',role==='color'?'srgb':'linear','--encode',role==='color'&&!losslessDetail?'etc1s':'uastc','--threads','4'];
   if(role==='color'&&!losslessDetail)args.push('--qlevel',name==='room-lit-packed'?'255':'100');else args.push('--uastc_quality','2','--uastc_rdo_l',losslessDetail?'0.25':role==='roughness'?'1.5':'0.75','--zcmp','9');
   execFileSync(toktx,[...args,output,input],{stdio:'pipe'});
   const encoded=readFileSync(output),offset=chunks.reduce((sum,chunk)=>sum+pad(chunk.length),0);
   view.byteOffset=offset;view.byteLength=encoded.length;image.mimeType='image/ktx2';
   chunks.push(encoded);encodings.push(`${i}:${role} ${encoded.length}`);
   for(const texture of json.textures||[])if(texture.source===i){delete texture.source;texture.extensions={...texture.extensions,KHR_texture_basisu:{source:i}};}
  }
  for(let i=0;i<json.bufferViews.length;i++){
   if(imageViews.has(i))continue;
   const view=json.bufferViews[i],ext=view.extensions?.EXT_meshopt_compression;
   if(ext)ext.byteOffset-=cutoff;
   else view.byteOffset-=cutoff;
  }
  json.buffers[0].byteLength=chunks.reduce((sum,chunk)=>sum+pad(chunk.length),0);
  json.extensionsUsed=[...new Set([...(json.extensionsUsed||[]),'KHR_texture_basisu'])];
  json.extensionsRequired=[...new Set([...(json.extensionsRequired||[]),'KHR_texture_basisu'])];
  const jsonBytes=Buffer.from(JSON.stringify(json)),jsonPadded=Buffer.alloc(pad(jsonBytes.length),0x20);jsonBytes.copy(jsonPadded);
  const binPadded=Buffer.alloc(json.buffers[0].byteLength);let cursor=0;for(const chunk of chunks){chunk.copy(binPadded,cursor);cursor+=pad(chunk.length)}
  const header=Buffer.alloc(28);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(28+jsonPadded.length+binPadded.length,8);header.writeUInt32LE(jsonPadded.length,12);header.writeUInt32LE(0x4e4f534a,16);header.writeUInt32LE(binPadded.length,20);header.writeUInt32LE(0x004e4942,24);
  const target=join(assets,`${name}-ktx2.glb`);writeFileSync(target,Buffer.concat([header.subarray(0,20),jsonPadded,header.subarray(20),binPadded]));
  console.log(`${name}: ${file.length} -> ${28+jsonPadded.length+binPadded.length} bytes; ${encodings.join(', ')}`);
 }
}finally{rmSync(temporary,{recursive:true,force:true})}
