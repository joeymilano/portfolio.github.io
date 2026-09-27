import * as THREE from 'three';

export function createCreativeProps(scene,sleeveTexture,consoleModel,gameTexture){
 const dark=new THREE.MeshStandardMaterial({color:0x222b2c,roughness:.65});
 function box(parent,name,size,position,material,id){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material);mesh.name=name;mesh.position.set(...position);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.item=id;parent.add(mesh);return mesh;}
 function print(parent,texture,maxWidth,maxHeight,position,id){if(!texture)return;texture.colorSpace=THREE.SRGBColorSpace;const ratio=texture.image.width/texture.image.height,w=Math.min(maxWidth,maxHeight*ratio),h=w/ratio;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));mesh.position.set(...position);mesh.userData.item=id;parent.add(mesh);}
 const sleeve=new THREE.Group();sleeve.name='music_sleeve';sleeve.position.set(-1.20,1.719,-2.08);sleeve.rotation.set(-.06,.12,0);scene.add(sleeve);
 box(sleeve,'album_jacket',[.34,.47,.018],[0,.235,0],dark,'music');print(sleeve,sleeveTexture,.32,.45,[0,.235,.010],'music');
 const console=consoleModel;
 if(console){
  console.name='game_console';console.position.set(-2.65,0,-1.70);console.rotation.y=.28;
  console.traverse(object=>{if(object.isMesh){object.castShadow=object.receiveShadow=true;object.userData.item='games';for(const material of Array.isArray(object.material)?object.material:[object.material])material.envMapIntensity=.2;}});
  if(gameTexture){
   gameTexture.colorSpace=THREE.SRGBColorSpace;
   const screen=new THREE.Mesh(new THREE.PlaneGeometry(.44,.30),new THREE.MeshBasicMaterial({map:gameTexture,color:0xaaaaaa}));
   screen.name='arcade_game_screen';screen.position.set(0,.805,.077);screen.rotation.x=-.28;screen.userData.item='games';console.add(screen);
  }
  scene.add(console);
 }
 return {console,sleeve};
}
