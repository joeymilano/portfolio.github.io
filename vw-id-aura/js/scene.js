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
import { Reflector } from 'three/addons/objects/Reflector.js';
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
  renderer.toneMappingExposure = 1.0;
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

  /* ---------- environment: HDRI, fallback to RoomEnvironment ---------- */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  // HDRI: local (stable, no CDN stalls) → automotive studio CDN → RoomEnvironment fallback
  const HDR_CANDIDATES = [
    'assets/hdri/studio.hdr',
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/photo_studio_loft_hall_1k.hdr',
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_09_1k.hdr'
  ];
  const rgbeLoader = new RGBELoader();
  (function tryHdri(i) {
    if (i >= HDR_CANDIDATES.length) return;          // keep RoomEnvironment
    rgbeLoader.load(HDR_CANDIDATES[i],
      (tex) => { tex.mapping = THREE.EquirectangularReflectionMapping; scene.environment = tex; },
      undefined,
      () => tryHdri(i + 1));
  })(0);

  /* ---------- lighting ---------- */
  scene.add(new THREE.HemisphereLight(0x8fb4d8, 0x0a0c14, 0.5));

  const key = new THREE.DirectionalLight(0xdfe9ff, 2.0);
  key.position.set(7, 11, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = key.shadow.camera.bottom = -12;
  key.shadow.camera.right = key.shadow.camera.top = 12;
  key.shadow.bias = -0.0004;
  key.shadow.radius = 6;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x38f0ff, 1.0);
  rim.position.set(-8, 5, -7);
  scene.add(rim);

  /* ---------- floor: mirror + grain + accent ring ---------- */
  const mirror = new Reflector(new THREE.CircleGeometry(16, 72), {
    clipBias: 0.003, textureWidth: 1024, textureHeight: 1024, color: 0x121a28
  });
  mirror.rotation.x = -Math.PI / 2;
  mirror.position.y = -0.012;
  scene.add(mirror);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(60, 72),
    new THREE.MeshStandardMaterial({ color: 0x0a0e16, roughness: 0.92, metalness: 0.25 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.02;
  floor.receiveShadow = true;
  scene.add(floor);

  const ringMat = new THREE.MeshBasicMaterial({ color: 0x38f0ff, transparent: true, opacity: 0.3 });
  const ring = new THREE.Mesh(new THREE.RingGeometry(4.6, 4.65, 96), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.005;
  scene.add(ring);

  const grid = new THREE.PolarGridHelper(16, 12, 9, 96, 0x1c2a44, 0x101a2c);
  grid.position.y = 0.002;
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  scene.add(grid);

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
    color: 0x6fb6d8, size: 0.035, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(dust);

  /* ---------- post-processing ---------- */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.22, 0.5, 0.85);
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
    ringMat.opacity = 0.24 + Math.sin(t * 1.4) * 0.09;
    dust.rotation.y = t * 0.008;
  }

  window.__scene = scene;   // debug hook
  return { scene, camera, renderer, controls, composer, bloom, resize, render, update };
}
