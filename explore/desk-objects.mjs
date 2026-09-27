import * as THREE from 'three';

// Small, independently animated desk objects; the packed room stays untouched.
export function createDeskObjects(scene, room, coverTexture) {
  const previous = room.getObjectByName('Closed_notebook');
  if (previous) previous.removeFromParent();
  const paper = new THREE.MeshStandardMaterial({color:0xe0d4be,roughness:.92});
  const clothCanvas=document.createElement('canvas');clothCanvas.width=clothCanvas.height=128;
  const c=clothCanvas.getContext('2d');c.fillStyle='#858585';c.fillRect(0,0,128,128);
  for(let i=0;i<128;i+=2){c.fillStyle=i%4?'#999':'#777';c.fillRect(i,0,1,128);c.fillRect(0,i,128,1);}
  const cloth=new THREE.CanvasTexture(clothCanvas);cloth.wrapS=cloth.wrapT=THREE.RepeatWrapping;cloth.repeat.set(5,5);
  function build(id,width,depth,position,yaw,color) {
    const group=new THREE.Group();group.name=`desk_${id}`;group.position.set(...position);group.rotation.y=yaw;
    scene.add(group);
    const fabric=new THREE.MeshStandardMaterial({color,roughness:.87,bumpMap:cloth,bumpScale:.0012});
    function box(name,size,pos,material,parent=group){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material);mesh.name=name;mesh.position.set(...pos);mesh.castShadow=mesh.receiveShadow=true;mesh.userData.item=id;parent.add(mesh);return mesh;}
    box(`${id}_back`,[width,.007,depth],[0,.0035,0],fabric);
    box(`${id}_pages`,[width-.012,.018,depth-.014],[.003,.016,0],paper);
    box(`${id}_spine`,[.009,.032,depth],[-width/2,.016,0],fabric);
    const hinge=new THREE.Group();hinge.position.set(-width/2,.029,0);group.add(hinge);
    box(`${id}_cover`,[width,.007,depth],[width/2,0,0],fabric,hinge);
    const titleCanvas=document.createElement('canvas');titleCanvas.width=512;titleCanvas.height=128;
    const text=titleCanvas.getContext('2d');text.fillStyle='#ddd0b3';text.font='22px Georgia';text.textAlign='center';text.fillText(id==='writing'?'W R I T I N G':'P H O T O G R A P H S',256,65);
    const titleTexture=new THREE.CanvasTexture(titleCanvas);titleTexture.colorSpace=THREE.SRGBColorSpace;
    const title=new THREE.Mesh(new THREE.PlaneGeometry(width*.76,width*.19),new THREE.MeshBasicMaterial({map:titleTexture,transparent:true,depthWrite:false}));
    title.rotation.x=-Math.PI/2;title.position.set(width/2,.004,depth*.32);title.userData.item=id;hinge.add(title);
    if(id==='photography'&&coverTexture){
      coverTexture.colorSpace=THREE.SRGBColorSpace;
      const h=depth*.65,w=h*coverTexture.image.width/coverTexture.image.height;
      const inset=box('photography_mount',[w+.018,.001,h+.018],[width/2,.004,-depth*.065],paper,hinge);
      const photo=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:coverTexture,roughness:.7,metalness:0}));photo.rotation.x=-Math.PI/2;photo.position.copy(inset.position);photo.position.y+=.001;photo.userData.item=id;hinge.add(photo);
    }
    if(id==='writing'){
      const ribbon=new THREE.MeshStandardMaterial({color:0x9d7951,roughness:1});
      box('writing_ribbon',[.012,.002,.06],[width*.23,.009,depth/2+.02],ribbon);
    }
    return {id,group,hinge,anchor:position.map((v,i)=>i===1?v+.035:v)};
  }
  const objects=[build('writing',.27,.24,[.55,.814,.35],.70,0x253d3c),build('photography',.40,.28,[.10,.814,1.22],.65,0x93816b)];
  return {
    anchors:Object.fromEntries(objects.map(o=>[o.id,o.anchor])),
    update(selected,hovered,damping,reduced){for(const o of objects){const angle=reduced?0:selected===o.id?(o.id==='photography'?.42:1.32):hovered===o.id?.12:0;o.hinge.rotation.z=THREE.MathUtils.lerp(o.hinge.rotation.z,angle,damping);}},
  };
}
