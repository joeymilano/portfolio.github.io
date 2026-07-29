/* ============================================================
   ID.AURA — Horizon Cluster · P1 rebuild
   A three-Z instrument surface for an electric vehicle:

     · BASE   photographic night-drive scene — AI-generated
             写实 art asset (real road / city skyline / wet
             reflections) carries depth + realism; the old
             procedural cel-shaded road (Math.sin ridges) is
             gone. Lane dashes float on top as an AR-HUD cue.
     · MID    zentral EV power gauge — Taycan-style: 12 o'clock
             is the zero point, right half = drive power (mode
             accent), left half = recuperation (green). Needle,
             tick ring, central Thin speed readout.
     · TOP    ADAS perception overlay — lane-lock edges,
             lead-vehicle detection box + distance/TTC,
             ACC brackets, blind-spot indicators.

   Four drive modes re-partition the layout via a GSAP-tweened
   `layout` object — Pure / Drive / Energy / GT. No hard cuts:
   information relocates and fades. Canvas 2D throughout.
   ============================================================ */

import { gsap } from 'gsap';
import { createGauge } from './gauge.js?v=20260729-2';

const TAU = Math.PI * 2;

const MODES = {
  pure: {
    label: 'PURE', hue: '#54d3e3',
    max: 220, response: 0.5
  },
  drive: {
    label: 'DRIVE', hue: '#54d3e3',
    max: 230, response: 0.62
  },
  energy: {
    label: 'ENERGY', hue: '#6fd9b4',
    max: 200, response: 0.5
  },
  gt: {
    label: 'GT', hue: '#ff5a3c',
    max: 272, response: 0.96
  }
};
const RECOIL = '#75e2bd';   // recuperation green — mode-invariant
const compactViewport = (w, h) => w <= 780 || h <= 560;
const compactPortrait = (w, h) => w <= 780 && h > w;

/* per-mode layout targets; GSAP tweens `layout` between these */
const LAYOUT_TARGET = {
  pure:   { gaugeAlpha: 0.0, roadAlpha: 0.42, adasAlpha: 0.50, speedScale: 1.22, perfAlpha: 0, energyFocus: 0, pureFocus: 1, gaugeScale: 0.9 },
  drive:  { gaugeAlpha: 1.0, roadAlpha: 1.0,  adasAlpha: 1.0,  speedScale: 1.0,  perfAlpha: 0, energyFocus: 0, pureFocus: 0, gaugeScale: 1.0 },
  energy: { gaugeAlpha: 0.92, roadAlpha: 0.72, adasAlpha: 0.58, speedScale: 0.9,  perfAlpha: 0, energyFocus: 1, pureFocus: 0, gaugeScale: 1.05 },
  gt:     { gaugeAlpha: 1.0, roadAlpha: 1.0,  adasAlpha: 1.0,  speedScale: 1.0,  perfAlpha: 1, energyFocus: 0, pureFocus: 0, gaugeScale: 1.16 }
};

