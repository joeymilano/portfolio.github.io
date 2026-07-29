/* ============================================================
   ID.AURA — Application orchestration
   View transitions, cinematic camera presets (incl. interior
   POV), paint/light controls, keyboard shortcuts, real GLB
   load progress, ambient audio, idle auto-rotate.
   ============================================================ */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { createScene } from './scene.js?v=20260728-2';
import { createCar } from './car.js?v=20260727-3';
import { createCluster } from './cluster/index.js?v=20260729-3';
import { createClusterWorld } from './cluster/world.js?v=20260729-2';
import { createConsole } from './console.js?v=20260729-3';
import { createAutonomous } from './autonomous.js?v=20260727-1';
import { createAudio } from './audio.js?v=20260727-1';
import { createQuality } from './quality.js?v=20260728-1';
import { Reflector } from 'three/addons/objects/Reflector.js';

const stage = document.getElementById('stage');
const layers = {
  showroom: document.getElementById('layer-showroom'),
  cluster: document.getElementById('layer-cluster'),
  console: document.getElementById('layer-console'),
  autonomous: document.getElementById('layer-autonomous')
};
const viewName = document.getElementById('view-name');
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');

/* ---------- core ---------- */
const quality = createQuality();
const view = createScene(stage, quality);
view.renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.dprCap));
quality.onChange(() => {
  view.renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.dprCap));
  view.resize();
});
const { camera, controls } = view;
const car = createCar();
view.scene.add(car.group);

const audio = createAudio();
const cluster = createCluster(layers.cluster);
const consoleView = createConsole(layers.console, audio);
const autonomous = createAutonomous(view, layers.autonomous, car);
// Cluster 3D 感知世界（共享 scene/renderer；在 HUD 浮层之下渲染实时驾驶世界）
const clusterWorld = createClusterWorld(view, car);
if (cluster.attachWorld) cluster.attachWorld(clusterWorld);

/* ---------- loading: real GLB progress ---------- */
let loaded = false;
car.onProgress((p) => {
  loaderBar.style.width = Math.round(p * 88) + '%';
});
car.onLoad(() => {
  loaderBar.style.width = '100%';
  setTimeout(() => {
    loader.classList.add('done');
    loaded = true;
  }, 450);
  buildConsoleTwin();
  clusterWorld.build();
});
// safety: never trap the user behind the loader
setTimeout(() => { loader.classList.add('done'); loaded = true; }, 9000);

/* ---------- views ---------- */
const VIEWS = ['showroom', 'cluster', 'console', 'autonomous'];
// P3 跨模态辉光：视图切换时屏幕边缘联动换色（cluster 内部模式档会进一步覆盖）
const VIEW_ACCENT = { showroom: '#54d3e3', cluster: '#54d3e3', console: '#54d3e3', autonomous: '#e6a877' };
let current = 'showroom';

function isCompactViewport() {
  return innerWidth <= 780 || (innerHeight <= 560 && matchMedia('(hover: none)').matches);
}

function isPortraitPhone() {
  return innerWidth <= 780 && innerHeight > innerWidth;
}

function applyResponsiveCamera(name = current) {
  const portrait = isPortraitPhone();
  camera.zoom = portrait
    ? (name === 'showroom' ? 0.72 : name === 'cluster' ? 0.84 : name === 'autonomous' ? 0.74 : 1)
    : 1;
  camera.updateProjectionMatrix();
}

function syncCompactSceneVisibility() {
  const showConsoleTwin = current === 'console' && !isCompactViewport();
  if (consoleTwin) consoleTwin.group.visible = showConsoleTwin;
  if (consoleStage) consoleStage.visible = showConsoleTwin;
}

applyResponsiveCamera(current);
addEventListener('resize', () => {
  applyResponsiveCamera(current);
  syncCompactSceneVisibility();
});

