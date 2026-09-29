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
const {applyMonitorImage}=await import(new URL('explore/screen-material.mjs',root));
const {createDeskObjects}=await import(new URL('explore/desk-objects.mjs',root));
const {createAvatarMotion,idlePose}=await import(new URL('explore/avatar-motion.mjs',root));
const {createLighting}=await import(new URL('explore/lighting.mjs',root));
const {bakedScales,lightmapUrls,patchLightChunks}=await import(new URL('explore/baked-light.mjs',root));
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
for(const name of ['room-lit-packed','turntable-packed','avatar-v2-packed','avatar-v2-mobile-packed','arcade-packed']){
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
    assert.ok(meshes>=(name.startsWith('avatar')||name==='arcade-packed'?1:11),`${name}: scene has its authored geometry`);
    for(const image of json.images||[]){
      const view=json.bufferViews[image.bufferView];
      assert.equal(view.buffer,0);
      assert.ok(view.byteLength>0&&(view.byteOffset||0)+view.byteLength<=json.buffers[0].byteLength);
    }
  }
});

test('named room interaction targets survive asset compression',()=>{
  const scene=loaded.get('room-lit-packed').gltf.scene;
  for(const name of ['book_01','monitor_screen'])assert.ok(scene.getObjectByName(name),name);
});

test('lightmapped room keeps its shell, atlas coordinates and moving parts outside the bake',()=>{
  const scene=loaded.get('room-lit-packed').gltf.scene;let baked=0;
  for(const name of ['Continuous_floor','Left_wall_continuation','Upper_rear_wall']){const shell=scene.getObjectByName(name);assert.ok(shell,name);assert.equal(shell.userData.castShadow,false,name)}
  assert.equal(scene.getObjectByName('Closed_notebook'),undefined,'runtime notebook replaces the modelled one');
  scene.traverse(o=>{if(!o.isMesh)return;const uv=o.geometry.getAttribute('uv1');if(!uv)return;baked++;
    for(let i=0;i<uv.count;i++){const u=uv.getX(i),v=uv.getY(i);assert.ok(u>=0&&u<=1&&v>=0&&v<=1,`${o.name} atlas uv in range`)}});
  assert.ok(baked>=40,'static room surfaces share the lightmap atlas');
  scene.getObjectByName('book_01').traverse(o=>{if(o.isMesh)assert.equal(o.geometry.getAttribute('uv1'),undefined,'the pull-out book keeps realtime light')});
  for(const mode of ['night','day']){assert.ok(bakedScales[mode]>0,mode);for(const mobile of [false,true])readFileSync(new URL('.'+lightmapUrls(mobile)[mode],root))}
});

test('baked light patch leaves specular and the key light intact and fails closed on unknown chunks',()=>{
  const {lights_fragment_begin:begin,lights_fragment_maps:maps}=THREE.ShaderChunk,patched=patchLightChunks(begin,maps);
  assert.ok(patched,'patch matches the vendored three.js chunks');
  const directional=patched.begin.slice(patched.begin.indexOf('#if ( NUM_DIR_LIGHTS > 0 )'));
  assert.equal(patched.begin.split('reflectedLight.directDiffuse = bakedDiffuse').length,3,'point and spot lights drop their diffuse term');
  assert.ok(directional.includes('RE_Direct( directLight')&&!directional.includes('bakedDiffuse'),'key light stays fully realtime');
  assert.ok(!patched.begin.includes('getHemisphereLightIrradiance'),'hemisphere fill comes from the bake');
  assert.ok(patched.maps.includes('bakedDayMap')&&patched.maps.includes('bakedMix'));
  assert.equal(patchLightChunks(begin.replace('RE_Direct(','RE_Direct2('),maps),null);
  assert.equal(patchLightChunks(begin,'irradiance += x;'),null);
});