export function createCluster(layer) {
  layer.innerHTML = `
    <div class="horizon-cluster" data-mode="drive">
      <canvas class="cluster-canvas"></canvas>
      <div class="cluster-gauge-mount"></div>
      <aside class="cluster-pod pod-perf" aria-label="Performance">
        <div class="pod-label"><i></i>PERFORMANCE</div>
        <div class="pod-kw-wrap"><b id="pod-kw">+58</b><span>kW</span></div>
        <div class="pod-bar"><i id="pod-bar"></i></div>
        <div class="pod-row"><span>FRONT</span><div class="pod-tq"><i id="tq-f"></i></div><b id="tq-f-v">96</b></div>
        <div class="pod-row"><span>REAR</span><div class="pod-tq"><i id="tq-r"></i></div><b id="tq-r-v">144</b></div>
        <div class="pod-g">
          <svg viewBox="0 0 60 60" class="pod-g-svg" aria-hidden="true">
            <circle cx="30" cy="30" r="24" class="g-ring"/>
            <line x1="7" y1="30" x2="53" y2="30" class="g-cross"/>
            <line x1="30" y1="7" x2="30" y2="53" class="g-cross"/>
            <circle id="g-dot" cx="30" cy="30" r="4.5" class="g-dot"/>
          </svg>
          <span>G-FORCE</span>
        </div>
      </aside>
      <aside class="cluster-pod pod-energy" aria-label="Energy">
        <div class="pod-label"><i></i>ENERGY</div>
        <div class="pod-soc-wrap">
          <svg viewBox="0 0 72 72" class="pod-soc-svg" aria-hidden="true">
            <circle cx="36" cy="36" r="30" class="soc-track"/>
            <circle id="soc-arc" cx="36" cy="36" r="30" class="soc-arc"/>
          </svg>
          <div class="pod-soc-num"><b id="soc-v">82</b><span>%</span></div>
        </div>
        <div class="pod-range"><b id="range-v">412</b><span>KM RANGE</span></div>
        <svg viewBox="0 0 100 26" class="pod-spark" preserveAspectRatio="none" aria-hidden="true"><polyline id="spark-line" points=""/></svg>
        <div class="pod-row pod-recup"><span>RECUP</span><b id="recup-v">−34 kW</b></div>
      </aside>
      <div class="cluster-heading">
        <span class="cluster-pilot">
          <i class="cluster-pilot-status"></i>
          AURA PILOT
        </span>
        <span class="cluster-heading-rule"></span>
        <span>ASSISTED DRIVE · ACTIVE</span>
      </div>
      <div class="cluster-assistance" aria-label="Driver assistance status">
        <span><i class="dot ok"></i> ACC 120</span>
        <span><i class="dot ok"></i> LANE CENTERED</span>
        <span><i class="dot ok"></i> BLIND-SPOT</span>
      </div>
      <div class="cluster-modes" aria-label="Drive mode">
        ${Object.entries(MODES).map(([key, mode]) =>
          `<button data-mode="${key}" class="${key === 'drive' ? 'active' : ''}" style="--c:${mode.hue}">
            <span>${mode.label}</span>
          </button>`).join('')}
      </div>
    </div>`;

  const root = layer.querySelector('.horizon-cluster');
  const canvas = layer.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const modeButtons = [...layer.querySelectorAll('.cluster-modes button')];
  const gauge = createGauge(layer.querySelector('.cluster-gauge-mount'), { mode: MODES.drive, recoilColor: RECOIL });
  const gaugeSize = { w: 0, h: 0 };
  // 三舱 DOM 引用（性能舱 + 能量舱）
  const el = {
    podKw: layer.querySelector('#pod-kw'), podBar: layer.querySelector('#pod-bar'),
    tqF: layer.querySelector('#tq-f'), tqFV: layer.querySelector('#tq-f-v'),
    tqR: layer.querySelector('#tq-r'), tqRV: layer.querySelector('#tq-r-v'),
    gDot: layer.querySelector('#g-dot'),
    socArc: layer.querySelector('#soc-arc'), socV: layer.querySelector('#soc-v'),
    rangeV: layer.querySelector('#range-v'), sparkLine: layer.querySelector('#spark-line'),
    recupV: layer.querySelector('#recup-v')
  };
  // 3D 感知世界（共享 scene）：在 HUD 之下渲染实时驾驶世界，接管照片/车道/ADAS
  let world = null;

  const state = {
    active: false,
    mode: 'drive',
    speed: 86, targetSpeed: 86,
    power: 0.24,            // -1..1 (negative = recuperation)
    soc: 82, range: 412,
    phase: 'cruise', phaseTime: 0,
    roadPhase: 0,           // flowing-lane phase 0..1
    frontCarM: 42, frontCarD: 0.46,
    ttc: 2.4, accLocked: true,
    blindLeft: false, blindRight: false, blindTimer: 0,
    gLong: 0, gLat: 0,
    peakPower: 0.7,
    modePulse: 0,
    time: 0,
    // B4 — missing instrument detail: telltales, speed sign, trip computer
    turnLeftOn: false, turnRightOn: false,
    highBeamOn: false,
    speedLimit: 120, overLimitPulse: 0,
    odo: 18420, tripDist: 0, tripTime: 0,
    consumption: 16.4, consumptionHistory: [], consumptionSampleTimer: 0
  };

  const layout = { ...LAYOUT_TARGET.drive };
  root.style.setProperty('--mode-hue', MODES.drive.hue);

  /* ensure Chakra Petch is available for canvas text */
  if (document.fonts && document.fonts.load) {
    document.fonts.load('300 100px "Chakra Petch"').catch(() => {});
  }

  function setMode(key) {
    if (!MODES[key] || key === state.mode) return;
    state.mode = key;
    state.modePulse = 1;
    root.dataset.mode = key;
    root.style.setProperty('--mode-hue', MODES[key].hue);
    document.body.style.setProperty('--view-accent', MODES[key].hue);  // P3 跨模态辉光：切档全屏边缘联动换色
    modeButtons.forEach((b) => b.classList.toggle('active', b.dataset.mode === key));
    gsap.to(layout, { ...LAYOUT_TARGET[key], duration: 0.7, ease: 'power3.inOut', overwrite: true });
    gauge.setMode(MODES[key]);
  }
  modeButtons.forEach((button) =>
    button.addEventListener('click', () => setMode(button.dataset.mode)));

  /* ---------- canvas helpers ---------- */
  function roundedRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }

  function text(value, x, y, size, color, align = 'left', weight = 500, family = 'Manrope') {
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    const fallback = family === 'Chakra Petch' ? '"Manrope", ' : '';
    ctx.font = `${weight} ${size}px "${family}", ${fallback}sans-serif`;
    ctx.fillText(value, x, y);
  }

  function line(pts, color, width = 1, glow = 0) {
    ctx.beginPath();
    pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow; }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function alphaHex(a) {
    const v = Math.max(0, Math.min(1, a));
    return Math.round(v * 255).toString(16).padStart(2, '0');
  }

  // depth d∈[0,1] (0 = vanishing point, 1 = bottom) → screen y
  function projectY(d, vy, bottom) {
    return vy + (bottom - vy) * Math.pow(d, 0.62);
  }

  /* ---------- drive dynamics & simulated telemetry ---------- */
  function updateDrive(dt) {
    state.phaseTime += dt;
    const mode = MODES[state.mode];
    if (state.phase === 'cruise' && state.phaseTime > 7.5) {
      state.phase = 'regen'; state.phaseTime = 0;
    } else if (state.phase === 'regen') {
      state.targetSpeed = Math.max(42, state.targetSpeed - 36 * dt);
      if (state.targetSpeed <= 42.5) { state.phase = 'launch'; state.phaseTime = 0; }
    } else if (state.phase === 'launch') {
      state.targetSpeed = Math.min(mode.max * 0.5, state.targetSpeed + mode.response * 92 * dt);
      if (state.targetSpeed >= mode.max * 0.5 - 0.5) { state.phase = 'cruise'; state.phaseTime = 0; }
    }
    state.speed += (state.targetSpeed - state.speed) * Math.min(1, dt * 2.4);
    const targetPower = state.phase === 'launch' ? 0.78 : state.phase === 'regen' ? -0.34 : 0.24;
    state.power += (targetPower - state.power) * Math.min(1, dt * 2.0);
    state.peakPower = Math.max(state.peakPower, state.power);

    // road flow — speed-modulated, the forward-motion cue
    state.roadPhase = (state.roadPhase + dt * (0.18 + state.speed / 420)) % 1;

    // ADAS simulation (deterministic, no Math.random)
    state.frontCarD = 0.44 + Math.sin(state.time * 0.45) * 0.08;
    state.frontCarM = Math.round(28 + state.frontCarD * 60);
    state.ttc = Math.max(1.1, state.frontCarM / Math.max(20, state.speed) * 3.6 * 1.2);
    state.accLocked = !(state.phase === 'launch' && state.speed > 120);

    state.blindTimer += dt;
    const bcyc = state.blindTimer % 9;
    state.blindLeft  = bcyc > 1.2 && bcyc < 2.4;
    state.blindRight = bcyc > 5.0 && bcyc < 6.2;

    const targetGLong = state.power * (state.phase === 'regen' ? -0.35 : 0.62);
    state.gLong += (targetGLong - state.gLong) * Math.min(1, dt * 2.2);
    state.gLat = Math.sin(state.time * 0.8) * (state.speed / 230) * 0.55;

    // turn signals — deterministic demo cycle, ties into the blind-spot beats
    const turnCycle = state.time % 16;
    const blink = Math.floor(state.time * 2) % 2 === 0;
    state.turnLeftOn = turnCycle < 2.4 && blink;
    state.turnRightOn = turnCycle > 9 && turnCycle < 11.4 && blink;

    // high-beam pass flash
    const beamCycle = state.time % 22;
    state.highBeamOn = beamCycle > 14 && beamCycle < 16.5;

    // speed-limit sign recognition + over-limit pulse (GT mode's higher max makes this a real beat)
    state.overLimitPulse = state.speed > state.speedLimit + 3
      ? Math.min(1, state.overLimitPulse + dt * 3)
      : Math.max(0, state.overLimitPulse - dt * 2);

    // trip computer — odo/trip distance accrue with real simulated speed
    state.odo += (state.speed / 3600) * dt;
    state.tripDist += (state.speed / 3600) * dt;
    state.tripTime += dt;
    const instConsumption = 15.2 + state.power * 9.5;
    state.consumption += (instConsumption - state.consumption) * Math.min(1, dt * 0.6);
    state.consumptionSampleTimer += dt;
    if (state.consumptionSampleTimer > 0.5) {
      state.consumptionSampleTimer = 0;
      state.consumptionHistory.push(state.consumption);
      if (state.consumptionHistory.length > 40) state.consumptionHistory.shift();
    }

    state.modePulse = Math.max(0, state.modePulse - dt * 1.3);
  }

  /* ============================================================
     BASE LAYER — photographic night-drive scene
     AI-generated写实 art asset replaces the old procedural Canvas
     sky / mountains / road (the cheap "Math.sin ridge" look).
     The photo carries realism + depth; dynamic data layers float
     on top as a restrained AR-HUD. Mode hue tints only the horizon
     glow (Lotus discipline — accent ≤5%, background never flooded).
     ============================================================ */
  const sceneImg = new Image();
  sceneImg.src = 'assets/art/cluster-night-road.jpg';
  let sceneReady = false;
  sceneImg.onload = () => { sceneReady = true; };
  // photo horizon sits near h*0.34 — dynamic layers below must align
  const HORIZON = 0.34;

  function drawScenePhoto(w, h, mode, a) {
    if (a <= 0.01) return;
    ctx.save();
    ctx.globalAlpha = a;
    if (sceneReady) {
      // cover-fit the photo to the cluster frame
      const ir = sceneImg.naturalWidth / sceneImg.naturalHeight;
      const cr = w / h;
      let dw, dh, dx, dy;
      if (ir > cr) { dh = h; dw = h * ir; dx = (w - dw) / 2; dy = 0; }
      else { dw = w; dh = w / ir; dx = 0; dy = (h - dh) / 2; }
      ctx.drawImage(sceneImg, dx, dy, dw, dh);
    } else {
      ctx.fillStyle = '#04070a';
      ctx.fillRect(0, 0, w, h);
    }
    // cinematic vignette so the HUD reads against the photo edges
    const vg = ctx.createRadialGradient(w * 0.5, h * 0.52, h * 0.28, w * 0.5, h * 0.52, h * 0.9);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(4,7,11,0.78)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    // bottom fade into the cluster bezel (mode dock lives here)
    const bf = ctx.createLinearGradient(0, h * 0.68, 0, h);
    bf.addColorStop(0, 'rgba(4,7,11,0)');
    bf.addColorStop(1, 'rgba(4,7,11,0.94)');
    ctx.fillStyle = bf;
    ctx.fillRect(0, h * 0.68, w, h * 0.32);
    // top fade for the heading strip
    const tf = ctx.createLinearGradient(0, 0, 0, h * 0.18);
    tf.addColorStop(0, 'rgba(4,7,11,0.66)');
    tf.addColorStop(1, 'rgba(4,7,11,0)');
    ctx.fillStyle = tf;
    ctx.fillRect(0, 0, w, h * 0.18);
    // restrained horizon tint — the only place mode hue touches the bg
    const hy = h * HORIZON;
    const ht = ctx.createRadialGradient(w * 0.5, hy, 4, w * 0.5, hy, w * 0.52);
    ht.addColorStop(0, mode.hue + '2e');
    ht.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = a;
    ctx.fillStyle = ht;
    ctx.fillRect(0, 0, w, h * 0.62);
    ctx.restore();
  }

  // streaming lane dashes — core forward-motion cue
  function drawLaneFlow(w, h, mode, a, adasA) {
    if (a <= 0.01) return;
    const vx = w * 0.5;
    const vy = h * HORIZON;
    const bottom = h * 0.965;
    const nearHalf = w * 0.30;
    const N = 18;

    // center dashes (neutral white)
    for (let i = 0; i < N; i++) {
      const d = (i / N + state.roadPhase) % 1;
      if (d < 0.03) continue;
      const t = d;
      const yC = projectY(t, vy, bottom);
      const half = 4 + t * 22;
      const yTop = yC - half, yBot = yC + half;
      if (yBot < vy || yTop > bottom) continue;
      ctx.strokeStyle = `rgba(228,238,241,${(0.12 + t * 0.5) * a})`;
      ctx.lineWidth = 1 + t * 4.0;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(vx, Math.max(vy, yTop));
      ctx.lineTo(vx, Math.min(bottom, yBot));
      ctx.stroke();
    }

    // left/right lane edges — ADAS-locked, accent-tinted, brighter with adasA
    const edgeA = Math.max(a * 0.45, adasA * 0.85);
    [-1, 1].forEach((side) => {
      ctx.save();
      ctx.globalAlpha = edgeA;
      ctx.shadowColor = mode.hue;
      ctx.shadowBlur = 8;
      for (let i = 0; i < N; i++) {
        const d = (i / N + state.roadPhase) % 1;
        if (d < 0.04) continue;
        const t = d;
        const yC = projectY(t, vy, bottom);
        const half = 5 + t * 26;
        const yTop = yC - half, yBot = yC + half;
        if (yBot < vy || yTop > bottom) continue;
        const x = vx + side * nearHalf * t;
        ctx.strokeStyle = mode.hue;
        ctx.lineWidth = 1 + t * 2.6;
        ctx.beginPath();
        ctx.moveTo(x, Math.max(vy, yTop));
        ctx.lineTo(x, Math.min(bottom, yBot));
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  /* ============================================================
     MID LAYER — central EV power gauge (Taycan-style)
     Rewritten as a real SVG instrument — see js/cluster/gauge.js.
     gauge.update()/resize() are called from draw() below; this file
     only still owns the energy-flow particle ring around it.
     ============================================================ */

  /* ============================================================
     TOP LAYER — ADAS perception overlay
     ============================================================ */
  function drawCornerBox(cx, cy, hw, hh, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.shadowColor = color; ctx.shadowBlur = 10;
    const c = Math.min(hw, hh) * 0.30;
    const segs = [
      [[cx - hw, cy - hh], [cx - hw, cy - hh + c], [cx - hw + c, cy - hh]],
      [[cx + hw, cy - hh], [cx + hw - c, cy - hh], [cx + hw, cy - hh + c]],
      [[cx + hw, cy + hh], [cx + hw, cy + hh - c], [cx + hw - c, cy + hh]],
      [[cx - hw, cy + hh], [cx - hw + c, cy + hh], [cx - hw, cy + hh - c]]
    ];
    segs.forEach((s) => line(s, color, 2, 0));
    ctx.restore();
  }

  function drawADAS(w, h, mode, a) {
    if (a < 0.02) return;
    const vx = w * 0.5;
    const vy = h * HORIZON;
    const bottom = h * 0.965;
    ctx.save();
    ctx.globalAlpha = a;

    // lead-vehicle detection box
    const d = state.frontCarD;
    const carY = projectY(d, vy, bottom);
    const carHW = w * 0.05 * (0.4 + d);
    const carHH = carHW * 0.62;
    drawCornerBox(vx, carY, carHW, carHH, mode.hue);

    // ACC lock brackets
    if (state.accLocked) {
      ctx.strokeStyle = mode.hue;
      ctx.lineWidth = 1.4;
      ctx.shadowColor = mode.hue; ctx.shadowBlur = 8;
      const by = carY + carHH * 0.2;
      ctx.beginPath();
      ctx.moveTo(vx - carHW * 1.5, by); ctx.lineTo(vx - carHW * 1.15, by);
      ctx.moveTo(vx + carHW * 1.15, by); ctx.lineTo(vx + carHW * 1.5, by);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // distance + TTC tag (pushed further out so it clears the centred
    // power-kW readout, whose text width can reach ~0.58w at cy+R*0.50)
    const tagX = vx + carHW * 2.6;
    ctx.strokeStyle = 'rgba(120,160,170,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(vx + carHW * 0.7, carY); ctx.lineTo(tagX - 6, carY);
    ctx.stroke();
    text(`${state.frontCarM} m`, tagX, carY - 7, 12, '#e9f2f3', 'left', 500, 'Chakra Petch');
    text(`TTC ${state.ttc.toFixed(1)}s`, tagX, carY + 8, 9, mode.hue, 'left', 500);

    // blind-spot indicators
    drawBlindSpot(w * 0.135, h * 0.74, state.blindLeft);
    drawBlindSpot(w * 0.865, h * 0.74, state.blindRight);

    ctx.restore();
  }

  function drawBlindSpot(x, y, alert) {
    ctx.save();
    ctx.globalAlpha = alert ? 1 : 0.32;
    const c = alert ? '#ff8a4a' : 'rgba(150,180,190,0.5)';
    ctx.strokeStyle = c;
    ctx.lineWidth = 1.6;
    if (alert) { ctx.shadowColor = c; ctx.shadowBlur = 12; }
    ctx.beginPath();
    ctx.arc(x, y, 16, Math.PI * 0.18, Math.PI * 0.82);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.arc(x, y + 2, 3, 0, TAU); ctx.fill();
    text(alert ? 'CAUTION' : 'CLEAR', x, y + 24, 8, c, 'center', 600, 'Chakra Petch');
    ctx.restore();
  }

  /* ============================================================
     GT — performance panel
     ============================================================ */
  function drawPerf(w, h, mode, a) {
    if (a < 0.02) return;
    ctx.save();
    ctx.globalAlpha = a;

    const lx = w * 0.135, ly = h * 0.50;
    text('0—100', lx, ly - 20, 10, 'rgba(170,200,210,0.55)', 'center', 600, 'Chakra Petch');
    text('5.8', lx, ly + 6, 40, '#f5f7f7', 'center', 300, 'Chakra Petch');
    text('SECONDS', lx, ly + 32, 9, mode.hue, 'center', 600);

    const rx = w * 0.865, ry = h * 0.50;
    text('PEAK', rx, ry - 20, 10, 'rgba(170,200,210,0.55)', 'center', 600, 'Chakra Petch');
    const peakKW = Math.round(Math.max(state.peakPower, 0.7) * 240);
    text(`${peakKW}`, rx, ry + 6, 40, mode.hue, 'center', 300, 'Chakra Petch');
    text('kW · GT MODE', rx, ry + 32, 9, 'rgba(170,200,210,0.55)', 'center', 600);

    // squeezed between the centred power-kW readout (~0.73h) and the
    // mode-dock buttons below (~0.89h) — a compact radius + this y keeps
    // clearance from both.
    drawGForce(w * 0.5, h * 0.844, mode);
    ctx.restore();
  }

  function drawGForce(cx, cy, mode) {
    const R = 28;
    ctx.save();
    ctx.strokeStyle = 'rgba(120,160,170,0.18)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
    ctx.strokeStyle = 'rgba(120,160,170,0.12)';
    ctx.beginPath();
    ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R); ctx.lineTo(cx, cy + R);
    ctx.stroke();
    const gx = cx + Math.max(-1, Math.min(1, state.gLat)) * R * 0.8;
    const gy = cy + Math.max(-1, Math.min(1, state.gLong)) * R * 0.8;
    ctx.fillStyle = mode.hue;
    ctx.shadowColor = mode.hue; ctx.shadowBlur = 12;
    ctx.beginPath(); ctx.arc(gx, gy, 4.5, 0, TAU); ctx.fill();
    ctx.shadowBlur = 0;
    text('G-FORCE', cx, cy - R - 11, 8.5, 'rgba(170,200,210,0.5)', 'center', 600, 'Chakra Petch');
    ctx.restore();
  }

  /* ============================================================
     Energy — flow particles around the gauge
     ============================================================ */
  function drawEnergyFlow(w, h, mode, focus) {
    if (focus < 0.02) return;
    const cx = w * 0.5;
    const cy = compactPortrait(w, h) ? h * 0.39 : compactViewport(w, h) ? h * 0.46 : h * 0.34;
    const R = Math.min(w * 0.21, h * 0.30) * 1.18;
    const isRecup = state.power < 0;
    const half = isRecup ? -1 : 1;
    const N = 26;
    ctx.save();
    ctx.globalAlpha = focus;
    for (let i = 0; i < N; i++) {
      const frac = (i / N + state.roadPhase * 1.6 * (isRecup ? -1 : 1)) % 1;
      const ang = -Math.PI / 2 + half * Math.PI * 0.75 * frac;
      const x = cx + Math.cos(ang) * R;
      const y = cy + Math.sin(ang) * R;
      const a = (1 - frac) * 0.7;
      ctx.fillStyle = isRecup ? `rgba(117,226,189,${a})` : mode.hue + alphaHex(a);
      ctx.beginPath(); ctx.arc(x, y, 2.3, 0, TAU); ctx.fill();
    }
    ctx.restore();
  }

  /* ============================================================
     Chrome — turn cue, pure nav, status, mode pulse
     ============================================================ */
  function drawTurnCue(w, h, mode) {
    const pf = layout.pureFocus;
    const regA = 1 - pf;
    const compact = compactViewport(w, h);
    const portrait = compactPortrait(w, h);
    const x = portrait ? w * 0.5 : compact ? w * 0.21 : w * 0.5;
    const y = portrait ? h * 0.17 : compact ? h * 0.32 : h * 0.165;
    const cueScale = portrait
      ? Math.min(1, (w - 24) / 380)
      : compact
        ? 0.72
        : 1;
    if (regA > 0.02) {
      ctx.save();
      ctx.globalAlpha = regA;
      ctx.translate(x, y);
      ctx.scale(cueScale, cueScale);
      roundedRect(-190, -32, 380, 64, 16);
      ctx.fillStyle = 'rgba(2,7,11,0.66)'; ctx.fill();
      ctx.strokeStyle = 'rgba(132,205,217,0.14)'; ctx.lineWidth = 1; ctx.stroke();
      line([[-148, 10], [-148, -8], [-132, -22], [-104, -22]], mode.hue, 2.4, 6);
      line([[-114, -30], [-104, -22], [-114, -14]], mode.hue, 2.4, 6);
      text('1.2 KM', -80, -8, 18, '#eff8fa', 'left', 400, 'Chakra Petch');
      text('BEAR RIGHT · OAKWOOD AVE', -80, 13, 9.5, 'rgba(159,187,196,0.64)', 'left', 500);
      ctx.restore();
    }
    if (pf > 0.02) {
      ctx.save();
      ctx.globalAlpha = pf;
      ctx.translate(x, y);
      ctx.scale(cueScale, cueScale);
      ctx.strokeStyle = mode.hue;
      ctx.lineWidth = 2.6;
      ctx.shadowColor = mode.hue; ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(-26, -14); ctx.lineTo(0, -30); ctx.lineTo(26, -14);
      ctx.stroke();
      ctx.shadowBlur = 0;
      text('1.2 KM', 0, 6, 22, '#f5f7f7', 'center', 300, 'Chakra Petch');
      text('OAKWOOD AVENUE', 0, 28, 9.5, 'rgba(170,200,210,0.6)', 'center', 500);
      ctx.restore();
    }
  }

  function drawStatus(w, h) {
    const compact = compactViewport(w, h);
    const top = compact ? (compactPortrait(w, h) ? 72 : 58) : h * 0.072;
    const now = new Date();
    const t = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    text(t, compact ? 16 : w * 0.05, top, 12, 'rgba(196,215,220,0.7)', 'left', 400, 'Chakra Petch');
    if (compact) {
      text(`${Math.round(state.soc)}% · ${Math.round(state.range)} KM`, w - 16, top, 9.5,
        'rgba(196,215,220,0.5)', 'right', 500, 'Chakra Petch');
      return;
    }
    text('21.5°  ·  BERLIN', w * 0.95, top, 11, 'rgba(196,215,220,0.55)', 'right', 500);
    // SOC + range + consumption trend — tucked under the temp/city line, top-right corner only
    text(`${Math.round(state.soc)}% · ${Math.round(state.range)} KM`, w * 0.95, top + 16, 9.5,
      'rgba(196,215,220,0.42)', 'right', 500, 'Chakra Petch');
    drawSparkline(w * 0.95 - 62, top + 24, 62, 12, state.consumptionHistory, 12, 22);
  }

  function drawSparkline(x, y, w, h, samples, lo, hi) {
    if (samples.length < 2) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(132,205,217,0.5)';
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    samples.forEach((v, i) => {
      const px = x + (i / (samples.length - 1)) * w;
      const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
      const py = y + h - t * h;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    });
    ctx.stroke();
    ctx.restore();
  }

  /* ============================================================
     B4 — speed-limit recognition badge (top-left corner, below
     the heading strip; pulses amber/red when over the posted limit)
     ============================================================ */
  function drawSpeedLimitBadge(w, h) {
    const compact = compactViewport(w, h);
    const cx = compact ? 31 : w * 0.075;
    const cy = compactPortrait(w, h) ? h * 0.17 : compact ? h * 0.25 : h * 0.155;
    const R = Math.min(w, h) * (compact ? 0.033 : 0.026);
    const over = state.overLimitPulse;
    const ring = over > 0.05 ? `rgba(232,162,77,${0.55 + over * 0.45})` : 'rgba(224,90,90,0.82)';
    ctx.save();
    ctx.fillStyle = '#f4f2ee';
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill();
    ctx.lineWidth = R * 0.22;
    ctx.strokeStyle = ring;
    if (over > 0.05) { ctx.shadowColor = ring; ctx.shadowBlur = 10 * over; }
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.86, 0, TAU); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#141210';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = `700 ${R * 0.74}px "Chakra Petch", sans-serif`;
    ctx.fillText(String(state.speedLimit), cx, cy + R * 0.04);
    text('SPEED LIMIT', cx, cy + R * 1.7, 8, over > 0.3 ? ring : 'rgba(170,200,210,0.46)', 'center', 600, 'Chakra Petch');
    ctx.restore();
  }

  /* ============================================================
     B4 — telltale glyphs (simple canvas vector icons, ~8px)
     ============================================================ */
  function drawArrowIcon(x, y, s, dir) {
    ctx.beginPath();
    ctx.moveTo(x - dir * s * 0.7, y - s * 0.8);
    ctx.lineTo(x + dir * s * 0.7, y);
    ctx.lineTo(x - dir * s * 0.7, y + s * 0.8);
    ctx.closePath();
    ctx.fill();
  }
  function drawAdasIcon(x, y, s) {
    ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.6, y + s * 0.35); ctx.lineTo(x + s * 0.6, y + s * 0.35);
    ctx.moveTo(x, y - s); ctx.lineTo(x, y - s * 0.35);
    ctx.stroke();
  }
  function drawSeatbeltIcon(x, y, s) {
    ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.55, y - s * 0.6); ctx.lineTo(x + s * 0.55, y + s * 0.6);
    ctx.stroke();
  }
  function drawBoltIcon(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x + s * 0.15, y - s); ctx.lineTo(x - s * 0.45, y + s * 0.1);
    ctx.lineTo(x, y + s * 0.1); ctx.lineTo(x - s * 0.15, y + s);
    ctx.lineTo(x + s * 0.45, y - s * 0.1); ctx.lineTo(x, y - s * 0.1);
    ctx.closePath(); ctx.fill();
  }
  function drawTpmsIcon(x, y, s) {
    ctx.beginPath(); ctx.arc(x, y, s, 0, TAU); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - s * 0.5); ctx.lineTo(x, y + s * 0.18);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y + s * 0.55, s * 0.09, 0, TAU); ctx.fill();
  }
  function drawBeamIcon(x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x - s * 0.5, y - s * 0.5); ctx.lineTo(x + s * 0.5, y - s * 0.5);
    ctx.moveTo(x - s * 0.65, y); ctx.lineTo(x + s * 0.65, y);
    ctx.moveTo(x - s * 0.5, y + s * 0.5); ctx.lineTo(x + s * 0.5, y + s * 0.5);
    ctx.stroke();
  }

  function drawTelltale(x, y, s, active, color, drawGlyph) {
    ctx.save();
    ctx.globalAlpha = active ? 1 : 0.26;
    ctx.strokeStyle = active ? color : 'rgba(150,180,190,0.5)';
    ctx.fillStyle = ctx.strokeStyle;
    ctx.lineWidth = 1.4;
    if (active) { ctx.shadowColor = color; ctx.shadowBlur = 8; }
    drawGlyph(x, y, s);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  /* ============================================================
     B4 — bottom instrument strip: trip computer (edges) + telltale
     row (center). Sits in the gap between the ADAS blind-spot
     markers and the mode dock. Telltale row fades in GT mode so it
     doesn't compete with the bespoke performance HUD.
     ============================================================ */
  function drawBottomStrip(w, h, mode) {
    if (compactViewport(w, h)) return;
    const y = h * 0.80;
    ctx.save();

    // left — trip computer
    text(`ODO ${Math.round(state.odo).toLocaleString()} KM`, w * 0.075, y - 8, 10,
      'rgba(196,215,220,0.5)', 'left', 500, 'Chakra Petch');
    text(`TRIP ${state.tripDist.toFixed(1)} KM · ${Math.floor(state.tripTime / 60)}:${String(Math.floor(state.tripTime % 60)).padStart(2, '0')}`,
      w * 0.075, y + 8, 9, 'rgba(150,180,190,0.4)', 'left', 500);

    // right — consumption / peak power trend
    text(`AVG ${state.consumption.toFixed(1)} kWh/100km`, w * 0.925, y - 8, 10,
      'rgba(196,215,220,0.5)', 'right', 500, 'Chakra Petch');
    text(`PEAK ${Math.round(state.peakPower * 240)} kW`, w * 0.925, y + 8, 9,
      'rgba(150,180,190,0.4)', 'right', 500);

    // center — telltale row (turn L/R, ADAS, seatbelt, regen bolt, TPMS, high-beam)
    ctx.globalAlpha = 1 - layout.perfAlpha;
    const cx = w * 0.5, gap = 34, s = 8;
    const icons = [
      { active: state.turnLeftOn, color: RECOIL, draw: (x, yy, sz) => drawArrowIcon(x, yy, sz, -1) },
      { active: state.accLocked, color: mode.hue, draw: drawAdasIcon },
      { active: false, color: '#e07d8a', draw: drawSeatbeltIcon },
      { active: state.phase === 'regen', color: RECOIL, draw: drawBoltIcon },
      { active: false, color: '#e6a877', draw: drawTpmsIcon },
      { active: state.highBeamOn, color: '#bcd8ff', draw: drawBeamIcon },
      { active: state.turnRightOn, color: RECOIL, draw: (x, yy, sz) => drawArrowIcon(x, yy, sz, 1) }
    ];
    const startX = cx - ((icons.length - 1) / 2) * gap;
    icons.forEach((ic, i) => drawTelltale(startX + i * gap, y, s, ic.active, ic.color, ic.draw));
    ctx.restore();
  }

  function drawModePulse(w, h, mode) {
    if (state.modePulse <= 0) return;
    const a = state.modePulse;
    ctx.save();
    ctx.globalAlpha = a * 0.5;
    const y = h * (1 - a);
    const g = ctx.createLinearGradient(0, y, w, y);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.5, mode.hue);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 1, w, 2);
    ctx.restore();
  }

  /* ---------- main draw ---------- */
  function draw() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = layer.clientWidth;
    const h = layer.clientHeight;
    const tw = Math.round(w * dpr), th = Math.round(h * dpr);
    if (canvas.width !== tw || canvas.height !== th) { canvas.width = tw; canvas.height = th; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const mode = MODES[state.mode];

    // BASE — 实时 3D 感知世界（js/cluster/world.js）已接管驾驶环境：
    // 道路/车道/城市/雷达锥由 WebGL 渲染在 HUD 之下，Canvas 只保留仪器层。
    // (旧 AI 照片 drawScenePhoto / Canvas 车道 drawLaneFlow / Canvas ADAS drawADAS 已下线)

    // MID — SVG instrument (gauge.js): arcs, needle, digit-roll speed
    if (w !== gaugeSize.w || h !== gaugeSize.h) {
      gauge.resize(w, h);
      gaugeSize.w = w; gaugeSize.h = h;
    }
    gauge.update(state, layout, mode, state.dt);
    drawEnergyFlow(w, h, mode, layout.energyFocus);

    // 性能数据已整合进左性能舱（DOM）；旧 Canvas GT 面板 drawPerf 已下线

    // chrome
    drawTurnCue(w, h, mode);
    drawStatus(w, h);
    drawSpeedLimitBadge(w, h);
    drawBottomStrip(w, h, mode);
    drawModePulse(w, h, mode);
  }

  /* 三舱数据更新（DOM，每帧）：性能舱 = 功率/扭矩/G-force；能量舱 = SOC环/续航/能耗/回收 */
  const SOC_CIRC = 2 * Math.PI * 30;
  function updatePods(mode) {
    if (!el.podKw) return;
    const isRecup = state.power < 0;
    el.podKw.textContent = (isRecup ? '−' : '+') + Math.round(Math.abs(state.power) * 240);
    el.podKw.style.color = isRecup ? RECOIL : mode.hue;
    const pw = Math.min(1, Math.abs(state.power));
    el.podBar.style.width = (pw * 50) + '%';
    el.podBar.style.left = isRecup ? (50 - pw * 50) + '%' : '50%';
    el.podBar.style.background = isRecup ? RECOIL : mode.hue;
    el.tqFV.textContent = Math.round(Math.abs(state.power) * 240 * 0.4);
    el.tqRV.textContent = Math.round(Math.abs(state.power) * 240 * 0.6);
    el.tqF.style.width = Math.min(100, Math.abs(state.power) * 40 + 4) + '%';
    el.tqR.style.width = Math.min(100, Math.abs(state.power) * 60 + 4) + '%';
    el.gDot.setAttribute('cx', 30 + Math.max(-1, Math.min(1, state.gLat)) * 17);
    el.gDot.setAttribute('cy', 30 + Math.max(-1, Math.min(1, state.gLong)) * 17);
    el.socArc.style.strokeDasharray = SOC_CIRC;
    el.socArc.style.strokeDashoffset = SOC_CIRC * (1 - state.soc / 100);
    el.socV.textContent = Math.round(state.soc);
    el.rangeV.textContent = Math.round(state.range);
    if (state.consumptionHistory.length > 1) {
      const pts = state.consumptionHistory.map((v, i) => {
        const x = (i / (state.consumptionHistory.length - 1)) * 100;
        const t = Math.max(0, Math.min(1, (v - 12) / 10));
        return `${x.toFixed(1)},${(26 - t * 26).toFixed(1)}`;
      }).join(' ');
      el.sparkLine.setAttribute('points', pts);
    }
    el.recupV.textContent = state.power < -0.02 ? Math.round(state.power * 240) + ' kW' : '—';
  }

  function update(time, dt) {
    if (!state.active) return;
    state.time = time;
    state.dt = dt;
    updateDrive(dt);
    if (world) world.update(time, dt, state);   // 3D 感知世界随驾驶数据流动
    draw();
    updatePods(MODES[state.mode]);               // 三舱数据
  }

  function onEnter() {
    state.active = true;
    state.speed = state.targetSpeed = 86;
    state.phase = 'cruise';
    state.phaseTime = 0;
  }
  function onExit() { state.active = false; }

  const api = {
    update, onEnter, onExit,
    activate: onEnter, deactivate: onExit,
    setView: (on) => on ? onEnter() : onExit(),
    setMode,
    attachWorld: (w) => { world = w; },
    get speed() { return state.speed; },
    get mode() { return state.mode; },
    get layout() { return layout; },
    get state() { return state; }
  };
  // expose for QA / CDP screenshot harness
  window.__cluster = api;
  return api;
}
