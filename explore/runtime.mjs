import {createCreativeProps} from './creative-props.mjs?v=20260927-shelf7';
import {createLighting} from './lighting.mjs?v=20260929-p2fix1';
import {shouldRender,isIdle,qualityProfile,advanceQuality} from './performance.mjs?v=20260929-perf1';
import {bakedScales,lightmapUrls,patchLightChunks} from './baked-light.mjs?v=20260929-baked1';
import {createSkyline} from './skyline.mjs?v=20260929-skyline1';
import {createAvatarMotion} from './avatar-motion.mjs?v=20260927-palm20';
import {createDeskObjects} from './desk-objects.mjs?v=20260927-curated1';
import {applyMonitorImage} from './screen-material.mjs?v=20260929-p2fix1';
import * as THREE from 'three';
import {moveView,viewOffset,wheelTurn} from './camera-control.mjs?v=20260927-wheel1';
let view={x:0,y:0},savedView=null,hovered=null,deskObjects=null,workEye=null;
let workMix=0,workGoal=0;
window.addEventListener('studio:work-transition',e=>{workGoal=e.detail?.phase==='enter'?1:0;markInput(true)});
function resetView(){view={x:0,y:0};cameraPose();}
window.addEventListener('studio:reset-view',resetView);
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {KTX2Loader} from './vendor/loaders/KTX2Loader.js?v=20260929-ktx1';
import {MeshoptDecoder} from './vendor/meshopt_decoder.mjs?v=20260927-2';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
const root=document.querySelector('#scene-root');
const emit=(name,detail={})=>window.dispatchEvent(new CustomEvent(name,{detail}));
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const anchors={finfold:[-.4443,1.25,1.3311],music:[-2,1,1.6],books:[-2.4,1.9,-2.05],about:[1.61,1.14,.20],photography:[-3.43,1.96,-.30],writing:[.72,.849,1.07],work:[1.08,.849,1.36],games:[-2.65,.84,-1.40]};
let renderer,scene,camera,raf=0,selected=null,disposed=false,sceneReady=false,contextLost=false,last=0,record=null,recordBaseY=0,tonearm=null,armBaseY=0,avatar=null,book=null,bookRest=null,bookRestRotation=0;
const neckNightMix={value:1};
const typingMeshes=[];let avatarMotion=null,lighting=null,skyline=null;
const target=new THREE.Vector3(),desired=new THREE.Vector3(),look=new THREE.Vector3(),desiredLook=new THREE.Vector3();
const clock=new THREE.Clock();
// A close three-quarter shot of Joey at the desk, clear of the monitor and lamp.
const focusShots={about:{eye:[.5,1.62,2.8],look:[1.22,1.16,.3]}};
// Right-docked panels: shift the lens so the chosen object sits centred in the space left of the panel.
const framedItems=new Set(['about','finfold','games']);let panelLeft=null,lensShift=0;
window.addEventListener('studio:frame',e=>{panelLeft=e.detail?.left??null});
let sampleStart=0,sampleFrames=0,lastRender=-Infinity,lastInput=performance.now(),forceFrame=true,idleMode=false,lastProbe=0,probeUntil=0,lensMovement=0;
const requestedQuality=new URLSearchParams(location.search).get('quality'),forcedQuality=['low','high'].includes(requestedQuality)?requestedQuality:null;let quality={level:0,low:0,high:0};
const hotspotCache=new Map(),hotspots=document.querySelector('.hotspots');
function refreshHotspots(){hotspotCache.clear();for(const b of hotspots.querySelectorAll('[data-object]'))hotspotCache.set(b.dataset.object,{button:b,position:''});}
refreshHotspots();new MutationObserver(refreshHotspots).observe(hotspots,{childList:true,subtree:true});window.addEventListener('studio:language',refreshHotspots);
function markInput(force=false){lastInput=performance.now();if(force||idleMode)forceFrame=true;}
for(const type of ['pointermove','wheel'])window.addEventListener(type,()=>markInput(),{passive:true});
for(const type of ['pointerdown','keydown','focusin'])window.addEventListener(type,()=>markInput(true),{passive:true});
function applyQuality(){const mobile=root.clientWidth<700,max=mobile?2:4;if(forcedQuality==='low')quality.level=max;else if(forcedQuality==='high')quality.level=0;else quality.level=Math.min(quality.level,max);const profile=qualityProfile(quality.level,mobile);renderer.setPixelRatio(Math.min(devicePixelRatio,profile.ratio));lighting?.setShadowQuality(profile.shadowSize,profile.shadowUpdates);root.dataset.quality=String(quality.level);}

