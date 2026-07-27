/* ============================================================
   ID.AURA — Application orchestration
   View transitions, cinematic camera presets (incl. interior
   POV), paint/light controls, keyboard shortcuts, real GLB
   load progress, ambient audio, idle auto-rotate.
   ============================================================ */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { createScene } from './scene.js?v=20260727-2';
import { createCar } from './car.js?v=20260727-3';
import { createCluster } from './cluster.js?v=20260727-3';
import { createConsole } from './console.js?v=20260727-2';
import { createAutonomous } from './autonomous.js?v=20260727-1';
import { createAudio } from './audio.js?v=20260727-1';

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
const view = createScene(stage);
const { camera, controls } = view;
const car = createCar();
view.scene.add(car.group);

const audio = createAudio();
const cluster = createCluster(layers.cluster);
const consoleView = createConsole(layers.console, audio);
const autonomous = createAutonomous(view, layers.autonomous, car);

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
});
// safety: never trap the user behind the loader
setTimeout(() => { loader.classList.add('done'); loaded = true; }, 9000);

/* ---------- views ---------- */
const VIEWS = ['showroom', 'cluster', 'console', 'autonomous'];
// P3 跨模态辉光：视图切换时屏幕边缘联动换色（cluster 内部模式档会进一步覆盖）
const VIEW_ACCENT = { showroom: '#54d3e3', cluster: '#54d3e3', console: '#54d3e3', autonomous: '#e6a877' };
let current = 'showroom';

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
  if (consoleTwin) consoleTwin.group.visible = (name === 'console');

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
      controls.target.set(0, 0.85, 0);
      // camera is eased to the hero lens in the render loop (CONSOLE_CAM_GOAL)
      // — robust against stray tweens from sibling modules' onExit handlers.
    } else {
      controls.enabled = true;
      if (name !== 'showroom') {
        gsap.to(camera.position, {
          x: 0, y: 1.9, z: 8.8, duration: 1.5, ease: 'power3.inOut'
        });
        gsap.to(controls.target, {
          x: 0, y: 1.0, z: 0, duration: 1.5, ease: 'power3.inOut'
        });
      }
    }
  }

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
const CONSOLE_CAM_GOAL = new THREE.Vector3(5.4, 2.3, 6.2);
let consoleTwin = null;
const twinPaints = ['#9fb3c8', '#0d2d6b', '#c22333', '#e8e6e0', '#0c1210', '#0e3a34'];
let twinPaintIdx = 0;
let twinLightsOn = true;

function buildConsoleTwin() {
  if (consoleTwin || !car.createToonClone) return;
  consoleTwin = car.createToonClone({});
  if (!consoleTwin) return;
  consoleTwin.group.visible = false;
  consoleTwin.group.position.set(0, 0, 0);
  view.scene.add(consoleTwin.group);
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
  consoleTwin.toonBodyMats.forEach((m) => m.color.set(hex));
  consoleTwin.toonAccentMats.forEach((m) => m.color.set(hex).multiplyScalar(0.32));
  showControlToast(`PAINT · ${twinPaints[twinPaintIdx].toUpperCase()}`);
});

/* ---------- debug hooks (QA / devtools: read live camera + target) ---------- */
window.__cam = camera;
window.__ctrl = controls;

/* ---------- main loop ---------- */
const clock = new THREE.Clock();
function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  const inShowroom = current === 'showroom';
  car.update(t, inShowroom && autoRotate);
  view.update(t);
  if (current === 'cluster') cluster.update(t, dt);
  if (current === 'console') {
    consoleView.update(t, dt);
    camera.position.lerp(CONSOLE_CAM_GOAL, 0.05);
    camera.lookAt(0, 0.85, 0);
    if (consoleTwin && consoleTwin.group.visible) {
      consoleTwin.group.rotation.y += dt * 0.22;
    }
  }
  if (current === 'autonomous') autonomous.update(t, dt);

  if (!cinematicCam) controls.update();
  view.render();
}
loop();
