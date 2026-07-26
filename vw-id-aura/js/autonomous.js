/* ============================================================
   ID.AURA — Autonomous
   L3 perception visualisation: rotating LiDAR sweep with a
   live point cloud (ground rings + points sampled on detected
   objects), multi-lane dynamic traffic with detection boxes
   and distance labels, a crossing pedestrian, radar FOV fan
   and a flowing planned-path ribbon. All live, all reactive.

   Traffic + ego now reuse the real concept-car GLB (via
   car.cloneCar): sedan / SUV / VAN silhouettes from the same
   fitted PBR model, with independent paint, wheel spin,
   suspension bob, lane-change blinkers and brake flare.
   The procedural miniCar stays as a pre-load stand-in only.
   ============================================================ */

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const CYAN = 0x38f0ff, AMBER = 0xffb44d, VIOLET = 0x7b5bff, GREEN = 0x4dff9e;

/* ---------- helpers ---------- */
function labelSprite(text, color = '#38f0ff') {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.font = '600 26px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = color; ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(text, 128, 34);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({
    map: tex, transparent: true, depthWrite: false, opacity: 0.95
  }));
  sp.scale.set(4.6, 1.15, 1);
  return sp;
}

function setLabel(sp, text, color) {
  const cv = sp.material.map.image;
  const ctx = cv.getContext('2d');
  ctx.clearRect(0, 0, 256, 64);
  ctx.font = '600 26px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = color; ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(text, 128, 34);
  sp.material.map.needsUpdate = true;
}

function miniCar(bodyColor = 0x1a2432) {
  // sleeker fastback silhouette: two-tier body + tapered glass house
  // + exposed wheels — reads as a real car at ADAS distance, not a crate.
  // Now only a pre-load stand-in; replaced by the real GLB once loaded.
  const g = new THREE.Group();
  const paint = new THREE.MeshStandardMaterial({
    color: bodyColor, metalness: 0.85, roughness: 0.3, envMapIntensity: 1.4
  });
  const glass = new THREE.MeshStandardMaterial({
    color: 0x070c14, metalness: 0.5, roughness: 0.08, envMapIntensity: 1.8
  });
  const tyreMat = new THREE.MeshStandardMaterial({ color: 0x070809, roughness: 0.95 });
  const rimMat = new THREE.MeshStandardMaterial({ color: 0x9aa6b3, metalness: 1, roughness: 0.3 });

  const lower = new THREE.Mesh(new RoundedBoxGeometry(1.95, 0.5, 4.3, 4, 0.18), paint);
  lower.position.y = 0.42; g.add(lower);
  const upper = new THREE.Mesh(new RoundedBoxGeometry(1.78, 0.34, 3.7, 4, 0.22), paint);
  upper.position.set(0, 0.74, -0.05); g.add(upper);
  const cabin = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.42, 1.95, 4, 0.18), glass);
  cabin.position.set(0, 1.02, -0.28); g.add(cabin);

  const wheelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.24, 18);
  const rimGeo = new THREE.CylinderGeometry(0.19, 0.19, 0.25, 8);
  [[0.82, 1.42], [0.82, -1.38], [-0.82, 1.42], [-0.82, -1.38]].forEach(([x, z]) => {
    const w = new THREE.Mesh(wheelGeo, tyreMat);
    w.rotation.z = Math.PI / 2; w.position.set(x, 0.34, z); g.add(w);
    const r = new THREE.Mesh(rimGeo, rimMat);
    r.rotation.z = Math.PI / 2; r.position.set(x, 0.34, z); g.add(r);
  });

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1.55, 0.06, 0.05),
    new THREE.MeshBasicMaterial({ color: 0xdcefff })
  );
  head.position.set(0, 0.6, -2.16); g.add(head);
  const tailBar = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.07, 0.05),
    new THREE.MeshBasicMaterial({ color: 0xff2b3d })
  );
  tailBar.position.set(0, 0.66, 2.16); g.add(tailBar);

  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  return g;
}