test('runtime pivot restoration preserves packed geometry and matches authored pivots',()=>{
  const source=readFileSync(new URL('explore/runtime.mjs',root),'utf8');
  const functionSource=source.match(/function pivot\(name,position\)\{[^\n]+\}/)?.[0];
  assert.ok(functionSource,'runtime pivot helper is available for contract verification');
  const scene=loaded.get('turntable-packed').gltf.scene.clone(true);
  scene.position.set(-1.96,.855,1.61);
  // Authored mechanical pivots from the archived Blender export, in metres.
  const authoredPivots={record_disc:[-.075,.133,.012],tonearm:[.272,.143,-.164]};
  const pivot=runInNewContext(`(${functionSource})`,{THREE,turntable:{scene}});
  for(const name of ['record_disc','tonearm']){
    const mesh=scene.getObjectByName(name);
    assert.ok(mesh,`${name} survived compression`);
    const match=source.match(new RegExp(`pivot\\('${name}',\\[([^\\]]+)\\]\\)`));
    assert.ok(match,`${name}: runtime pivot definition`);
    const coordinates=match[1].split(',').map(Number);
    const authored=authoredPivots[name];
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
    let headMesh;head?.traverse(o=>{if(o.isMesh)headMesh=o});
    assert.ok(headMesh,`${name}: head survives assembly`);
    assert.ok(headMesh.geometry.getAttribute('uv'),`${name}: facial texture coordinates retained`);
    for(const suffix of ['1','-1']){
      let lens;gltf.scene.getObjectByName('glasses_lens_'+suffix)?.traverse(o=>{if(o.isMesh)lens=o});
      assert.ok(lens?.isMesh,`${name}: separate lens ${suffix}`);
      assert.ok(lens.material.transparent&&lens.material.opacity>0&&lens.material.opacity<1,`${name}: see-through lens`);
    }
  }
});

 test('typing morphs survive both compressed character exports',()=>{
  for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
    let hands=0;
    const moving=new Set();
    loaded.get(name).gltf.scene.traverse(mesh=>{
      if(!mesh.morphTargetDictionary?.Typing_Left && mesh.morphTargetDictionary?.Typing_Left!==0)return;
      hands++;
      for(const key of ['Typing_Left','Typing_Right']){
        const index=mesh.morphTargetDictionary[key];
        assert.ok(Number.isInteger(index),`${name}: ${key}`);
        const positions=mesh.geometry.morphAttributes.position[index];
        assert.equal(positions.count,mesh.geometry.attributes.position.count);
        if(Array.from(positions.array).some(value=>Math.abs(value)>0.0001))moving.add(key);
      }
    });
    assert.ok(hands>0,`${name}: animated hand geometry`);
    assert.deepEqual([...moving].sort(),["Typing_Left","Typing_Right"],`${name}: both hands move`);
  }
});


test('monitor texture reaches optimized child meshes and restores discarded UVs',()=>{
 const screen=loaded.get('room-lit-packed').gltf.scene.getObjectByName('monitor_screen').clone(true);
 const texture=new THREE.Texture();applyMonitorImage(screen,texture);
 let meshes=0;
 screen.traverse(mesh=>{if(!mesh.isMesh)return;meshes++;
  assert.equal(mesh.material.map,texture);
  assert.equal(mesh.userData.item,'finfold');
  const uv=mesh.geometry.getAttribute('uv');
  assert.equal(uv.count,mesh.geometry.getAttribute('position').count);
  const points=new Set();
  for(let i=0;i<uv.count;i++){assert.ok(Number.isFinite(uv.getX(i))&&uv.getX(i)>=0&&uv.getX(i)<=1);assert.ok(Number.isFinite(uv.getY(i))&&uv.getY(i)>=0&&uv.getY(i)<=1);points.add([uv.getX(i).toFixed(2),uv.getY(i).toFixed(2)].join(','));}
  assert.equal(points.size,4,'screen image spans four corners');
 });assert.ok(meshes>0);
});


