import {createCreativeProps} from './creative-props.mjs?v=20260927-shelf7';
import {createLighting} from './lighting.mjs?v=20260927-curated1';
import {createAvatarMotion} from './avatar-motion.mjs?v=20260927-palm20';
import {createDeskObjects} from './desk-objects.mjs?v=20260927-curated1';
import {applyMonitorImage} from './screen-material.mjs?v=20260927-refined2';
import * as THREE from 'three';
import {moveView,viewOffset} from './camera-control.mjs?v=20260927-corner3';
let view={x:0,y:0},savedView=null,hovered=null,deskObjects=null;
function resetView(){view={x:0,y:0};cameraPose();}
window.addEventListener('studio:reset-view',resetView);
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from './vendor/meshopt_decoder.mjs?v=20260927-2';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const root=document.querySelector('#scene-root');
const emit=(name,detail={})=>window.dispatchEvent(new CustomEvent(name,{detail}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const anchors={finfold:[-.4443,1.25,1.3311],music:[-2,1,1.6],books:[-2.4,1.9,-2.05],about:[1.61,1.14,.20],photography:[-3.43,1.96,-.30],writing:[.72,.849,1.07],work:[1.08,.849,1.36],games:[-2.65,.84,-1.40]};
let renderer,scene,camera,raf=0,selected=null,disposed=false,sceneReady=false,contextLost=false,last=0,record=null,recordBaseY=0,tonearm=null,armBaseY=0,avatar=null,book=null,bookRest=null,bookRestRotation=0;
const typingMeshes=[];let avatarMotion=null,lighting=null;
const target=new THREE.Vector3(),desired=new THREE.Vector3(),look=new THREE.Vector3(),desiredLook=new THREE.Vector3();
const clock=new THREE.Clock();
let sampleStart=0,sampleFrames=0;
function cameraPose(){
 const mobile=root.clientWidth<700;
 desired.set(...(mobile?[.5,2,5.8]:[.44,1.78,4.48]));
 desiredLook.set(...(mobile?[.55,1.12,.6]:[-.04,1.16,.7]));
 if(root.dataset.reviewView){const views={side:[[3.8,1.6,.3],[.6,1,.65]],top:[[.6,5,.701],[.6,.8,.7]],hands:[[2.0,1.5,2.3],[.85,.86,.52]]};const v=views[root.dataset.reviewView];if(v){desired.set(...v[0]);desiredLook.set(...v[1]);}}
 if(!root.dataset.reviewView){
  const offset=viewOffset(view,mobile),orbit=new THREE.Spherical().setFromVector3(desired.clone().sub(desiredLook));
  orbit.theta+=offset.yaw;orbit.phi+=offset.pitch;desired.copy(desiredLook).add(new THREE.Vector3().setFromSpherical(orbit));
  root.dataset.viewX=view.x.toFixed(2);root.dataset.viewY=view.y.toFixed(2);emit('studio:view',{moved:Math.abs(view.x)+Math.abs(view.y)>.01});
 }
 if(selected&&selected!=='work'&&anchors[selected]&&!reduced.matches){
  const a=new THREE.Vector3(...anchors[selected]);
  if(['writing','photography'].includes(selected)){desired.lerp(a.clone().add(new THREE.Vector3(.15,1.35,2.25)),.28);desiredLook.lerp(a,.22);}
  else{desired.lerp(a.clone().add(new THREE.Vector3(3,1.6,4)),.35);desiredLook.lerp(a,.32);}
 }
}
function resize(){if(!renderer)return;const w=root.clientWidth,h=root.clientHeight;camera.aspect=w/h;camera.fov=w<700?47:43;camera.updateProjectionMatrix();renderer.setSize(w,h,false);renderer.setPixelRatio(Math.min(devicePixelRatio,w<700?1.5:2));cameraPose();}
function frame(ms=0){raf=0;if(disposed||contextLost||document.hidden)return;const dt=Math.min((ms-last)/1000||.016,.05);last=ms;lighting?.update(document.documentElement.dataset.lightMode==='day',dt,reduced.matches);const damping=reduced.matches?1:1-Math.exp(-dt*5);camera.position.lerp(desired,damping);look.lerp(desiredLook,damping);camera.lookAt(look);if(tonearm){const armOpen=selected==='music'||(record&&record.position.y-recordBaseY>.006);tonearm.rotation.y=THREE.MathUtils.lerp(tonearm.rotation.y,armOpen?.58:0,damping);tonearm.position.y=THREE.MathUtils.lerp(tonearm.position.y,armBaseY+(armOpen||tonearm.rotation.y>.02?.02:0),damping);}if(record){const lift=selected==='music'&&(!tonearm||tonearm.rotation.y>.3)?.12:0;record.position.y=THREE.MathUtils.lerp(record.position.y,recordBaseY+lift,damping);}if(book){book.position.z=THREE.MathUtils.lerp(book.position.z,bookRest.z+(selected==='books'?.22:0),damping);book.rotation.y=THREE.MathUtils.lerp(book.rotation.y,bookRestRotation+(selected==='books'?-.14:0),damping);}deskObjects?.update(selected,hovered,damping,reduced.matches);if(avatar){const t=clock.getElapsedTime();avatar.scale.y=reduced.matches?1:1+Math.sin(t*1.4)*.001;const pose=avatarMotion.update(t,damping,reduced.matches||!!selected);for(const hand of typingMeshes){hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Left]=pose.left;hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Right]=pose.right;root.dataset.typingLeft=hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Left].toFixed(3);root.dataset.typingRight=hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Right].toFixed(3);}}renderer.render(scene,camera);if(!root.dataset.firstFrameMs)root.dataset.firstFrameMs=Math.round(performance.now());if(!sampleStart)sampleStart=ms;sampleFrames++;if(ms-sampleStart>2000){root.dataset.sampleFps=(sampleFrames*1000/(ms-sampleStart)).toFixed(1);root.dataset.drawCalls=renderer.info.render.calls;root.dataset.triangles=renderer.info.render.triangles;sampleStart=ms;sampleFrames=0;}for(const [id,p] of Object.entries(anchors)){const button=document.querySelector(`[data-object="${id}"]`);if(!button)continue;target.set(...p).project(camera);button.hidden=target.z>1||Math.abs(target.x)>.96||Math.abs(target.y)>.86;button.style.left=`${(target.x*.5+.5)*root.clientWidth}px`;button.style.top=`${(-target.y*.5+.5)*root.clientHeight}px`;}raf=requestAnimationFrame(frame);}
function resume(){if(!raf&&!disposed&&!contextLost&&sceneReady){last=performance.now();raf=requestAnimationFrame(frame)}}
function stop(){cancelAnimationFrame(raf);raf=0;}
function dispose(){disposed=true;stop();scene?.traverse(o=>{o.geometry?.dispose();for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose()}});renderer?.dispose();}
window.addEventListener('studio:select',e=>{const next=e.detail?.id||null;if(next&&!selected)savedView={...view};if(!next&&savedView){view=savedView;savedView=null;}selected=next;cameraPose()});
window.addEventListener('studio:hover',e=>{hovered=e.detail?.id||null});
for(const type of ['pointerover','focusin'])document.querySelector('.hotspots').addEventListener(type,e=>{const button=e.target.closest('[data-object]');if(button)hovered=button.dataset.object;});
for(const type of ['pointerout','focusout'])document.querySelector('.hotspots').addEventListener(type,e=>{if(!e.relatedTarget?.closest?.('[data-object]'))hovered=null;});
reduced.addEventListener('change',cameraPose);
document.addEventListener('visibilitychange',()=>document.hidden?stop():resume());window.addEventListener('pagehide',stop);window.addEventListener('pageshow',resume);window.addEventListener('resize',resize);
try{
 const mobileHardware=root.clientWidth<700;
 // High-DPR mobile screens are self-antialiasing; MSAA there only costs fill rate.
 renderer=new THREE.WebGLRenderer({antialias:mobileHardware?devicePixelRatio<1.75:true,alpha:false,powerPreference:'high-performance'});renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.95;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;root.append(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 scene=new THREE.Scene();scene.background=new THREE.Color(0x171b20);camera=new THREE.PerspectiveCamera(43,1,.05,50);
 const pmrem=new THREE.PMREMGenerator(renderer);const env=new RoomEnvironment();scene.environment=pmrem.fromScene(env,.04).texture;env.dispose();pmrem.dispose();lighting=createLighting(scene,renderer,mobileHardware,document.documentElement.dataset.lightMode==='day');resize();camera.position.copy(desired);look.copy(desiredLook);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;stop();emit('studio:failure')});renderer.domElement.addEventListener('webglcontextrestored',()=>location.reload());
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,lastHover=0;
 const canvas=renderer.domElement;
 canvas.tabIndex=0;canvas.removeAttribute('aria-hidden');canvas.setAttribute('role','region');
 const label=()=>canvas.setAttribute('aria-label',document.documentElement.lang==='zh'?'工作室视角：拖动或方向键环视，Home 键复位':'Studio view: drag or use arrow keys to look around; Home resets');label();window.addEventListener('studio:language',label);
 canvas.addEventListener('pointerdown',e=>{if(selected||e.button!==0||down)return;down={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
 canvas.addEventListener('pointerleave',()=>{hovered=null;canvas.style.cursor='';});
 canvas.addEventListener('pointermove',e=>{if(!down){if(selected||e.pointerType==='touch'||performance.now()-lastHover<45)return;lastHover=performance.now();const r=root.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(scene.children,true)[0];hovered=hit?.object.userData.item||null;canvas.style.cursor=hovered?'pointer':'';return;}if(e.pointerId!==down.id)return;if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)down.moved=true;if(down.moved){view=moveView(view,-(e.clientX-down.lastX)/root.clientWidth*3,-(e.clientY-down.lastY)/root.clientHeight*3);cameraPose();}down.lastX=e.clientX;down.lastY=e.clientY;});
 const release=()=>{if(down&&canvas.hasPointerCapture(down.id))canvas.releasePointerCapture(down.id);down=null;canvas.classList.remove('dragging');};
 canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',()=>{down=null;canvas.classList.remove('dragging');});
 canvas.addEventListener('pointerup',e=>{if(!down||e.pointerId!==down.id)return;const moved=down.moved;release();if(moved||selected)return;const r=root.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(scene.children,true)[0];if(!hit)return;const n=hit.object.name.toLowerCase();const id=hit.object.userData.item|| (n.includes('monitor')?'finfold':n.includes('book')?'books':n.includes('record')?'music':n.includes('avatar')?'about':n.includes('artwork')?'photography':null);if(id)emit('studio:pick',{id});});
 canvas.addEventListener('keydown',e=>{if(selected)return;const step={ArrowLeft:[-.18,0],ArrowRight:[.18,0],ArrowUp:[0,-.18],ArrowDown:[0,.18]}[e.key];if(step){e.preventDefault();view=moveView(view,...step);cameraPose();}else if(e.key==='Home'){e.preventDefault();resetView();}});
 const manager=new THREE.LoadingManager();
 const weights={room:37,avatar:38,turntable:10,screen:4,art0:3,art1:3,cover:1,sleeve:1,game:2,gameScreen:1};
 const progress={};let degraded=false;
 function report(key,value){progress[key]=Math.max(progress[key]||0,value);emit('studio:progress',{percent:Object.entries(weights).reduce((sum,[k,w])=>sum+w*(progress[k]||0),0)});}
 const bytes=key=>event=>{if(event.lengthComputable&&event.total)report(key,Math.min(.9,event.loaded/event.total*.9));};
 function tracked(key,promise){return promise.then(value=>{report(key,1);return value},error=>{degraded=true;report(key,1);if(key==='room')throw error;console.warn(key+' unavailable',error);return null;});}
 const loader=new GLTFLoader(manager).setMeshoptDecoder(MeshoptDecoder);const textures=new THREE.TextureLoader(manager);
 // Prepare the room first; the poster remains until the full composition is ready.
 // The avatar is the heaviest asset, so it queues behind the room instead of
 // competing for bandwidth with the scene the visitor is waiting to see.
 const roomFile=tracked('room',loader.loadAsync('/explore/assets/room-packed.glb?v=props9',bytes('room')));
 const turntableFile=tracked('turntable',loader.loadAsync('/explore/assets/turntable-packed.glb?v=turn1',bytes('turntable')));
 const avatarFile=tracked('avatar',roomFile.then(()=>loader.loadAsync(mobileHardware?'/explore/assets/avatar-v2-mobile-packed.glb?v=palm20':'/explore/assets/avatar-v2-packed.glb?v=palm20',bytes('avatar'))));
 const screenFile=tracked('screen',textures.loadAsync('/explore/assets/workbench-monitor.jpg'));
 const artFiles=[['/explore/assets/photography/p05_img1-cover.webp',-1.46],['/explore/assets/photography/p11_img1-cover.webp',-.58]].map(([url,z],i)=>tracked('art'+i,textures.loadAsync(url)).then(texture=>({texture,z})));

 const coverFile=tracked('cover',textures.loadAsync('/explore/assets/signals-artwork.jpg'));
 const sleeveFile=tracked('sleeve',textures.loadAsync('/images/yao-cover.jpg'));
 const gameFile=tracked('game',loader.loadAsync('/explore/assets/arcade-packed.glb?v=hyper3d2',bytes('game')));
 const gameScreenFile=tracked('gameScreen',textures.loadAsync('/images/bl-hero.jpg'));
 const creativePropsFile=Promise.all([sleeveFile,gameFile,gameScreenFile]).then(([sleeve,game,screen])=>createCreativeProps(scene,sleeve,game?.scene,screen));
 const room=await roomFile;
 scene.add(room.scene);const processed=new Set();room.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material]){if(processed.has(m))continue;processed.add(m);m.envMapIntensity=.22;if(m.name.includes("plaster"))m.color.multiplyScalar(.26);if(m.name.includes("stone"))m.color.multiplyScalar(.38);}}});

 // Move both baked gallery frames and their inserts along the left wall.
 room.scene.updateMatrixWorld(true);
 room.scene.traverse(o=>{if(!o.isMesh)return;const material=o.material?.name||'';
  if(!/aluminum|graphite/i.test(material))return;
  const positions=o.geometry.attributes.position;if(!positions)return;
  const inverse=o.matrixWorld.clone().invert(),point=new THREE.Vector3();
  for(let i=0;i<positions.count;i++){point.fromBufferAttribute(positions,i).applyMatrix4(o.matrixWorld);
   if(point.x> -3.50&&point.x< -3.43&&point.y>1.37&&point.y<2.55&&point.z> -1.83&&point.z< -.21){point.z+=.28;point.applyMatrix4(inverse);positions.setXYZ(i,point.x,point.y,point.z);}
  }
  positions.needsUpdate=true;o.geometry.computeBoundingBox();o.geometry.computeBoundingSphere();
 });

 // Extend the actual architectural shell beyond the authored furniture area.
 // The original room remains editable; these boxes avoid a cutaway silhouette.
 const plaster=[...processed].find(m=>m.name.includes('plaster'));
 const stone=[...processed].find(m=>m.name.includes('stone'));
 function shell(name,size,position,material){const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material);mesh.name=name;mesh.position.set(...position);mesh.receiveShadow=true;scene.add(mesh);}
 shell('Continuous floor',[18,.16,18],[0,-.091,1],stone);
 shell('Left wall continuation',[.15,7,7.45],[-3.58,3.5,5.275],plaster);
 shell('Left upper wall',[.15,3.4,4.1],[-3.58,5.3,-.5],plaster);
 shell('Upper rear wall',[7.2,3.4,.15],[0,5.3,-2.5],plaster);
 shell('Rear right continuation',[5.5,7,.15],[6.25,3.5,-2.5],plaster);
 // A short tilt hinge connects the stand column to the display back plate.
 const mountMaterial=new THREE.MeshStandardMaterial({color:0x202629,roughness:.68,metalness:.18});
 const mount=new THREE.Group();mount.name='monitor_mount';
 const columnTop=new THREE.Vector3(.3494,1.130,.8676),backPlate=new THREE.Vector3(.390,1.153,.885);
 const brace=new THREE.Mesh(new THREE.CylinderGeometry(.022,.025,columnTop.distanceTo(backPlate)+.018,16),mountMaterial);
 brace.position.copy(columnTop).add(backPlate).multiplyScalar(.5);brace.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),backPlate.clone().sub(columnTop).normalize());mount.add(brace);
 const plate=new THREE.Mesh(new THREE.BoxGeometry(.105,.100,.018),mountMaterial);plate.position.copy(backPlate);plate.rotation.y=110*Math.PI/180;mount.add(plate);
 mount.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.userData.item='finfold';}});scene.add(mount);
 lighting.register(room.scene);
 book=room.scene.getObjectByName('book_01');if(book){bookRest=book.position.clone();bookRestRotation=book.rotation.y;const center=new THREE.Box3().setFromObject(book).getCenter(new THREE.Vector3());anchors.books=center.toArray();}
 deskObjects=createDeskObjects(scene,room.scene,await coverFile);Object.assign(anchors,deskObjects.anchors);
 const screenMesh=room.scene.getObjectByName('monitor_screen');if(screenMesh)anchors.finfold=new THREE.Box3().setFromObject(screenMesh).getCenter(new THREE.Vector3()).toArray();

 if(!contextLost){root.dataset.interactiveMs=Math.round(performance.now());performance.mark('studio-interactive');sceneReady=true;emit('studio:ready');resume();}

 // Assemble detail assets behind the poster; failures retain navigation and the room.
 turntableFile.then(turntable=>{if(!turntable)return;turntable.scene.position.set(-1.96,.855,1.61);turntable.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.item='music';}});scene.add(turntable.scene);
 // Compression can shift mesh origins. Restore the authored mechanical pivots.
  function pivot(name,position){const mesh=turntable.scene.getObjectByName(name);if(!mesh)return null;const group=new THREE.Group();group.name=name+'_pivot';group.position.set(...position);mesh.parent.add(group);group.updateWorldMatrix(true,false);group.attach(mesh);return group;}
  record=pivot('record_disc',[-.075,.133,.012]);recordBaseY=record?.position.y||0;tonearm=pivot('tonearm',[.272,.143,-.164]);armBaseY=tonearm?.position.y||0;
 }).catch(error=>console.warn('Turntable unavailable',error));
 avatarFile.then(person=>{if(!person)return;avatar=person.scene;avatar.position.set(1.244,.5976,.177);avatar.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.item='about';if(o.morphTargetDictionary?.Typing_Left!==undefined)typingMeshes.push(o);for(const m of Array.isArray(o.material)?o.material:[o.material])m.envMapIntensity=.35;}});scene.add(avatar);
 const headSurface=avatar.getObjectByName('head_surface');headSurface?.traverse(mesh=>{if(!mesh.isMesh)return;mesh.material=mesh.material.clone();mesh.material.onBeforeCompile=shader=>{
 shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying float neckWorldY;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nneckWorldY=(modelMatrix*vec4(transformed,1.0)).y;');
 shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float neckWorldY;').replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb=mix(vec3(0.46,0.29,0.18),diffuseColor.rgb,smoothstep(1.235,1.275,neckWorldY));');
 };mesh.material.customProgramCacheKey=()=> 'neck-skin-transition-v1';});
 avatarMotion=createAvatarMotion(avatar);}).catch(error=>console.warn('Avatar unavailable',error));
 screenFile.then(texture=>{if(!texture)return;const screen=room.scene.getObjectByName('monitor_screen');if(!screen)return;texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;applyMonitorImage(screen,texture);});
 Promise.all(artFiles).then(items=>{for(const {texture,z} of items){if(!texture)continue;texture.colorSpace=THREE.SRGBColorSpace;const ratio=texture.image.width/texture.image.height;const w=Math.min(.65,1.08*ratio),h=w/ratio;const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,roughness:.85,envMapIntensity:.1}));art.name='photography_artwork';art.userData.item='photography';art.rotation.y=Math.PI/2;art.position.set(-3.44,1.96,z+.28);scene.add(art);}}).catch(error=>console.warn('Artwork unavailable',error));
 await Promise.all([roomFile,turntableFile,avatarFile,screenFile,coverFile,sleeveFile,gameFile,gameScreenFile,creativePropsFile,...artFiles]);
 if(!contextLost){renderer.render(scene,camera);emit('studio:complete',{degraded});}
}catch(error){console.error('Studio unavailable',error);dispose();emit('studio:failure');}