function switchView(name) {
  if (name === current || !VIEWS.includes(name)) return;
  const prev = current;
  current = name;
  // leaving a cinematic (cockpit) lens — restore orbit controls
  cinematicCam = false;
  controls.enabled = true;
  if (name !== 'showroom') {
    document.body.classList.remove('interior-view');
    car.setInterior(false);
  }

  document.querySelectorAll('.nav-btn').forEach((b) =>
    b.classList.toggle('active', b.dataset.view === name));

  // DOM layers
  for (const v of VIEWS) layers[v].classList.remove('on');
  document.body.dataset.view = name;
  document.body.style.setProperty('--view-accent', VIEW_ACCENT[name] || '#54d3e3');
  if (name !== 'showroom') layers[name].classList.add('on');
  view.setShowroomActive(name === 'showroom');
  car.group.visible = name === 'showroom';
  // P3 修复:toon twin 可见性统一收敛 —— 只在 Console 显示,其余视图(含 Autonomous)一律隐藏。
  // 原先隐藏只写在 else 内层,Console→Autonomous 走 if(autonomous) 分支绕过,
  // 导致 twin 残留在原点 (0,0,0) 与 ego 真车堆叠成"两辆车"。此处一句管所有路径。
  if (consoleTwin) consoleTwin.group.visible = (name === 'console' && !isCompactViewport());
  if (consoleStage) consoleStage.visible = (name === 'console' && !isCompactViewport());
  // Cluster 3D 感知世界：进 cluster 激活夜间驾驶环境，离开恢复（一句管所有路径）
  clusterWorld.setActive(name === 'cluster');

  // camera
  if (name === 'autonomous') {
    autonomous.onEnter();
    cinematicCam = true;
  } else {
    autonomous.onExit();
    if (prev === 'autonomous') flyTo(CAMERAS.front34);
    // P2: Console = cel-shaded 3D twin as hero (Lotus 3D garage / Zeekr)
    if (name === 'console') {
      buildConsoleTwin();
      controls.enabled = false;
      cinematicCam = true;
      controls.target.set(0, 0.55, 0);
      view.renderer.toneMappingExposure = 0.74;   // 影棚提亮（盖过 setShowroomActive 的 0.56）
      // camera is eased to the hero lens in the render loop (CONSOLE_CAM_GOAL)
      // — robust against stray tweens from sibling modules' onExit handlers.
    } else {
      controls.enabled = true;
      if (name === 'cluster') {
        // Cluster = 3D 感知尾随视角（本车静止、世界后移）；相机锁定，禁 orbit
        controls.enabled = false;
        cinematicCam = true;
        gsap.to(camera.position, {
          x: clusterWorld.CAM.pos.x, y: clusterWorld.CAM.pos.y, z: clusterWorld.CAM.pos.z,
          duration: 1.6, ease: 'power3.inOut'
        });
        controls.target.copy(clusterWorld.CAM.tgt);
      } else if (name !== 'showroom') {
        gsap.to(camera.position, {
          x: 0, y: 1.9, z: 8.8, duration: 1.5, ease: 'power3.inOut'
        });
        gsap.to(controls.target, {
          x: 0, y: 1.0, z: 0, duration: 1.5, ease: 'power3.inOut'
        });
      }
    }
  }
  applyResponsiveCamera(name);

  // lifecycle
  cluster[name === 'cluster' ? 'onEnter' : 'onExit']();
  consoleView[name === 'console' ? 'onEnter' : 'onExit']();
  // P3 意图层：仅驻车 showroom 浮现，驾驶视图退场
  if (name === 'showroom') showIntent(); else hideIntent();

  // label
  viewName.textContent = name.toUpperCase();
  viewName.classList.remove('flash');
  void viewName.offsetWidth;
  viewName.classList.add('flash');
}

document.querySelectorAll('.nav-btn').forEach((b) =>
  b.addEventListener('click', () => switchView(b.dataset.view)));

/* ---------- camera presets ---------- */
const CAMERAS = {
  front34: { pos: [8.8, 3.4, 8.8], tgt: [0, 0.8, 0], near: false },
  side:    { pos: [0.4, 1.6, 10.6], tgt: [0, 0.8, 0], near: false },
  rear:    { pos: [-7.4, 3.2, -7.8], tgt: [0, 0.9, 0], near: false },
  top:     { pos: [0.01, 15.5, 0.01], tgt: [0, 0, 0], near: false },
  int:     { pos: [-0.28, 1.25, 0.46], tgt: [2.05, 1.0, 0.42], near: true },
  driver:  { pos: [-0.28, 1.25, 0.46], tgt: [2.05, 1.0, 0.42], near: true },
  center:  { pos: [0.04, 1.24, 0.12], tgt: [1.62, 0.86, 0.02], near: true },
  rearCabin: { pos: [-1.24, 1.24, -0.32], tgt: [0.68, 1.02, -0.08], near: true }
};

function flyTo(p) {
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);
  controls.enabled = true;
  cinematicCam = false;
  // near-camera ergonomics for interior POV
  controls.minDistance = p.near ? 0.05 : 5.5;
  controls.maxDistance = p.near ? 3.5 : 18;
  controls.maxPolarAngle = p.near ? Math.PI : Math.PI / 2 - 0.04;
  // target snaps, position eases; sync controls each frame so the
  // damping-style update() never fights the programmatic tween.
  controls.target.set(p.tgt[0], p.tgt[1], p.tgt[2]);
  gsap.to(camera.position, {
    x: p.pos[0], y: p.pos[1], z: p.pos[2],
    duration: 1.5, ease: 'power3.inOut',
    onUpdate: () => controls.update(),
    onComplete: () => controls.update()
  });
}

