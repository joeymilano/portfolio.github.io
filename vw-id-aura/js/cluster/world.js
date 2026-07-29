/* ============================================================
   ID.AURA — Cluster 3D Perception World
   实时 3D 驾驶感知世界（替代静态照片背景）：第三人称尾随视角，
   本车静止于原点、道路/车道/路灯/城市"跑步机"后移制造行驶感。
   夜间 HDRI 反射 + 大灯照明 + 雷达感知锥 + 发光车道 + 城市剪影。
   共享全局 scene/renderer，setActive() 切换环境与相机。
   Contract: { group, build, setActive, update, CAM }
   ============================================================ */

import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const TEAL = 0x54d3e3;
const TEAL_SOFT = 0x3adbe8;
const AMBER = 0xe6a877;
const RED = 0xff5a5a;

export function createClusterWorld(view, car) {
  const { scene, renderer } = view;
  const group = new THREE.Group();
  group.visible = false;
  group.userData.__clusterWorld = true;   // 诊断标记
  scene.add(group);

  /* ---------- 感知相机位（第三人称尾随：本车在下半屏，道路向远方延伸） ---------- */
  const CAM = { pos: new THREE.Vector3(0, 3.8, 9.8), tgt: new THREE.Vector3(0, 0.7, -7) };

  /* ---------- 夜间 HDRI 环境（反射 + 环境光） ---------- */
  let nightEnv = null;
  new RGBELoader().load('assets/hdri/cobblestone_street_night_2k.hdr', (tex) => {
    tex.mapping = THREE.EquirectangularReflectionMapping;
    const pmrem = new THREE.PMREMGenerator(renderer);
    nightEnv = pmrem.fromEquirectangular(tex).texture;
    pmrem.dispose();
  });

  /* ============================================================
     道路 —— 深色沥青 + 发光车道（InstancedMesh 跑步机）
     ============================================================ */
  const ROAD_LEN = 280;
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(30, ROAD_LEN),
    new THREE.MeshStandardMaterial({ color: 0x0a0d12, roughness: 0.96, metalness: 0.0 })
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0, -ROAD_LEN / 2 + 12);
  road.receiveShadow = true;
  group.add(road);

  // 路面微弱中央反光（车灯照亮区的承接）
  const roadSheen = new THREE.Mesh(
    new THREE.PlaneGeometry(11, ROAD_LEN),
    new THREE.MeshBasicMaterial({ color: 0x0e1a20, transparent: true, opacity: 0.5 })
  );
  roadSheen.rotation.x = -Math.PI / 2;
  roadSheen.position.set(0, 0.005, -ROAD_LEN / 2 + 12);
  group.add(roadSheen);

  /* 发光车道线：4 条虚线（x=-5.4,-1.8,1.8,5.4）+ 2 条路缘实线（x=±8.2） */
  const DASH_X = [-5.4, -1.8, 1.8, 5.4];
  const DASH_LEN = 3.2, DASH_GAP = 5.0, DASH_PERIOD = DASH_LEN + DASH_GAP;
  const DASH_COUNT_PER_LANE = 18;
  const dashGeo = new THREE.PlaneGeometry(0.16, DASH_LEN);
  dashGeo.rotateX(-Math.PI / 2);
  const dashMat = new THREE.MeshBasicMaterial({
    color: TEAL_SOFT, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  });
  const dashTotal = DASH_X.length * DASH_COUNT_PER_LANE;
  const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashTotal);
  dashes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(dashes);
  // 记录每段的基准 z（用于跑步机循环）
  const dashBaseZ = [];
  {
    let idx = 0;
    for (let l = 0; l < DASH_X.length; l++) {
      for (let i = 0; i < DASH_COUNT_PER_LANE; i++) {
        dashBaseZ[idx] = 10 - i * DASH_PERIOD;
        idx++;
      }
    }
  }

  // 路缘连续发光条
  const edgeGeo = new THREE.PlaneGeometry(0.12, ROAD_LEN);
  edgeGeo.rotateX(-Math.PI / 2);
  const edgeMat = new THREE.MeshBasicMaterial({
    color: TEAL, transparent: true, opacity: 0.28,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  });
  for (const x of [-8.2, 8.2]) {
    const e = new THREE.Mesh(edgeGeo, edgeMat);
    e.position.set(x, 0.004, -ROAD_LEN / 2 + 12);
    group.add(e);
  }

  /* ============================================================
     路灯门架（高速风格）—— 发光横杆 + 下垂灯头，跑步机后移
     ============================================================ */
  const GANTRY_COUNT = 8;
  const GANTRY_GAP = 34;
  const gantries = [];
  const poleMat = new THREE.MeshStandardMaterial({
    color: 0x1a2129, roughness: 0.5, metalness: 0.6, emissive: 0x0a1418, emissiveIntensity: 0.5
  });
  const lampMat = new THREE.MeshBasicMaterial({ color: 0xd8f2ff, toneMapped: false });
  for (let i = 0; i < GANTRY_COUNT; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const g = new THREE.Group();
    // 发光杆
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 6.4, 8), poleMat);
    pole.position.set(side * 9.6, 3.2, 0);
    g.add(pole);
    // 弯臂（斜伸向道路）
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 8), poleMat);
    arm.position.set(side * 8.6, 6.3, 0);
    arm.rotation.z = side * (Math.PI / 2.15);
    g.add(arm);
    // 灯头 + 光晕
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), lampMat);
    head.position.set(side * 7.6, 6.15, 0);
    g.add(head);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: makeGlowTexture(), color: 0xcfeaff, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(3.6, 3.6, 1);
    glow.position.copy(head.position);
    g.add(glow);
    // 地面光斑
    const pool = new THREE.Mesh(new THREE.CircleGeometry(2.6, 24), new THREE.MeshBasicMaterial({
      map: makeGlowTexture(), color: 0x9fd0e8, transparent: true, opacity: 0.13,
      blending: THREE.AdditiveBlending, depthWrite: false
    }));
    pool.rotation.x = -Math.PI / 2;
    pool.position.set(side * 7.6, 0.012, 0);
    g.add(pool);
    g.position.z = -18 - i * GANTRY_GAP;
    group.add(g);
    gantries.push(g);
  }

  /* ============================================================
     城市剪影 —— 远处发光窗户的建筑群（实时渲染，非 AI 图）
     ============================================================ */
  const cityWindowTex = makeWindowTexture();
  const cityMat = new THREE.MeshBasicMaterial({ map: cityWindowTex, toneMapped: false });
  const CITY_COUNT = 26;
  const cityGeo = new THREE.BoxGeometry(1, 1, 1);
  const city = new THREE.InstancedMesh(cityGeo, cityMat, CITY_COUNT);
  {
    const dummy = new THREE.Object3D();
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < CITY_COUNT; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const w = 6 + rnd() * 10, h = 10 + rnd() * 26, d = 6 + rnd() * 8;
      dummy.position.set(side * (26 + rnd() * 30), h / 2 - 0.5, -40 - rnd() * 150);
      dummy.scale.set(w, h, d);
      dummy.rotation.y = (rnd() - 0.5) * 0.3;
      dummy.updateMatrix();
      city.setMatrixAt(i, dummy.matrix);
    }
  }
  group.add(city);

  /* ============================================================
     雷达感知锥 —— 本车前方扇形 + 同心距离弧（脉冲扫描）
     ============================================================ */
  const radarGroup = new THREE.Group();
  group.add(radarGroup);
  // 主扇形（前向，-Z 方向）
  const coneGeo = new THREE.CircleGeometry(34, 48, Math.PI / 2 - 0.62, 1.24);
  coneGeo.rotateX(-Math.PI / 2);
  const coneMat = new THREE.MeshBasicMaterial({
    color: TEAL, transparent: true, opacity: 0.06,
    blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.position.y = 0.02;
  radarGroup.add(cone);
  // 同心距离弧（10/20/30m）
  const arcs = [];
  [10, 20, 30].forEach((r) => {
    const arcGeo = new THREE.RingGeometry(r - 0.12, r, 48, 1, Math.PI / 2 - 0.62, 1.24);
    arcGeo.rotateX(-Math.PI / 2);
    const arcMat = new THREE.MeshBasicMaterial({
      color: TEAL_SOFT, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false
    });
    const arc = new THREE.Mesh(arcGeo, arcMat);
    arc.position.y = 0.02;
    radarGroup.add(arc);
    arcs.push(arcMat);
  });

  /* ============================================================
     前车（感知语义：发光轮廓车影 + 3D 感知框 + 尾灯）
     ============================================================ */
  const leadGroup = new THREE.Group();
  group.add(leadGroup);
  let leadBodyMat, leadFrameMat, leadTailMat;
  {
    // 简化车影：半透发光体（box 拉伸成车比例）
    leadBodyMat = new THREE.MeshBasicMaterial({
      color: TEAL, transparent: true, opacity: 0.10,
      blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.35, 4.4), leadBodyMat);
    body.position.y = 0.75;
    leadGroup.add(body);
    // 发光轮廓线框
    const frame = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.9, 1.35, 4.4)),
      (leadFrameMat = new THREE.LineBasicMaterial({
        color: TEAL_SOFT, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, toneMapped: false
      }))
    );
    frame.position.y = 0.75;
    leadGroup.add(frame);
    // 尾灯
    leadTailMat = new THREE.MeshBasicMaterial({ color: RED, toneMapped: false });
    for (const x of [-0.7, 0.7]) {
      const tail = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.05), leadTailMat);
      tail.position.set(x, 0.72, 2.22);
      leadGroup.add(tail);
    }
    // 车顶感知标记（悬浮菱形，随扫描脉冲）
    const marker = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, toneMapped: false })
    );
    marker.position.y = 2.05;
    leadGroup.add(marker);
  }

  /* ---------- 大灯 SpotLight（本车照亮道路，真实光影） ---------- */
  let headSpots = [];
  function buildHeadlights(target) {
    headSpots.forEach((s) => { group.remove(s); group.remove(s.target); });
    headSpots = [];
    for (const x of [-0.62, 0.62]) {
      const spot = new THREE.SpotLight(0xd8ecff, 0, 42, 0.5, 0.55, 1.4);
      spot.position.set(x, 0.68, 1.9);
      spot.target.position.set(x * 1.6, 0, -18);
      group.add(spot, spot.target);
      headSpots.push(spot);
    }
  }

  /* ============================================================
     本车（克隆）
     ============================================================ */
  let ego = null;
  function build() {
    if (ego || !car.cloneCar) return;
    const c = car.cloneCar({});
    if (!c) return;
    ego = c;
    // 开灯
    ego.glowMats.forEach((m) => { m.emissiveIntensity = (m.userData.baseEmissive ?? 2.6) * 1.15; });
    group.add(ego.group);
    buildHeadlights();
    headSpots.forEach((s) => { s.intensity = 30; });
    // 接触阴影（软椭圆，让本车"落地"在路面上）
    const contact = new THREE.Mesh(
      new THREE.CircleGeometry(2.4, 32),
      new THREE.MeshBasicMaterial({ map: makeGlowTexture(), color: 0x000000, transparent: true, opacity: 0.55, depthWrite: false })
    );
    contact.rotation.x = -Math.PI / 2;
    contact.scale.set(1.1, 2.3, 1);
    contact.position.y = 0.016;
    group.add(contact);
  }

  /* ============================================================
     环境切换
     ============================================================ */
  let saved = null;
  function setActive(on) {
    group.visible = on;
    if (on) {
      build();
      saved = {
        env: scene.environment, bg: scene.background, fog: scene.fog,
        exposure: renderer.toneMappingExposure, bloom: view.bloom ? view.bloom.strength : null
      };
      if (nightEnv) scene.environment = nightEnv;
      scene.background = new THREE.Color(0x03060b);
      scene.fog = new THREE.FogExp2(0x03060b, 0.016);
      renderer.toneMappingExposure = 0.74;
      if (view.bloom) view.bloom.strength = 0.24;
    } else if (saved) {
      scene.environment = saved.env;
      scene.background = saved.bg;
      scene.fog = saved.fog;
      renderer.toneMappingExposure = saved.exposure;
      if (view.bloom && saved.bloom != null) view.bloom.strength = saved.bloom;
      saved = null;
    }
  }

  /* ============================================================
     每帧更新 —— 跑步机 + 雷达脉冲 + 车轮 + 跟车
     state: { speed(km/h), power(-1..1), frontCarM, mode }
     ============================================================ */
  const dummy = new THREE.Object3D();
  let dashOffset = 0;
  let gantryOffset = 0;
  function update(t, dt, state) {
    if (!group.visible) return;
    const v = (state && state.speed ? state.speed : 0) / 3.6;   // m/s
    dashOffset = (dashOffset + v * dt) % DASH_PERIOD;
    gantryOffset = (gantryOffset + v * dt) % GANTRY_GAP;

    // 车道虚线跑步机
    let idx = 0;
    for (let l = 0; l < DASH_X.length; l++) {
      for (let i = 0; i < DASH_COUNT_PER_LANE; i++) {
        let z = dashBaseZ[idx] + dashOffset;
        // 循环回收到远处
        if (z > 12) z -= DASH_COUNT_PER_LANE * DASH_PERIOD;
        dummy.position.set(DASH_X[l], 0.006, z);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        dashes.setMatrixAt(idx, dummy.matrix);
        idx++;
      }
    }
    dashes.instanceMatrix.needsUpdate = true;

    // 门架路灯跑步机
    gantries.forEach((g, i) => {
      let z = -20 - i * GANTRY_GAP + gantryOffset;
      if (z > 14) z -= GANTRY_COUNT * GANTRY_GAP;
      g.position.z = z;
    });

    // 车轮滚动（绕 X 轴）
    if (ego && ego.wheelPivots) {
      const w = v * dt * 2.2;
      ego.wheelPivots.forEach((p) => { p.rotation.x += w; });
      // 车身轻微俯仰（加速抬头/制动点头）+ 悬浮
      const accel = state && typeof state.power === 'number' ? state.power : 0;
      ego.group.rotation.x = THREE.MathUtils.lerp(ego.group.rotation.x, -accel * 0.015, 0.06);
      ego.group.position.y = Math.sin(t * 1.4) * 0.008;
    }

    // 雷达脉冲（扫描呼吸 + 随速增强）
    const pulse = 0.5 + Math.sin(t * 2.2) * 0.5;
    coneMat.opacity = 0.035 + pulse * 0.05 + Math.min(v / 60, 1) * 0.03;
    arcs.forEach((m, i) => { m.opacity = 0.22 + Math.sin(t * 2.2 - i * 0.6) * 0.14; });

    // 跟车：前车距离（state.frontCarM,米）映射到 -Z；回收时尾灯增亮
    const frontM = state && typeof state.frontCarM === 'number' ? state.frontCarM : 50;
    const leadZ = -Math.max(frontM, 12);
    leadGroup.position.z = THREE.MathUtils.lerp(leadGroup.position.z, leadZ, 0.05);
    const regen = state && state.power < -0.05;
    leadTailMat.color.set(regen ? 0xff7a6a : RED);
    leadFrameMat.opacity = 0.5 + pulse * 0.35;
    leadBodyMat.opacity = 0.07 + pulse * 0.05;
  }

  return { group, build, setActive, update, CAM };
}

/* ---------- 工具：径向光晕纹理 ---------- */
function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/* ---------- 工具：城市发光窗户纹理 ---------- */
function makeWindowTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#04070c';
  ctx.fillRect(0, 0, 128, 256);
  let seed = 13;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const cols = 8, rows = 20;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (rnd() < 0.26) {
        const warm = rnd() < 0.22;
        const a = 0.18 + rnd() * 0.38;
        ctx.fillStyle = warm
          ? `rgba(255,190,120,${a})`
          : `rgba(140,210,235,${a})`;
        ctx.fillRect(6 + x * 15, 8 + y * 12, 7, 6);
      }
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
