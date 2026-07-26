/* ============================================================
   ID.AURA — Vehicle
   Real concept-car GLB (Khronos Car Concept, draco-compressed)
   with cinematic post-fitting:
     · two-tone PBR paint system (body + dark accent roof)
     · emissive light signatures (DRL / tail / indicators)
     · smoked-glass replacement, de-branded interior trim
     · wheel pivot rig (tyre+rim+disc spin, calipers static)
   Falls back to a procedural ID.-style EV if the GLB fails.
   ============================================================ */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const PAINTS = ['#8f9bab', '#0d2d6b', '#7a0f1d', '#d8d4cc', '#0c0e12', '#0e3a34'];

export function createCar() {
  const group = new THREE.Group();
  const rig = new THREE.Group();            // turntable spins this
  group.add(rig);

  const state = {
    ready: false, paint: PAINTS[0], lightsOn: true,
    paintMats: [], accentMats: [], glowMats: [],
    wheelPivots: [], spin: true, loaded: null
  };

  /* ---------- shared materials ---------- */
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: state.paint, metalness: 0.85, roughness: 0.32,
    clearcoat: 1.0, clearcoatRoughness: 0.06, envMapIntensity: 1.5
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0d1826, metalness: 0.9, roughness: 0.08,
    transparent: true, opacity: 0.85, envMapIntensity: 1.1
  });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0x14171d, metalness: 0.6, roughness: 0.5 });
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x0b0d10, roughness: 0.95 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0xb9c2cf, metalness: 1.0, roughness: 0.22, envMapIntensity: 1.6 });
  const drlMat = new THREE.MeshStandardMaterial({ color: 0x0c0f14, emissive: 0xcfeaff, emissiveIntensity: 3.2 });
  const tailMat = new THREE.MeshStandardMaterial({ color: 0x14060a, emissive: 0xff2b3d, emissiveIntensity: 2.6 });
  state.glowMats.push(drlMat, tailMat);

  /* ---------- fallback procedural ID.-style body ---------- */
  function buildBody() {
    const body = new THREE.Group();

    const lower = new THREE.Mesh(new RoundedBoxGeometry(4.62, 0.62, 1.88, 5, 0.26), paintMat);
    lower.position.y = 0.62; body.add(lower);

    const upper = new THREE.Mesh(new RoundedBoxGeometry(3.6, 0.58, 1.74, 5, 0.3), paintMat);
    upper.position.set(-0.12, 1.16, 0); body.add(upper);

    const canopy = new THREE.Mesh(new RoundedBoxGeometry(2.5, 0.5, 1.6, 5, 0.24), glassMat);
    canopy.position.set(-0.2, 1.52, 0); body.add(canopy);

    const drl = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.07, 1.5, 2, 0.03), drlMat);
    drl.position.set(2.3, 0.78, 0); body.add(drl);
    const tail = new THREE.Mesh(new RoundedBoxGeometry(0.06, 0.07, 1.56, 2, 0.03), tailMat);
    tail.position.set(-2.3, 0.84, 0); body.add(tail);

    const logoF = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.03, 24), drlMat);
    logoF.rotation.z = Math.PI / 2; logoF.position.set(2.32, 0.62, 0); body.add(logoF);

    const blade = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.05, 1.7, 2, 0.02), trimMat);
    blade.position.set(2.16, 0.36, 0); body.add(blade);
    const diff = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.1, 1.6, 2, 0.03), trimMat);
    diff.position.set(-2.2, 0.3, 0); body.add(diff);

    const wheelGeo = new THREE.CylinderGeometry(0.365, 0.365, 0.26, 36);
    const rimGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.27, 10);
    [[1.42, 0.82], [1.42, -0.82], [-1.42, 0.82], [-1.42, -0.82]].forEach(([x, z]) => {
      const w = new THREE.Mesh(wheelGeo, tyreMat);
      w.rotation.x = Math.PI / 2; w.position.set(x, 0.365, z); body.add(w);
      const r = new THREE.Mesh(rimGeo, rimMat);
      r.rotation.x = Math.PI / 2; r.position.set(x, 0.365, z); body.add(r);
    });

    body.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
    return body;
  }

  const fallback = buildBody();
  rig.add(fallback);
  state.paintMats.push(paintMat);

  /* ---------- real GLB ---------- */
  const loader = new GLTFLoader();
  const draco = new DRACOLoader().setDecoderPath('assets/draco/');
  loader.setDRACOLoader(draco);

  const loadCbs = [], progCbs = [];

  /* model-space wheel hubs measured from the authored GLB */
  const HUBS = [
    new THREE.Vector3(0.98, 0.38, 1.49),    // front-left
    new THREE.Vector3(-0.98, 0.38, 1.48),   // front-right
    new THREE.Vector3(0.98, 0.38, -1.31),   // rear-left
    new THREE.Vector3(-0.98, 0.38, -1.31)   // rear-right
  ];
  const WHEEL_MATS = /^(tireside|tiretread|rim1|rim2|disc)$/i;

  function glowUp(mat, color, base) {
    mat.emissive = new THREE.Color(color);
    mat.emissiveIntensity = base;
    mat.userData.baseEmissive = base;
    state.glowMats.push(mat);
  }

  function fitModel(model) {
    /* face +X so the side-lens camera sees the profile */
    model.rotation.y = Math.PI / 2;

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const s = 4.62 / Math.max(size.x, size.z);
    model.scale.setScalar(s);
    box.setFromObject(model);
    const c = box.getCenter(new THREE.Vector3());
    model.position.sub(c);
    box.setFromObject(model);
    model.position.y -= box.min.y;          // tyres to floor

    const seen = new Set();
    const wheelMeshes = [];
    const tmpBox = new THREE.Box3(), tmpC = new THREE.Vector3();

    model.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = true;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      const mat = mats[0];
      const mName = (mat.name || '').toLowerCase();
      const oName = (o.name || '').toLowerCase();

      /* de-brand: authored license plate carries the donor logo */
      if (oName.includes('license')) { o.visible = false; return; }

      if (WHEEL_MATS.test(mName)) {
        tmpBox.setFromObject(o); tmpBox.getCenter(tmpC);
        wheelMeshes.push({ mesh: o, center: tmpC.clone(), mat: mName });
      }

      if (seen.has(mat.uuid)) return;
      seen.add(mat.uuid);

      if (mName === 'glass') {
        o.material = glassMat;
        return;
      }
      if (mName.startsWith('paint 1')) {          // body panels
        mat.map = null;
        mat.color.set(state.paint);
        mat.metalness = 0.8; mat.roughness = 0.4;
        if ('clearcoat' in mat) { mat.clearcoat = 0.65; mat.clearcoatRoughness = 0.2; }
        if ('specularIntensity' in mat) mat.specularIntensity = 0.45;
        mat.envMapIntensity = 0.7;
        state.paintMats.push(mat);
      } else if (mName.startsWith('paint 2')) {    // contrast roof / trim
        mat.map = null;
        mat.color.set(state.paint).multiplyScalar(0.22);
        mat.metalness = 0.75; mat.roughness = 0.42;
        if ('specularIntensity' in mat) mat.specularIntensity = 0.4;
        mat.envMapIntensity = 0.6;
        state.accentMats.push(mat);
      } else if (mName === 'headlight') {
        glowUp(mat, 0xcfeaff, 1.35);
      } else if (mName === 'brakelight') {
        glowUp(mat, 0xff2b3d, 1.25);
      } else if (mName === 'signallight') {
        glowUp(mat, 0xffb44d, 0.7);
      } else if (mName === 'mirror') {
        mat.metalness = 1; mat.roughness = 0.05; mat.envMapIntensity = 1.2;
      } else if (mName === 'interior 3 carmine') { // donor red → neutral charcoal
        mat.map = null;
        mat.color.set(0x171b21);
        mat.metalness = 0.2; mat.roughness = 0.7;
      } else if (mName === 'mechanical') {
        mat.color.set(0x0a0d12);
        mat.metalness = 0.5; mat.roughness = 0.6;
      } else if (mName === 'rim1' || mName === 'rim2') {
        mat.color.set(0xb9c2cf);
        mat.metalness = 1; mat.roughness = 0.3; mat.envMapIntensity = 0.9;
      } else if (mName === 'tireside' || mName === 'tiretread') {
        mat.color.set(0x0b0d10); mat.roughness = 0.95; mat.metalness = 0;
      } else if (mat.isMeshStandardMaterial) {
        mat.envMapIntensity = Math.max(mat.envMapIntensity ?? 1, 1.1);
      }
    });

    /* wheel pivot rig — position the hub pivots FIRST, then attach
       (attach preserves world transform, so children stay in place) */
    const pivots = HUBS.map((h) => {
      const p = new THREE.Group();
      p.userData.isWheelPivot = true;     // cloneCar finds these per-instance
      p.position.copy(h);
      model.add(p);
      return p;
    });
    model.updateMatrixWorld(true);
    wheelMeshes.forEach(({ mesh, center }) => {
      let best = 0, bestD = Infinity;
      const inv = new THREE.Matrix4().copy(model.matrixWorld).invert();
      const local = center.clone().applyMatrix4(inv);
      HUBS.forEach((h, i) => {
        const d = local.distanceTo(h);
        if (d < bestD) { bestD = d; best = i; }
      });
      pivots[best].attach(mesh);
    });
    pivots.forEach((p) => state.wheelPivots.push(p));
  }

  loader.load('assets/models/car.glb',
    (gltf) => {
      const model = gltf.scene;
      fitModel(model);
      rig.remove(fallback);
      rig.add(model);
      state.loadedModel = model;            // source for cloneCar()
      state.loaded = 'glb';
      state.ready = true;
      setPaint(state.paint);
      setLights(state.lightsOn);
      loadCbs.forEach((cb) => cb(true));
    },
    (ev) => { if (ev.total) progCbs.forEach((cb) => cb(ev.loaded / ev.total)); },
    () => { state.ready = true; state.loaded = 'procedural'; loadCbs.forEach((cb) => cb(false)); }
  );

  /* ---------- behaviour ---------- */
  function setPaint(hex) {
    state.paint = hex;
    state.paintMats.forEach((m) => m.color.set(hex));
    state.accentMats.forEach((m) => m.color.set(hex).multiplyScalar(0.22));
  }
  function setLights(on) {
    state.lightsOn = on;
    state.glowMats.forEach((m) => {
      m.emissiveIntensity = on ? (m.userData.baseEmissive ?? 2.6) : 0.04;
    });
  }
  function setInterior(on) {
    // drop glass opacity so the cockpit eye-point can read the cabin
    // and see out through the windshield cleanly
    glassMat.transparent = true;
    glassMat.opacity = on ? 0.18 : 0.85;
  }
  function setTurntable(on) { state.spin = on; }

  /* per-frame: `spin` flag drives the turntable (idle auto-rotate);
     dt is derived internally from the elapsed-time argument */
  let lastT = 0;
  function update(t, spin) {
    const dt = Math.min(Math.max(t - lastT, 0), 0.05) || 0.016;
    lastT = t;
    state.spin = !!spin;
    if (spin) rig.rotation.y += dt * 0.28;
    // hover idle
    rig.position.y = Math.sin(t * 0.9) * 0.012;
    // DRL breathing
    if (state.lightsOn) {
      drlMat.emissiveIntensity = 3.0 + Math.sin(t * 2.2) * 0.35;
      const b = 3.0 + Math.sin(t * 2.2) * 0.3;
      state.glowMats.forEach((m) => {
        if ((m.userData.baseEmissive ?? 0) >= 3 && m !== drlMat) m.emissiveIntensity = b;
      });
    }
  }

  setLights(true);

  /* ---------- factory: clone the fitted GLB for traffic / ego reuse ----------
     Shares geometry across instances (cheap), but clones materials per copy so
     each vehicle carries its own paint + independent wheel spin + light state.
     Returns a wrap whose forward is -Z (world), with body-proportion stretch
     applied on world axes so suv/van silhouettes stay correct under the yaw. */
  function cloneCar(opts = {}) {
    if (!state.loadedModel) return null;
    const m = state.loadedModel.clone(true);     // recursive; shares geometry

    /* per-instance material copy + role mapping (paint / accent / glow) */
    const matMap = new Map();
    const bodyMats = [], accentMats = [], glowMats = [];
    m.traverse((o) => {
      if (!o.isMesh) return;
      const orig = Array.isArray(o.material) ? o.material : [o.material];
      const cloned = orig.map((mat) => {
        if (!matMap.has(mat)) {
          const c = mat.clone();
          matMap.set(mat, c);
          if (state.paintMats.includes(mat)) bodyMats.push(c);
          if (state.accentMats.includes(mat)) accentMats.push(c);
          if (state.glowMats.includes(mat)) glowMats.push(c);
        }
        return matMap.get(mat);
      });
      o.material = cloned.length === 1 ? cloned[0] : cloned;
    });

    const wheelPivots = [];
    m.traverse((o) => { if (o.userData.isWheelPivot) wheelPivots.push(o); });

    /* wrap = yaw to face -Z + body-stretch on world axes.
       wrap local X→world -Z (length), Y→up (height), Z→world X (width),
       so length stretch lives on scale.x, height on scale.y, width on scale.z. */
    const wrap = new THREE.Group();
    wrap.add(m);
    wrap.rotation.y = -Math.PI / 2;             // fitted model faces +X → now -Z
    if (opts.shape === 'suv') wrap.scale.set(1.0, 1.12, 1.02);
    else if (opts.shape === 'van') wrap.scale.set(1.12, 1.32, 1.04);

    const hex = opts.paint ?? state.paint;
    bodyMats.forEach((mat) => mat.color.set(hex));
    accentMats.forEach((mat) => mat.color.set(hex).multiplyScalar(0.22));

    return { group: wrap, wheelPivots, glowMats, bodyMats, accentMats };
  }

  return {
    group, rig, state, update, setPaint, setLights, setTurntable, setInterior,
    cloneCar,
    onLoad: (cb) => (state.ready ? cb(state.loaded === 'glb') : loadCbs.push(cb)),
    onProgress: (cb) => progCbs.push(cb)
  };
}

export { PAINTS };