function detectBox(w, h, d, color) {
  const geo = new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
  const box = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.9
  }));
  // corner brackets feel — second slightly larger, fainter
  const outer = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(w * 1.12, h * 1.12, d * 1.12)),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 })
  );
  const g = new THREE.Group();
  g.add(box, outer);
  return g;
}

/* articulated pedestrian: head / torso / hips / swinging arms & legs.
   Reads as a person at ADAS distance instead of a faceless capsule. */
function buildPedestrian() {
  const g = new THREE.Group();
  const jacket = new THREE.MeshStandardMaterial({ color: 0x3a4452, roughness: 0.75 });
  const pants  = new THREE.MeshStandardMaterial({ color: 0x1c2128, roughness: 0.85 });
  const skin   = new THREE.MeshStandardMaterial({ color: 0xc9a986, roughness: 0.6 });
  const shoe   = new THREE.MeshStandardMaterial({ color: 0x0e1116, roughness: 0.5 });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 14), skin);
  head.position.y = 1.74; g.add(head);

  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.17, 0.48, 4, 12), jacket);
  torso.position.y = 1.26; g.add(torso);

  const hips = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.1, 4, 10), pants);
  hips.position.y = 0.86; g.add(hips);

  // arms — pivots at the shoulder so they can swing on the walk cycle
  const armGeo = new THREE.CapsuleGeometry(0.055, 0.46, 4, 8);
  const mkArm = (sx) => {
    const piv = new THREE.Group(); piv.position.set(sx * 0.21, 1.5, 0);
    const m = new THREE.Mesh(armGeo, jacket); m.position.y = -0.25; piv.add(m);
    g.add(piv); return piv;
  };
  const armL = mkArm(1), armR = mkArm(-1);

  // legs — pivots at the hip
  const legGeo = new THREE.CapsuleGeometry(0.07, 0.52, 4, 8);
  const shoeGeo = new THREE.BoxGeometry(0.1, 0.06, 0.22);
  const mkLeg = (sx) => {
    const piv = new THREE.Group(); piv.position.set(sx * 0.09, 0.82, 0);
    const m = new THREE.Mesh(legGeo, pants); m.position.y = -0.28; piv.add(m);
    const s = new THREE.Mesh(shoeGeo, shoe); s.position.set(0, -0.56, 0.05); piv.add(s);
    g.add(piv); return piv;
  };
  const legL = mkLeg(1), legR = mkLeg(-1);

  g.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  g.userData = { arms: [armL, armR], legs: [legL, legR] };
  return g;
}