test('desk covers lift above the desk, keep independent targets, and respect reduced motion',()=>{
 const originalDocument=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 try{
  const scene=new THREE.Scene(),room=loaded.get('room-lit-packed').gltf.scene.clone(true);
  const cover=new THREE.Texture({width:341,height:512});
  const objects=createDeskObjects(scene,room,cover);
  assert.equal(room.getObjectByName('Closed_notebook'),undefined,'old inert notebook removed');
  for(const id of ['writing','work']){
   const mesh=scene.getObjectByName(`${id}_cover`);
   assert.equal(mesh.userData.item,id);
   scene.updateMatrixWorld(true);const before=mesh.getWorldPosition(new THREE.Vector3()).y;
   objects.update(id,null,1,false);scene.updateMatrixWorld(true);
   assert.ok(mesh.getWorldPosition(new THREE.Vector3()).y>before+.08,'cover opens upward, never through pages');
   objects.update(null,null,1,false);scene.updateMatrixWorld(true);
   assert.ok(Math.abs(mesh.getWorldPosition(new THREE.Vector3()).y-before)<1e-7,'cover returns to rest');
   objects.update(id,null,1,true);assert.equal(mesh.parent.rotation.z,0,'reduced motion keeps cover still');
   assert.ok(objects.anchors[id].every(Number.isFinite));
  }
 }finally{globalThis.document=originalDocument;}
});


test('album opening sweep stays clear of the monitor with a safety margin',()=>{
 const originalDocument=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},fillText(){}})})};
 try{
  const scene=new THREE.Scene(),room=loaded.get('room-lit-packed').gltf.scene.clone(true);
  scene.add(room);const objects=createDeskObjects(scene,room,null);
  scene.updateMatrixWorld(true);
  const screen=new THREE.Box3().setFromObject(room.getObjectByName('monitor_screen')).expandByScalar(.02);
  const cover=scene.getObjectByName('work_cover');
  for(let step=0;step<=100;step++){
   objects.update(null,null,1,false);
   objects.update('work',null,step/100,false);
   scene.updateMatrixWorld(true);
   assert.equal(new THREE.Box3().setFromObject(cover).intersectsBox(screen),false,`opening step ${step} clears screen`);
  }
 }finally{globalThis.document=originalDocument;}
});


test('head movement is gentle, pauses typing, and becomes still for reduced motion',()=>{
 for(let t=0;t<58;t+=.05){const p=idlePose(t);assert.ok(Math.abs(p.yaw)<=.053&&Math.abs(p.pitch)<=.026&&Math.abs(p.roll)<=.013);if(p.yaw>.01)assert.ok(p.left===0&&p.right===0,'hands rest during the glance');}
 assert.deepEqual(idlePose(10,true),{yaw:0,pitch:0,roll:0,left:0,right:0});
 for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
  const avatar=loaded.get(name).gltf.scene.clone(true);avatar.updateMatrixWorld(true);
  const head=avatar.getObjectByName('head_surface'),before=head.matrixWorld.clone();
  const motion=createAvatarMotion(avatar);avatar.updateMatrixWorld(true);
  before.elements.forEach((x,i)=>assert.ok(Math.abs(x-head.matrixWorld.elements[i])<1e-7,'mount preserves rest pose'));
  const pivot=avatar.getObjectByName('avatar_neck_pivot');
  assert.equal(avatar.getObjectByName('glasses_bridge').parent,pivot);
  assert.notEqual(avatar.getObjectByName('avatar_body').parent,pivot);
  motion.update(10,1,false);assert.ok(pivot.rotation.y>.02);
  motion.update(10,1,true);assert.equal(pivot.rotation.y,0);
 }
});

