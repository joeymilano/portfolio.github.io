import * as THREE from 'three';

const ease=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v)};
const window=(t,start,end,fade)=>ease((t-start)/fade)*ease((end-t)/fade);

// Small, infrequent work breaks. No pointer tracking or sudden eye contact.
export function idlePose(seconds,still=false){
 if(still)return {yaw:0,pitch:0,roll:0,left:0,right:0};
 const t=seconds%29;
 const glance=window(t,7,13,2.2),settle=window(t,22,27,1.8);
 const typing=window(t,0,6.5,.8)+window(t,14,21,.8);
 return {yaw:glance*.052-settle*.018,pitch:glance*.018+settle*.025,roll:glance*-.012,
  left:typing*Math.pow(Math.max(0,Math.sin(seconds*17)),2)*.75,
  right:typing*Math.pow(Math.max(0,Math.sin(seconds*19+1.8)),2)*.75};
}

export function createAvatarMotion(avatar){
 const neck=new THREE.Group();neck.name='avatar_neck_pivot';neck.position.set(-.0763,.5893,.064);
 avatar.add(neck);avatar.updateMatrixWorld(true);
 const head=[];avatar.traverse(o=>{if(o.isMesh&&(o.name==='head_surface'||o.name.startsWith('glasses_')))head.push(o)});
 for(const mesh of head)neck.attach(mesh);
 return {update(seconds,damping,still){const pose=idlePose(seconds,still);neck.rotation.y=THREE.MathUtils.lerp(neck.rotation.y,pose.yaw,damping);neck.rotation.x=THREE.MathUtils.lerp(neck.rotation.x,pose.pitch,damping);neck.rotation.z=THREE.MathUtils.lerp(neck.rotation.z,pose.roll,damping);return pose}};
}
