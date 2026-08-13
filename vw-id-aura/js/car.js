/* ============================================================
   ID.AURA — Vehicle
   Real concept-car GLB (Khronos Car Concept, Draco + WebP)
   with cinematic post-fitting:
     · two-tone PBR paint system (body + dark accent roof)
     · emissive light signatures (DRL / tail / indicators)
     · smoked-glass replacement, de-branded interior trim
     · wheel pivot rig (tyre+rim+disc spin, calipers static)
   Keeps the procedural ID.-style EV hidden unless the GLB genuinely fails,
   so a slow connection never presents the rough backup as the final design.
   ============================================================ */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const PAINTS = ['#0d2d6b', '#8f9bab', '#7a0f1d', '#d8d4cc', '#0c0e12', '#0e3a34'];

export function createCar() {
  const group = new THREE.Group();
  const rig = new THREE.Group();            // turntable spins this
  group.add(rig);

  const state = {
    ready: false, paint: PAINTS[0], lightsOn: true,
    paintMats: [], accentMats: [], glowMats: [],
    wheelPivots: [], spin: true, loaded: null,
    loadProgress: 0, revealAt: Infinity
  };

  /* ---------- shared materials ---------- */
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: state.paint, metalness: 0.82, roughness: 0.2,
    clearcoat: 1.0, clearcoatRoughness: 0.045, envMapIntensity: 1.7
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    name: 'Glass', color: 0x07111b, metalness: 0, roughness: 0.045,
    transparent: true, opacity: 0.5, transmission: 0.18,
    ior: 1.45, thickness: 0.025, envMapIntensity: 1.25,
    depthWrite: false
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
  fallback.visible = false;
  rig.add(fallback);
  state.paintMats.push(paintMat);

  // Real light projection makes the global headlight control legible:
  // the authored emissive lamp texture now also throws a restrained beam
  // across the showroom floor and premiere wall.
  const headlightSpots = [-0.56, 0.56].map((z) => {
    const light = new THREE.SpotLight(0xcfeaff, 5, 26, 0.18, 0.82, 1.35);
    light.position.set(2.06, 0.72, z);
    light.target.position.set(10, 0.18, z * 1.35);
    rig.add(light, light.target);
    light.visible = false;
    return light;
  });

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
    /* The donor GLB is authored with both front-wheel assemblies turned by
       roughly 30 degrees. Neutralise that baked steering pose before fitting
       or building roll pivots: each front assembly inherits the straight
       wheel plane of the rear assembly on the same side while retaining its
       own hub position. */
    const frontLeft = model.getObjectByName('WheelFrontL');
    const frontRight = model.getObjectByName('WheelFrontR');
    const rearLeft = model.getObjectByName('WheelRearL');
    const rearRight = model.getObjectByName('WheelRearR');
    if (frontLeft && rearLeft && frontLeft.parent === rearLeft.parent) {
      frontLeft.quaternion.copy(rearLeft.quaternion);
    }
    if (frontRight && rearRight && frontRight.parent === rearRight.parent) {
      frontRight.quaternion.copy(rearRight.quaternion);
    }
    model.updateMatrixWorld(true);

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
      o.receiveShadow = true;
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
        mat.metalness = 0.82; mat.roughness = 0.2;
        if ('clearcoat' in mat) { mat.clearcoat = 1; mat.clearcoatRoughness = 0.045; }
        if ('specularIntensity' in mat) mat.specularIntensity = 0.72;
        mat.envMapIntensity = 1.55;
        state.paintMats.push(mat);
      } else if (mName.startsWith('paint 2')) {    // contrast roof / trim
        mat.map = null;
        mat.color.set(state.paint).multiplyScalar(0.22);
        mat.metalness = 0.76; mat.roughness = 0.16;
        if ('clearcoat' in mat) { mat.clearcoat = 1; mat.clearcoatRoughness = 0.06; }
        if ('specularIntensity' in mat) mat.specularIntensity = 0.7;
        mat.envMapIntensity = 1.35;
        state.accentMats.push(mat);
      } else if (mName === 'headlight') {
        glowUp(mat, 0xcfeaff, 1.35);
      } else if (mName === 'brakelight') {
        glowUp(mat, 0xff2b3d, 1.25);
      } else if (mName === 'signallight') {
        glowUp(mat, 0xffb44d, 0.7);
      } else if (mName === 'mirror') {
        mat.metalness = 1; mat.roughness = 0.04; mat.envMapIntensity = 1.6;
      } else if (mName === 'interior 3 carmine') { // donor red → neutral charcoal
        mat.map = null;
        mat.color.set(0x171b21);
        mat.metalness = 0.2; mat.roughness = 0.7;
      } else if (mName === 'mechanical') {
        mat.color.set(0x0a0d12);
        mat.metalness = 0.5; mat.roughness = 0.6;
      } else if (mName === 'rim1' || mName === 'rim2') {
        mat.color.set(0xb9c2cf);
        mat.metalness = 1; mat.roughness = 0.18; mat.envMapIntensity = 1.35;
      } else if (mName === 'tireside' || mName === 'tiretread') {
        mat.color.set(0x0b0d10); mat.roughness = 0.95; mat.metalness = 0;
      } else if (mat.isMeshStandardMaterial) {
        mat.envMapIntensity = Math.max(mat.envMapIntensity ?? 1, 1.1);
      }
    });

    /* Wheel pivot rig. HUBS only classify the four wheel assemblies; each
       pivot is placed at the measured centre of its actual meshes. The old
       hard-coded pivot positions were slightly eccentric, so rolling a wheel
       made it orbit and appear to steer or wobble. */
    const inv = new THREE.Matrix4().copy(model.matrixWorld).invert();
    const wheelClusters = HUBS.map(() => []);
    wheelMeshes.forEach((wheel) => {
      const localCenter = wheel.center.clone().applyMatrix4(inv);
      let best = 0, bestD = Infinity;
      HUBS.forEach((hub, index) => {
        const distance = localCenter.distanceTo(hub);
        if (distance < bestD) {
          bestD = distance;
          best = index;
        }
      });
      wheelClusters[best].push({ ...wheel, localCenter });
    });

    const pivots = wheelClusters.map((cluster, index) => {
      const p = new THREE.Group();
      p.userData.isWheelPivot = true;
      p.userData.wheelIndex = index;
      if (cluster.length) {
        const centre = cluster.reduce(
          (sum, wheel) => sum.add(wheel.localCenter),
          new THREE.Vector3()
        ).multiplyScalar(1 / cluster.length);
        p.position.copy(centre);
      } else {
        p.position.copy(HUBS[index]);
      }
      model.add(p);
      return p;
    });
    model.updateMatrixWorld(true);
    wheelClusters.forEach((cluster, index) => {
      cluster.forEach(({ mesh }) => pivots[index].attach(mesh));
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
      state.loadProgress = 1;
      state.revealAt = null;
      setPaint(state.paint);
      setLights(state.lightsOn);
      loadCbs.forEach((cb) => cb(true));
    },
    (ev) => {
      if (!ev.total) return;
      state.loadProgress = ev.loaded / ev.total;
      progCbs.forEach((cb) => cb(state.loadProgress, ev.loaded, ev.total));
    },
    (error) => {
      console.warn('ID.AURA vehicle model failed to load; enabling labelled procedural fallback.', error);
      fallback.visible = true;
      state.ready = true;
      state.loaded = 'procedural';
      state.revealAt = null;
      setLights(state.lightsOn);
      loadCbs.forEach((cb) => cb(false));
    }
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
    headlightSpots.forEach((light) => {
      light.intensity = on ? 5 : 0;
      light.visible = state.ready && on;
    });
  }
  function setInterior(on) {
    // drop glass opacity so the cockpit eye-point can read the cabin
    // and see out through the windshield cleanly
    glassMat.transparent = true;
    glassMat.opacity = on ? 0.12 : 0.5;
    glassMat.transmission = on ? 0.42 : 0.18;
  }
  function setTurntable(on) { state.spin = on; }

  /* per-frame: `spin` flag drives the turntable (idle auto-rotate);
     dt is derived internally from the elapsed-time argument */
  let lastT = 0;
  function update(t, spin) {
    const dt = Math.min(Math.max(t - lastT, 0), 0.05) || 0.016;
    lastT = t;
    state.spin = !!spin;
    if (spin) rig.rotation.y += dt * 0.12;
    // A slow, grounded reveal replaces the old instant model swap. The tiny
    // breathing offset keeps the turntable alive without making the car float.
    if (state.ready && state.revealAt === null) state.revealAt = t;
    const reveal = THREE.MathUtils.clamp((t - state.revealAt) / 1.65, 0, 1);
    const revealEase = 1 - Math.pow(1 - reveal, 4);
    rig.scale.setScalar(0.94 + revealEase * 0.06);
    rig.position.y = -0.055 * (1 - revealEase) + Math.sin(t * 0.72) * 0.004;
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
    // fitted model already yaws +π/2 (faces +X for the showroom side lens).
    // +π/2 here → net π → the nose flips from +Z to -Z (forward in autonomous).
    wrap.rotation.y = Math.PI / 2;
    if (opts.shape === 'suv') wrap.scale.set(1.0, 1.12, 1.02);
    else if (opts.shape === 'van') wrap.scale.set(1.12, 1.32, 1.04);

    const hex = opts.paint ?? state.paint;
    bodyMats.forEach((mat) => mat.color.set(hex));
    accentMats.forEach((mat) => mat.color.set(hex).multiplyScalar(0.22));

    return { group: wrap, wheelPivots, glowMats, bodyMats, accentMats };
  }

  /* ---------- cel-shaded toon twin (Console 3D garage) ----------
     Shares geometry with the fitted GLB but rebuilds materials as
     MeshToonMaterial colour bands — the Rivian-style stylised 3D the
     plan calls for, visually distinct from the Showroom's photoreal
     PBR car. The clone keeps independent paint + lamp state. */
  const toonGradient = (() => {
    const data = new Uint8Array([68, 168, 255]);
    const tex = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;
    return tex;
  })();

  function createToonClone(opts = {}) {
    const base = cloneCar(opts);
    if (!base) return null;
    const bodyHex = opts.paint ?? state.paint;
    const accentHex = new THREE.Color(bodyHex).multiplyScalar(0.32).getHex();
    const toonMats = [], toonBodyMats = [], toonAccentMats = [];
    base.group.traverse((o) => {
      if (!o.isMesh) return;
      const orig = Array.isArray(o.material) ? o.material[0] : o.material;
      const name = (orig.name || '').toLowerCase();

      // emissive lamps stay photoreal so toggling them still reads as a glow;
      // license plate stays hidden (de-brand).
      if (name.includes('head') || name.includes('brake') || name.includes('signal') ||
          name === 'light' || name === 'license') return;

      let color, role;
      if (name.startsWith('paint 1')) { color = bodyHex; role = 'body'; }
      else if (name.startsWith('paint 2')) { color = accentHex; role = 'accent'; }
      else if (name === 'glass') { color = 0x14202e; role = 'glass'; }
      else if (name.includes('tire')) { color = 0x0a0c10; role = 'tyre'; }
      else if (name === 'rim1' || name === 'rim2' || name === 'disc') { color = 0xc4cdda; role = 'rim'; }
      else if (name === 'mirror') { color = 0xd6dde6; role = 'mirror'; }
      else if (name === 'mechanical') { color = 0x10141a; role = 'mechanical'; }
      else if (name.includes('interior') || name.includes('carmine') || name.includes('seat') || name.includes('chrome')) {
        color = 0x1a1e24; role = 'interior';
      } else {
        // catch-all: every remaining mesh becomes toon-banded too, otherwise
        // the car reads as half-photoreal and the cel-shading falls apart.
        color = (orig.color && orig.color.getHex() !== 0xffffff)
          ? orig.color.clone()
          : new THREE.Color(0x23272e);
        role = 'other';
      }

      const isGlass = role === 'glass';
      const toon = new THREE.MeshToonMaterial({
        color,
        gradientMap: toonGradient,
        transparent: isGlass,
        opacity: isGlass ? 0.55 : 1
      });
      toon.envMapIntensity = 0;
      toon.userData.role = role;
      o.material = toon;
      toonMats.push(toon);
      if (role === 'body') toonBodyMats.push(toon);
      else if (role === 'accent') toonAccentMats.push(toon);
    });

    /* authored door / hatch / charge-flap meshes (if any), so the Console
       garage can swing them open on tap. */
    const doors = [];
    base.group.traverse((o) => {
      const n = (o.name || '').toLowerCase();
      if (n.includes('door') || n.includes('hatch') || n.includes('trunk') || n.includes('charge')) {
        doors.push(o);
      }
    });

    return { ...base, toonMats, toonBodyMats, toonAccentMats, doors };
  }

  return {
    group, rig, state, update, setPaint, setLights, setTurntable, setInterior,
    cloneCar, createToonClone,
    onLoad: (cb) => (state.ready ? cb(state.loaded === 'glb') : loadCbs.push(cb)),
    onProgress: (cb) => progCbs.push(cb)
  };
}

export { PAINTS };
