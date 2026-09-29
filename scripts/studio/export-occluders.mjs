// Exports everything the runtime adds around the room (avatar in its seated pose, turntable, arcade,
// notebooks, frames) as static world-space meshes, so the lightmap bake sees their shadows.
// Usage: python3 scripts/serve-preview.py &  then  node scripts/studio/export-occluders.mjs
import puppeteer from 'puppeteer';
import {existsSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../../',import.meta.url));
const tools=process.env.STUDIO_TOOLS||root+'artifacts/lightmap/tools/';
const base=process.env.STUDIO_URL||'http://127.0.0.1:4186';
const out=root+'artifacts/lightmap/occluders.glb';
const systemChrome='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const browser=await puppeteer.launch({headless:'new',executablePath:existsSync(systemChrome)?systemChrome:undefined,args:['--use-angle=metal','--enable-gpu','--ignore-gpu-blocklist'],protocolTimeout:180000});
try{
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:900});
 await page.evaluateOnNewDocument(()=>{try{localStorage.setItem('studio-light-mode','night')}catch{}});
 await page.setRequestInterception(true);
 page.on('request',request=>{
  const url=new URL(request.url());
  // Expose the scene and the room root to this script only; the served module is unchanged.
  if(url.pathname==='/explore/runtime.mjs'){
   const body=readFileSync(root+'explore/runtime.mjs','utf8').replace('scene.add(room.scene);','scene.add(room.scene);window.__studioRoom=room.scene;window.__studioScene=scene;');
   return request.respond({status:200,contentType:'text/javascript',body});
  }
  if(url.pathname.startsWith('/__tools/'))return request.respond({status:200,contentType:'text/javascript',body:readFileSync(tools+'node_modules/three/examples/jsm/'+url.pathname.slice(9),'utf8')});
  request.continue();
 });
 await page.goto(`${base}/explore/`,{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>document.body.dataset.loadState==='complete'&&window.__studioScene,{timeout:120000});
 await new Promise(resolve=>setTimeout(resolve,1500));
 const bytes=await page.evaluate(async()=>{
  const THREE=await import('three'),{GLTFExporter}=await import('/__tools/exporters/GLTFExporter.js');
  const scene=window.__studioScene,room=window.__studioRoom,skip=new Set(['Shanghai skyline']);
  const inside=(o,ancestor)=>{for(let p=o;p;p=p.parent)if(p===ancestor||skip.has(p.name))return true;return false};
  const out=new THREE.Scene(),v=new THREE.Vector3(),names=[];
  scene.updateMatrixWorld(true);
  scene.traverse(o=>{
   if(!o.isMesh||o.isPoints||!o.visible||inside(o,room))return;
   // The runtime shell boxes now live in the room model.
   if(/^(Continuous floor|Left wall continuation|Left upper wall|Upper rear wall|Rear right continuation)$/.test(o.name))return;
   const material=Array.isArray(o.material)?o.material[0]:o.material;if(!material||material.transparent||!o.geometry.attributes.position)return;
   // Freeze skinning and morph targets into world-space positions.
   const count=o.geometry.attributes.position.count,position=new Float32Array(count*3);
   for(let i=0;i<count;i++){o.getVertexPosition(i,v);v.applyMatrix4(o.matrixWorld).toArray(position,i*3)}
   const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(position,3));
   if(o.geometry.index)geometry.setIndex(o.geometry.index.clone());geometry.computeVertexNormals();
   const color=material.color?material.color.clone():new THREE.Color(.2,.2,.2);if(material.map)color.multiplyScalar(.5);
   const mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color,roughness:material.roughness??.8,metalness:material.metalness??0}));
   mesh.name=o.name||'occluder';out.add(mesh);names.push(mesh.name);
  });
  const glb=await new GLTFExporter().parseAsync(out,{binary:true});
  console.log('occluders',names.length);
  return Array.from(new Uint8Array(glb));
 });
 mkdirSync(root+'artifacts/lightmap',{recursive:true});writeFileSync(out,Buffer.from(bytes));console.log('wrote',out,bytes.length,'bytes');
}finally{await browser.close();}
