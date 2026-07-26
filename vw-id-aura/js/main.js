/* ============================================================
   ID.AURA — Application orchestration
   View transitions, cinematic camera presets (incl. interior
   POV), paint/light controls, keyboard shortcuts, real GLB
   load progress, ambient audio, idle auto-rotate.
   ============================================================ */

import * as THREE from 'three';
import { gsap } from 'gsap';
import { createScene } from './scene.js?v=20260726-3';
import { createCar } from './car.js?v=20260726-3';
import { createCluster } from './cluster.js?v=20260726-3';
import { createConsole } from './console.js?v=20260726-3';
import { createAutonomous } from './autonomous.js?v=20260726-3';
import { createAudio } from './audio.js?v=20260726-3';

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
});
// safety: never trap the user behind the loader
setTimeout(() => { loader.classList.add('done'); loaded = true; }, 9000);

/* ---------- views ---------- */
const VIEWS = ['showroom', 'cluster', 'console', 'autonomous'];
let current = 'showroom';

function switchView(name) {
  if (name === current || !VIEWS.includes(name)) return;
  const prev = current;
  current = name;
  // leaving a cinematic (cockpit) lens — restore orbit controls
  cinematicCam = false;
  controls.enabled = true;

  document.querySelectorAll('.nav-btn').forEach((b) =>
    b.classList.toggle('active', b.dataset.view === name));

  // DOM layers
  for (const v of VIEWS) layers[v].classList.remove('on');
  document.body.dataset.view = name;
  if (name !== 'showroom') layers[name].classList.add('on');
  view.setShowroomActive(name === 'showroom');
  car.group.visible = name === 'showroom';

  // camera
  if (name === 'autonomous') {
    autonomous.onEnter();
    cinematicCam = true;
  } else {
    autonomous.onExit();
    if (prev === 'autonomous') flyTo(CAMERAS[name === 'showroom' ? 'front34' : 'front34']);
    if (name !== 'showroom') {
      gsap.to(camera.position, {
        x: 0, y: 1.9, z: 8.8, duration: 1.5, ease: 'power3.inOut'
      });
      gsap.to(controls.target, {
        x: 0, y: 1.0, z: 0, duration: 1.5, ease: 'power3.inOut'
      });
    }
  }

  // lifecycle
  cluster[name === 'cluster' ? 'onEnter' : 'onExit']();
  consoleView[name === 'console' ? 'onEnter' : 'onExit']();

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
  int:     { pos: [-0.2, 1.32, 1.72], tgt: [0.5, 1.0, -0.1], near: true }
};

function flyTo(p) {
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
lensBtns.forEach((b) =>
  b.addEventListener('click', () => {
    const lens = b.dataset.lens;
    lensBtns.forEach((x) => x.classList.toggle('active', x === b));
    autoRotate = lens !== 'int';
    const isCockpit = lens === 'int';
    car.setInterior(isCockpit);
    if (isCockpit) {
      // lock turntable heading, then take gsap into a "cinematic" near
      // shot. cinematicCam pauses controls.update() in the loop so the
      // damping-style orbit solver can't drag a tight (≤3.5m) eye-point
      // back to a wide exterior frame.
      gsap.to(car.rig.rotation, { y: 0, duration: 0.8, ease: 'power3.inOut' });
      cinematicCam = true;
      controls.enabled = false;
      controls.minDistance = 0.05; controls.maxDistance = 3.5;
      controls.maxPolarAngle = Math.PI;
      const P = CAMERAS.int;
      controls.target.set(P.tgt[0], P.tgt[1], P.tgt[2]);
      gsap.to(camera.position, {
        x: P.pos[0], y: P.pos[1], z: P.pos[2],
        duration: 1.3, ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(controls.target),
        onComplete: () => camera.lookAt(controls.target)
      });
    } else {
      flyTo(CAMERAS[lens] || CAMERAS.front34);
    }
  })
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
lightsBtn.addEventListener('click', () => {
  const on = !lightsBtn.classList.contains('on');
  lightsBtn.classList.toggle('on', on);
  car.setLights(on);
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
}
document.getElementById('launch').addEventListener('click', launchExperience);

/* ---------- keyboard shortcuts ---------- */
addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea')) return;
  const map = { 1: 'showroom', 2: 'cluster', 3: 'console', 4: 'autonomous' };
  if (map[e.key]) switchView(map[e.key]);
  if (e.key.toLowerCase() === 'l') lightsBtn.click();
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
  if (current === 'console') consoleView.update(t, dt);
  if (current === 'autonomous') autonomous.update(t, dt);

  if (!cinematicCam) controls.update();
  view.render();
}
loop();
