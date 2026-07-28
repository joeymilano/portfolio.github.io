/* ============================================================
   ID.AURA — Console · ambience visualization (Phase C4)
   Mini Three.js scene mounted inside the .aura-ambience card:
   an orthographic camera looking at concentric "radial harmonic"
   ring outlines plus a LiDAR-style THREE.Points cloud riding the
   same rings. Both are displaced every frame by audio.levels(n)
   band energy, so the whole thing breathes with whatever is
   playing in Aura Soundspace. A row of color swatches recolors
   the material AND drives --view-accent (the same cross-modal
   glow hook cluster.js's setMode uses), so the ambience picker
   doubles as a global mood control.
   Contract: createAmbience(mount, audio) →
     { update(time,dt), resize(), setColor(hex), swatches, dispose() }
   ============================================================ */

import * as THREE from 'three';

export const SWATCHES = ['#54d3e3', '#e6a877', '#75e2bd', '#c98bf0', '#e07d8a'];

const RINGS = 5;
const SEGMENTS = 96;
const POINTS_PER_RING = 40;

export function createAmbience(mount, audio) {
  const stage = mount.querySelector('.amb-stage');
  const canvas = document.createElement('canvas');
  canvas.className = 'amb-canvas';
  stage.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.set(0, 0, 3);

  const group = new THREE.Group();
  scene.add(group);

  const rings = [];
  for (let i = 0; i < RINGS; i++) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array((SEGMENTS + 1) * 3), 3));
    const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(SWATCHES[0]), transparent: true, opacity: 0.5 - i * 0.07 });
    const line = new THREE.LineLoop(geo, mat);
    group.add(line);
    rings.push({ line, mat, baseR: 0.16 + i * 0.15 });
  }

  const pointCount = RINGS * POINTS_PER_RING;
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pointCount * 3), 3));
  const pMat = new THREE.PointsMaterial({ color: new THREE.Color(SWATCHES[0]), size: 0.02, transparent: true, opacity: 0.85, sizeAttenuation: true });
  const points = new THREE.Points(pGeo, pMat);
  group.add(points);

  function resize() {
    const w = Math.max(1, stage.clientWidth);
    const h = Math.max(1, stage.clientHeight);
    renderer.setSize(w, h, false);
  }

  function setColor(hex) {
    const c = new THREE.Color(hex);
    rings.forEach((r) => r.mat.color = c);
    pMat.color = c;
    document.body.style.setProperty('--view-accent', hex);
  }

  function update(time, dt) {
    const bands = audio.playing ? audio.levels(RINGS) : null;

    rings.forEach((r, ringIdx) => {
      const band = bands ? bands[ringIdx] : 0.14 + 0.08 * Math.sin(time * 1.3 + ringIdx);
      const pos = r.line.geometry.attributes.position.array;
      for (let s = 0; s <= SEGMENTS; s++) {
        const a = (s / SEGMENTS) * Math.PI * 2;
        const wobble = Math.sin(a * 5 + time * 1.6 + ringIdx) * band * 0.05;
        const rad = r.baseR + wobble;
        pos[s * 3] = Math.cos(a) * rad;
        pos[s * 3 + 1] = Math.sin(a) * rad;
        pos[s * 3 + 2] = 0;
      }
      r.line.geometry.attributes.position.needsUpdate = true;
    });

    const pPos = points.geometry.attributes.position.array;
    let idx = 0;
    rings.forEach((r, ringIdx) => {
      const band = bands ? bands[ringIdx] : 0.14;
      const spin = time * 0.08 * (ringIdx % 2 === 0 ? 1 : -1);
      for (let p = 0; p < POINTS_PER_RING; p++) {
        const a = (p / POINTS_PER_RING) * Math.PI * 2 + spin;
        const rad = r.baseR + band * 0.07 * Math.sin(a * 3 + time * 2);
        pPos[idx * 3] = Math.cos(a) * rad;
        pPos[idx * 3 + 1] = Math.sin(a) * rad;
        pPos[idx * 3 + 2] = (band - 0.14) * 0.12;
        idx++;
      }
    });
    points.geometry.attributes.position.needsUpdate = true;

    group.rotation.z = time * 0.015;
    renderer.render(scene, camera);
  }

  function dispose() {
    renderer.dispose();
    pGeo.dispose();
    pMat.dispose();
    rings.forEach((r) => { r.line.geometry.dispose(); r.mat.dispose(); });
  }

  resize();
  setColor(SWATCHES[0]);

  return { update, resize, setColor, dispose, swatches: SWATCHES };
}
