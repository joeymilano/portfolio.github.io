// Builds the lightmapped room: folds the runtime-only geometry fixes into the model, adds a shared
// lightmap atlas on TEXCOORD_1, and writes a plain GLB for Blender plus the packed GLB for the web.
// Usage: (cd artifacts/lightmap/tools && npm i three@0.160.0 @gltf-transform/core@4 @gltf-transform/extensions@4 @gltf-transform/functions@4 meshoptimizer xatlasjs@0.2.0)
//        node scripts/studio/prepare-lightmap-room.mjs
// Then export occluders, bake in Blender (bake-lightmaps.py) and encode (encode-lightmaps.mjs).
import {createRequire} from 'node:module';
import {mkdirSync,writeFileSync} from 'node:fs';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=fileURLToPath(new URL('../../',import.meta.url));
const tools=process.env.STUDIO_TOOLS||root+'artifacts/lightmap/tools/';
const need=createRequire(tools+'package.json'),load=name=>import(pathToFileURL(need.resolve(name)).href);
const [{NodeIO},{ALL_EXTENSIONS},{dequantize,quantize,meshopt,prune},{MeshoptDecoder,MeshoptEncoder},THREE,{Api},xatlasModule]=await Promise.all([
 load('@gltf-transform/core'),load('@gltf-transform/extensions'),load('@gltf-transform/functions'),load('meshoptimizer'),load('three'),
 import(pathToFileURL(tools+'node_modules/xatlasjs/dist/node/api.mjs').href),load('xatlasjs/dist/node/xatlas.js')]);

const source=root+'explore/assets/room-packed.glb',plain=root+'artifacts/lightmap/room-lightmap-uv.glb',packed=root+'explore/assets/room-lit-packed.glb';
export const atlasSize=2048;
// Moving or self-lit surfaces keep realtime lighting: the pull-out book, the screen, glass and the lamp diffusers.
const unbakedNodes=new Set(['book_01','monitor_screen']),unbakedMaterials=new Set(['Blue smoked fluted glazing','Warm integrated lamp diffuser','Screen • runtime image']);
// These used to be added at runtime (runtime.mjs shell()); they now ship in the model so they can be baked.
// density < 1 spends fewer lightmap texels on large, distant surfaces.
const shells=[
 {name:'Continuous floor',size:[18,.16,18],position:[0,-.091,1],material:'Honed charcoal stone',density:.3,faces:[2]},
 {name:'Left wall continuation',size:[.15,7,7.45],position:[-3.58,3.5,5.275],material:'Graphite mineral plaster',density:.45},
 {name:'Left upper wall',size:[.15,3.4,4.1],position:[-3.58,5.3,-.5],material:'Graphite mineral plaster',density:.45},
 {name:'Upper rear wall',size:[7.2,3.4,.15],position:[0,5.3,-2.5],material:'Graphite mineral plaster',density:.45},
 {name:'Rear right continuation',size:[5.5,7,.15],position:[6.25,3.5,-2.5],material:'Graphite mineral plaster',density:.35},
];

await MeshoptDecoder.ready;await MeshoptEncoder.ready;
const io=new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({'meshopt.decoder':MeshoptDecoder,'meshopt.encoder':MeshoptEncoder});
const doc=await io.read(source);await doc.transform(dequantize());
for(const e of doc.getRoot().listExtensionsUsed())if(['EXT_meshopt_compression','KHR_mesh_quantization'].includes(e.extensionName))e.dispose();
const scene=doc.getRoot().getDefaultScene()||doc.getRoot().listScenes()[0],buffer=doc.getRoot().listBuffers()[0];
const matrixOf=node=>new THREE.Matrix4().fromArray(node.getWorldMatrix());
const material=name=>doc.getRoot().listMaterials().find(m=>m.getName()===name);

// The desk notebook is replaced at runtime by the openable notebooks (desk-objects.mjs).
for(const node of doc.getRoot().listNodes())if(node.getName()==='Closed notebook'){node.getMesh()?.dispose();node.dispose()}

// Same frame move runtime.mjs used to apply on load: both gallery frames slide 28cm along the left wall.
for(const node of doc.getRoot().listNodes()){
 const mesh=node.getMesh();if(!mesh)continue;const world=matrixOf(node),inverse=world.clone().invert(),point=new THREE.Vector3();
 for(const prim of mesh.listPrimitives()){
  if(!/aluminum|graphite/i.test(prim.getMaterial()?.getName()||''))continue;
  const position=prim.getAttribute('POSITION'),array=position.getArray().slice();
  for(let i=0;i<position.getCount();i++){point.fromArray(array,i*3).applyMatrix4(world);
   if(point.x>-3.50&&point.x<-3.43&&point.y>1.37&&point.y<2.55&&point.z>-1.83&&point.z<-.21){point.z+=.28;point.applyMatrix4(inverse).toArray(array,i*3)}}
  position.setArray(array);
 }
}

