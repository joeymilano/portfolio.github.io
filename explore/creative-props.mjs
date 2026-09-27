import * as THREE from 'three';

export function createCreativeProps(scene,sleeveTexture,gameTexture){
 const cream=new THREE.MeshStandardMaterial({color:0xb9b5a6,roughness:.7});
 const dark=new THREE.MeshStandardMaterial({color:0x222b2c,roughness:.65});
 const accent=new THREE.MeshStandardMaterial({color:0xb7603f,roughness:.5});
 function box(parent,name,size,position,material,id){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material);mesh.name=name;mesh.position.set(...position);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.item=id;parent.add(mesh);return mesh;}
 function print(parent,texture,maxWidth,maxHeight,position,id){if(!texture)return;texture.colorSpace=THREE.SRGBColorSpace;const ratio=texture.image.width/texture.image.height,w=Math.min(maxWidth,maxHeight*ratio),h=w/ratio;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));mesh.position.set(...position);mesh.userData.item=id;parent.add(mesh);}
 const sleeve=new THREE.Group();sleeve.name='music_sleeve';sleeve.position.set(-1.38,.86,1.40);sleeve.rotation.y=.22;scene.add(sleeve);
 box(sleeve,'album_jacket',[.34,.47,.018],[0,.235,0],dark,'music');print(sleeve,sleeveTexture,.32,.45,[0,.235,.010],'music');
 const console=new THREE.Group();console.name='game_console';console.position.set(-.95,0,-.60);console.rotation.y=.18;scene.add(console);
 box(console,'console_plinth',[.48,.10,.46],[0,.05,0],dark,'games');
 box(console,'console_base',[.44,.63,.40],[0,.405,0],cream,'games');
 box(console,'console_control_deck',[.52,.07,.50],[0,.755,.05],dark,'games');
 box(console,'console_monitor',[.51,.39,.35],[0,1.0,-.07],cream,'games');
 box(console,'console_bezel',[.44,.31,.014],[0,1.015,.113],dark,'games');
 print(console,gameTexture,.39,.25,[0,1.015,.122],'games');
 const stick=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.065,12),dark);stick.position.set(-.13,.818,.19);stick.userData.item='games';console.add(stick);
 const knob=new THREE.Mesh(new THREE.SphereGeometry(.032,16,12),accent);knob.position.set(-.13,.859,.19);knob.userData.item='games';console.add(knob);
 for(const x of [.09,.16]){const button=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,.014,16),accent);button.position.set(x,.80,.19);button.userData.item='games';console.add(button);}
 return {console,sleeve};
}
