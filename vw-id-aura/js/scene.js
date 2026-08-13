/* ============================================================
   ID.AURA — Scene
   Cinematic stage: ACES tone-mapping, PCF soft shadows,
   reflective showroom floor, UnrealBloom, HDRI environment
   (CDN with RoomEnvironment fallback), drifting dust.
   Contract: { scene, camera, renderer, controls, composer,
               bloom, resize, render(), update(t) }
   ============================================================ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createPostFX } from './postfx.js?v=20260728-2';

export function createScene(container, quality) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.62;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060b);
  scene.fog = new THREE.FogExp2(0x04060b, 0.009);

  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.05, 400);
  camera.position.set(5.9, 2.25, 6.25);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4.6;
  controls.maxDistance = 15;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.target.set(0, 0.82, 0);

  /* ---------- environment: tourist panoramas (background + PBR reflections) ----------
     Each panorama drives BOTH scene.background (the visible vista) and
     scene.environment (PMREM-processed, so paint/glass/floor reflect the
     place the car is "parked in"). Switchable at runtime via setScene(). */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rgbeLoader = new RGBELoader();
  const SCENES = [
    { name: 'Studio 01',  file: 'assets/hdri/studio_small_09_2k.hdr', stage: true },
    { name: 'Alpine',     file: 'assets/hdri/scenes/alps_field_2k.hdr' },
    { name: 'Route 66',   file: 'assets/hdri/scenes/autumn_road_2k.hdr' },
    { name: 'Night Line', file: 'assets/hdri/scenes/blaubeuren_night_2k.hdr' },
    { name: 'Meadow',     file: 'assets/hdri/scenes/kloppenheim_06_2k.hdr' },
    { name: 'Blue Hour',  file: 'assets/hdri/scenes/bell_park_dawn_2k.hdr' }
  ];
  const sceneTex = [];
  let sceneIdx = -1;
  let showroomActive = true;
  let premiereGroup = null;
  const sceneCbs = [];
  function applySceneTexture(tex, idx) {
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmrem.fromEquirectangular(tex).texture;
    scene.environment = envMap;
    const isPremiere = !!SCENES[idx].stage;
    if (premiereGroup) premiereGroup.visible = showroomActive && isPremiere;
    if (showroomActive) {
      scene.background = isPremiere ? new THREE.Color(0x02050a) : tex;
      // Keep every authored panorama pin-sharp. The previous 0.08 setting
      // softened distant architecture enough to read like a low-res asset.
      scene.backgroundBlurriness = 0;
      scene.fog = isPremiere ? new THREE.FogExp2(0x02050a, 0.009) : null;
    }
    sceneIdx = idx;
    sceneCbs.forEach((cb) => cb(idx));
  }
  function setScene(idx) {
    if (idx === sceneIdx || !SCENES[idx]) return;
    if (sceneTex[idx]) { applySceneTexture(sceneTex[idx], idx); return; }
    rgbeLoader.load(SCENES[idx].file, (tex) => {
      sceneTex[idx] = tex;
      applySceneTexture(tex, idx);
    });
  }
  // Initial environment stays neutral until the selected panorama is ready.
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* ---------- lighting ---------- */
  scene.add(new THREE.HemisphereLight(0xb7d4e8, 0x07080b, 0.28));

  const key = new THREE.DirectionalLight(0xf1f7ff, 1.0);
  key.position.set(6, 10, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -12;
  key.shadow.camera.right = key.shadow.camera.top = 12;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x75dbea, 0.62);
  rim.position.set(-7, 4.5, -6);
  scene.add(rim);

  const warmFill = new THREE.DirectionalLight(0xffd1ad, 0.28);
  warmFill.position.set(-4, 2.4, 7);
  scene.add(warmFill);

  /* ---------- showroom world: authored PBR floor + premiere architecture ---------- */
  const showroomGroup = new THREE.Group();
  scene.add(showroomGroup);

  const textureLoader = new THREE.TextureLoader();
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const floorMap = textureLoader.load('assets/materials/painted-concrete-02/diffuse.jpg');
  const floorRoughness = textureLoader.load('assets/materials/painted-concrete-02/roughness.jpg');
  const floorNormal = textureLoader.load('assets/materials/painted-concrete-02/normal-gl.jpg');
  floorMap.colorSpace = THREE.SRGBColorSpace;
  [floorMap, floorRoughness, floorNormal].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(14, 14);
    texture.anisotropy = maxAnisotropy;
  });

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(60, 72),
    new THREE.MeshPhysicalMaterial({
      map: floorMap,
      roughnessMap: floorRoughness,
      normalMap: floorNormal,
      normalScale: new THREE.Vector2(0.32, 0.32),
      color: 0x090c10,
      roughness: 0.68,
      metalness: 0,
      clearcoat: 0.14,
      clearcoatRoughness: 0.42,
      envMapIntensity: 0.16
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  showroomGroup.add(floor);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0x9eeaf2, transparent: true, opacity: 0.18 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(4.85, 4.88, 128), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.005;
  showroomGroup.add(ring);

  const grid = new THREE.PolarGridHelper(15, 10, 6, 96, 0x20313a, 0x11191f);
  grid.position.y = 0.002;
  grid.material.transparent = true;
  grid.material.opacity = 0.075;
  showroomGroup.add(grid);

  premiereGroup = new THREE.Group();
  showroomGroup.add(premiereGroup);

  // The default world is an authored automotive photo studio, not a stage
  // photograph pasted behind the car. The external Poly Haven HDRI provides
  // physically plausible reflections; the geometry below supplies a quiet,
  // architectural horizon and real lights that move across the paint.
  const hallMat = new THREE.MeshPhysicalMaterial({
    color: 0x090d12, roughness: 0.28, metalness: 0.72,
    clearcoat: 0.36, clearcoatRoughness: 0.2, envMapIntensity: 0.9
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x020305, roughness: 0.52, metalness: 0.32
  });
  const lightMat = new THREE.MeshBasicMaterial({
    color: 0xcff9ff, transparent: true, opacity: 0.78, toneMapped: false
  });
  const cyanLightMat = new THREE.MeshBasicMaterial({
    color: 0x58cddd, transparent: true, opacity: 0.42, toneMapped: false
  });

  const podiumMat = hallMat.clone();
  podiumMat.color.set(0x0a0d12);
  podiumMat.metalness = 0.22;
  podiumMat.roughness = 0.45;
  podiumMat.clearcoat = 0.2;
  podiumMat.clearcoatRoughness = 0.3;
  podiumMat.envMapIntensity = 0.3;
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(5.35, 5.52, 0.14, 128), podiumMat);
  podium.position.y = 0.025;
  podium.receiveShadow = true;
  premiereGroup.add(podium);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(26, 8.2, 0.3), blackMat);
  backWall.position.set(0, 3.85, -9.2);
  premiereGroup.add(backWall);

  const horizonBand = new THREE.Mesh(new THREE.BoxGeometry(18.5, 0.026, 0.055), cyanLightMat);
  horizonBand.position.set(0, 1.52, -9.0);
  premiereGroup.add(horizonBand);

  const wallBladeGeo = new THREE.BoxGeometry(0.045, 6.5, 0.09);
  for (let i = -6; i <= 6; i++) {
    const blade = new THREE.Mesh(wallBladeGeo, i % 3 === 0 ? cyanLightMat : hallMat);
    blade.position.set(i * 1.45, 3.55, -8.98 + Math.abs(i) * 0.025);
    premiereGroup.add(blade);
  }

  const ceilingBars = [];
  for (let i = -4; i <= 4; i++) {
    const barMaterial = (i % 2 ? cyanLightMat : lightMat).clone();
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.024, 3.1), barMaterial);
    bar.position.set(i * 1.72, 6.2, -2.6);
    bar.rotation.x = -0.08;
    premiereGroup.add(bar);
    ceilingBars.push(bar);

    if (i % 2 === 0) {
      const spot = new THREE.SpotLight(0xe8fbff, 7, 18, 0.24, 0.72, 1.55);
      spot.position.set(i * 1.72, 6.05, -2.1);
      spot.target.position.set(i * 0.32, 0.2, 0);
      spot.castShadow = i === 0;
      premiereGroup.add(spot, spot.target);
    }
  }

  const sidePortalGeo = new THREE.BoxGeometry(0.12, 5.6, 2.8);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const portal = new THREE.Mesh(sidePortalGeo, i === 0 ? hallMat : blackMat);
      portal.position.set(side * (7.2 + i * 1.35), 2.8, -4.2 + i * 0.45);
      portal.rotation.y = side * (-0.2 - i * 0.045);
      premiereGroup.add(portal);
    }
  }

  const scanKey = new THREE.SpotLight(0xbfefff, 12, 22, 0.2, 0.58, 1.35);
  scanKey.position.set(-5.5, 4.2, 5.2);
  scanKey.target.position.set(0, 0.62, 0);
  premiereGroup.add(scanKey, scanKey.target);

  const warmEdge = new THREE.SpotLight(0xffbf91, 7, 18, 0.28, 0.75, 1.65);
  warmEdge.position.set(5.8, 2.8, -4.6);
  warmEdge.target.position.set(0.8, 0.62, 0);
  premiereGroup.add(warmEdge, warmEdge.target);

  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x8cecf3, transparent: true, opacity: 0.25, toneMapped: false
  });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(5.0, 0.014, 8, 160), haloMat);
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, 5.72, -0.6);
  premiereGroup.add(halo);

  /* ---------- dust particles ---------- */
  const N = 420;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 40;
    pos[i * 3 + 1] = Math.random() * 9 + 0.2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x6fb6d8, size: 0.024, transparent: true, opacity: 0.16,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  showroomGroup.add(dust);

  /* ---------- post-processing ---------- */
  const postfx = createPostFX(renderer, scene, camera, quality);
  const composer = postfx.composer;
  const bloom = postfx.bloom;
  bloom.strength = 0.17;
  postfx.setFilmGrade({
    grainAmount: 0.012,
    aberration: 0.00055,
    vignetteStrength: 0.22,
    vignetteSoftness: 0.74,
    barrel: 0.004,
    lift: [0.006, 0.008, 0.01],
    gamma: [1.015, 1.015, 1.02],
    gain: [1.035, 1.04, 1.045]
  });

  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    postfx.resize(innerWidth, innerHeight);
  }
  addEventListener('resize', resize);

  function render() { composer.render(); }

  function update(t) {
    ring.rotation.z = t * 0.05;
    ringMat.opacity = 0.15 + Math.sin(t * 0.72) * 0.028;
    dust.rotation.y = t * 0.008;
    halo.rotation.z = t * 0.012;
    haloMat.opacity = 0.19 + Math.sin(t * 0.56) * 0.04;
    const scan = Math.sin(t * 0.22);
    scanKey.position.x = scan * 6.4;
    scanKey.target.position.x = Math.sin(t * 0.17) * 1.2;
    ceilingBars.forEach((bar, index) => {
      bar.material.opacity = (index % 2 ? 0.32 : 0.64) + Math.sin(t * 0.34 + index * 0.58) * 0.08;
    });
    postfx.update(t, camera.position.distanceTo(controls.target));
  }

  function setShowroomActive(on) {
    showroomActive = on;
    showroomGroup.visible = on;
    if (!on) {
      scene.background = new THREE.Color(0x010205);
      scene.backgroundBlurriness = 0;
      scene.fog = new THREE.FogExp2(0x010205, 0.018);
      renderer.toneMappingExposure = 0.56;
      bloom.strength = 0.13;
      return;
    }
    renderer.toneMappingExposure = 0.62;
    bloom.strength = 0.17;
    if (sceneIdx >= 0 && sceneTex[sceneIdx]) applySceneTexture(sceneTex[sceneIdx], sceneIdx);
  }

  setScene(0);

  window.__scene = scene;   // debug hook
  return {
    scene, camera, renderer, controls, composer, bloom, postfx, resize, render, update,
    SCENES, setScene, getScene: () => sceneIdx, onScene: (cb) => sceneCbs.push(cb),
    setShowroomActive
  };
}