function cameraPose(){
 const mobile=root.clientWidth<700;
 desired.set(...(mobile?[.78,2,5.8]:[.44,1.78,4.48]));
 desiredLook.set(...(mobile?[.83,1.12,.6]:[-.04,1.16,.7]));
 if(root.dataset.reviewView){const views={side:[[3.8,1.6,.3],[.6,1,.65]],top:[[.6,5,.701],[.6,.8,.7]],hands:[[2.0,1.5,2.3],[.85,.86,.52]]};const v=views[root.dataset.reviewView];if(v){desired.set(...v[0]);desiredLook.set(...v[1]);}}
 if(!root.dataset.reviewView){
  const offset=viewOffset(view,mobile),orbit=new THREE.Spherical().setFromVector3(desired.clone().sub(desiredLook));
  orbit.theta+=offset.yaw;orbit.phi+=offset.pitch;desired.copy(desiredLook).add(new THREE.Vector3().setFromSpherical(orbit));
  desired.x+=offset.pan;desiredLook.x+=offset.pan;
  root.dataset.viewX=view.x.toFixed(2);root.dataset.viewY=view.y.toFixed(2);emit('studio:view',{moved:Math.abs(view.x)+Math.abs(view.y)>.01});
 }
 if(selected&&selected!=='work'&&anchors[selected]&&!reduced.matches){
  const a=new THREE.Vector3(...anchors[selected]);
  if(selected==='about'){desired.set(...focusShots.about.eye);desiredLook.set(...focusShots.about.look);}
  else if(['writing','photography'].includes(selected)){desired.lerp(a.clone().add(new THREE.Vector3(.15,1.35,2.25)),.28);desiredLook.lerp(a,.22);}
  else{desired.lerp(a.clone().add(new THREE.Vector3(3,1.6,4)),.35);desiredLook.lerp(a,.32);}
 }
 if(workMix>.001&&!reduced.matches){const screen=new THREE.Vector3(...anchors.finfold),eye=workEye||screen.clone().add(new THREE.Vector3(0,0,1));desired.lerp(eye,workMix);desiredLook.lerp(screen,workMix)}
}
function resize(){if(!renderer)return;const w=root.clientWidth,h=root.clientHeight;camera.aspect=w/h;camera.fov=w<700?47:43;camera.updateProjectionMatrix();applyQuality();renderer.setSize(w,h,false);cameraPose();markInput(true);}
function frame(ms=0){
 raf=0;if(disposed||contextLost||document.hidden)return;
 const transitioning=!!(Math.abs(workMix-workGoal)>.005||lensMovement>.005||record&&Math.abs(record.position.y-(recordBaseY+(selected==='music'?.12:0)))>.005||tonearm&&Math.abs(tonearm.rotation.y-(selected==='music'?.58:0))>.005||book&&Math.abs(book.position.z-(bookRest.z+(selected==='books'?.22:0)))>.005);
 let idle=isIdle({now:ms,lastInput,cameraDistance:camera.position.distanceTo(desired),lookDistance:look.distanceTo(desiredLook),transitioning,lightMix:lighting?.mix??1});
 if(!forcedQuality&&quality.level>0&&idle&&ms-lastProbe>=45000){lastProbe=ms;probeUntil=ms+6500;}if(ms<probeUntil)idle=false;
 if(idle!==idleMode){idleMode=idle;sampleStart=ms;sampleFrames=0;}
 if(!shouldRender(ms,lastRender,idle,forceFrame)){raf=requestAnimationFrame(frame);return;}forceFrame=false;lastRender=ms;
 const dt=Math.min((ms-last)/1000||.016,.05);last=ms;lighting?.update(document.documentElement.dataset.lightMode==='day',dt,reduced.matches);skyline?.update(lighting?.mix??1,ms/1000,reduced.matches);const damping=reduced.matches?1:1-Math.exp(-dt*5);if(Math.abs(workMix-workGoal)>.001){workMix=THREE.MathUtils.lerp(workMix,workGoal,1-Math.exp(-dt*4.6));cameraPose()}camera.position.lerp(desired,damping);look.lerp(desiredLook,damping);camera.lookAt(look);frameSelection(damping);
 if(tonearm){const armOpen=selected==='music'||(record&&record.position.y-recordBaseY>.006);tonearm.rotation.y=THREE.MathUtils.lerp(tonearm.rotation.y,armOpen?.58:0,damping);tonearm.position.y=THREE.MathUtils.lerp(tonearm.position.y,armBaseY+(armOpen||tonearm.rotation.y>.02?.02:0),damping);}if(record){const lift=selected==='music'&&(!tonearm||tonearm.rotation.y>.3)?.12:0;record.position.y=THREE.MathUtils.lerp(record.position.y,recordBaseY+lift,damping);}if(book){book.position.z=THREE.MathUtils.lerp(book.position.z,bookRest.z+(selected==='books'?.22:0),damping);book.rotation.y=THREE.MathUtils.lerp(book.rotation.y,bookRestRotation+(selected==='books'?-.14:0),damping);}deskObjects?.update(selected,hovered,damping,reduced.matches);
 neckNightMix.value=1-(lighting?.mix??0);
 if(avatar){const t=clock.getElapsedTime();avatar.scale.y=reduced.matches?1:1+Math.sin(t*1.4)*.001;const pose=avatarMotion.update(t,damping,reduced.matches||!!selected);for(const hand of typingMeshes){hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Left]=pose.left;hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Right]=pose.right;root.dataset.typingLeft=hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Left].toFixed(3);root.dataset.typingRight=hand.morphTargetInfluences[hand.morphTargetDictionary.Typing_Right].toFixed(3);}}
 renderer.render(scene,camera);if(!root.dataset.firstFrameMs)root.dataset.firstFrameMs=Math.round(performance.now());
 if(!sampleStart)sampleStart=ms;sampleFrames++;if(ms-sampleStart>=2000){const fps=sampleFrames*1000/(ms-sampleStart);root.dataset.sampleFps=fps.toFixed(1);root.dataset.drawCalls=renderer.info.render.calls;root.dataset.triangles=renderer.info.render.triangles;if(!forcedQuality){const next=advanceQuality(quality,fps,root.clientWidth<700?2:4,!idle);if(next.level!==quality.level){quality=next;applyQuality();renderer.setSize(root.clientWidth,root.clientHeight,false);markInput();}else quality=next;}sampleStart=ms;sampleFrames=0;}
 const w=root.clientWidth,h=root.clientHeight;for(const [id,p] of Object.entries(anchors)){const entry=hotspotCache.get(id);if(!entry)continue;const button=entry.button;target.set(...p).project(camera);const visible=target.z<=1&&Math.abs(target.x)<=.96&&Math.abs(target.y)<=.86;if(button.hidden)button.hidden=false;if(button.dataset.visible!==String(visible)){button.dataset.visible=String(visible);button.tabIndex=visible?0:-1;button.setAttribute('aria-hidden',String(!visible));if(!visible&&document.activeElement===button)button.blur();}const position=`translate3d(${Math.round((target.x*.5+.5)*w*2)/2}px,${Math.round((-target.y*.5+.5)*h*2)/2}px,0) translate(-50%,-50%)`;if(entry.position!==position){button.style.transform=position;entry.position=position;}}
 raf=requestAnimationFrame(frame);
}
function frameSelection(damping){
 const w=root.clientWidth,h=root.clientHeight;let goal=0;
 if(panelLeft&&w>=700&&framedItems.has(selected)&&anchors[selected]){camera.updateMatrixWorld();target.set(...(focusShots[selected]?.look||anchors[selected])).project(camera);goal=Math.max(0,Math.min(w*.35,(target.x*.5+.5)*w+lensShift-panelLeft/2));}
 const previous=lensShift;lensShift+=(goal-lensShift)*damping;if(!goal&&lensShift<.5)lensShift=0;lensMovement=Math.abs(lensShift-previous);
 if(lensShift)camera.setViewOffset(w,h,lensShift,0,w,h);else if(camera.view?.enabled)camera.clearViewOffset();
}
function resume(){if(!raf&&!disposed&&!contextLost&&sceneReady){last=performance.now();lastInput=last;lastRender=-Infinity;sampleStart=0;sampleFrames=0;idleMode=false;forceFrame=true;raf=requestAnimationFrame(frame)}}
function stop(){cancelAnimationFrame(raf);raf=0;}
function dispose(){disposed=true;stop();scene?.traverse(o=>{o.geometry?.dispose();for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose()}});renderer?.dispose();}
window.addEventListener('studio:select',e=>{const next=e.detail?.id||null;if(next&&!selected)savedView={...view};if(!next&&savedView){view=savedView;savedView=null;}selected=next;cameraPose();markInput(true)});
window.addEventListener('studio:lighting',()=>{markInput(true);if(renderer)renderer.shadowMap.needsUpdate=true;});
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
 const pmrem=new THREE.PMREMGenerator(renderer);const env=new RoomEnvironment();scene.environment=pmrem.fromScene(env,.04).texture;env.dispose();pmrem.dispose();lighting=createLighting(scene,renderer,mobileHardware,document.documentElement.dataset.lightMode==='day');skyline=createSkyline(scene,{mobile:mobileHardware,day:lighting.mix});resize();camera.position.copy(desired);look.copy(desiredLook);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;stop();emit('studio:failure')});renderer.domElement.addEventListener('webglcontextrestored',()=>location.reload());
 const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();let down=null,lastHover=0;
 const canvas=renderer.domElement;
 canvas.tabIndex=0;canvas.removeAttribute('aria-hidden');canvas.setAttribute('role','region');
 let viewMovingTimer;const showMovingLabels=()=>{document.body.dataset.viewMoving='true';clearTimeout(viewMovingTimer);viewMovingTimer=setTimeout(()=>delete document.body.dataset.viewMoving,650);};
 const label=()=>canvas.setAttribute('aria-label',document.documentElement.lang==='zh'?'工作室视角：拖动、滚轮或方向键环视，Home 键复位':'Studio view: drag, scroll, or use arrow keys to look around; Home resets');label();window.addEventListener('studio:language',label);
 root.closest('#studio').addEventListener('wheel',e=>{
  if(selected||e.ctrlKey||e.target.closest('#content-panel'))return;
  const turn=wheelTurn(e.deltaX,e.deltaY,e.deltaMode,root.clientHeight);
  if(!turn)return;
  e.preventDefault();showMovingLabels();view=moveView(view,turn,0);cameraPose();
 },{passive:false});
 canvas.addEventListener('pointerdown',e=>{if(selected||e.button!==0||down)return;down={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,moved:false};canvas.setPointerCapture(e.pointerId);canvas.classList.add('dragging');});
 canvas.addEventListener('pointerleave',()=>{hovered=null;canvas.style.cursor='';});
 canvas.addEventListener('pointermove',e=>{if(!down){if(selected||e.pointerType==='touch'||performance.now()-lastHover<45)return;lastHover=performance.now();const r=root.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(scene.children,true)[0];hovered=hit?.object.userData.item||null;canvas.style.cursor=hovered?'pointer':'';return;}if(e.pointerId!==down.id)return;if(Math.hypot(e.clientX-down.x,e.clientY-down.y)>8)down.moved=true;if(down.moved){showMovingLabels();view=moveView(view,-(e.clientX-down.lastX)/root.clientWidth*3,-(e.clientY-down.lastY)/root.clientHeight*3);cameraPose();}down.lastX=e.clientX;down.lastY=e.clientY;});
 const release=()=>{if(down&&canvas.hasPointerCapture(down.id))canvas.releasePointerCapture(down.id);down=null;canvas.classList.remove('dragging');};
 canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',()=>{down=null;canvas.classList.remove('dragging');});
 canvas.addEventListener('pointerup',e=>{if(!down||e.pointerId!==down.id)return;const moved=down.moved;release();if(moved||selected)return;const r=root.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(scene.children,true)[0];if(!hit)return;const n=hit.object.name.toLowerCase();const id=hit.object.userData.item|| (n.includes('monitor')?'work':n.includes('book')?'books':n.includes('record')?'music':n.includes('avatar')?'about':n.includes('artwork')?'photography':null);if(id)emit('studio:pick',{id});});
 canvas.addEventListener('keydown',e=>{if(selected)return;const step={ArrowLeft:[-.18,0],ArrowRight:[.18,0],ArrowUp:[0,-.18],ArrowDown:[0,.18]}[e.key];if(step){e.preventDefault();view=moveView(view,...step);cameraPose();}else if(e.key==='Home'){e.preventDefault();resetView();}});
 const manager=new THREE.LoadingManager();
 const weights={room:33,'lightmap-night':2,'lightmap-day':2,avatar:38,turntable:10,screen:4,art0:3,art1:3,cover:1,sleeve:1,game:2,gameScreen:1};
 const progress={};let degraded=false;
 function report(key,value){progress[key]=Math.max(progress[key]||0,value);emit('studio:progress',{percent:Object.entries(weights).reduce((sum,[k,w])=>sum+w*(progress[k]||0),0)});}
 const bytes=key=>event=>{if(event.lengthComputable&&event.total)report(key,Math.min(.9,event.loaded/event.total*.9));};
 function tracked(key,promise){return promise.then(value=>{report(key,1);return value},error=>{degraded=true;report(key,1);if(key==='room')throw error;console.warn(key+' unavailable',error);return null;});}
 const ktx2=new KTX2Loader(manager).setTranscoderPath('/explore/vendor/basis/').detectSupport(renderer);
 const loader=new GLTFLoader(manager).setMeshoptDecoder(MeshoptDecoder).setKTX2Loader(ktx2);const textures=new THREE.TextureLoader(manager);
 // Prepare the room first; the poster remains until the full composition is ready.
 // The avatar is the heaviest asset, so it queues behind the room instead of
 // competing for bandwidth with the scene the visitor is waiting to see.
 const roomFile=tracked('room',loader.loadAsync('/explore/assets/room-lit-packed-ktx2.glb?v=20260929-ktx1',bytes('room')));
 // Without both lightmaps the room simply keeps the realtime rig.
 const lightmapPaths=lightmapUrls(mobileHardware),lightmapFiles=Promise.all(['night','day'].map(mode=>tracked('lightmap-'+mode,textures.loadAsync(lightmapPaths[mode]))));
 const turntableFile=tracked('turntable',loader.loadAsync('/explore/assets/turntable-packed-ktx2.glb?v=20260929-ktx1',bytes('turntable')));
 const avatarFile=tracked('avatar',roomFile.then(()=>loader.loadAsync(mobileHardware?'/explore/assets/avatar-v2-mobile-packed-ktx2.glb?v=20260929-ktx1':'/explore/assets/avatar-v2-packed-ktx2.glb?v=20260929-ktx1',bytes('avatar'))));
 const screenFile=tracked('screen',textures.loadAsync('/explore/assets/workbench-monitor.jpg'));
 const artFiles=[['/explore/assets/photography/p05_img1-cover.webp',-1.46],['/explore/assets/photography/p11_img1-cover.webp',-.58]].map(([url,z],i)=>tracked('art'+i,textures.loadAsync(url)).then(texture=>({texture,z})));

 const coverFile=tracked('cover',textures.loadAsync('/explore/assets/signals-artwork.jpg'));
 const sleeveFile=tracked('sleeve',textures.loadAsync('/images/yao-cover.jpg'));
 const gameFile=tracked('game',loader.loadAsync('/explore/assets/arcade-packed-ktx2.glb?v=20260929-ktx1',bytes('game')));
 const gameScreenFile=tracked('gameScreen',textures.loadAsync('/images/bl-hero.jpg'));
 const creativePropsFile=Promise.all([sleeveFile,gameFile,gameScreenFile]).then(([sleeve,game,screen])=>createCreativeProps(scene,sleeve,game?.scene,screen));
 const room=await roomFile;
 scene.add(room.scene);const processed=new Set();room.scene.traverse(o=>{if(o.isMesh){o.castShadow=o.userData.castShadow!==false;o.receiveShadow=true;for(const m of Array.isArray(o.material)?o.material:[o.material]){if(processed.has(m))continue;processed.add(m);m.envMapIntensity=.22;if(m.name.includes("plaster"))m.color.multiplyScalar(.26);if(m.name.includes("stone"))m.color.multiplyScalar(.38);}}});

 // A short tilt hinge connects the stand column to the display back plate.
 const mountMaterial=new THREE.MeshStandardMaterial({color:0x202629,roughness:.68,metalness:.18});
 const mount=new THREE.Group();mount.name='monitor_mount';
 const columnTop=new THREE.Vector3(.3494,1.130,.8676),backPlate=new THREE.Vector3(.390,1.153,.885);
 const brace=new THREE.Mesh(new THREE.CylinderGeometry(.022,.025,columnTop.distanceTo(backPlate)+.018,16),mountMaterial);
 brace.position.copy(columnTop).add(backPlate).multiplyScalar(.5);brace.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),backPlate.clone().sub(columnTop).normalize());mount.add(brace);
 const plate=new THREE.Mesh(new THREE.BoxGeometry(.105,.100,.018),mountMaterial);plate.position.copy(backPlate);plate.rotation.y=110*Math.PI/180;mount.add(plate);
 mount.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;o.userData.item='work';}});scene.add(mount);
 const [lightmapNight,lightmapDay]=await lightmapFiles;
 if(lighting.bake(room.scene,{night:lightmapNight,day:lightmapDay},bakedScales,patchLightChunks(THREE.ShaderChunk.lights_fragment_begin,THREE.ShaderChunk.lights_fragment_maps)))root.dataset.lighting='baked';
 lighting.register(room.scene);
 // The fluted glazing was modelled opaque; let the skyline read through it with only a smoked tint on the ribs.
 room.scene.traverse(o=>{if(o.material?.name==='Blue smoked fluted glazing')Object.assign(o.material,{transparent:true,opacity:.08,depthWrite:false,side:THREE.FrontSide})});
 book=room.scene.getObjectByName('book_01');if(book){bookRest=book.position.clone();bookRestRotation=book.rotation.y;const center=new THREE.Box3().setFromObject(book).getCenter(new THREE.Vector3());anchors.books=center.toArray();}
 deskObjects=createDeskObjects(scene,room.scene,await coverFile);Object.assign(anchors,deskObjects.anchors);
 const screenMesh=room.scene.getObjectByName('monitor_screen');if(screenMesh){anchors.finfold=new THREE.Box3().setFromObject(screenMesh).getCenter(new THREE.Vector3()).toArray();screenMesh.updateWorldMatrix(true,false);const normal=screenMesh.geometry?.getAttribute('normal'),facing=normal?new THREE.Vector3(normal.getX(0),normal.getY(0),normal.getZ(0)):new THREE.Vector3(0,0,1);facing.applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(screenMesh.matrixWorld)).normalize();workEye=new THREE.Vector3(...anchors.finfold).addScaledVector(facing,1.02).add(new THREE.Vector3(0,.04,0));}

 if(!contextLost){root.dataset.interactiveMs=Math.round(performance.now());performance.mark('studio-interactive');sceneReady=true;emit('studio:ready');resume();}

 // Assemble detail assets behind the poster; failures retain navigation and the room.
 turntableFile.then(turntable=>{if(!turntable)return;turntable.scene.position.set(-1.96,.855,1.61);turntable.scene.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.item='music';}});scene.add(turntable.scene);
 // Compression can shift mesh origins. Restore the authored mechanical pivots.
  function pivot(name,position){const mesh=turntable.scene.getObjectByName(name);if(!mesh)return null;const group=new THREE.Group();group.name=name+'_pivot';group.position.set(...position);mesh.parent.add(group);group.updateWorldMatrix(true,false);group.attach(mesh);return group;}
  record=pivot('record_disc',[-.075,.133,.012]);recordBaseY=record?.position.y||0;tonearm=pivot('tonearm',[.272,.143,-.164]);armBaseY=tonearm?.position.y||0;
 }).catch(error=>console.warn('Turntable unavailable',error));
 avatarFile.then(person=>{if(!person)return;avatar=person.scene;avatar.position.set(1.244,.5976,.177);avatar.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;o.userData.item='about';if(o.morphTargetDictionary?.Typing_Left!==undefined)typingMeshes.push(o);for(const m of Array.isArray(o.material)?o.material:[o.material])m.envMapIntensity=.35;}});scene.add(avatar);
 const headSurface=avatar.getObjectByName('head_surface');headSurface?.traverse(mesh=>{if(!mesh.isMesh)return;mesh.material=mesh.material.clone();mesh.material.onBeforeCompile=shader=>{
 shader.uniforms.neckNightMix=neckNightMix;
 shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying float neckWorldY;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nneckWorldY=(modelMatrix*vec4(transformed,1.0)).y;');
 shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying float neckWorldY;\nuniform float neckNightMix;').replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb=mix(vec3(0.46,0.29,0.18),diffuseColor.rgb,smoothstep(1.235,1.275,neckWorldY));');
 // The extended neck has steep normal changes: soften its lighting locally,
 // fading out below the jaw so facial detail and the room lighting stay intact.
 shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>', 'float neckSoftness=1.0-smoothstep(1.215,1.275,neckWorldY);\noutgoingLight=mix(outgoingLight,diffuseColor.rgb*0.32,neckSoftness*0.68*neckNightMix);\n#include <opaque_fragment>');
 };mesh.material.customProgramCacheKey=()=> 'neck-skin-transition-v2';});
 avatarMotion=createAvatarMotion(avatar);}).catch(error=>console.warn('Avatar unavailable',error));
 screenFile.then(texture=>{if(!texture)return;const screen=room.scene.getObjectByName('monitor_screen');if(!screen)return;texture.colorSpace=THREE.SRGBColorSpace;texture.flipY=false;applyMonitorImage(screen,texture);});
 Promise.all(artFiles).then(items=>{for(const {texture,z} of items){if(!texture)continue;texture.colorSpace=THREE.SRGBColorSpace;const ratio=texture.image.width/texture.image.height;const w=Math.min(.65,1.08*ratio),h=w/ratio;const art=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:texture,roughness:.85,envMapIntensity:.1}));art.name='photography_artwork';art.userData.item='photography';art.rotation.y=Math.PI/2;art.position.set(-3.44,1.96,z+.28);scene.add(art);}}).catch(error=>console.warn('Artwork unavailable',error));
 await Promise.all([roomFile,turntableFile,avatarFile,screenFile,coverFile,sleeveFile,gameFile,gameScreenFile,creativePropsFile,...artFiles]);
 if(!contextLost){lighting.refreshShadows();renderer.render(scene,camera);emit('studio:complete',{degraded});}
}catch(error){console.error('Studio unavailable',error);dispose();emit('studio:failure');}
