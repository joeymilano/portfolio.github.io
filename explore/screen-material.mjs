import * as THREE from 'three';

export function applyMonitorImage(screen,texture){
 const material=new THREE.MeshBasicMaterial({map:texture});screen.traverse(mesh=>{
  if(!mesh.isMesh)return;
  // Texture-free source materials allow optimization to discard screen UVs.
  // Restore coordinates from the planar screen before attaching the live image.
  if(!mesh.geometry.getAttribute('uv')){
   const positions=mesh.geometry.getAttribute('position'),normals=mesh.geometry.getAttribute('normal');
   const right=new THREE.Vector3(normals.getZ(0),0,-normals.getX(0)).normalize();
   const points=Array.from({length:positions.count},(_,i)=>[positions.getX(i)*right.x+positions.getZ(i)*right.z,positions.getY(i)]);
   const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),x0=Math.min(...xs),y0=Math.min(...ys),w=Math.max(...xs)-x0,h=Math.max(...ys)-y0;
   mesh.geometry.setAttribute('uv',new THREE.Float32BufferAttribute(points.flatMap(([x,y])=>[(x-x0)/w,1-(y-y0)/h]),2));
  }
  mesh.material=material;mesh.userData.item='finfold';
 });
}