// Architectural shell boxes, built exactly like THREE.BoxGeometry so textures tile the same way.
for(const shell of shells){
 const box=new THREE.BoxGeometry(...shell.size),keep=shell.faces?box.groups.filter((g,i)=>shell.faces.includes(i)):box.groups;
 const index=[];for(const g of keep)index.push(...box.index.array.slice(g.start,g.start+g.count));
 const accessor=(type,array)=>doc.createAccessor().setType(type).setArray(array).setBuffer(buffer);
 const prim=doc.createPrimitive().setMaterial(material(shell.material))
  .setAttribute('POSITION',accessor('VEC3',new Float32Array(box.attributes.position.array)))
  .setAttribute('NORMAL',accessor('VEC3',new Float32Array(box.attributes.normal.array)))
  .setAttribute('TEXCOORD_0',accessor('VEC2',new Float32Array(box.attributes.uv.array)))
  .setIndices(accessor('SCALAR',new Uint16Array(index)));
 // Shell walls sit outside the authored room; they must not start casting the sun's shadow now.
 const node=doc.createNode(shell.name).setMesh(doc.createMesh(shell.name).addPrimitive(prim)).setTranslation(shell.position).setExtras({castShadow:false,lightmapDensity:shell.density});
 scene.addChild(node);
}

// One atlas for every baked primitive. Charts are cut from world-space geometry so texel density is even.
const xatlas=await new Promise(resolve=>{const XAtlas=Api(xatlasModule.default||xatlasModule);const api=new XAtlas(()=>resolve(api),()=>fileURLToPath(new URL('xatlas.wasm',pathToFileURL(need.resolve('xatlasjs/dist/node/xatlas.js')))))});
xatlas.createAtlas();
const jobs=[];
for(const node of doc.getRoot().listNodes()){
 const mesh=node.getMesh();if(!mesh||unbakedNodes.has(node.getName()))continue;
 const world=matrixOf(node),normalMatrix=new THREE.Matrix3().getNormalMatrix(world),density=node.getExtras().lightmapDensity??1;
 for(const prim of mesh.listPrimitives()){
  if(unbakedMaterials.has(prim.getMaterial()?.getName()))continue;
  const position=prim.getAttribute('POSITION'),normal=prim.getAttribute('NORMAL'),count=position.getCount();
  const indices=prim.getIndices()?.getArray()||Uint32Array.from({length:count},(_,i)=>i);
  const vertices=new Float32Array(count*3),normals=new Float32Array(count*3),v=new THREE.Vector3();
  for(let i=0;i<count;i++){v.fromArray(position.getArray(),i*3).applyMatrix4(world).multiplyScalar(density).toArray(vertices,i*3);v.fromArray(normal.getArray(),i*3).applyMatrix3(normalMatrix).normalize().toArray(normals,i*3)}
  if(!xatlas.addMesh(new Uint16Array(indices),vertices,normals,null,jobs.length,true,false))throw new Error('xatlas rejected '+node.getName());
  jobs.push({node,prim});
 }
}
const atlas=xatlas.generateAtlas({},{resolution:atlasSize,texelsPerUnit:Number(process.env.TEXELS||64),padding:6,bilinear:true,blockAlign:true});
if(atlas.atlasCount!==1)throw new Error(`atlas overflowed into ${atlas.atlasCount} pages`);

// Rebuild each primitive on xatlas' split vertices: every original attribute is re-gathered through oldIndexes.
for(const result of atlas.meshes){
 const {prim}=jobs[result.mesh],old=result.oldIndexes,n=result.vertexCount;
 for(const semantic of prim.listSemantics()){
  // Clone first: an accessor shared with another primitive must not be rewritten under it.
  const attribute=prim.getAttribute(semantic).clone();prim.setAttribute(semantic,attribute);const size=attribute.getElementSize(),from=attribute.getArray(),to=new from.constructor(n*size);
  for(let i=0;i<n;i++)for(let k=0;k<size;k++)to[i*size+k]=from[old[i]*size+k];
  attribute.setArray(to);
 }
 // xatlasjs already returns atlas coordinates normalised to 0..1.
 prim.setAttribute('TEXCOORD_1',doc.createAccessor().setType('VEC2').setArray(new Float32Array(result.vertex.coords1)).setBuffer(buffer));
 prim.setIndices(doc.createAccessor().setType('SCALAR').setBuffer(buffer).setArray(n>65535?new Uint32Array(result.index):new Uint16Array(result.index)));
}
xatlas.destroyAtlas();
console.log(`atlas ${atlas.width}x${atlas.height}, ${jobs.length} primitives, ${atlas.texelsPerUnit.toFixed(1)} texels per metre`);

mkdirSync(root+'artifacts/lightmap',{recursive:true});
await doc.transform(prune({keepAttributes:true}));
await io.write(plain,doc);
// Web copy: same quantize + meshopt treatment as the previous room file, with extra precision for the atlas.
await doc.transform(quantize({quantizeTexcoord:14}),meshopt({encoder:MeshoptEncoder,level:'medium'}));
await io.write(packed,doc);
writeFileSync(root+'artifacts/lightmap/atlas.json',JSON.stringify({size:atlasSize,texelsPerUnit:atlas.texelsPerUnit,baked:jobs.map(j=>`${j.node.getName()}/${j.prim.getMaterial()?.getName()}`)},null,1));
console.log('wrote',plain,'and',packed);