const lensBtns = document.querySelectorAll('.lens-btn');
const interiorViewName = document.getElementById('interior-view-name');
const interiorViewBtns = document.querySelectorAll('.interior-view-btn');
const INTERIOR_NAMES = {
  driver: 'DRIVER ENVIRONMENT',
  center: 'CENTRAL COMMAND',
  rearCabin: 'REAR LOUNGE'
};

function flyInterior(name = 'driver') {
  const p = CAMERAS[name] || CAMERAS.driver;
  gsap.killTweensOf(camera.position);
  gsap.killTweensOf(controls.target);
  gsap.killTweensOf(car.rig.rotation);
  document.body.classList.add('interior-view');
  interiorViewBtns.forEach((button) =>
    button.classList.toggle('active', button.dataset.interior === name));
  interiorViewName.textContent = INTERIOR_NAMES[name] || INTERIOR_NAMES.driver;
  autoRotate = false;
  car.setInterior(true);
  gsap.to(car.rig.rotation, { y: 0, duration: 0.8, ease: 'power3.inOut' });
  cinematicCam = true;
  controls.enabled = false;
  controls.minDistance = 0.05;
  controls.maxDistance = 3.5;
  controls.maxPolarAngle = Math.PI;
  controls.target.set(p.tgt[0], p.tgt[1], p.tgt[2]);
  gsap.to(camera.position, {
    x: p.pos[0], y: p.pos[1], z: p.pos[2],
    duration: 1.25, ease: 'power3.inOut',
    onUpdate: () => camera.lookAt(controls.target),
    onComplete: () => camera.lookAt(controls.target)
  });
}

lensBtns.forEach((b) =>
  b.addEventListener('click', () => {
    const lens = b.dataset.lens;
    lensBtns.forEach((x) => x.classList.toggle('active', x === b));
    autoRotate = lens !== 'int';
    const isCockpit = lens === 'int';
    car.setInterior(isCockpit);
    document.body.classList.toggle('interior-view', isCockpit);
    if (isCockpit) {
      flyInterior('driver');
    } else {
      flyTo(CAMERAS[lens] || CAMERAS.front34);
    }
  })
);

interiorViewBtns.forEach((button) =>
  button.addEventListener('click', () => flyInterior(button.dataset.interior))
);

/* ---------- showroom controls ---------- */
document.querySelectorAll('.paint-dot').forEach((b) =>
  b.addEventListener('click', () => {
    document.querySelectorAll('.paint-dot').forEach((x) =>
      x.classList.toggle('active', x === b));
    car.setPaint(parseInt(b.dataset.paint.slice(1), 16));
  })
);

/* ---------- scene (background panorama) picker — showroom only ---------- */
const sceneRail = document.getElementById('scene-rail');
if (sceneRail && view.SCENES) {
  view.SCENES.forEach((s, i) => {
    const b = document.createElement('button');
    b.className = 'scene-btn' + (i === 0 ? ' active' : '');
    b.textContent = s.name.toUpperCase();
    b.addEventListener('click', () => view.setScene(i));
    sceneRail.appendChild(b);
  });
  view.onScene((idx) => {
    sceneRail.querySelectorAll('.scene-btn').forEach((btn, i) =>
      btn.classList.toggle('active', i === idx));
    // smooth exposure ramp so the new vista fades in instead of snapping
    gsap.fromTo(view.renderer, { toneMappingExposure: 0.3 },
      { toneMappingExposure: 0.68, duration: 0.9, ease: 'power2.out' });
  });
}

const lightsBtn = document.getElementById('lights-btn');
const controlToast = document.getElementById('control-toast');
let controlToastTimer;
function showControlToast(message, severity = 'info') {
  controlToast.textContent = message;
  controlToast.dataset.severity = severity;
  controlToast.classList.remove('show');
  void controlToast.offsetWidth;            // reflow → 重新触发光刃横扫
  controlToast.classList.add('show');
  clearTimeout(controlToastTimer);
  controlToastTimer = setTimeout(() => controlToast.classList.remove('show'), 1400);
}
lightsBtn.addEventListener('click', () => {
  const on = !lightsBtn.classList.contains('on');
  lightsBtn.classList.toggle('on', on);
  lightsBtn.setAttribute('aria-pressed', String(on));
  lightsBtn.setAttribute('aria-label', on ? 'Turn headlights off' : 'Turn headlights on');
  lightsBtn.title = `Showroom headlights · ${on ? 'On' : 'Off'} (L)`;
  car.setLights(on);
  showControlToast(`SHOWROOM LIGHTS · ${on ? 'ON' : 'OFF'}`);
});

