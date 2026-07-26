/* ============================================================
   ID.AURA — Autonomous
   L3 perception visualisation: rotating LiDAR sweep with a
   live point cloud (ground rings + points sampled on detected
   objects), multi-lane dynamic traffic with detection boxes
   and distance labels, a crossing pedestrian, radar FOV fan
   and a flowing planned-path ribbon. All live, all reactive.

   The ego remains the authored ID.AURA concept GLB. Ambient traffic uses
   Kenney's CC0 production-car family instead, with quieter materials and
   conventional paired lamps so the hero is unmistakable at a glance.
   The procedural miniCar stays as a short pre-load stand-in only.
   ============================================================ */

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const CYAN = 0x38f0ff, AMBER = 0xffb44d, VIOLET = 0x7b5bff, GREEN = 0x4dff9e;
const CROSSWALK_Z = -14;
const PED_START_X = -6.7;
const PED_END_X = 6.7;
const PED_WAIT_SECONDS = 2.8;
const PED_CROSS_SECONDS = 9.8;
const SIM_CYCLE_SECONDS = 18;
const WHEEL_RADIUS = 0.36;
const TRAFFIC_DIMENSIONS = {
  compact: { w: 1.82, h: 1.42, d: 4.05 },
  sedan: { w: 1.88, h: 1.44, d: 4.55 },
  suv: { w: 1.98, h: 1.68, d: 4.62 },
  van: { w: 2.02, h: 1.92, d: 4.82 }
};
const TRAFFIC_MODEL_FILES = {
  compact: 'hatchback-sports.glb',
  sedan: 'sedan.glb',
  suv: 'suv.glb',
  van: 'van.glb'
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => {
  const x = clamp01(value);
  return x * x * (3 - 2 * x);
};

/* ---------- helpers ---------- */
function labelSprite(text, color = '#38f0ff') {
  const cv = document.createElement('canvas');
  cv.width = 256; cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.font = '600 26px "Sometype Mono", monospace';
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
  ctx.font = '600 26px "Sometype Mono", monospace';
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
  const positions = [];
  const hx = w / 2, hy = h / 2, hz = d / 2;
  const lx = w * 0.19, ly = h * 0.19, lz = d * 0.14;
  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const x = sx * hx, y = sy * hy, z = sz * hz;
        positions.push(
          x, y, z, x - sx * lx, y, z,
          x, y, z, x, y - sy * ly, z,
          x, y, z, x, y, z - sz * lz
        );
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const brackets = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({
    color, transparent: true, opacity: 0.72
  }));
  const g = new THREE.Group();
  g.add(brackets);
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

  /* ---------- authored city kit ----------
     Kenney's CC0 City Kit replaces the empty procedural void with a real
     architectural streetscape. Models are loaded once, cloned, then graded
     into the cool AURA night palette while retaining their authored geometry. */
  const city = new THREE.Group();
  city.name = 'AURA_CITY_CC0';
  group.add(city);
  const cityLoader = new GLTFLoader();
  const cityModels = [
    'building-a.glb',
    'building-f.glb',
    'building-j.glb',
    'building-skyscraper-a.glb',
    'building-skyscraper-b.glb',
    'building-skyscraper-c.glb',
    'building-skyscraper-e.glb'
  ];
  const cityCache = new Map();

  function loadCityModel(file) {
    if (!cityCache.has(file)) {
      cityCache.set(file, cityLoader.loadAsync(`assets/models/city/${file}`).then((gltf) => gltf.scene));
    }
    return cityCache.get(file);
  }

  function gradeCityModel(model) {
    model.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const source = Array.isArray(object.material) ? object.material : [object.material];
      const materials = source.map((material) => {
        const graded = material.clone();
        if (graded.color) {
          graded.color.multiplyScalar(0.18);
          graded.color.lerp(new THREE.Color(0x07131b), 0.48);
        }
        if ('roughness' in graded) graded.roughness = Math.max(0.66, graded.roughness);
        if ('metalness' in graded) graded.metalness = Math.min(0.28, graded.metalness);
        if ('emissive' in graded) {
          graded.emissive = new THREE.Color(0x031018);
          graded.emissiveIntensity = 0.22;
        }
        return graded;
      });
      object.material = Array.isArray(object.material) ? materials : materials[0];
    });
  }

  const cityPlacements = [];
  for (let i = 0; i < 12; i++) {
    for (const side of [-1, 1]) {
      cityPlacements.push({
        side,
        z: -4 - i * 12.2 - (side > 0 ? 4.5 : 0),
        height: 9 + ((i * 7 + (side > 0 ? 5 : 0)) % 14),
        setback: 17.5 + ((i + (side > 0 ? 1 : 0)) % 3) * 2.4,
        file: cityModels[(i * 2 + (side > 0 ? 3 : 0)) % cityModels.length]
      });
    }
  }

  cityPlacements.forEach((placement) => {
    loadCityModel(placement.file).then((source) => {
      const building = source.clone(true);
      gradeCityModel(building);
      const sourceBox = new THREE.Box3().setFromObject(building);
      const sourceSize = sourceBox.getSize(new THREE.Vector3());
      const scale = placement.height / Math.max(0.01, sourceSize.y);
      building.scale.setScalar(scale);
      building.rotation.y = placement.side > 0 ? -Math.PI / 2 : Math.PI / 2;
      building.updateMatrixWorld(true);
      const fittedBox = new THREE.Box3().setFromObject(building);
      building.position.set(
        placement.side * placement.setback,
        -fittedBox.min.y,
        placement.z
      );
      city.add(building);
    }).catch((error) => {
      console.warn(`City model failed to load: ${placement.file}`, error);
    });
  });

  /* ---------- road ---------- */
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 220),
    new THREE.MeshStandardMaterial({
      color: 0x030609, roughness: 0.92, metalness: 0.08, envMapIntensity: 0.16
    })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.02, -60);
  group.add(road);

  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x2e95a7, transparent: true, opacity: 0.24 });
  for (const x of [-9, 9]) {
    const e = new THREE.Mesh(new THREE.PlaneGeometry(0.22, 220), edgeMat);
    e.rotation.x = -Math.PI / 2;
    e.position.set(x, 0.04, -60);
    group.add(e);
  }

  // flowing centre dashes
  const dashes = [];
  const dashMat = new THREE.MeshBasicMaterial({ color: 0xd7faff, transparent: true, opacity: 0.3 });
  for (let i = 0; i < 26; i++) {
    const d = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 2.4), dashMat.clone());
    d.rotation.x = -Math.PI / 2;
    d.position.set(0, 0.045, 14 - i * 6);
    group.add(d);
    dashes.push(d);
  }
  const laneMat = new THREE.MeshBasicMaterial({ color: 0x24536a, transparent: true, opacity: 0.18 });
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
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x5bd9e5, transparent: true, opacity: 0.55 });
  const beaconGeo = new THREE.SphereGeometry(0.055, 8, 8);
  const glowMat = new THREE.MeshBasicMaterial({
    color: CYAN, transparent: true, opacity: 0.06,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const glowGeo = new THREE.SphereGeometry(0.2, 10, 10);
  for (const x of [-9.8, 9.8]) {
    for (let z = 14; z >= -118; z -= 13) {
      const b = new THREE.Mesh(beaconGeo, beaconMat);
      b.position.set(x, 0.55, z); group.add(b);
      const g = new THREE.Mesh(glowGeo, glowMat);
      g.position.set(x, 0.55, z); group.add(g);
    }
  }

  // Light corridor: sparse architectural frames create depth without
  // turning the perception model into a noisy point-cloud demo.
  const corridorMat = new THREE.LineBasicMaterial({
    color: 0x38b7ca, transparent: true, opacity: 0.1
  });
  const corridorBlueMat = new THREE.LineBasicMaterial({
    color: 0x204c9b, transparent: true, opacity: 0.12
  });
  for (let z = 4; z >= -126; z -= 13) {
    const height = 2.8 + (Math.sin(z * 0.17) + 1) * 1.25;
    for (const side of [-1, 1]) {
      const x0 = side * 10.2;
      const x1 = side * (12.2 + Math.sin(z * 0.11) * 1.3);
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x0, 0.05, z),
        new THREE.Vector3(x1, height, z - 1.8),
        new THREE.Vector3(x1, height, z - 4.8)
      ]);
      group.add(new THREE.Line(geometry, (Math.abs(z) % 26 < 1) ? corridorBlueMat : corridorMat));
    }
  }

  const portalGroup = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const portal = new THREE.Mesh(
      new THREE.RingGeometry(2.6 + i * 1.15, 2.63 + i * 1.15, 72),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? 0x2d60bd : CYAN,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      })
    );
    portal.position.set(0, 4.2, -93 - i * 1.6);
    portalGroup.add(portal);
  }
  group.add(portalGroup);

  /* ---------- vehicle hierarchy ----------
     Hero and traffic intentionally use different asset families. ID.AURA keeps
     its concept-car surfacing; surrounding vehicles use conventional CC0
     silhouettes, matte road-going materials and separate paired lamps. */
  function buildHeroVehicle(spec) {
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
    const dims = { w: 2.0, h: 0.95, d: 4.4 };
    return { mesh, wheelPivots, brakeMats, signalMats, dims };
  }

  const trafficLoader = new GLTFLoader();
  const trafficCache = new Map();

  function loadTrafficSource(shape) {
    const file = TRAFFIC_MODEL_FILES[shape] || TRAFFIC_MODEL_FILES.sedan;
    if (!trafficCache.has(file)) {
      trafficCache.set(
        file,
        trafficLoader
          .loadAsync(`assets/models/traffic/${file}`)
          .then((gltf) => gltf.scene)
      );
    }
    return trafficCache.get(file);
  }

  function buildTrafficVehicle(spec, source) {
    const dims = TRAFFIC_DIMENSIONS[spec.shape] || TRAFFIC_DIMENSIONS.sedan;
    const model = source.clone(true);
    const wheelPivots = [];
    const paintTint = new THREE.Color(spec.paint);

    model.traverse((object) => {
      if (/^wheel/i.test(object.name)) wheelPivots.push(object);
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      const isWheel = /wheel/i.test(object.name);
      const sourceMaterials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      const materials = sourceMaterials.map((material) => {
        const roadMaterial = material.clone();
        if (roadMaterial.color) {
          roadMaterial.color.multiplyScalar(isWheel ? 0.46 : 0.68);
          if (!isWheel) roadMaterial.color.lerp(paintTint, 0.16);
        }
        if ('roughness' in roadMaterial) {
          roadMaterial.roughness = isWheel
            ? Math.max(0.76, roadMaterial.roughness)
            : Math.max(0.58, roadMaterial.roughness);
        }
        if ('metalness' in roadMaterial) {
          roadMaterial.metalness = isWheel
            ? Math.min(0.25, roadMaterial.metalness)
            : Math.min(0.32, roadMaterial.metalness);
        }
        if ('envMapIntensity' in roadMaterial) {
          roadMaterial.envMapIntensity = isWheel ? 0.26 : 0.42;
        }
        return roadMaterial;
      });
      object.material = Array.isArray(object.material) ? materials : materials[0];
    });

    // Kenney vehicles face +Z. ID.AURA and the simulation face -Z.
    model.rotation.y = Math.PI;
    model.updateMatrixWorld(true);
    const sourceBounds = new THREE.Box3().setFromObject(model);
    const sourceSize = sourceBounds.getSize(new THREE.Vector3());
    model.scale.setScalar(dims.d / Math.max(0.01, sourceSize.z));
    model.updateMatrixWorld(true);
    const fittedBounds = new THREE.Box3().setFromObject(model);
    const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
    model.position.set(-fittedCenter.x, -fittedBounds.min.y, -fittedCenter.z);

    const mesh = new THREE.Group();
    mesh.name = `ORDINARY_TRAFFIC_${spec.shape.toUpperCase()}`;
    mesh.add(model);

    // Conventional lamps deliberately avoid the hero's full-width light bar.
    const brakeMaterial = new THREE.MeshStandardMaterial({
      color: 0x5f080b,
      emissive: 0xff1c24,
      emissiveIntensity: 1.1,
      roughness: 0.5
    });
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xc7d5d7,
      emissive: 0xb9e7ef,
      emissiveIntensity: 0.72,
      roughness: 0.38
    });
    const signalMaterial = new THREE.MeshStandardMaterial({
      color: 0x5a3108,
      emissive: 0xff9a32,
      emissiveIntensity: 0.2,
      roughness: 0.52
    });
    const lampGeometry = new THREE.BoxGeometry(0.23, 0.1, 0.045);
    for (const side of [-1, 1]) {
      const brake = new THREE.Mesh(lampGeometry, brakeMaterial);
      brake.position.set(side * dims.w * 0.34, dims.h * 0.48, dims.d * 0.495);
      mesh.add(brake);
      const head = new THREE.Mesh(lampGeometry, headMaterial);
      head.position.set(side * dims.w * 0.34, dims.h * 0.46, -dims.d * 0.495);
      mesh.add(head);
      const signal = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.075, 0.05),
        signalMaterial
      );
      signal.position.set(side * dims.w * 0.45, dims.h * 0.45, dims.d * 0.495);
      mesh.add(signal);
    }

    return {
      mesh,
      wheelPivots,
      brakeMats: [brakeMaterial],
      signalMats: [signalMaterial],
      dims
    };
  }

  function rollWheels(pivots, signedTravel) {
    const delta = -signedTravel / WHEEL_RADIUS;
    for (const pivot of pivots) {
      if (pivot.userData.rollBaseX == null) {
        pivot.userData.rollBaseX = pivot.rotation.x;
        pivot.userData.rollBaseY = pivot.rotation.y;
        pivot.userData.rollBaseZ = pivot.rotation.z;
        pivot.userData.rollAngle = 0;
      }
      pivot.userData.rollAngle =
        (pivot.userData.rollAngle + delta) % (Math.PI * 2);
      // The authored wheel axle is local X. Writing one coherent roll angle
      // avoids compounded axis drift that made the front wheels appear to
      // steer and tumble independently.
      pivot.rotation.set(
        pivot.userData.rollBaseX + pivot.userData.rollAngle,
        pivot.userData.rollBaseY,
        pivot.userData.rollBaseZ
      );
    }
  }

  /* ---------- ego vehicle ---------- */
  const egoSpec = { paint: 0x0a1f4a, shape: 'sedan', name: 'EGO' };
  let egoV = buildHeroVehicle(egoSpec);
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
  let egoSpeedKph = 54;
  let simulationTime = 0;

  /* ---------- radar FOV fan ---------- */
  const fov = new THREE.Mesh(
    new THREE.CircleGeometry(26, 40, Math.PI / 2 - 0.62, 1.24),
    new THREE.MeshBasicMaterial({
      color: CYAN, transparent: true, opacity: 0.012,
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
      color: CYAN, transparent: true, opacity: 0.035,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide
    })
  );
  sweep.rotation.x = -Math.PI / 2;
  sweep.position.set(0, 0.07, 6);
  group.add(sweep);

  // point cloud: ground rings + object surface samples
  const P_GROUND = 240;
  const agents = [];
  const trafficSpec = [
    { lane: -4.5, z: -2, speed: -7.5, paint: 0x74808c, shape: 'sedan', name: 'SEDAN' },
    { lane: -4.5, z: -58, speed: -7.5, paint: 0xc5c0b4, shape: 'van', name: 'VAN' },
    { lane:  4.5, z: -34, speed:  9.0, paint: 0x344552, shape: 'suv', name: 'SUV', oncoming: true },
    { lane:  4.5, z: -78, speed:  9.0, paint: 0x443b43, shape: 'van', name: 'VAN', oncoming: true },
    { lane:  0,   z: -30, speed: -5.5, paint: 0x684247, shape: 'compact', name: 'COMPACT' }
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
    size: 0.09, vertexColors: true, transparent: true, opacity: 0.58,
    blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
  }));
  group.add(points);

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
    }
  }

  /* ---------- traffic agents ---------- */
  function spawnAgent(spec) {
    const dims = TRAFFIC_DIMENSIONS[spec.shape] || TRAFFIC_DIMENSIONS.sedan;
    const v = {
      mesh: miniCar(spec.paint),
      wheelPivots: [],
      brakeMats: [],
      signalMats: [],
      dims
    };
    const body = new THREE.Group();          // suspension / pitch carrier
    body.add(v.mesh);
    body.position.set(spec.lane, 0, spec.z);
    if (spec.oncoming) body.rotation.y = Math.PI;
    group.add(body);

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
      startLane: spec.lane,
      startZ: spec.z,
      nominalSpeed: spec.speed,
      curSpeed: spec.speed
    };
    agents.push(agent);
    scatterOnAgent(agent, spec.name === 'VAN' ? 90 : 70);
    loadTrafficSource(spec.shape)
      .then((source) => upgradeAgent(agent, buildTrafficVehicle(spec, source)))
      .catch((error) => {
        console.warn(`Ordinary traffic model failed to load: ${spec.shape}`, error);
      });
    return agent;
  }

  // Replace the short-lived fallback without disturbing traffic state.
  function upgradeAgent(agent, v) {
    const body = agent.body;
    body.remove(agent.mesh);
    body.remove(agent.box);
    body.add(v.mesh);
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

  /* ---------- pedestrian ----------
     A lightweight articulated figure is visible only while the licensed,
     skinned casual avatar loads (or if the browser cannot decode it). */
  const ped = buildPedestrian();
  const pedFallback = ped.children.slice();
  const pedBox = detectBox(0.74, 1.86, 0.62, CYAN);
  pedBox.position.y = 0.93;
  ped.add(pedBox);
  const pedLabel = labelSprite('PED · 18m', '#38f0ff');
  pedLabel.position.set(0, 2.35, 0);
  ped.add(pedLabel);
  ped.position.set(PED_START_X, 0, CROSSWALK_Z);
  ped.rotation.y = Math.PI / 2;          // face the crossing direction (+x)
  group.add(ped);
  const pedAgent = {
    mesh: ped, dims: { w: 0.54, h: 1.72, d: 0.38 }, localPts: [],
    isPed: true
  };
  scatterOnAgent(pedAgent, 60);

  const pedestrianLoader = new GLTFLoader();
  pedestrianLoader.load(
    'assets/models/pedestrian/casual-pedestrian.glb',
    (gltf) => {
      const human = gltf.scene;
      human.name = 'PEDESTRIAN_CASUAL_AVATURN_MIT';
      human.traverse((object) => {
        if (!object.isMesh) return;
        object.castShadow = true;
        object.receiveShadow = true;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if ('envMapIntensity' in material) material.envMapIntensity = 0.72;
          material.needsUpdate = true;
        });
      });

      // Establish the authored idle pose before measuring the skinned mesh.
      // Measuring the bind pose first was the source of the previous giant:
      // the animation changed the deformation bounds after scaling.
      if (gltf.animations.length) {
        const mixer = new THREE.AnimationMixer(human);
        const stance = gltf.animations.find((clip) => /idle/i.test(clip.name))
          || gltf.animations[0];
        const stanceAction = mixer.clipAction(stance);
        stanceAction.play();
        stanceAction.paused = true;
        stanceAction.time = Math.min(0.35, Math.max(0, stance.duration - 0.01));
        mixer.update(0);
        const boneNames = [
          'LeftUpLeg', 'RightUpLeg', 'LeftLeg', 'RightLeg',
          'LeftArm', 'RightArm', 'Spine', 'Hips'
        ];
        const bones = {};
        boneNames.forEach((name) => {
          const bone = human.getObjectByName(name)
            || human.getObjectByName(`mixamorig:${name}`);
          if (bone) bones[name] = { bone, base: bone.quaternion.clone() };
        });
        ped.userData.walkRig = bones;
      }

      human.updateMatrixWorld(true);
      const posedBounds = new THREE.Box3().setFromObject(human, true);
      const posedSize = posedBounds.getSize(new THREE.Vector3());
      human.scale.setScalar(1.72 / Math.max(posedSize.y, 0.001));
      human.updateMatrixWorld(true);
      const fittedBounds = new THREE.Box3().setFromObject(human, true);
      const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
      human.position.x -= fittedCenter.x;
      human.position.y -= fittedBounds.min.y;
      human.position.z -= fittedCenter.z;

      // Keep the ADAS brackets/label, replace only the temporary figure.
      pedFallback.forEach((object) => ped.remove(object));
      ped.add(human);
      ped.userData.authoredHuman = true;
    },
    undefined,
    (error) => {
      console.warn('Licensed pedestrian asset could not be loaded; keeping fallback.', error);
    }
  );

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
      color: GREEN, transparent: true, opacity: 0.24,
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
      ego.remove(egoV.mesh);
      egoV = buildHeroVehicle(egoSpec);
      ego.add(egoV.mesh);
      egoWheel = egoV.wheelPivots;
    });
  }

  /* ---------- DOM HUD ---------- */
  layer.innerHTML = `
    <div class="autonomous">
      <div class="auto-frame"><i></i><i></i><i></i><i></i></div>
      <div class="auto-top">
        <div class="auto-level"><span class="auto-dot"></span>AURA PILOT · L3</div>
        <div class="auto-percept">PREDICTIVE WORLD MODEL <b>ONLINE</b></div>
      </div>
      <div class="auto-intent">
        <span data-a="intent-code">HAZARD 02</span>
        <b data-a="intent">YIELD TO PEDESTRIAN</b>
        <small data-a="confidence">CONFIDENCE 99.4%</small>
      </div>
      <div class="auto-side">
        <span class="auto-side-label">PERCEPTION</span>
        <div class="auto-tag" style="--c:#f0a06d" data-a="t1">CAR · -- m</div>
        <div class="auto-tag" style="--c:#f0a06d" data-a="t2">CAR · -- m</div>
        <div class="auto-tag" style="--c:#62d8ee" data-a="ped">PEDESTRIAN · -- m</div>
        <div class="auto-tag" style="--c:#75e2bd">CLEAR PATH · LEFT</div>
      </div>
      <div class="auto-sensors">
        <span><i>OBJECTS</i><b data-a="obj">6</b></span>
        <span><i>CAMERA</i><b>08</b></span>
        <span><i>RADAR</i><b>05</b></span>
        <span><i>LIDAR</i><b>01</b></span>
      </div>
      <div class="auto-foot">
        <span class="auto-speed"><i>VELOCITY</i><b data-a="spd">62<u>km/h</u></b></span>
        <span><i>LEAD GAP</i><b data-a="gap">--</b></span>
        <span><i>TIME TO CONTACT</i><b class="ok" data-a="ttc">—<u>s</u></b></span>
        <span><i>SYSTEM</i><b class="ok" data-a="system">YIELDING</b></span>
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
    simulationTime = (simulationTime + dt) % SIM_CYCLE_SECONDS;
    const crossingElapsed = simulationTime - PED_WAIT_SECONDS;
    const isWalking = crossingElapsed >= 0 && crossingElapsed <= PED_CROSS_SECONDS;
    const crossingProgress = clamp01(crossingElapsed / PED_CROSS_SECONDS);
    const crossingOccupied =
      simulationTime < PED_WAIT_SECONDS + PED_CROSS_SECONDS + 0.65;
    const pedestrianX = isWalking
      ? THREE.MathUtils.lerp(PED_START_X, PED_END_X, crossingProgress)
      : (crossingElapsed < 0 ? PED_START_X : PED_END_X);

    // The ego vehicle commits to a full stop before the pedestrian steps off
    // the kerb, holds through the crossing, then accelerates only after clear.
    const resumeAt = PED_WAIT_SECONDS + PED_CROSS_SECONDS + 0.65;
    if (simulationTime < PED_WAIT_SECONDS) {
      egoSpeedKph = 54 * (1 - smoothstep(simulationTime / PED_WAIT_SECONDS));
    } else if (simulationTime < resumeAt) {
      egoSpeedKph = 0;
    } else {
      egoSpeedKph = 54 * smoothstep((simulationTime - resumeAt) / 3.1);
    }
    const yielding = egoSpeedKph < 3 || crossingOccupied;

    // dashes flow
    for (const d of dashes) {
      d.position.z += dt * THREE.MathUtils.lerp(0.35, 7, egoSpeedKph / 54);
      if (d.position.z > 16) d.position.z -= 156;
    }

    // Pedestrian translation and gait share the same stride clock, preventing
    // the previous skating motion where the root slid independently.
    ped.position.x = pedestrianX;
    ped.position.y = 0;
    const walkSpeed = (PED_END_X - PED_START_X) / PED_CROSS_SECONDS;
    const stridePhase = crossingElapsed * (walkSpeed / 1.08) * Math.PI * 2;
    const gait = isWalking ? Math.sin(stridePhase) : 0;
    const rig = ped.userData.walkRig;
    if (rig) {
      const applySwing = (name, angle, axis = 'x') => {
        const joint = rig[name];
        if (!joint) return;
        const axisVector = axis === 'z'
          ? new THREE.Vector3(0, 0, 1)
          : new THREE.Vector3(1, 0, 0);
        const rotation = new THREE.Quaternion().setFromAxisAngle(axisVector, angle);
        joint.bone.quaternion.copy(joint.base).multiply(rotation);
      };
      applySwing('LeftUpLeg', gait * 0.38);
      applySwing('RightUpLeg', -gait * 0.38);
      applySwing('LeftLeg', Math.max(0, -gait) * 0.3);
      applySwing('RightLeg', Math.max(0, gait) * 0.3);
      applySwing('LeftArm', -gait * 0.24);
      applySwing('RightArm', gait * 0.24);
      applySwing('Spine', isWalking ? Math.sin(stridePhase * 2) * 0.018 : 0, 'z');
      ped.position.y = isWalking
        ? Math.abs(Math.sin(stridePhase * 2)) * 0.012
        : 0;
    } else {
      const swing = isWalking ? Math.sin(stridePhase) : 0;
      const fallback = ped.userData;
      if (fallback.legs) {
        fallback.legs[0].rotation.x = swing * 0.46;
        fallback.legs[1].rotation.x = -swing * 0.46;
        fallback.arms[0].rotation.x = -swing * 0.34;
        fallback.arms[1].rotation.x = swing * 0.34;
      }
    }

    // traffic
    let leadGap = Infinity;
    for (const a of agents) {
      /* smooth lane changes (same-direction only) — eased, not snapped */
      a.laneTimer -= dt;
      if (!crossingOccupied && a.laneTimer <= 0) {
        a.laneTimer = 5 + Math.random() * 5;
        if (!a.oncoming) {
          a.targetLane = (a.lane < -2) ? (Math.random() < 0.4 ? 0 : -4.5) : -4.5;
        }
      }
      a.lane += (a.targetLane - a.lane) * Math.min(1, dt * 1.1);
      const changingLane = Math.abs(a.targetLane - a.lane) > 0.06;

      /* Predictive crosswalk yield: traffic approaching from either direction
         decelerates against distance to the conflict zone and holds 3 m back. */
      const distanceToCrosswalk = a.oncoming
        ? CROSSWALK_Z - a.body.position.z
        : a.body.position.z - CROSSWALK_Z;
      const approachingCrosswalk =
        distanceToCrosswalk > 0 && distanceToCrosswalk < 32;
      const mustYield = crossingOccupied && approachingCrosswalk;
      const stoppingFactor = mustYield
        ? smoothstep((distanceToCrosswalk - 3) / 20)
        : 1;
      const targetSpeed = a.nominalSpeed * stoppingFactor;
      const slowing = Math.abs(targetSpeed) < Math.abs(a.curSpeed);
      const response = slowing ? 3.5 : 0.75;
      a.curSpeed += (targetSpeed - a.curSpeed) * Math.min(1, dt * response);
      if (mustYield && distanceToCrosswalk <= 3.2) a.curSpeed = 0;

      /* longitudinal travel + coherent wheel roll */
      const travel = a.curSpeed * dt;
      a.body.position.z += travel;
      a.body.position.x = a.lane;
      if (!a.oncoming && a.body.position.z < -140) {
        a.body.position.z = 20;
        a.curSpeed = a.nominalSpeed;
      }
      if (a.oncoming && a.body.position.z > 30) {
        a.body.position.z = -150;
        a.curSpeed = a.nominalSpeed;
      }
      rollWheels(a.wheelPivots, travel);

      /* suspension bob + pitch under braking (nose dive) — applied to the
         fitted mesh only, so the detection box / label stay steady */
      a.bob += dt;
      const bobY = Math.sin(a.bob * 7 + a.flicker) * 0.018;
      const bobP = Math.sin(a.bob * 7 + a.flicker) * 0.012;
      if (a.mesh) {
        a.mesh.position.y = bobY;
        a.mesh.rotation.x = bobP;
      }

      /* brake lights now communicate an actual yield, not a random pulse */
      const braking = mustYield && (slowing || Math.abs(a.curSpeed) < 0.15);
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

    /* ego: wheel rotation is bound to simulated speed and becomes completely
       still at the stop line; no independent front-wheel tumble. */
    pod.rotation.y += dt * 3.4;
    const egoVisualMps = Math.min(5.2, egoSpeedKph / 3.6);
    rollWheels(egoWheel, -egoVisualMps * dt);
    egoV.mesh.position.y = egoSpeedKph > 1 ? Math.sin(t * 1.6) * 0.006 : 0;
    const egoBraking = crossingOccupied && egoSpeedKph < 48;
    for (const material of egoV.brakeMats) {
      material.emissiveIntensity = egoBraking ? 4.2 : 1.2;
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
    ribbon.material.opacity = 0.34 + 0.08 * Math.sin(t * 1.4);
    ribbon.material.color.setHex(yielding ? AMBER : GREEN);
    flow.material.color.setHex(yielding ? AMBER : GREEN);
    // radar fan pulse
    fov.material.opacity = 0.009 + 0.004 * Math.sin(t * 2);
    portalGroup.rotation.z = Math.sin(t * 0.08) * 0.04;
    // lidar
    lidarUpdate(t);
    objectCloud(sweepState.ang);

    // HUD @ 8Hz
    if (t - lastHud > 0.125) {
      lastHud = t;
      const egoSpd = Math.max(0, Math.round(egoSpeedKph));
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
      A('intent-code').textContent = yielding ? 'HAZARD 02' : 'CLEARANCE 01';
      A('intent').textContent = yielding ? 'YIELD TO PEDESTRIAN' : 'RESUME PLANNED PATH';
      A('confidence').textContent = yielding ? 'CONFIDENCE 99.4%' : 'PATH CLEAR · 98.9%';
      A('system').textContent = yielding ? 'YIELDING' : 'NOMINAL';
      A('system').classList.toggle('ok', !yielding);
      // TTC uses the actual ego speed and becomes infinite at a full stop.
      const egoMps = egoSpeedKph / 3.6;
      const ttcSec = leadGap === Infinity || egoMps < 0.2
        ? Infinity
        : leadGap / egoMps;
      const caution = ttcSec < 3.2;
      A('ttc').innerHTML = (ttcSec === Infinity ? '∞' : ttcSec.toFixed(1)) + '<u>s</u>';
      A('ttc').classList.toggle('ok', !caution);
      A('obj').textContent = (ranked.length || 0) + 1;
    }
  }

  function onEnter() {
    simulationTime = 0;
    egoSpeedKph = 54;
    ped.position.set(PED_START_X, 0, CROSSWALK_Z);
    agents.forEach((agent) => {
      agent.lane = agent.startLane;
      agent.targetLane = agent.startLane;
      agent.body.position.set(agent.startLane, 0, agent.startZ);
      agent.curSpeed = agent.nominalSpeed;
    });
    group.visible = true;
    controls.enabled = false;
    camera.position.set(8.6, 5.8, 17.5);
    controls.target.set(0, 0.7, -21);
    camera.lookAt(controls.target);
    camera.fov = 48;
    camera.updateProjectionMatrix();
  }
  function onExit() {
    group.visible = false;
    controls.enabled = true;
  }

  return { group, update, onEnter, onExit };
}
