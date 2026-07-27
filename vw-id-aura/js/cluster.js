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
    time: 0
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
     12 o'clock = zero. Right half (CW) = drive, left half (CCW) = recup.
     ============================================================ */
  function drawPowerGauge(w, h, mode, a, scale) {
    if (a < 0.02) return;
    const cx = w * 0.5;
    const cy = h * 0.585;
    const R = Math.min(w * 0.21, h * 0.30) * scale;
    const ZERO = -Math.PI / 2;
    const SPAN = Math.PI * 0.75;          // each half = 135°
    const DRIVE_END = ZERO + SPAN;        // 4:30
    const RECOIL_END = ZERO - SPAN;       // 7:30 (-5π/4)

    const driveFill = Math.max(0, state.power);
    const recoilFill = Math.max(0, -state.power);
    const isRecup = state.power < 0;
    const active = isRecup ? RECOIL : mode.hue;

    ctx.save();
    ctx.globalAlpha = a;
    ctx.lineCap = 'round';

    // background dial (270° over the top, bottom opening for the digit)
    ctx.strokeStyle = 'rgba(150,184,196,0.07)';
    ctx.lineWidth = R * 0.045;
    ctx.beginPath();
    ctx.arc(cx, cy, R, RECOIL_END, DRIVE_END, false);
    ctx.stroke();

    // active drive arc
    if (driveFill > 0.005) {
      ctx.strokeStyle = mode.hue;
      ctx.lineWidth = R * 0.062;
      ctx.shadowColor = mode.hue; ctx.shadowBlur = R * 0.22;
      ctx.beginPath();
      ctx.arc(cx, cy, R, ZERO, ZERO + SPAN * driveFill, false);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    // active recuperation arc
    if (recoilFill > 0.005) {
      ctx.strokeStyle = RECOIL;
      ctx.lineWidth = R * 0.062;
      ctx.shadowColor = RECOIL; ctx.shadowBlur = R * 0.22;
      ctx.beginPath();
      ctx.arc(cx, cy, R, ZERO, ZERO - SPAN * recoilFill, true);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // tick ring
    for (let i = -10; i <= 10; i++) {
      const frac = i / 10;
      const ang = ZERO + SPAN * frac;
      const major = (i % 5 === 0);
      const r1 = R + R * 0.02;
      const r2 = R + (major ? R * 0.10 : R * 0.05);
      ctx.strokeStyle = `rgba(170,200,210,${major ? 0.30 : 0.14})`;
      ctx.lineWidth = major ? 1.3 : 0.8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
      ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
      ctx.stroke();
    }

    // needle
    const pAng = ZERO + SPAN * Math.max(-1, Math.min(1, state.power));
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(pAng);
    ctx.strokeStyle = active;
    ctx.lineWidth = 2.2;
    ctx.shadowColor = active; ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(R * 0.16, 0);
    ctx.lineTo(R * 0.92, 0);
    ctx.stroke();
    ctx.restore();
    ctx.shadowBlur = 0;

    // center hub
    ctx.fillStyle = '#0e151a';
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.05, 0, TAU); ctx.fill();
    ctx.strokeStyle = active; ctx.lineWidth = 1.6; ctx.stroke();

    // DRIVE / RECUP zone labels
    const lr = R * 1.30;
    const lblD = ZERO + SPAN * 0.55;
    const lblR = ZERO - SPAN * 0.55;
    text('DRIVE', cx + Math.cos(lblD) * lr, cy + Math.sin(lblD) * lr, 9,
      isRecup ? 'rgba(150,180,190,0.4)' : mode.hue, 'center', 600, 'Chakra Petch');
    text('RECUP', cx + Math.cos(lblR) * lr, cy + Math.sin(lblR) * lr, 9,
      isRecup ? RECOIL : 'rgba(150,180,190,0.4)', 'center', 600, 'Chakra Petch');

    // central speed readout (Chakra Petch Thin, tabular feel)
    const sp = String(Math.round(state.speed)).padStart(2, '0');
    const speedSize = R * 1.05 * layout.speedScale;
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 18;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f5f7f7';
    ctx.font = `300 ${speedSize}px "Chakra Petch", "Manrope", sans-serif`;
    ctx.fillText(sp, cx, cy - R * 0.02);
    ctx.shadowBlur = 0;
    text('KM/H', cx, cy + R * 0.30, R * 0.10, 'rgba(170,198,206,0.6)', 'center', 500);

    // power kW readout (Energy mode enlarges it)
    const powerKW = Math.round(Math.abs(state.power) * 240);
    const eF = layout.energyFocus;
    text(`${isRecup ? '−' : '+'}${powerKW} kW`, cx, cy + R * 0.50,
      R * 0.20 * (1 + eF * 0.55), active, 'center', 500, 'Chakra Petch');

    // outer hairline ring
    ctx.globalAlpha = a * 0.5;
    ctx.strokeStyle = 'rgba(120,160,170,0.10)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.12, RECOIL_END, DRIVE_END, false); ctx.stroke();
    ctx.restore();
  }

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

    // distance + TTC tag
    const tagX = vx + carHW * 1.75;
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

    drawGForce(w * 0.5, h * 0.86, mode);
    ctx.restore();
  }

  function drawGForce(cx, cy, mode) {
    const R = 34;
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
    const cx = w * 0.5, cy = h * 0.585;
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
    if (regA > 0.02) {
      const x = w * 0.5, y = h * 0.165;
      const ww = 380, hh = 64;
      ctx.save();
      ctx.globalAlpha = regA;
      roundedRect(x - ww / 2, y - hh / 2, ww, hh, 16);
      ctx.fillStyle = 'rgba(2,7,11,0.66)'; ctx.fill();
      ctx.strokeStyle = 'rgba(132,205,217,0.14)'; ctx.lineWidth = 1; ctx.stroke();
      line([[x - 148, y + 10], [x - 148, y - 8], [x - 132, y - 22], [x - 104, y - 22]], mode.hue, 2.4, 6);
      line([[x - 114, y - 30], [x - 104, y - 22], [x - 114, y - 14]], mode.hue, 2.4, 6);
      text('1.2 KM', x - 80, y - 8, 18, '#eff8fa', 'left', 400, 'Chakra Petch');
      text('BEAR RIGHT · OAKWOOD AVE', x - 80, y + 13, 9.5, 'rgba(159,187,196,0.64)', 'left', 500);
      ctx.restore();
    }
    if (pf > 0.02) {
      ctx.save();
      ctx.globalAlpha = pf;
      const x = w * 0.5, y = h * 0.155;
      ctx.strokeStyle = mode.hue;
      ctx.lineWidth = 2.6;
      ctx.shadowColor = mode.hue; ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.moveTo(x - 26, y - 14); ctx.lineTo(x, y - 30); ctx.lineTo(x + 26, y - 14);
      ctx.stroke();
      ctx.shadowBlur = 0;
      text('1.2 KM', x, y + 6, 22, '#f5f7f7', 'center', 300, 'Chakra Petch');
      text('OAKWOOD AVENUE', x, y + 28, 9.5, 'rgba(170,200,210,0.6)', 'center', 500);
      ctx.restore();
    }
  }

  function drawPureSpeed(w, h, mode, a) {
    ctx.save();
    ctx.globalAlpha = a;
    const cx = w * 0.5, cy = h * 0.52;
    const sp = String(Math.round(state.speed)).padStart(2, '0');
    const size = Math.min(h * 0.26, 200) * layout.speedScale;
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 24;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f6f8f8';
    ctx.font = `300 ${size}px "Chakra Petch", "Manrope", sans-serif`;
    ctx.fillText(sp, cx, cy);
    ctx.shadowBlur = 0;
    text('KM/H', cx, cy + size * 0.34, 12, mode.hue, 'center', 600, 'Chakra Petch');
    ctx.restore();
  }

  function drawStatus(w, h) {
    const top = h * 0.072;
    const now = new Date();
    const t = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
    text(t, w * 0.05, top, 12, 'rgba(196,215,220,0.7)', 'left', 400, 'Chakra Petch');
    text('21.5°  ·  BERLIN', w * 0.95, top, 11, 'rgba(196,215,220,0.55)', 'right', 500);
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

    // BASE — photographic night-drive scene (AI asset, replaces procedural)
    drawScenePhoto(w, h, mode, layout.roadAlpha);
    drawLaneFlow(w, h, mode, layout.roadAlpha, layout.adasAlpha);

    // MID
    drawPowerGauge(w, h, mode, layout.gaugeAlpha * (1 - layout.pureFocus), layout.gaugeScale);
    drawEnergyFlow(w, h, mode, layout.energyFocus);
    if (layout.pureFocus > 0.02) drawPureSpeed(w, h, mode, layout.pureFocus);

    // TOP
    drawADAS(w, h, mode, layout.adasAlpha * (1 - layout.pureFocus * 0.55));
    drawPerf(w, h, mode, layout.perfAlpha);

    // chrome
    drawTurnCue(w, h, mode);
    drawStatus(w, h);
    drawModePulse(w, h, mode);
  }

  function update(time, dt) {
    if (!state.active) return;
    state.time = time;
    updateDrive(dt);
    draw();
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
    get speed() { return state.speed; },
    get mode() { return state.mode; }
  };
  // expose for QA / CDP screenshot harness
  window.__cluster = api;
  return api;
}