/* ---------- audio ---------- */
const audioBtn = document.getElementById('audio-btn');
audioBtn.addEventListener('click', () => audio.toggle());
audio.onUpdate((s) => audioBtn.classList.toggle('on', s.on));

/* ---------- HUD clock ---------- */
const clockEl = document.getElementById('clock');
function tickHudClock() {
  const d = new Date();
  clockEl.textContent =
    String(d.getHours()).padStart(2, '0') + ':' +
    String(d.getMinutes()).padStart(2, '0');
}
tickHudClock();
setInterval(tickHudClock, 10_000);

/* ---------- intro film + BGM ----------
   The intro film is always muted. The launch gesture is the only audio
   unlock: it brings the soundtrack in gently at 18% master gain. */
const intro = document.getElementById('intro');
const introFilm = document.getElementById('intro-film');
if (introFilm) {
  // The film is atmosphere, never an audio source. Slowing the real footage
  // keeps the title and project context visually dominant.
  introFilm.defaultMuted = true;
  introFilm.muted = true;
  introFilm.volume = 0;
  introFilm.playbackRate = 0.42;
  introFilm.play().catch(() => {});
}
function launchExperience() {
  audio.play(0.18);
  intro.classList.add('gone');
  setTimeout(() => {
    intro.querySelector('.intro-film')?.pause();
    intro.remove();
  }, 1100);
  playBootRitual();
  // P3 加固：showroom-ui 淡入改由 CSS compositor 驱动（setTimeout 免 rAF 依赖，tab 失焦也稳）。
  // body.boot-done + data-view="showroom" 双条件 → 仪式后才点亮控制条；视图切换走纯 transition。
  setTimeout(() => document.body.classList.add('boot-done'), 1700);
}

/* ---------- P3 Boot Ritual — 上电仪式 ----------
   黑屏 → 一道光横扫唤醒 → 3D 车浮现 → ID.AURA + SYSTEM READY → 消散。
   替代静态 loader 淡出；评委第一眼即建立"智能上电"叙事。 */
const bootRitual = document.getElementById('boot-ritual');
function playBootRitual() {
  if (!bootRitual) return;
  bootRitual.style.display = 'block';
  const veil = bootRitual.querySelector('.ritual-veil');
  const blade = bootRitual.querySelector('.ritual-blade');
  const word = bootRitual.querySelector('.ritual-word');
  const ready = bootRitual.querySelector('.ritual-ready');
  const tl = gsap.timeline({ onComplete: () => { bootRitual.style.display = 'none'; } });
  // 兜底：timeline 若因故未完成，4.5s 后强制隐藏仪式层，防 blade 光带残留
  setTimeout(() => { if (bootRitual) bootRitual.style.display = 'none'; }, 4500);
  tl.set(veil, { opacity: 1 })
    .set(word, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.96, filter: 'blur(8px)' })
    .set(ready, { xPercent: -50, opacity: 0, y: 10 })
    .fromTo(blade, { xPercent: -130 }, { xPercent: 130, duration: 0.8, ease: 'power2.inOut' })
    .to(veil, { opacity: 0.32, duration: 0.85, ease: 'power2.out' }, '-=0.25')
    .to(word, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' }, '-=0.65')
    .to(ready, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.25')
    .to({}, { duration: 0.55 })
    .to([veil, word, ready], { opacity: 0, duration: 0.6, ease: 'power2.inOut' });

  // HUD 顶栏 / 底栏 / Showroom 控制条的淡入已全部迁移到 CSS(body.boot-done 触发,
  // compositor 驱动、免 rAF ticker、tab 失焦也稳)——见 styles.css。
  gsap.delayedCall(2.2, () => { if (current === 'showroom') showIntent(); });
}
document.getElementById('launch').addEventListener('click', launchExperience);

/* ---------- P3 AURA 意图层 — EQS Zero Layer 本地化 ----------
   按时段确定性场景池（无随机）；驻车浮现、驾驶退场。 */
const intentEl = document.getElementById('aura-intent');
const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
function computeIntent() {
  const d = new Date();
  const h = d.getHours();
  const hh = String(h).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const dow = WEEK[d.getDay()];
  let tag, body;
  if (h >= 6 && h < 11) { tag = 'COMMUTE'; body = 'A100 +12 MIN · REROUTE VIA B2 · 82% SOC SUFFICIENT'; }
  else if (h >= 11 && h < 14) { tag = 'CHARGE'; body = '4 FAST CHARGERS FREE NEARBY · OFF-PEAK RATE · 18-MIN TOP-UP'; }
  else if (h >= 14 && h < 18) { tag = 'CALENDAR'; body = '16:00 MEETING · 18 MIN TO VENUE · LEAVE NOW TO BEAT RUSH'; }
  else if (h >= 18 && h < 22) { tag = 'TRAFFIC'; body = 'TRAFFIC HEAVY · TAKE A100 · SOC GOOD FOR ROUND TRIP · HOME ETA 19:30'; }
  else { tag = 'TARIFF'; body = 'OFF-PEAK FROM 23:00 · SCHEDULE 03:00 FULL CHARGE · SAVES 64%'; }
  return { time: `${dow} · ${hh}:${mm}`, tag, body };
}
function showIntent() {
  if (!intentEl) return;
  const i = computeIntent();
  intentEl.querySelector('.intent-time').textContent = `${i.time} · ${i.tag}`;
  intentEl.querySelector('.intent-body').textContent = i.body;
  intentEl.classList.add('on');
}
function hideIntent() { intentEl?.classList.remove('on'); }
if (intentEl) {
  intentEl.querySelectorAll('[data-intent]').forEach((b) =>
    b.addEventListener('click', () => {
      hideIntent();
      showControlToast(`AURA · ${b.dataset.intent === 'accept' ? 'ROUTE ACCEPTED' : 'DEFERRED'}`);
    }));
}

/* ---------- keyboard shortcuts ---------- */
addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  const map = { 1: 'showroom', 2: 'cluster', 3: 'console', 4: 'autonomous' };
  if (map[e.key]) switchView(map[e.key]);
  if (e.key.toLowerCase() === 'l' && current === 'showroom') lightsBtn.click();
});

