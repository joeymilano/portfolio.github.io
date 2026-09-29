import * as THREE from 'three';

export function createLighting(scene,renderer,mobile,initialDay){
 let mix=initialDay?1:0;const materials=[];
 const hemi=new THREE.HemisphereLight(0xa4bacb,0x30231a,.3);scene.add(hemi);
 const key=new THREE.DirectionalLight(0xffd3a0,.65);key.position.set(-2,4,3);key.castShadow=true;key.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:15});key.shadow.bias=-.00015;key.shadow.normalBias=.025;scene.add(key);
 const windowLight=new THREE.SpotLight(0x91b2d3,27,10,1.05,.85,2);windowLight.position.set(2,2.8,-2.1);windowLight.target.position.set(.2,.6,1);scene.add(windowLight,windowLight.target);
 const accents=[[0xffe2c0,.75,[1.4,2.15,1.9]],[0xffb76a,8,[-2.6,1.18,1.48]],[0xffb365,8,[-2.1,2,-1.85]]].map(([color,power,position])=>{const light=new THREE.PointLight(color,power,5,2);light.position.set(...position);scene.add(light);return {light,power}});
 const taskLight=new THREE.SpotLight(0xffc98e,2.2,2.5,.62,.9,2);taskLight.position.set(.646,1.38,.236);taskLight.target.position.set(.70,.81,.55);scene.add(taskLight,taskLight.target);accents.push({light:taskLight,power:2.2});
 const colors={nightSky:new THREE.Color(0xa4bacb),daySky:new THREE.Color(0xdceeff),nightGround:new THREE.Color(0x30231a),dayGround:new THREE.Color(0xb5a891),nightKey:new THREE.Color(0xffd3a0),dayKey:new THREE.Color(0xfff3db)};
 function register(room){const seen=new Set();room.traverse(o=>{for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){if(seen.has(m))continue;seen.add(m);materials.push({m,night:m.color.clone(),emission:m.emissiveIntensity||0,environment:m.envMapIntensity||0,day:m.color.clone().multiplyScalar(m.name.includes('plaster')?3.0:m.name.includes('stone')?1.9:1)})}})}
 // Static room surfaces take their fill light from the day and night bakes (baked-light.mjs).
 const bakedMix={value:mix};
 function bake(room,maps,scales,chunks){
  if(!maps.night||!maps.day||!chunks)return false;
  for(const texture of [maps.night,maps.day])Object.assign(texture,{channel:1,flipY:false,colorSpace:THREE.NoColorSpace,anisotropy:4,needsUpdate:true});
  const meshes=[];room.traverse(o=>{if(o.isMesh)meshes.push(o)});
  const list=o=>Array.isArray(o.material)?o.material:[o.material];
  const baked=new Set(meshes.filter(o=>o.geometry.attributes.uv1).flatMap(list));
  // A mesh outside the atlas (the pull-out book) must not share a lightmapped material.
  const copies=new Map(),copy=m=>baked.has(m)?(copies.get(m)||copies.set(m,m.clone()).get(m)):m;
  for(const o of meshes)if(!o.geometry.attributes.uv1)o.material=Array.isArray(o.material)?o.material.map(copy):copy(o.material);
  const scale=new THREE.Vector2(scales.night,scales.day);
  for(const m of baked){
   m.lightMap=maps.night;m.lightMapIntensity=1;
   m.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,{bakedDayMap:{value:maps.day},bakedScale:{value:scale},bakedMix});
    shader.fragmentShader=shader.fragmentShader.replace('#include <lightmap_pars_fragment>','#include <lightmap_pars_fragment>\nuniform sampler2D bakedDayMap;\nuniform vec2 bakedScale;\nuniform float bakedMix;')
     .replace('#include <lights_fragment_begin>',chunks.begin).replace('#include <lights_fragment_maps>',chunks.maps);
   };
   m.customProgramCacheKey=()=>'studio-baked';m.needsUpdate=true;
  }
  return true;
 }
 function update(day,dt,still){mix=still?(day?1:0):THREE.MathUtils.lerp(mix,day?1:0,1-Math.exp(-dt*2.2));hemi.intensity=THREE.MathUtils.lerp(.3,2.1,mix);hemi.color.copy(colors.nightSky).lerp(colors.daySky,mix);hemi.groundColor.copy(colors.nightGround).lerp(colors.dayGround,mix);key.intensity=THREE.MathUtils.lerp(.65,2.5,mix);key.color.copy(colors.nightKey).lerp(colors.dayKey,mix);key.position.set(THREE.MathUtils.lerp(-2,3,mix),THREE.MathUtils.lerp(4,5,mix),THREE.MathUtils.lerp(3,-2,mix));windowLight.intensity=THREE.MathUtils.lerp(27,55,mix);windowLight.color.copy(colors.nightSky).lerp(colors.daySky,mix);for(const {light,power} of accents)light.intensity=power*(1-mix*.9);for(const {m,night,day,emission,environment} of materials){m.color.copy(night).lerp(day,mix);m.emissiveIntensity=emission*(1-mix*.96);m.envMapIntensity=environment+mix*.35}bakedMix.value=mix;renderer.toneMappingExposure=THREE.MathUtils.lerp(.95,1.1,mix);}
 // The skyline behind the window follows the same eased day/night mix.
 return {register,bake,update,get mix(){return mix}};
}