/* ============================================================ */
export function createAutonomous(view, layer, car) {
  const { camera, controls } = view;
  const group = new THREE.Group();
  group.visible = false;
  view.scene.add(group);

  /* ---------- road ---------- */
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 220),
    new THREE.MeshStandardMaterial({
      color: 0x141f2e, roughness: 0.82, metalness: 0.15, envMapIntensity: 0.5
    })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.02, -60);
  group.add(road);

  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x2a4a6a, transparent: true, opacity: 0.8 });
  for (const x of [-9, 9]) {
    const e = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 220), edgeMat);
    e.rotation.x = -Math.PI / 2;
    e.position.set(x, 0.04, -60);
    group.add(e);
  }

  // flowing centre dashes
  const dashes = [];
  const dashMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 26; i++) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 2.4), dashMat.clone());
    d.rotation.x = -Math.PI / 2;
    d.position.set(0, 0.045, 14 - i * 6);
    group.add(d);
    dashes.push(d);
  }
  const laneMat = new THREE.MeshBasicMaterial({ color: 0x1d3a5c, transparent: true, opacity: 0.4 });
  for (const x of [-4.5, 4.5]) {
    for (let i = 0; i < 26; i++) {
      const d = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 1.8), laneMat);
      d.rotation.x = -Math.PI / 2;
      d.position.set(x, 0.045, 14 - i * 6);
      group.add(d);
      dashes.push(d);
    }
  }

  // road-side beacon posts — luminous corridor that gives the scene depth
  // and kills the empty-void read from the top-down camera
  const beaconMat = new THREE.MeshBasicMaterial({ color: CYAN });
  const beaconGeo = new THREE.SphereGeometry(0.11, 8, 8);
  const glowMat = new THREE.MeshBasicMaterial({
    color: CYAN, transparent: true, opacity: 0.28,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const glowGeo = new THREE.SphereGeometry(0.34, 10, 10);
  for (const x of [-9.8, 9.8]) {
    for (let z = 14; z >= -118; z -= 13) {
      const b = new THREE.Mesh(beaconGeo, beaconMat);
      b.position.set(x, 0.55, z); group.add(b);
      const g = new THREE.Mesh(glowGeo, glowMat);
      g.position.set(x, 0.55, z); group.add(g);
    }
  }

  /* ---------- vehicle factory: GLB clone, miniCar fallback ---------- */
  function buildVehicle(spec) {
    const useGlb = !!(car && car.state && car.state.loadedModel && typeof car.cloneCar === 'function');
    let mesh, wheelPivots = [], brakeMats = [], signalMats = [];
    if (useGlb) {
      const v = car.cloneCar({ paint: spec.paint, shape: spec.shape });
      mesh = v.group;
      wheelPivots = v.wheelPivots;
      brakeMats = v.brakeMats || [];
      signalMats = v.signalMats || [];
    } else {
      mesh = miniCar(spec.paint);
    }
    const dims = spec.shape === 'van' ? { w: 2.4, h: 1.55, d: 5.0 }
              : spec.shape === 'suv' ? { w: 2.15, h: 1.35, d: 4.6 }
              : { w: 2.0, h: 0.95, d: 4.4 };
    return { mesh, wheelPivots, brakeMats, signalMats, dims };
  }

  /* ---------- ego vehicle ---------- */
  const egoSpec = { paint: 0x0a1f4a, shape: 'sedan', name: 'EGO' };
  let egoV = buildVehicle(egoSpec);
  const ego = new THREE.Group();
  ego.add(egoV.mesh);
  ego.position.set(0, 0, 6);
  group.add(ego);
  // LiDAR pod on roof — sits above whichever body is fitted
  const pod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.2, 0.14, 20),
    new THREE.MeshStandardMaterial({ color: 0x111722, metalness: 0.9, roughness: 0.3 })
  );
  pod.position.set(0, 1.5, -0.15);
  ego.add(pod);
  let egoWheel = egoV.wheelPivots;

  /* ---------- radar FOV fan ---------- */
  const fov = new THREE.Mesh(
    new THREE.CircleGeometry(26, 40, Math.PI / 2 - 0.62, 1.24),
    new THREE.MeshBasicMaterial({
      color: CYAN, transparent: true, opacity: 0.05,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    })
  );
  fov.rotation.x = -Math.PI / 2;
  fov.rotation.z = Math.PI / 2;         // aim forward (-Z world)
  fov.position.set(0, 0.06, 6);
  group.add(fov);

  /* ---------- LiDAR: sweep wedge + point cloud ---------- */
  const sweep = new THREE.Mesh(
    new THREE.CircleGeometry(20, 48, -0.16, 0.32),
    new THREE.MeshBasicMaterial({
      color: CYAN, transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    })
  );
  sweep.rotation.x = -Math.PI / 2;
  sweep.position.set(0, 0.07, 6);
  group.add(sweep);

  // point cloud: ground rings + object surface samples
  const P_GROUND = 900;
  const agents = [];
  const trafficSpec = [
    { lane: -4.5, z: -22, speed: -7.5, paint: 0x8a98a8, shape: 'sedan', name: 'CAR' },
    { lane: -4.5, z: -58, speed: -7.5, paint: 0xe9e4d6, shape: 'van', name: 'VAN' },
    { lane:  4.5, z: -34, speed:  9.0, paint: 0x1a2b3a, shape: 'suv',  name: 'CAR', oncoming: true },
    { lane:  4.5, z: -78, speed:  9.0, paint: 0x2a2230, shape: 'van',  name: 'VAN', oncoming: true },
    { lane:  0,   z: -30, speed: -5.5, paint: 0x6b1620, shape: 'sedan', name: 'CAR' }
  ];

  // object cloud points are allocated after agents exist
  const P_OBJ = trafficSpec.length * 70 + 60;
  const P_TOTAL = P_GROUND + P_OBJ;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(P_TOTAL * 3);
  const pCol = new Float32Array(P_TOTAL * 3);
  const pMeta = []; // {ang, rad, agent?} for fade math
  const cCyan = new THREE.Color(CYAN);
  const cAmber = new THREE.Color(AMBER);

  for (let i = 0; i < P_GROUND; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = 2.5 + Math.pow(Math.random(), 0.7) * 21;
    pPos[i * 3] = Math.sin(ang) * rad;
    pPos[i * 3 + 1] = 0.06;
    pPos[i * 3 + 2] = 6 - Math.cos(ang) * rad;
    pMeta.push({ ang: Math.atan2(Math.sin(ang), Math.cos(ang)), rad, obj: false });
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.22, vertexColors: true, transparent: true, opacity: 0.95,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  }));
  group.add(points);

  let objCursor = P_GROUND;
  function scatterOnAgent(agent, count) {
    const { w, h, d } = agent.dims;
    for (let i = 0; i < count; i++) {
      const face = Math.random();
      let lx, ly, lz;
      if (face < 0.5) {          // roof/hood
        lx = (Math.random() - 0.5) * w;
        ly = 0.4 + Math.random() * h;
        lz = (Math.random() - 0.5) * d;
      } else {                   // sides
        lx = (Math.random() < 0.5 ? -0.5 : 0.5) * w;
        ly = Math.random() * (h + 0.4);
        lz = (Math.random() - 0.5) * d;
      }
      agent.localPts.push(new THREE.Vector3(lx, ly, lz));
      pMeta.push({ obj: true, agent, idx: objCursor });
      objCursor++;
    }
  }

  /* ---------- traffic agents ---------- */
  function spawnAgent(spec) {
    const v = buildVehicle(spec);
    const body = new THREE.Group();          // suspension / pitch carrier
    body.add(v.mesh);
    body.position.set(spec.lane, 0, spec.z);
    if (spec.oncoming) body.rotation.y = Math.PI;
    group.add(body);

    const { dims } = v;
    const box = detectBox(dims.w + 0.5, dims.h + 0.9, dims.d + 0.6, AMBER);
    box.position.y = (dims.h + 0.9) / 2;
    body.add(box);
    const label = labelSprite(`${spec.name} · --m`, '#ffb44d');
    label.position.set(0, dims.h + 2.2, 0);
    body.add(label);

    const agent = {
      ...spec, body, mesh: v.mesh, wheelPivots: v.wheelPivots,
      brakeMats: v.brakeMats, signalMats: v.signalMats, dims,
      box, label, localPts: [],
      flicker: Math.random() * Math.PI * 2,
      lane: spec.lane, targetLane: spec.lane, laneTimer: Math.random() * 5,
      bob: Math.random() * Math.PI * 2,
      curSpeed: spec.speed
    };
    agents.push(agent);
    scatterOnAgent(agent, spec.name === 'VAN' ? 90 : 70);
    return agent;
  }

  // re-fit an agent with the real GLB once it is available (late load)
  function upgradeAgent(agent) {
    const z = agent.body.position.z;
    const yaw = agent.body.rotation.y;
    group.remove(agent.body);
    const v = buildVehicle(agent);
    const body = new THREE.Group();
    body.add(v.mesh);
    body.position.set(agent.lane, 0, z);
    body.rotation.y = yaw;
    group.add(body);
    const { dims } = v;
    const box = detectBox(dims.w + 0.5, dims.h + 0.9, dims.d + 0.6, AMBER);
    box.position.y = (dims.h + 0.9) / 2;
    body.add(box);
    agent.label.position.set(0, dims.h + 2.2, 0);
    body.add(agent.label);
    agent.body = body; agent.mesh = v.mesh;
    agent.wheelPivots = v.wheelPivots;
    agent.brakeMats = v.brakeMats; agent.signalMats = v.signalMats;
    agent.dims = dims; agent.box = box;
    agent.localPts = [];
    scatterOnAgent(agent, agent.name === 'VAN' ? 90 : 70);
  }

  for (const spec of trafficSpec) spawnAgent(spec);

  /* ---------- pedestrian (articulated figure) ---------- */
  const ped = buildPedestrian();
  const pedBox = detectBox(0.9, 2.0, 0.9, CYAN);
  pedBox.position.y = 1.0;
  ped.add(pedBox);
  const pedLabel = labelSprite('PED · 18m', '#38f0ff');
  pedLabel.position.set(0, 2.9, 0);
  ped.add(pedLabel);
  ped.position.set(-8, 0, -14);
  ped.rotation.y = Math.PI / 2;          // face the crossing direction (+x)
  group.add(ped);
  const pedAgent = {
    mesh: ped, dims: { w: 0.6, h: 1.8, d: 0.5 }, localPts: [],
    isPed: true
  };
  scatterOnAgent(pedAgent, 60);

  /* ---------- planned path ribbon ---------- */
  const pathCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.1, 4),
    new THREE.Vector3(0, 0.1, -8),
    new THREE.Vector3(-1.2, 0.1, -22),
    new THREE.Vector3(-4.2, 0.1, -38),
    new THREE.Vector3(-4.5, 0.1, -60)
  ]);
  const ribbon = new THREE.Mesh(
    new THREE.TubeGeometry(pathCurve, 60, 0.09, 6, false),
    new THREE.MeshBasicMaterial({
      color: GREEN, transparent: true, opacity: 0.16,
      blending: THREE.AdditiveBlending, depthWrite: false
    })
  );
  group.add(ribbon);
  const FLOW = 30;
  const flowGeo = new THREE.BoxGeometry(0.22, 0.06, 0.95);
  const flowMat = new THREE.MeshBasicMaterial({
    color: GREEN, transparent: true, opacity: 1.0,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const flow = new THREE.InstancedMesh(flowGeo, flowMat, FLOW);
  group.add(flow);
  const dummy = new THREE.Object3D();

  /* ---------- late-load: swap stand-ins for the real GLB ---------- */
  if (car && typeof car.onLoad === 'function') {
    car.onLoad((isGlb) => {
      if (!isGlb) return;                     // procedural fallback kept
      for (const a of agents) upgradeAgent(a);
      // ego
      ego.remove(egoV.mesh);
      egoV = buildVehicle(egoSpec);
      ego.add(egoV.mesh);
      egoWheel = egoV.wheelPivots;
    });
  }

  /* ---------- DOM HUD ---------- */
  layer.innerHTML = `
    <div class="autonomous">
      <div class="auto-top">
        <div class="auto-level"><span class="auto-dot"></span>L3 · TRAFFIC PILOT</div>
        <div class="auto-percept">OBJECTS <b data-a="obj">6</b> · FUSION <b data-a="fus">CAM×8 RADAR×5 LIDAR×1</b></div>
      </div>
      <div class="auto-side">
        <div class="auto-tag" style="--c:#ffb44d" data-a="t1">CAR · -- m</div>
        <div class="auto-tag" style="--c:#ffb44d" data-a="t2">CAR · -- m</div>
        <div class="auto-tag" style="--c:#38f0ff" data-a="ped">PEDESTRIAN · -- m</div>
        <div class="auto-tag" style="--c:#4dff9e">PATH · LANE CHANGE PLANNED</div>
      </div>
      <div class="auto-foot">
        <span><i>EGO SPEED</i><b data-a="spd">62<u>km/h</u></b></span>
        <span><i>LEAD GAP</i><b data-a="gap">--</b></span>
        <span><i>TTC</i><b class="ok" data-a="ttc">—<u>s</u></b></span>
        <span><i>HANDOVER</i><b class="ok">READY</b></span>
      </div>
    </div>`;
  const A = (k) => layer.querySelector(`[data-a="${k}"]`);

  /* ---------- per-frame ---------- */
  const sweepState = { ang: 0 };
  let lastHud = 0;
  const tmp = new THREE.Vector3();

  function lidarUpdate(t) {
    sweepState.ang = (t * 1.35) % (Math.PI * 2);
    sweep.rotation.z = -sweepState.ang;
    const sa = sweepState.ang;
    for (let i = 0; i < P_GROUND; i++) {
      const meta = pMeta[i];
      const dAng = ((meta.ang - sa) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const head = Math.max(0, 1 - dAng / 1.4);          // sharp leading edge
      const tail = Math.max(0, 1 - dAng / 5.5) * 0.5;     // soft persistent trail
      const k = 0.34 + head * head * 0.66 + tail * 0.3;
      pCol[i * 3] = cCyan.r * k;
      pCol[i * 3 + 1] = cCyan.g * k;
      pCol[i * 3 + 2] = cCyan.b * k;
    }
  }

  // Simpler robust object-cloud writer (recomputed every frame)
  function objectCloud(sa) {
    let cursor = P_GROUND;
    const all = [...agents, pedAgent];
    for (const agent of all) {
      agent.mesh.updateMatrixWorld();
      for (const lp of agent.localPts) {
        if (cursor >= P_TOTAL) break;
        tmp.copy(lp).applyMatrix4(agent.mesh.matrixWorld);
        pPos[cursor * 3] = tmp.x; pPos[cursor * 3 + 1] = tmp.y; pPos[cursor * 3 + 2] = tmp.z;
        const ang = Math.atan2(tmp.x, 6 - tmp.z);
        let dAng = ((ang - sa) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const head = Math.max(0, 1 - dAng / 1.0);
        const tail = Math.max(0, 1 - dAng / 4.0) * 0.5;
        const k = 0.22 + head * head * 0.78 + tail * 0.25;
        const base = agent.isPed ? cCyan : cAmber;
        pCol[cursor * 3] = base.r * k; pCol[cursor * 3 + 1] = base.g * k; pCol[cursor * 3 + 2] = base.b * k;
        cursor++;
      }
    }
    pGeo.attributes.position.needsUpdate = true;
  }

  function update(t, dt) {
    // dashes flow
    for (const d of dashes) {
      d.position.z += dt * 7;
      if (d.position.z > 16) d.position.z -= 156;
    }
    // traffic
    let leadGap = Infinity;
    for (const a of agents) {
      /* smooth lane changes (same-direction only) — eased, not snapped */
      a.laneTimer -= dt;
      if (a.laneTimer <= 0) {
        a.laneTimer = 5 + Math.random() * 5;
        if (!a.oncoming) {
          a.targetLane = (a.lane < -2) ? (Math.random() < 0.4 ? 0 : -4.5) : -4.5;
        }
      }
      a.lane += (a.targetLane - a.lane) * Math.min(1, dt * 1.1);
      const changingLane = Math.abs(a.targetLane - a.lane) > 0.06;

      /* longitudinal travel + wrap */
      a.body.position.z += a.curSpeed * dt;
      a.body.position.x = a.lane;
      if (!a.oncoming && a.body.position.z < -140) a.body.position.z = 20;
      if (a.oncoming && a.body.position.z > 30) a.body.position.z = -150;

      /* wheel spin tied to speed */
      const spin = a.curSpeed * dt * 1.8;
      for (const p of a.wheelPivots) p.rotation.x += spin;

      /* suspension bob + pitch under braking (nose dive) — applied to the
         fitted mesh only, so the detection box / label stay steady */
      a.bob += dt;
      const bobY = Math.sin(a.bob * 7 + a.flicker) * 0.018;
      const bobP = Math.sin(a.bob * 7 + a.flicker) * 0.012;
      if (a.mesh) {
        a.mesh.position.y = bobY;
        a.mesh.rotation.x = bobP;
      }

      /* brake flare: gentle periodic slow-downs read as real traffic */
      const brakePhase = Math.sin(t * 0.6 + a.flicker * 2.0);
      const braking = brakePhase > 0.55;
      const brakeBoost = braking ? 4.0 : 1.2;
      for (const m of a.brakeMats) m.emissiveIntensity = brakeBoost;

      /* turn-signal blinker while a lane change is in progress */
      const blink = changingLane && (Math.floor(t * 5) % 2 === 0);
      for (const m of a.signalMats) m.emissiveIntensity = blink ? 2.8 : 0.25;

      /* detection box flicker */
      const f = 0.75 + 0.25 * Math.sin(t * 6 + a.flicker);
      a.box.children[0].material.opacity = 0.65 * f + 0.25;

      /* distance label + lead gap */
      const dz = 6 - a.body.position.z;
      if (!a.oncoming && dz > 0) leadGap = Math.min(leadGap, dz);
      if (!a.oncoming) {
        const dist = Math.abs(Math.round(dz));
        if (Math.floor(t * 4) % 2 === 0) setLabel(a.label, `${a.name} · ${dist}m`, '#ffb44d');
      }
    }

    /* ego: LiDAR pod spin + slow wheel roll + subtle hover bob */
    pod.rotation.y += dt * 3.4;
    for (const p of egoWheel) p.rotation.x += dt * 2.4;
    egoV.mesh.position.y = Math.sin(t * 1.6) * 0.01;

    // pedestrian crossing + walk cycle (legs/arms swing)
    const px = -8 + ((t * 0.55) % 16);
    ped.position.x = px;
    ped.position.y = Math.abs(Math.sin(t * 5)) * 0.06; // walking bob
    const sw = Math.sin(t * 7);
    const pl = ped.userData;
    if (pl && pl.legs) {
      pl.legs[0].rotation.x =  sw * 0.5;
      pl.legs[1].rotation.x = -sw * 0.5;
      pl.arms[0].rotation.x = -sw * 0.4;
      pl.arms[1].rotation.x =  sw * 0.4;
    }
    // planned path flow
    for (let i = 0; i < FLOW; i++) {
      const u = ((t * 0.28) + i / FLOW) % 1;
      const p = pathCurve.getPointAt(u);
      const tan = pathCurve.getTangentAt(u);
      dummy.position.copy(p);
      dummy.lookAt(p.clone().add(tan));
      dummy.updateMatrix();
      flow.setMatrixAt(i, dummy.matrix);
    }
    flow.instanceMatrix.needsUpdate = true;
    ribbon.material.opacity = 0.25 + 0.12 * Math.sin(t * 2);
    // radar fan pulse
    fov.material.opacity = 0.04 + 0.02 * Math.sin(t * 3);
    // lidar
    lidarUpdate(t);
    objectCloud(sweepState.ang);

    // HUD @ 8Hz
    if (t - lastHud > 0.125) {
      lastHud = t;
      const egoSpd = 58 + Math.round(Math.sin(t * 0.4) * 7);
      A('spd').innerHTML = egoSpd + '<u>km/h</u>';
      A('gap').textContent = leadGap === Infinity ? '—' : Math.round(leadGap) + ' m';
      // rank same-direction traffic by gap → drives both 3D lead box + sidebar
      const ranked = agents
        .filter((a) => !a.oncoming)
        .map((a) => ({ a, gap: 6 - a.body.position.z }))
        .filter((x) => x.gap > 0)
        .sort((p, q) => p.gap - q.gap);
      if (ranked[0]) A('t1').innerHTML = `${ranked[0].a.name} · ${Math.round(ranked[0].gap)} M<u>· LEAD</u>`;
      if (ranked[1]) A('t2').textContent = `${ranked[1].a.name} · ${Math.round(ranked[1].gap)} M`;
      A('ped').textContent = `PEDESTRIAN · ${Math.round(Math.hypot(ped.position.x, 6 - ped.position.z))} M`;
      // TTC: gap over an assumed closing speed, colour-coded
      const ttcSec = leadGap === Infinity ? Infinity : leadGap / 13;
      const caution = ttcSec < 3.2;
      A('ttc').innerHTML = (ttcSec === Infinity ? '∞' : ttcSec.toFixed(1)) + '<u>s</u>';
      A('ttc').classList.toggle('ok', !caution);
      A('obj').textContent = (ranked.length || 0) + 1;
    }
  }

  function onEnter() {
    group.visible = true;
    camera.position.set(0, 10.5, 16);
    controls.target.set(0, 0, -14);
    camera.fov = 52;
    camera.updateProjectionMatrix();
  }
  function onExit() { group.visible = false; }

  return { group, update, onEnter, onExit };
}