/* ---------- idle auto-rotate ---------- */
let autoRotate = true;
let cinematicCam = false;   // true = gsap owns the camera, loop skips controls.update()
let idleTimer;
controls.addEventListener('start', () => {
  autoRotate = false;
  clearTimeout(idleTimer);
});
controls.addEventListener('end', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (current === 'showroom') autoRotate = true;
  }, 4000);
});

/* ---------- P2: Console 3D garage — cel-shaded twin + tap controls ---------- */
const CONSOLE_CAM_GOAL = new THREE.Vector3(5.0, 1.5, 6.4);
let consoleTwin = null;
let reflection = null;   // 假倒影（翻转车影，置于半透明地台之下）
const twinPaints = ['#9fb3c8', '#0d2d6b', '#c22333', '#e8e6e0', '#0c1210', '#0e3a34'];
let twinPaintIdx = 0;
let twinLightsOn = true;

// Console 专属舞台：深炭地板 + 模式光圈，让写实数字孪生"站住"
// （致敬 Lotus 3D Garage 的暗场产品摄影质感）
let consoleStage = null;
function buildConsoleStage() {
  if (consoleStage) return;
  consoleStage = new THREE.Group();

  /* 镜面反射地台（Reflector 真倒影）—— "车即主角"的关键一笔：
     车身在黑色镜面上的倒影是影棚级产品摄影的灵魂。 */
  const mirror = new THREE.Mesh(
    new THREE.CircleGeometry(10, 72),
    new THREE.MeshPhysicalMaterial({ color: 0x0a0e13, roughness: 0.12, metalness: 0.9, envMapIntensity: 1.1, transparent: true, opacity: 0.8 })
  );
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = -0.02;
  mirror.receiveShadow = true;
  consoleStage.add(mirror);
  // 暗化磨砂层：中心微透反射、边缘融入暗场（避免"全亮镜子"的廉价感）
  const sheen = new THREE.Mesh(
    new THREE.CircleGeometry(10, 72),
    new THREE.MeshBasicMaterial({ color: 0x05070b, transparent: true, opacity: 0.32, depthWrite: false })
  );
  sheen.rotation.x = -Math.PI / 2;
  sheen.position.y = -0.015;
  consoleStage.add(sheen);
  const sheenEdge = new THREE.Mesh(
    new THREE.RingGeometry(3.0, 10, 72),
    new THREE.MeshBasicMaterial({ color: 0x03050a, transparent: true, opacity: 0.5, depthWrite: false })
  );
  sheenEdge.rotation.x = -Math.PI / 2;
  sheenEdge.position.y = -0.014;
  consoleStage.add(sheenEdge);

  /* 双层发光地环：内环实、外环虚，呼吸脉动 */
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x54d3e3, transparent: true, opacity: 0.6, toneMapped: false,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(3.9, 3.97, 96), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.005;
  consoleStage.add(ring);
  const ringOuterMat = new THREE.MeshBasicMaterial({
    color: 0x54d3e3, transparent: true, opacity: 0.16, toneMapped: false,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const ringOuter = new THREE.Mesh(new THREE.RingGeometry(4.15, 4.45, 96), ringOuterMat);
  ringOuter.rotation.x = -Math.PI / 2;
  ringOuter.position.y = 0.005;
  consoleStage.add(ringOuter);
  consoleStage.userData.ringMat = ringMat;
  consoleStage.userData.ringOuterMat = ringOuterMat;

  /* 三点影棚光的补充：暖色底光（fill，让车底/侧身不死黑）+ 冷青轮廓补光 */
  const fillLight = new THREE.PointLight(0xffc493, 6, 12, 1.8);
  fillLight.position.set(0, 0.35, 3.2);
  consoleStage.add(fillLight);
  const coolRim = new THREE.PointLight(0x54d3e3, 4, 12, 1.8);
  coolRim.position.set(-4.5, 2.2, -3.5);
  consoleStage.add(coolRim);

  /* 环绕微尘（影棚空气感） */
  const N = 160;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, r = 2 + Math.random() * 7;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.random() * 3.2 + 0.1;
    pos[i * 3 + 2] = Math.sin(a) * r;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x8fd8e8, size: 0.03, transparent: true, opacity: 0.4,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  consoleStage.add(dust);
  consoleStage.userData.dust = dust;

  consoleStage.visible = false;
  view.scene.add(consoleStage);
}

/* P3: digital-twin FX — thermal/battery footprint glow + torque-flow arrows
   under the twin, plus an X-RAY toggle that fades the body, explodes the
   wheels outward and boosts the footprint glow (Lotus 3D-garage "reveal"). */
const thermalShader = {
  uniforms: { time: { value: 0 }, reveal: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time;
    uniform float reveal;
    void main() {
      vec2 c = vUv - 0.5;
      float d = length(c * vec2(1.0, 2.15));
      float edge = smoothstep(0.52, 0.08, d);
      float wave = sin(c.y * 7.0 - time * 1.4) * 0.5 + 0.5;
      vec3 cool = vec3(0.13, 0.56, 0.63);
      vec3 warm = vec3(0.66, 0.44, 0.24);
      vec3 col = mix(cool, warm, smoothstep(-0.32, 0.4, c.y));
      float glow = edge * (0.22 + wave * 0.16) * (0.35 + reveal * 1.1);
      gl_FragColor = vec4(col, glow);
    }
  `
};
let consoleFX = null;
function buildConsoleFX() {
  if (consoleFX) return;
  const heatmap = new THREE.Mesh(
    new THREE.PlaneGeometry(6.4, 3.1, 1, 1),
    new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(thermalShader.uniforms),
      vertexShader: thermalShader.vertexShader,
      fragmentShader: thermalShader.fragmentShader,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    })
  );
  heatmap.rotation.x = -Math.PI / 2;
  heatmap.position.y = 0.012;

  const arrowMat = new THREE.MeshBasicMaterial({
    color: 0x54d3e3, transparent: true, opacity: 0.85, toneMapped: false,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const arrowGeo = new THREE.ConeGeometry(0.055, 0.16, 10);
  const ARROW_COUNT = 9;
  const arrows = Array.from({ length: ARROW_COUNT }, (_, i) => {
    const m = new THREE.Mesh(arrowGeo, arrowMat.clone());
    m.position.set(0, 0.05, -2.1 + (i / (ARROW_COUNT - 1)) * 4.2);
    return m;
  });
  const arrowGroup = new THREE.Group();
  arrows.forEach((a) => arrowGroup.add(a));

  /* 扫描光带：一道水平青色光带沿车身 Z 轴扫过（科幻"扫描"仪式感）。
     平放贴地（rotation.x=-π/2），避免立环侧对相机压缩成垂直光柱。 */
  const scanRing = new THREE.Mesh(
    new THREE.PlaneGeometry(5.4, 0.6),
    new THREE.MeshBasicMaterial({
      color: 0x54d3e3, transparent: true, opacity: 0.0, toneMapped: false,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    })
  );
  scanRing.rotation.x = -Math.PI / 2;
  scanRing.position.y = 0.06;
  consoleStage.add(scanRing);

  consoleFX = { heatmap, arrowGroup, arrows, reveal: 0, scanRing };
  consoleStage.add(heatmap, arrowGroup);
}

let xrayOn = false;
let xrayBasePivotX = null;
function setXray(on) {
  xrayOn = on;
  if (consoleFX) gsap.to(consoleFX, { reveal: on ? 1 : 0, duration: 0.7, ease: 'power2.out' });
  if (!consoleTwin) return;
  const targetOpacity = on ? 0.22 : 1;
  [...consoleTwin.bodyMats, ...consoleTwin.accentMats].forEach((mat) => {
    mat.transparent = true;
    gsap.to(mat, { opacity: targetOpacity, duration: 0.6, ease: 'power2.out' });
  });
  if (!xrayBasePivotX) xrayBasePivotX = consoleTwin.wheelPivots.map((p) => p.position.x);
  consoleTwin.wheelPivots.forEach((pivot, i) => {
    const base = xrayBasePivotX[i];
    const target = on ? base + Math.sign(base || 1) * 0.34 : base;
    gsap.to(pivot.position, { x: target, duration: 0.6, ease: 'power2.out' });
  });
}
layers.console.addEventListener('aura:xray', (e) => setXray(!!e.detail?.on));

function buildConsoleTwin() {
  if (consoleTwin || !car.cloneCar) return;
  // 写实 PBR twin (Lotus Hyper OS digital-twin aesthetic) — 弃用 cel-shaded toon,
  // 写实车漆 + HDRI 反射才匹配 Lotus 写实高级基调。
  consoleTwin = car.cloneCar({});
  if (!consoleTwin) return;
  consoleTwin.group.visible = false;
  consoleTwin.group.position.set(0, 0, 0);
  view.scene.add(consoleTwin.group);
  // 影棚级车漆：clearcoat 金属漆 + 强环境反射（写实高级感）
  [...consoleTwin.bodyMats, ...consoleTwin.accentMats].forEach((m) => {
    if ('metalness' in m) m.metalness = Math.max(m.metalness ?? 0, 0.9);
    if ('roughness' in m) m.roughness = Math.min(m.roughness ?? 1, 0.26);
    if ('clearcoat' in m) { m.clearcoat = 1.0; m.clearcoatRoughness = 0.07; }
    m.envMapIntensity = 1.6;
    m.needsUpdate = true;
  });
  // 玻璃降环境反射：避免车顶玻璃在特定角度反射 HDRI 形成垂直眩光柱
  consoleTwin.group.traverse((o) => {
    if (!o.isMesh) return;
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      if (m && m.transparent && 'envMapIntensity' in m) m.envMapIntensity = Math.min(m.envMapIntensity, 0.5);
    });
  });
  buildConsoleStage();
  buildConsoleFX();
  buildReflection();
}

/* 假倒影：克隆车翻转 scale.y=-1 置于半透明地台之下，半透明暗色车影
   透过地台形成"黑色大理石倒影"（替代 Reflector —— 后者与 EffectComposer
   的 render-target 链冲突，导致帧率崩溃 + 垂直光柱伪影）。 */
function buildReflection() {
  if (reflection || !car.cloneCar) return;
  reflection = car.cloneCar({});
  if (!reflection) return;
  reflection.group.scale.y = -1;
  reflection.group.position.y = 0;
  // 统一替换为深色剪影材质：消除车灯/玻璃的反射与发光，只留干净车影（防光柱）
  const silMat = new THREE.MeshBasicMaterial({
    color: 0x33505e, transparent: true, opacity: 0.2,
    depthWrite: false, side: THREE.DoubleSide
  });
  reflection.group.traverse((o) => { if (o.isMesh) o.material = silMat; });
  if (consoleStage) consoleStage.add(reflection.group);
}

const raycaster = new THREE.Raycaster();
const pointerNDC = new THREE.Vector2();
let downXY = null;
stage.addEventListener('pointerdown', (e) => {
  if (current !== 'console' || !consoleTwin) return;
  downXY = { x: e.clientX, y: e.clientY };
});
stage.addEventListener('pointerup', (e) => {
  if (current !== 'console' || !consoleTwin || !downXY) return;
  const dx = e.clientX - downXY.x, dy = e.clientY - downXY.y;
  downXY = null;
  if (dx * dx + dy * dy > 25) return;            // drag, not tap
  const rect = view.renderer.domElement.getBoundingClientRect();
  pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointerNDC, camera);
  const hits = raycaster.intersectObject(consoleTwin.group, true);
  if (!hits.length) return;
  const mesh = hits[0].object;
  const matName = ((Array.isArray(mesh.material) ? mesh.material[0].name : mesh.material.name) || '').toLowerCase();
  const meshName = (mesh.name || '').toLowerCase();

  // headlight / brakelight tap → toggle emissive lamps
  if (matName.includes('head') || matName.includes('brake') || matName.includes('signal') || meshName.includes('light')) {
    twinLightsOn = !twinLightsOn;
    consoleTwin.glowMats.forEach((m) => {
      m.emissiveIntensity = twinLightsOn ? (m.userData.baseEmissive ?? 2.6) : 0.05;
    });
    showControlToast(`TWIN HEADLAMPS · ${twinLightsOn ? 'ON' : 'OFF'}`);
    return;
  }
  // authored door / hatch / charge flap → swing open
  let door = mesh;
  while (door && door !== consoleTwin.group &&
         !(door.name && /door|hatch|trunk|charge/i.test(door.name))) {
    door = door.parent;
  }
  if (door && door !== consoleTwin.group && door.name) {
    const open = (door.userData.doorOpen = !door.userData.doorOpen);
    gsap.to(door.rotation, { y: open ? 0.85 : 0, duration: 0.6, ease: 'power3.inOut' });
    showControlToast(`${door.name.toUpperCase()} · ${open ? 'OPEN' : 'CLOSED'}`);
    return;
  }
  // default body tap → cycle cel-shaded paint
  twinPaintIdx = (twinPaintIdx + 1) % twinPaints.length;
  const hex = parseInt(twinPaints[twinPaintIdx].slice(1), 16);
  consoleTwin.bodyMats.forEach((m) => m.color.set(hex));
  consoleTwin.accentMats.forEach((m) => m.color.set(hex).multiplyScalar(0.22));
  showControlToast(`PAINT · ${twinPaints[twinPaintIdx].toUpperCase()}`);
});

/* ---------- debug hooks (QA / devtools: read live camera + target) ---------- */
window.__cam = camera;
window.__ctrl = controls;
window.__quality = quality;
window.__view = view;
window.__THREE = THREE;
window.__raycaster = raycaster;

/* ---------- main loop ---------- */
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  quality.sample(dt);

  const inShowroom = current === 'showroom';
  car.update(t, inShowroom && autoRotate);
  view.update(t);
  if (current === 'cluster') {
    cluster.update(t, dt);
    if (cinematicCam) camera.lookAt(clusterWorld.CAM.tgt);   // 感知视角锁定朝向
  }
  if (current === 'console') {
    consoleView.update(t, dt);
    camera.position.lerp(CONSOLE_CAM_GOAL, 0.05);
    camera.lookAt(0, 0.55, 0);
    if (consoleTwin && consoleTwin.group.visible) {
      consoleTwin.group.rotation.y += dt * 0.22;
      if (reflection) reflection.group.rotation.y = consoleTwin.group.rotation.y;
    }
    if (consoleFX) {
      consoleFX.heatmap.material.uniforms.time.value = t;
      // gentle drive/regen cycle: mostly discharge (cyan, flowing to the
      // wheels), with a brief regen window (green, reversed) every ~14s
      const cyclePhase = t % 14;
      const regen = cyclePhase > 10.5;
      const dir = regen ? -1 : 1;
      const color = regen ? 0x6fd9b4 : 0x54d3e3;
      const speed = 1.4;
      consoleFX.arrows.forEach((arrow, i) => {
        let z = arrow.position.z + dt * speed * dir;
        if (z > 2.1) z -= 4.2;
        if (z < -2.1) z += 4.2;
        arrow.position.z = z;
        arrow.rotation.x = dir > 0 ? Math.PI / 2 : -Math.PI / 2;
        const fade = 1 - Math.abs(z) / 2.1;
        arrow.material.opacity = 0.15 + fade * 0.55;
        arrow.material.color.set(color);
      });
      // 扫描光带：沿车身 Z 缓慢往返扫过车底
      if (consoleFX.scanRing) {
        const scan = Math.sin(t * 0.45);
        consoleFX.scanRing.position.z = scan * 2.6;
        consoleFX.scanRing.material.opacity = (1 - Math.abs(scan)) * 0.38;
      }
    }
    // 地环呼吸 + 微尘漂浮
    if (consoleStage) {
      if (consoleStage.userData.ringMat) consoleStage.userData.ringMat.opacity = 0.5 + Math.sin(t * 1.3) * 0.16;
      if (consoleStage.userData.ringOuterMat) consoleStage.userData.ringOuterMat.opacity = 0.12 + Math.sin(t * 1.3 + 0.6) * 0.06;
      if (consoleStage.userData.dust) consoleStage.userData.dust.rotation.y = t * 0.03;
    }
  }
  if (current === 'autonomous') autonomous.update(t, dt);

  if (!cinematicCam) controls.update();
  view.render();
}
loop();
