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
  renderer.toneMappingExposure = 0.7;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020408);
  scene.fog = new THREE.FogExp2(0x020408, 0.010);

  const camera = new THREE.PerspectiveCamera(36, innerWidth / innerHeight, 0.05, 400);
  camera.position.set(5.9, 2.25, 6.25);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 4.6;
  controls.maxDistance = 15;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.target.set(0, 0.82, 0);
  // APEX 注:不要在 controls 上启用 autoRotate —— main.js 用 car.rig.rotation
  // 驱动"转台旋转",镜头保持静止反而更接近影棚摄影车;在 controls 上开
  // autoRotate 会与 gsap 镜头飞行冲突。
  controls.enablePan = true;

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

  /* ---------- lighting · 三点影棚 (APEX 2026-09-05) ---------- */
  scene.add(new THREE.HemisphereLight(0xb7d4e8, 0x05070a, 0.32));

  // Key 主光:冷白,大角度柔光
  const key = new THREE.DirectionalLight(0xf1f7ff, 1.4);
  key.position.set(6, 10, 7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -12;
  key.shadow.camera.right = key.shadow.camera.top = 12;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 8;
  scene.add(key);

  // Rim 轮廓光:主青,从侧后勾勒车身腰线(提亮,让腰线分离背景)
  const rim = new THREE.DirectionalLight(0x75dbea, 1.05);
  rim.position.set(-7, 4.5, -6);
  scene.add(rim);

  // 第二道 Rim:更纯的青,从另一侧后方补轮廓(对称雕刻车身)
  const rim2 = new THREE.DirectionalLight(0x54d3e3, 0.52);
  rim2.position.set(7, 3.2, -7);
  scene.add(rim2);

  // Fill 底光:微弱暖光从地面反弹,让车底不死黑
  const warmFill = new THREE.DirectionalLight(0xffd1ad, 0.42);
  warmFill.position.set(-4, 2.4, 7);
  scene.add(warmFill);

  // 车底反弹光(纯氛围,把轮胎和底盘从死黑里拽出来)
  const bounce = new THREE.PointLight(0x58cddd, 0.55, 6.5, 1.6);
  bounce.position.set(0, 0.18, 0);
  scene.add(bounce);

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

  /* 双层发光地环(APEX):内环实、外环虚,呼吸脉动 */
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xbef2fa, transparent: true, opacity: 0.36, toneMapped: false
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(4.85, 4.92, 128), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.005;
  showroomGroup.add(ring);

  const ringOuterMat = new THREE.MeshBasicMaterial({
    color: 0x54d3e3, transparent: true, opacity: 0.08, toneMapped: false
  });
  const ringOuter = new THREE.Mesh(new THREE.RingGeometry(5.05, 5.65, 128), ringOuterMat);
  ringOuter.rotation.x = -Math.PI / 2;
  ringOuter.position.y = 0.004;
  showroomGroup.add(ringOuter);

  /* 车底镜面反光板(APEX · 关键一笔):圆形镜面,车真实倒映 */
  const reflectorMat = new THREE.MeshPhysicalMaterial({
    color: 0x060a10,
    roughness: 0.08,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    envMapIntensity: 2.4,
    transparent: true,
    opacity: 0.92
  });
  const mirror = new THREE.Mesh(new THREE.CircleGeometry(5.05, 96), reflectorMat);
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = 0.002;
  mirror.receiveShadow = true;
  showroomGroup.add(mirror);

  /* 扫描光环(APEX):一道青色光环沿车身 Z 轴缓慢扫描 */
  const scanRingMat = new THREE.MeshBasicMaterial({
    color: 0x54d3e3, transparent: true, opacity: 0.55, toneMapped: false,
    side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const scanRing = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.018, 8, 96), scanRingMat);
  scanRing.rotation.x = Math.PI / 2;
  scanRing.position.set(0, 0.5, 0);
  showroomGroup.add(scanRing);

  /* 环绕微尘(APEX · 体积光空气感):比 dust 更慢更近的漂浮微粒 */
  const DUST_N = 260;
  const dustPos = new Float32Array(DUST_N * 3);
  for (let i = 0; i < DUST_N; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 14;
    dustPos[i * 3 + 1] = Math.random() * 4 + 0.2;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 14;
  }
  const nearDustGeo = new THREE.BufferGeometry();
  nearDustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const nearDust = new THREE.Points(nearDustGeo, new THREE.PointsMaterial({
    color: 0xcfeaff, size: 0.03, transparent: true, opacity: 0.32,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  showroomGroup.add(nearDust);

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
  bloom.strength = 0.26;
  bloom.threshold = 0.78;
  bloom.radius = 0.45;
  postfx.setFilmGrade({
    grainAmount: 0.018,
    aberration: 0.0007,
    vignetteStrength: 0.32,
    vignetteSoftness: 0.68,
    barrel: 0.005,
    lift: [0.008, 0.010, 0.014],
    gamma: [1.02, 1.02, 1.03],
    gain: [1.05, 1.055, 1.06]
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
    ringMat.opacity = 0.28 + Math.sin(t * 0.72) * 0.08;
    ringOuterMat.opacity = 0.05 + Math.sin(t * 0.55 + 1.2) * 0.035;
    dust.rotation.y = t * 0.008;
    nearDust.rotation.y = -t * 0.005;
    nearDust.position.y = Math.sin(t * 0.18) * 0.06;
    halo.rotation.z = t * 0.012;
    haloMat.opacity = 0.19 + Math.sin(t * 0.56) * 0.04;
    const scan = Math.sin(t * 0.22);
    scanKey.position.x = scan * 6.4;
    scanKey.target.position.x = Math.sin(t * 0.17) * 1.2;
    // 扫描光环沿 Z 轴缓慢扫过车身(-2.4m → +2.4m)
    const scanPhase = (t * 0.16) % 2.0;
    const scanZ = scanPhase < 1 ? (scanPhase * 2 - 1) * 2.4 : (1 - (scanPhase - 1) * 2) * 2.4;
    scanRing.position.z = scanZ;
    scanRingMat.opacity = 0.42 * Math.sin(scanPhase * Math.PI);
    scanRing.scale.setScalar(1 + Math.sin(t * 0.9) * 0.015);
    // 车底反弹光随呼吸脉动
    bounce.intensity = 0.5 + Math.sin(t * 0.7) * 0.12;
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
      renderer.toneMappingExposure = 0.6;
      bloom.strength = 0.18;
      return;
    }
    renderer.toneMappingExposure = 0.7;
    bloom.strength = 0.26;
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
