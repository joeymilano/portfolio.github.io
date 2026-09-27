import * as THREE from 'three';

export function skyTexture(day){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=768;const c=canvas.getContext('2d');
 const sky=c.createLinearGradient(0,0,0,768);sky.addColorStop(0,day?'#8fbfdb':'#101f32');sky.addColorStop(1,day?'#e5e6d9':'#273949');c.fillStyle=sky;c.fillRect(0,0,512,768);
 let seed=72;const random=()=>((seed=(seed*16807)%2147483647)-1)/2147483646;
 for(let x=-25;x<512;){const width=45+random()*65,top=90+random()*260;c.fillStyle=day?'#8caaa9':random()>.5?'#101923':'#16222d';c.fillRect(x,top,width,768-top);for(let wx=x+9;wx<x+width-5;wx+=12)for(let wy=top+14;wy<768;wy+=23){if(random()>.46){c.fillStyle=day?'#c8d9de':random()>.3?'#a39674':'#68889f';c.globalAlpha=day?.6:.25+random()*.5;c.fillRect(wx,wy,4,8)}}c.globalAlpha=1;x+=width+8;}
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

export function createLighting(scene,renderer,mobile,initialDay){
 let mix=initialDay?1:0;const materials=[];
 const hemi=new THREE.HemisphereLight(0xa4bacb,0x30231a,.3);scene.add(hemi);
 const key=new THREE.DirectionalLight(0xffd3a0,.65);key.position.set(-2,4,3);key.castShadow=true;key.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:15});key.shadow.bias=-.00015;key.shadow.normalBias=.025;scene.add(key);
 const windowLight=new THREE.SpotLight(0x91b2d3,27,10,1.05,.85,2);windowLight.position.set(2,2.8,-2.1);windowLight.target.position.set(.2,.6,1);scene.add(windowLight,windowLight.target);
 const accents=[[0xffe2c0,.75,[1.4,2.15,1.9]],[0xffb76a,8,[-2.6,1.18,1.48]],[0xffb365,8,[-2.1,2,-1.85]]].map(([color,power,position])=>{const light=new THREE.PointLight(color,power,5,2);light.position.set(...position);scene.add(light);return {light,power}});
 const taskLight=new THREE.SpotLight(0xffc98e,2.2,2.5,.62,.9,2);taskLight.position.set(.646,1.38,.236);taskLight.target.position.set(.70,.81,.55);scene.add(taskLight,taskLight.target);accents.push({light:taskLight,power:2.2});
 const colors={nightSky:new THREE.Color(0xa4bacb),daySky:new THREE.Color(0xdceeff),nightGround:new THREE.Color(0x30231a),dayGround:new THREE.Color(0xb5a891),nightKey:new THREE.Color(0xffd3a0),dayKey:new THREE.Color(0xfff3db)};
 const sky=new THREE.Mesh(new THREE.PlaneGeometry(2.76,3.13),new THREE.MeshBasicMaterial({map:skyTexture(false),color:0x8195a5}));sky.position.set(2.02,1.96,-2.458);scene.add(sky);
 const daySky=new THREE.Mesh(sky.geometry,new THREE.MeshBasicMaterial({map:skyTexture(true),transparent:true,opacity:mix,depthWrite:false}));daySky.position.copy(sky.position);daySky.position.z+=.001;scene.add(daySky);
 function register(room){const seen=new Set();room.traverse(o=>{for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){if(seen.has(m))continue;seen.add(m);materials.push({m,night:m.color.clone(),emission:m.emissiveIntensity||0,environment:m.envMapIntensity||0,day:m.color.clone().multiplyScalar(m.name.includes('plaster')?3.0:m.name.includes('stone')?1.9:1)})}})}
 function update(day,dt,still){mix=still?(day?1:0):THREE.MathUtils.lerp(mix,day?1:0,1-Math.exp(-dt*2.2));hemi.intensity=THREE.MathUtils.lerp(.3,2.1,mix);hemi.color.copy(colors.nightSky).lerp(colors.daySky,mix);hemi.groundColor.copy(colors.nightGround).lerp(colors.dayGround,mix);key.intensity=THREE.MathUtils.lerp(.65,2.5,mix);key.color.copy(colors.nightKey).lerp(colors.dayKey,mix);key.position.set(THREE.MathUtils.lerp(-2,3,mix),THREE.MathUtils.lerp(4,5,mix),THREE.MathUtils.lerp(3,-2,mix));windowLight.intensity=THREE.MathUtils.lerp(27,55,mix);windowLight.color.copy(colors.nightSky).lerp(colors.daySky,mix);for(const {light,power} of accents)light.intensity=power*(1-mix*.9);for(const {m,night,day,emission,environment} of materials){m.color.copy(night).lerp(day,mix);m.emissiveIntensity=emission*(1-mix*.96);m.envMapIntensity=environment+mix*.35}daySky.material.opacity=mix;renderer.toneMappingExposure=THREE.MathUtils.lerp(.95,1.1,mix);}
 return {register,update};
}
