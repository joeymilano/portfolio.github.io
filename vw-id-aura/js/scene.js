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
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export function createScene(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.68;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x04060b);
  scene.fog = new THREE.FogExp2(0x04060b, 0.015);

  const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.05, 400);
  camera.position.set(8.8, 3.4, 8.8);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 5.5;
  controls.maxDistance = 18;
  controls.maxPolarAngle = Math.PI / 2 - 0.04;
  controls.target.set(0, 0.8, 0);

  /* ---------- environment: tourist panoramas (background + PBR reflections) ----------
     Each panorama drives BOTH scene.background (the visible vista) and
     scene.environment (PMREM-processed, so paint/glass/floor reflect the
     place the car is "parked in"). Switchable at runtime via setScene(). */
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rgbeLoader = new RGBELoader();
  const SCENES = [
    { name: 'Auto Show', file: 'assets/hdri/autoshop_01.hdr', stage: true },
    { name: 'Swiss Alps', file: 'assets/hdri/scenes/alps_field_2k.hdr' },
    { name: 'Route 66',   file: 'assets/hdri/scenes/autumn_road_2k.hdr' },
    { name: 'Euro Night', file: 'assets/hdri/scenes/blaubeuren_night_2k.hdr' },
    { name: 'Meadow',     file: 'assets/hdri/scenes/kloppenheim_06_2k.hdr' },
    { name: 'Dawn Lake',  file: 'assets/hdri/scenes/bell_park_dawn_2k.hdr' }
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
      scene.backgroundBlurriness = isPremiere ? 0 : 0.08;
      scene.fog = isPremiere ? new THREE.FogExp2(0x02050a, 0.024) : null;
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
  scene.add(new THREE.HemisphereLight(0x8fb4d8, 0x05070c, 0.28));

  const key = new THREE.DirectionalLight(0xdfe9ff, 1.12);
  key.position.set(7, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -12;
  key.shadow.camera.right = key.shadow.camera.top = 12;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x38f0ff, 0.42);
  rim.position.set(-8, 5, -7);
  scene.add(rim);

  /* ---------- showroom world: satin floor + premiere architecture ---------- */
  const showroomGroup = new THREE.Group();
  scene.add(showroomGroup);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(60, 72),
    new THREE.MeshPhysicalMaterial({
      color: 0x070a0f,
      roughness: 0.68,
      metalness: 0.18,
      clearcoat: 0.28,
      clearcoatRoughness: 0.72,
      envMapIntensity: 0.34
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  showroomGroup.add(floor);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38f0ff, transparent: true, opacity: 0.13 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(4.6, 4.65, 96), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.005;
  showroomGroup.add(ring);

  const grid = new THREE.PolarGridHelper(16, 12, 9, 96, 0x1c2a44, 0x101a2c);
  grid.position.y = 0.002;
  grid.material.transparent = true;
  grid.material.opacity = 0.14;
  showroomGroup.add(grid);

  premiereGroup = new THREE.Group();
  showroomGroup.add(premiereGroup);

  const hallMat = new THREE.MeshPhysicalMaterial({
    color: 0x080b11, roughness: 0.72, metalness: 0.22, envMapIntensity: 0.3
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x020305, roughness: 0.82, metalness: 0.1
  });
  const lightMat = new THREE.MeshBasicMaterial({
    color: 0x55eaf2, transparent: true, opacity: 0.7
  });

  const podium = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.35, 0.12, 96), hallMat);
  podium.position.y = 0.01;
  podium.receiveShadow = true;
  premiereGroup.add(podium);

  const backWall = new THREE.Mesh(new THREE.BoxGeometry(23, 7.4, 0.24), blackMat);
  backWall.position.set(0, 3.55, -8.2);
  premiereGroup.add(backWall);

  // The premiere wall is driven by licensed real night-driving footage.
  // Keeping it as a VideoTexture avoids the synthetic "procedural poster"
  // look while making the reveal film flow directly into the auto-show set.
  const ledVideo = document.createElement('video');
  ledVideo.src = 'assets/video/aura-night-drive.mp4';
  ledVideo.muted = true;
  ledVideo.loop = true;
  ledVideo.playsInline = true;
  ledVideo.preload = 'auto';
  ledVideo.autoplay = true;
  ledVideo.play().catch(() => {});

  const ledTex = new THREE.VideoTexture(ledVideo);
  ledTex.colorSpace = THREE.SRGBColorSpace;
  ledTex.minFilter = THREE.LinearFilter;
  ledTex.magFilter = THREE.LinearFilter;
  ledTex.generateMipmaps = false;
  ledTex.repeat.set(1, 0.708);
  ledTex.offset.set(0, 0.146);
  const ledWall = new THREE.Mesh(
    new THREE.PlaneGeometry(13.8, 5.5),
    new THREE.MeshBasicMaterial({
      map: ledTex,
      color: 0x8aa5aa,
      toneMapped: false
    })
  );
  ledWall.position.set(0, 3.42, -8.05);
  premiereGroup.add(ledWall);

  const trussMat = new THREE.MeshStandardMaterial({
    color: 0x171c22, metalness: 0.82, roughness: 0.36
  });
  for (const x of [-8.8, 8.8]) {
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.24, 7.1, 0.24), trussMat);
    pylon.position.set(x, 3.45, -7.7);
    premiereGroup.add(pylon);
  }
  const truss = new THREE.Mesh(new THREE.BoxGeometry(18, 0.22, 0.24), trussMat);
  truss.position.set(0, 6.65, -7.7);
  premiereGroup.add(truss);

  for (let i = 0; i < 7; i++) {
    const x = -7.2 + i * 2.4;
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.025, 0.07), lightMat);
    bar.position.set(x, 6.48, -7.42);
    premiereGroup.add(bar);
    const spot = new THREE.SpotLight(0xd7faff, 7.5, 15, 0.26, 0.92, 1.8);
    spot.position.set(x, 6.28, -6.9);
    spot.target.position.set(x * 0.24, 0, 0);
    premiereGroup.add(spot, spot.target);
  }

  const sideFinGeo = new THREE.BoxGeometry(0.1, 5.2, 3.6);
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) {
      const fin = new THREE.Mesh(sideFinGeo, i === 3 ? hallMat : blackMat);
      fin.position.set(side * (7.1 + i * 1.15), 2.65, -4.9 + i * 0.5);
      fin.rotation.y = side * (-0.18 - i * 0.035);
      premiereGroup.add(fin);
    }
  }

  const haloMat = new THREE.MeshBasicMaterial({
    color: 0x39dce7, transparent: true, opacity: 0.28, toneMapped: false
  });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(5.15, 0.018, 8, 120), haloMat);
  halo.rotation.x = Math.PI / 2;
  halo.position.set(0, 5.75, -0.8);
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
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.1, 0.34, 0.92);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  function resize() {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
  }
  addEventListener('resize', resize);

  function render() { composer.render(); }

  function update(t) {
    ring.rotation.z = t * 0.05;
    ringMat.opacity = 0.1 + Math.sin(t * 1.2) * 0.025;
    dust.rotation.y = t * 0.008;
    halo.rotation.z = t * 0.018;
    haloMat.opacity = 0.22 + Math.sin(t * 0.7) * 0.045;
  }

  function setShowroomActive(on) {
    showroomActive = on;
    showroomGroup.visible = on;
    if (!on) {
      ledVideo.pause();
      scene.background = new THREE.Color(0x010205);
      scene.backgroundBlurriness = 0;
      scene.fog = new THREE.FogExp2(0x010205, 0.018);
      renderer.toneMappingExposure = 0.56;
      bloom.strength = 0.13;
      return;
    }
    ledVideo.play().catch(() => {});
    renderer.toneMappingExposure = 0.68;
    bloom.strength = 0.1;
    if (sceneIdx >= 0 && sceneTex[sceneIdx]) applySceneTexture(sceneTex[sceneIdx], sceneIdx);
  }

  setScene(0);

  window.__scene = scene;   // debug hook
  return {
    scene, camera, renderer, controls, composer, bloom, resize, render, update,
    SCENES, setScene, getScene: () => sceneIdx, onScene: (cb) => sceneCbs.push(cb),
    setShowroomActive
  };
}
