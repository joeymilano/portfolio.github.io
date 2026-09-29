import * as THREE from 'three';

// Lujiazui seen from a high floor across the river, in three layers behind the window so orbiting
// the desk reveals real parallax. Each layer texture packs coverage (R), facade shade (G) and window
// lights (B); one small shader derives day and night from those masks, so the mode switch costs no
// extra textures. Units are scene metres on each layer's plane; everything is seeded and repeatable.

const skyVertex='varying vec3 vWorld;void main(){vec4 w=modelMatrix*vec4(position,1.);vWorld=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}';
const skyFragment=`uniform float day;uniform vec3 dayTop,dayHorizon,nightTop,nightHorizon;varying vec3 vWorld;
void main(){float t=smoothstep(.2,7.5,vWorld.y);vec3 horizon=mix(nightHorizon,dayHorizon,day),top=mix(nightTop,dayTop,day);
vec3 color=mix(horizon,top,sqrt(t));color+=horizon*.35*exp(-abs(vWorld.y-1.1)*1.4);gl_FragColor=vec4(color,1.);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;
const layerVertex='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}';
const layerFragment=`uniform sampler2D map;uniform float day,haze;uniform vec3 dayColor,nightColor,dayHaze,nightHaze,lightColor;varying vec2 vUv;
void main(){vec4 t=texture2D(map,vUv);if(t.r<.02)discard;
vec3 color=mix(nightColor,dayColor,day)*(.55+.7*t.g);color=mix(color,mix(nightHaze,dayHaze,day),haze);
color+=lightColor*t.b*(1.-day)*1.15+vec3(.85,.92,1.)*t.b*day*.07;gl_FragColor=vec4(color,t.r);
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`;

function seeded(seed){return ()=>((seed=(seed*16807)%2147483647)-1)/2147483646}

// Three grayscale canvases painted in lockstep; a later building hides the lights of the ones behind it.
function painter(width,height,bounds){
 const make=()=>{const c=document.createElement('canvas');c.width=width;c.height=height;const g=c.getContext('2d');g.fillStyle='#000';g.fillRect(0,0,width,height);return g};
 const cov=make(),shade=make(),lights=make(),all=[cov,shade,lights];
 const sx=width/(bounds.right-bounds.left),sy=height/(bounds.top-bounds.bottom);
 const px=x=>(x-bounds.left)*sx,py=y=>(bounds.top-y)*sy,grey=v=>{const n=Math.round(Math.max(0,Math.min(1,v))*255);return `rgb(${n},${n},${n})`};
 function path(g,points){g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(px(x),py(y)):g.moveTo(px(x),py(y)));g.closePath()}
 return {
  // Fill a polygon with one shade; `cut` punches through every channel (the World Financial Center aperture).
  shape(points,value,{cut=false}={}){for(const g of all){g.globalCompositeOperation=cut?'destination-out':'source-over';path(g,points);g.fillStyle=cut?'#000':g===cov?'#fff':g===shade?grey(value):'#000';g.fill();g.globalCompositeOperation='source-over'}},
  circle(x,y,r,value){for(const g of all){g.beginPath();g.arc(px(x),py(y),r*sx,0,Math.PI*2);g.fillStyle=g===cov?'#fff':g===shade?grey(value):'#000';g.fill()}},
  box(left,bottom,w,h,value){this.shape([[left,bottom],[left+w,bottom],[left+w,bottom+h],[left,bottom+h]],value)},
  // Lit floors clipped to a polygon: runs of office light along each storey, not a dot grid.
  // `lit` is the share of each floor switched on at night.
  windows(points,{rows=.03,lit=.35,random}){
   const g=lights;g.save();path(g,points);g.clip();
   const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),h=Math.max(1,rows*sy*.42),right=Math.max(...xs);
   for(let y=Math.min(...ys)+rows;y<Math.max(...ys)-rows*.4;y+=rows)for(let x=Math.min(...xs);x<right;){const run=.02+random()*.14;if(random()<lit){g.fillStyle=grey(.3+random()*.6);g.fillRect(px(x),py(y),run*sx,h)}x+=run+.004}
   g.restore();
  },
  lightsLine(x0,y0,x1,y1,value,widthM){lights.strokeStyle=grey(value);lights.lineWidth=Math.max(1,widthM*sx);lights.beginPath();lights.moveTo(px(x0),py(y0));lights.lineTo(px(x1),py(y1));lights.stroke()},
  texture(){
   const out=document.createElement('canvas');out.width=width;out.height=height;const o=out.getContext('2d');
   const a=cov.getImageData(0,0,width,height).data,b=shade.getImageData(0,0,width,height).data,c=lights.getImageData(0,0,width,height).data,image=o.createImageData(width,height),d=image.data;
   for(let i=0;i<d.length;i+=4){d[i]=a[i];d[i+1]=b[i];d[i+2]=c[i];d[i+3]=255}
   o.putImageData(image,0,0);const texture=new THREE.CanvasTexture(out);texture.colorSpace=THREE.NoColorSpace;return texture;
  }
 };
}

// A plain tower with a lit and a shaded face, optionally stepped back near the top.
function tower(p,random,x,base,w,h,{lit=.35,setback=0,rows=.03}={}){
 const split=x+w*(.55+random()*.2),light=.55+random()*.3,dark=light*.55;
 const top=base+h,step=setback?top-h*setback:top;
 const outline=setback?[[x,base],[x+w,base],[x+w,step],[x+w*.82,step],[x+w*.82,top],[x+w*.18,top],[x+w*.18,step],[x,step]]:[[x,base],[x+w,base],[x+w,top],[x,top]];
 p.shape(outline,light);p.shape([[split,base],[x+w,base],[x+w,Math.min(step,top)],[split,Math.min(step,top)]],dark);
 p.windows(outline,{random,lit:lit*(.2+random()*1.3),rows});
 return top;
}

function landmarks(p,random,horizon,beacons,accents){
 // Oriental Pearl Tower: tripod legs, two spheres on a column, then the mast.
 const pearl=1.55,s1=horizon+.78,s2=horizon+1.72;
 for(const dx of [-.19,.19])p.shape([[pearl+dx-.03,horizon-.2],[pearl+dx+.03,horizon-.2],[pearl+dx*.2+.02,s1],[pearl+dx*.2-.02,s1]],.7);
 p.shape([[pearl-.035,horizon-.2],[pearl+.035,horizon-.2],[pearl+.03,s2+.4],[pearl-.03,s2+.4]],.8);
 p.circle(pearl,s1,.2,.85);p.circle(pearl,s2,.13,.85);p.circle(pearl,s2+.48,.05,.85);
 p.shape([[pearl-.012,s2+.4],[pearl+.012,s2+.4],[pearl+.004,horizon+2.5],[pearl-.004,horizon+2.5]],.8);
 p.lightsLine(pearl,horizon,pearl,s2+.4,.5,.01);
 accents.push([pearl,s1,0xff4f9d,.9],[pearl,s2,0xff62b0,.62],[pearl,s2+.48,0xff8cc6,.3]);beacons.push([pearl,horizon+2.5]);
 // Jin Mao: a tapering pagoda of setbacks.
 const jm=3.05;let y=horizon-.3,half=.19;
 for(let i=0;i<11;i++){const h=i<6?.26:.16;p.shape([[jm-half,y],[jm+half,y],[jm+half*.93,y+h],[jm-half*.93,y+h]],.62+i*.02);p.shape([[jm+half*.2,y],[jm+half,y],[jm+half*.93,y+h],[jm+half*.2,y+h]],.4);p.windows([[jm-half,y],[jm+half,y],[jm+half,y+h],[jm-half,y+h]],{random,lit:.3,rows:.03});y+=h;half*=i<6?.95:.85}
 p.shape([[jm-.01,y],[jm+.01,y],[jm+.002,horizon+2.25],[jm-.002,horizon+2.25]],.7);accents.push([jm,y-.1,0xffc978,.42]);beacons.push([jm,horizon+2.25]);
 // Shanghai World Financial Center: tapered prism with the trapezoid aperture.
 const wf=3.62,wfTop=horizon+2.55,wfOutline=[[wf-.24,horizon-.3],[wf+.24,horizon-.3],[wf+.1,wfTop],[wf-.1,wfTop]];
 p.shape(wfOutline,.72);p.shape([[wf+.02,horizon-.3],[wf+.24,horizon-.3],[wf+.1,wfTop],[wf+.02,wfTop]],.42);p.windows(wfOutline,{random,lit:.3,rows:.028});
 p.shape([[wf-.075,wfTop-.28],[wf+.075,wfTop-.28],[wf+.055,wfTop-.07],[wf-.055,wfTop-.07]],0,{cut:true});
 p.lightsLine(wf-.1,wfTop,wf+.1,wfTop,.9,.012);accents.push([wf,wfTop-.18,0x8fc8ff,.36]);beacons.push([wf-.08,wfTop],[wf+.08,wfTop]);
 // Shanghai Tower: a twisting taper; the lit edge spirals up one side and the crown flares.
 const st=4.3,stTop=horizon+3.25,left=[],right=[];
 for(let i=0;i<=24;i++){const t=i/24,yy=horizon-.3+t*(stTop-horizon+.3),w=.3*(1-t*.62)+.03*Math.sin(t*Math.PI);left.push([st-w+.05*t,yy]);right.push([st+w*.92-.02*t,yy])}
 const stOutline=[...left,...right.reverse()];p.shape(stOutline,.78);
 const edge=[];for(let i=0;i<=24;i++){const t=i/24,yy=horizon-.3+t*(stTop-horizon+.3),w=.3*(1-t*.62);edge.push([st+w*(.15-.9*Math.sin(t*1.9)),yy])}
 p.shape([...edge,...left.slice().reverse().map(([x,yy])=>[x,yy])],.48);p.windows(stOutline,{random,lit:.34,rows:.026});
 p.shape([[st-.1,stTop],[st+.08,stTop],[st+.1,stTop+.12],[st-.04,stTop+.08]],.7);
 for(let i=0;i<20;i++){const t=i/20,yy=horizon+t*(stTop-horizon),w=.3*(1-t*.62);p.lightsLine(st+w*(.15-.9*Math.sin(t*1.9)),yy,st+w*(.15-.9*Math.sin(t*1.9)),yy+.06,.55,.008)}
 accents.push([st,stTop+.02,0xd8ecff,.5]);beacons.push([st+.02,stTop+.12]);
}

function farLayer(random,res,beacons,accents){
 const bounds={left:-6.5,right:12.5,bottom:-2,top:5},horizon=.75,p=painter(res,Math.round(res*7/19),bounds);
 // Distant towers behind and around Lujiazui, lower toward the edges.
 for(let x=bounds.left;x<bounds.right;){const w=.14+random()*.32,near=Math.exp(-((x-3.4)**2)/18),h=.25+random()*(.5+1.2*near);const top=tower(p,random,x,horizon-.4,w,h,{lit:.3,setback:random()>.7?.12:0});if(h>1.1)beacons.push([x+w/2,top]);x+=w+.02+random()*.12}
 landmarks(p,random,horizon,beacons,accents);
 // A dense low band in front hides every base, like the riverfront from high up.
 for(let x=bounds.left;x<bounds.right;){const w=.1+random()*.26,h=.2+random()*.42;tower(p,random,x,bounds.bottom,w,horizon-bounds.bottom+h-.35,{lit:.22});x+=w+.01}
 return p.texture();
}

function nearLayer(random,res,beacons){
 const bounds={left:-3,right:8,bottom:-2,top:2.2},p=painter(res,Math.round(res*4.2/11),bounds);
 for(let x=bounds.left;x<bounds.right;){const w=.35+random()*.7,tall=random()>.86,h=(tall?2.7:1.2)+random()*(tall?.9:1.1);const top=tower(p,random,x,bounds.bottom,w,h,{lit:.42,setback:random()>.6?.1:0,rows:.05});if(tall)beacons.push([x+w/2,top]);x+=w+.05+random()*.3}
 return p.texture();
}

function glowSprite(){
 const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);
 r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.25,'rgba(255,255,255,.55)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}

function points(list,z,map,renderOrder){
 const geometry=new THREE.BufferGeometry(),position=[],color=[],c=new THREE.Color();
 for(const [x,y,hex] of list){position.push(x,y,z);c.set(hex);color.push(c.r,c.g,c.b)}
 geometry.setAttribute('position',new THREE.Float32BufferAttribute(position,3));geometry.setAttribute('color',new THREE.Float32BufferAttribute(color,3));
 const material=new THREE.PointsMaterial({size:list[0]?.[3]??.2,map,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
 const cloud=new THREE.Points(geometry,material);cloud.renderOrder=renderOrder;cloud.frustumCulled=false;return cloud;
}

export function createSkyline(scene,{mobile=false,day=1}={}){
 const random=seeded(1843),color=hex=>new THREE.Color(hex);
 const sky=new THREE.Mesh(new THREE.PlaneGeometry(28,16),new THREE.ShaderMaterial({vertexShader:skyVertex,fragmentShader:skyFragment,depthWrite:false,uniforms:{day:{value:day},dayTop:{value:color(0x5d98c6)},dayHorizon:{value:color(0xd3dde0)},nightTop:{value:color(0x070e18)},nightHorizon:{value:color(0x3a3450)}}}));
 sky.position.set(3,4,-15);sky.renderOrder=-5;
 const layer=(texture,bounds,z,settings)=>{const mesh=new THREE.Mesh(new THREE.PlaneGeometry(bounds.right-bounds.left,bounds.top-bounds.bottom),new THREE.ShaderMaterial({vertexShader:layerVertex,fragmentShader:layerFragment,transparent:true,depthWrite:false,uniforms:{map:{value:texture},day:{value:day},...Object.fromEntries(Object.entries(settings).map(([k,v])=>[k,{value:typeof v==='number'&&k==='haze'?v:color(v)}]))}}));mesh.position.set((bounds.left+bounds.right)/2,(bounds.bottom+bounds.top)/2,z);return mesh};
 const beacons=[],accents=[],farBeacons=[];
 const far=layer(farLayer(random,mobile?1024:2048,farBeacons,accents),{left:-6.5,right:12.5,bottom:-2,top:5},-12,{haze:.15,dayColor:0x6c8496,nightColor:0x1a2130,dayHaze:0xd3dde0,nightHaze:0x2a2a40,lightColor:0xffcf98});far.renderOrder=-4;
 const near=layer(nearLayer(random,mobile?768:1536,beacons),{left:-3,right:8,bottom:-2,top:2.2},-6,{haze:.06,dayColor:0x56666f,nightColor:0x0e1319,dayHaze:0xd3dde0,nightHaze:0x1c1f2c,lightColor:0xffd4a0});near.renderOrder=-2;
 const glow=glowSprite();
 // Each accent has its own size, so draw them as one cloud per size bucket.
 const accentClouds=[...new Set(accents.map(a=>a[3]))].map(size=>points(accents.filter(a=>a[3]===size),-11.98,glow,-3));
 const blinkFar=points(farBeacons.map(([x,y])=>[x,y,0xff2a1a,.14]),-11.97,glow,-3),blinkNear=points(beacons.map(([x,y])=>[x,y,0xff2a1a,.1]),-5.98,glow,-1);
 const group=new THREE.Group();group.name='Shanghai skyline';group.add(sky,far,near,blinkFar,blinkNear,...accentClouds);scene.add(group);
 function update(mix,time,still){
  for(const mesh of [sky,far,near])mesh.material.uniforms.day.value=mix;
  for(const cloud of accentClouds)cloud.material.opacity=1-mix*.92;
  // Aviation beacons keep flashing by day, just fainter.
  const flash=still?1:(time%1.8<.28?1:.1);for(const cloud of [blinkFar,blinkNear])cloud.material.opacity=flash*(1-mix*.55);
 }
 update(day,0,true);
 return {group,update};
}