test('desk long edge faces the seated keyboard without moving hand contact',()=>{
 const room=loaded.get('room-lit-packed').gltf.scene;room.updateMatrixWorld(true);
 const keys=new THREE.Box3().setFromObject(room.getObjectByName('keyboard_keys')).getCenter(new THREE.Vector3());
 assert.ok(keys.distanceTo(new THREE.Vector3(.825,.843,.537))<.002,'keyboard remains beneath the hands');
 const desk=new THREE.Box3().setFromObject(room.getObjectByName('desk')).getCenter(new THREE.Vector3());
 assert.ok(Math.abs(desk.x-.55)<.01&&Math.abs(desk.z-.77)<.01);
 const forward=new THREE.Vector3(-.766,0,.643),longEdge=new THREE.Vector3(-.643,0,-.766);
 const extents=[[Infinity,-Infinity],[Infinity,-Infinity]];
 room.getObjectByName('desk').traverse(mesh=>{if(!mesh.isMesh)return;const points=mesh.geometry.getAttribute('position');for(let i=0;i<points.count;i++){const v=new THREE.Vector3().fromBufferAttribute(points,i).applyMatrix4(mesh.matrixWorld);if(v.y<.75)continue;[longEdge,forward].forEach((axis,n)=>{const d=v.dot(axis);extents[n][0]=Math.min(extents[n][0],d);extents[n][1]=Math.max(extents[n][1],d)})}});
 assert.ok(extents[0][1]-extents[0][0]>2,'actual desktop has its long side across the working direction');
 assert.ok(extents[1][1]-extents[1][0]<.9,'actual depth remains within comfortable reach');
});


test('the complete task lamp clears both foliage and monitor',()=>{
 const room=loaded.get('room-lit-packed').gltf.scene;room.updateMatrixWorld(true);
 const lamp=new THREE.Box3().setFromObject(room.getObjectByName('task_lamp'));
 assert.equal(lamp.isEmpty(),false);
 for(const name of ['Desk_plant','monitor_screen']){
  const obstacle=new THREE.Box3().setFromObject(room.getObjectByName(name)).expandByScalar(.025);
  assert.equal(lamp.intersectsBox(obstacle),false,`lamp clears ${name} with margin`);
 }
});


test('daylight changes real lighting and reduced motion switches immediately without cumulative material drift',()=>{
 const original=globalThis.document;
 globalThis.document={createElement:()=>({width:0,height:0,getContext:()=>({fillRect(){},createLinearGradient:()=>({addColorStop(){}})})})};
 try{
  const scene=new THREE.Scene(),renderer={toneMappingExposure:.95},material=new THREE.MeshStandardMaterial({color:0x333333,emissive:0xffc080,emissiveIntensity:1});material.name='plaster';
  const room=new THREE.Group();room.add(new THREE.Mesh(new THREE.BoxGeometry(1,1,1),material));
  const originalColor=material.color.clone(),lighting=createLighting(scene,renderer,true,false);lighting.register(room);
  lighting.update(true,.016,true);assert.ok(renderer.toneMappingExposure>1);assert.ok(material.color.r>originalColor.r);assert.ok(material.emissiveIntensity<.1);
  for(let i=0;i<10;i++){lighting.update(true,.016,true);lighting.update(false,.016,true)}
  assert.ok(material.color.equals(originalColor),'night material is restored exactly');assert.equal(renderer.toneMappingExposure,.95);assert.equal(material.emissiveIntensity,1);
 }finally{globalThis.document=original}
});

test('replacement neck stays inside the restored shoulder assembly while turning',()=>{
 for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
  const avatar=loaded.get(name).gltf.scene.clone(true);
  const motion=createAvatarMotion(avatar);
  const head=avatar.getObjectByName('head_surface');
  assert.equal(avatar.getObjectByName('neck_inner_collar'),undefined,'no detached collar patch');
  for(const t of [0,10,24]){
   motion.update(t,1,false);avatar.updateMatrixWorld(true);
   const bounds=new THREE.Box3().setFromObject(head);
   assert.ok(bounds.min.y<.66,'neck extends below the collar even when turning');

  }
 }
});


test('both avatar sizes contain the rebuilt hand with typing morphs',()=>{
 for(const name of ['avatar-v2-packed','avatar-v2-mobile-packed']){
  const hand=loaded.get(name).gltf.scene.getObjectByName('avatar_body_matched_hand');
  assert.ok(hand,`${name}: replacement hand`);
  let animated=false;hand.traverse(o=>{if(o.morphTargetDictionary?.Typing_Left!==undefined)animated=true});
  assert.ok(animated,`${name}: replacement follows typing motion`);
 }
});
