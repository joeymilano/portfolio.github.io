import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {registerHooks} from 'node:module';
import {runInNewContext} from 'node:vm';

// Resolve the browser import map without installing a second Three.js version.
const root=new URL('../',import.meta.url);
const threeURL=new URL('vw-id-aura/vendor/three.module.js',root).href;
const hooks=registerHooks({resolve(specifier,context,nextResolve){
  return specifier==='three'?{url:threeURL,shortCircuit:true}:nextResolve(specifier,context);
}});
const THREE=await import(threeURL);
const {GLTFLoader}=await import(new URL('vw-id-aura/vendor/addons/loaders/GLTFLoader.js',root));
const {MeshoptDecoder}=await import(new URL('explore/vendor/meshopt_decoder.mjs',root));
hooks.deregister();

function asset(name){
  const bytes=readFileSync(new URL(`explore/assets/${name}.glb`,root));
  assert.equal(bytes.readUInt32LE(0),0x46546c67,'valid GLB magic');
  assert.equal(bytes.readUInt32LE(4),2,'GLB version 2');
  assert.equal(bytes.readUInt32LE(8),bytes.length,'complete GLB');
  assert.equal(bytes.readUInt32LE(16),0x4e4f534a,'JSON chunk');
  const json=JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString());
  return {bytes,json,buffer:bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)};
}

// Geometry and compression are loaded normally. Browser image decoding is the
// only stub; embedded image ranges are checked separately below.
const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
loader.register(()=>({name:'TEST_NODE_TEXTURES',loadTexture:()=>Promise.resolve(new THREE.Texture())}));
const loaded=new Map();
for(const name of ['room-packed','turntable-packed','avatar-v2-packed','avatar-v2-mobile-packed']){
  const data=asset(name);
  loaded.set(name,{...data,gltf:await loader.parseAsync(data.buffer,'')});
}

test('packed assets are self-contained and decode through the shared runtime loader',()=>{
  for(const [name,{json,gltf}] of loaded){
    assert.ok(json.extensionsRequired.includes('EXT_meshopt_compression'),name);
    assert.ok(json.buffers.every(buffer=>!buffer.uri),`${name}: no external buffers`);
    assert.ok((json.images||[]).every(image=>!image.uri&&Number.isInteger(image.bufferView)),`${name}: embedded images`);
    let meshes=0;
    gltf.scene.traverse(object=>{
      if(!object.isMesh)return;
      meshes++;
      const positions=object.geometry.getAttribute('position');
      assert.ok(positions?.count>0,`${name}/${object.name}: decoded positions`);
      object.geometry.computeBoundingBox();
      const box=object.geometry.boundingBox;
      assert.ok([...box.min.toArray(),...box.max.toArray()].every(Number.isFinite),`${name}/${object.name}: finite bounds`);
    });
    assert.ok(meshes>=(name.startsWith('avatar')?1:11),`${name}: scene has its authored geometry`);
    for(const image of json.images||[]){
      const view=json.bufferViews[image.bufferView];
      assert.equal(view.buffer,0);
      assert.ok(view.byteLength>0&&(view.byteOffset||0)+view.byteLength<=json.buffers[0].byteLength);
    }
  }
});

test('named room interaction targets survive asset compression',()=>{
  const scene=loaded.get('room-packed').gltf.scene;
  for(const name of ['book_01','monitor_screen'])assert.ok(scene.getObjectByName(name),name);
});

test('runtime pivot restoration preserves packed geometry and matches authored pivots',()=>{
  const source=readFileSync(new URL('explore/runtime.mjs',root),'utf8');
  const functionSource=source.match(/function pivot\(name,position\)\{[^\n]+\}/)?.[0];
  assert.ok(functionSource,'runtime pivot helper is available for contract verification');
  const scene=loaded.get('turntable-packed').gltf.scene.clone(true);
  scene.position.set(-1.96,.855,1.61);
  const original=asset('turntable').json;
  const pivot=runInNewContext(`(${functionSource})`,{THREE,turntable:{scene}});
  for(const name of ['record_disc','tonearm']){
    const mesh=scene.getObjectByName(name);
    assert.ok(mesh,`${name} survived compression`);
    const match=source.match(new RegExp(`pivot\\('${name}',\\[([^\\]]+)\\]\\)`));
    assert.ok(match,`${name}: runtime pivot definition`);
    const coordinates=match[1].split(',').map(Number);
    const authored=original.nodes.find(node=>node.name===name).translation;
    coordinates.forEach((value,i)=>assert.ok(Math.abs(value-authored[i])<1e-5,`${name}: pivot axis ${i}`));
    scene.updateMatrixWorld(true);
    const before=mesh.matrixWorld.clone();
    const group=pivot(name,coordinates);
    scene.updateMatrixWorld(true);
    before.elements.forEach((value,i)=>assert.ok(Math.abs(value-mesh.matrixWorld.elements[i])<1e-8,`${name}: world transform ${i} preserved`));
    assert.equal(mesh.parent,group);
    assert.deepEqual(group.position.toArray(),coordinates);
  }
});

test('assembled character retains textured head and independent transparent eyewear',()=>{
  for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
    const {gltf}=loaded.get(name);
    const head=gltf.scene.getObjectByName('head_surface');
    assert.ok(head?.isMesh,`${name}: head survives assembly`);
    assert.ok(head.geometry.getAttribute('uv'),`${name}: facial texture coordinates retained`);
    for(const suffix of ['1','-1']){
      const lens=gltf.scene.getObjectByName('glasses_lens_'+suffix);
      assert.ok(lens?.isMesh,`${name}: separate lens ${suffix}`);
      assert.ok(lens.material.transparent&&lens.material.opacity>0&&lens.material.opacity<1,`${name}: see-through lens`);
    }
  }
});

 test('typing morphs survive both compressed character exports',()=>{
  for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
    let hands=0;
    loaded.get(name).gltf.scene.traverse(mesh=>{
      if(!mesh.morphTargetDictionary?.Typing_Left && mesh.morphTargetDictionary?.Typing_Left!==0)return;
      hands++;
      for(const key of ['Typing_Left','Typing_Right']){
        const index=mesh.morphTargetDictionary[key];
        assert.ok(Number.isInteger(index),`${name}: ${key}`);
        const positions=mesh.geometry.morphAttributes.position[index];
        assert.equal(positions.count,mesh.geometry.attributes.position.count);
        assert.ok(Array.from(positions.array).some(value=>Math.abs(value)>0.0001),`${name}: nonempty hand movement`);
      }
    });
    assert.ok(hands>0,`${name}: animated hand geometry`);
  }
});
