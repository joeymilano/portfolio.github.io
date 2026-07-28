/* ============================================================
   ID.AURA — Cluster · SVG power gauge (Phase B3)
   Replaces the old Canvas2D power-gauge/needle/speed-numeral
   drawing with a real vector instrument:
     · gradient-stroke drive/recuperation arcs, path `d` recomputed
       (morphed) every frame from live power — no alpha crossfade
     · a rotating <mask> sweep band reveals a travelling shine
       across whichever arc is currently filled
     · feGaussianBlur glow filter on the active arc + needle
     · spring-damped needle (critically-under-damped, not lerp)
     · digit-roll (odometer-style) speed numeral, pure CSS %-transforms
   Mounted by js/cluster/index.js; driven every frame via update().
   Contract: { resize(w,h), update(state, layout, mode, dt), setMode(mode) }
   ============================================================ */

const VB = 260;
const CX = VB / 2, CY = VB / 2;
const R = 84;
const ZERO = -Math.PI / 2;
const SPAN = Math.PI * 0.75;
const DRIVE_END = ZERO + SPAN;
const RECOIL_END = ZERO - SPAN;
const RAD2DEG = 180 / Math.PI;

function polar(cx, cy, r, angle) {
  return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r];
}

function arcPath(cx, cy, r, a0, a1) {
  if (Math.abs(a1 - a0) < 0.002) return '';
  const [x1, y1] = polar(cx, cy, r, a0);
  const [x2, y2] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lighten(hex, amt) {
  const [r, g, b] = hexToRgb(hex);
  const mix = (c) => Math.round(c + (255 - c) * amt);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}

const NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}

export function createGauge(mount, { mode, recoilColor }) {
  const RECOIL = recoilColor;
  let activeHue = mode.hue;

  mount.innerHTML = `
    <svg class="gauge-svg" viewBox="0 0 ${VB} ${VB}" aria-hidden="true">
      <defs>
        <filter id="gaugeGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="driveGrad" x1="0" y1="1" x2="1" y2="0">
          <stop class="drive-stop-0" offset="0%"/>
          <stop class="drive-stop-1" offset="100%"/>
        </linearGradient>
        <linearGradient id="recoilGrad" x1="1" y1="1" x2="0" y2="0">
          <stop class="recoil-stop-0" offset="0%" stop-color="${RECOIL}"/>
          <stop class="recoil-stop-1" offset="100%" stop-color="${lighten(RECOIL, 0.4)}"/>
        </linearGradient>
        <mask id="gaugeSweepMask">
          <rect class="sweep-band" x="${CX - 5}" y="${CY - VB}" width="10" height="${VB * 2}" fill="#fff"/>
        </mask>
      </defs>
      <g class="gauge-ticks"></g>
      <path class="gauge-track" fill="none" stroke="rgba(150,184,196,0.09)" stroke-width="${R * 0.045}"
            d="${arcPath(CX, CY, R, RECOIL_END, DRIVE_END)}"/>
      <path class="gauge-drive" fill="none" stroke="url(#driveGrad)" stroke-linecap="round"
            stroke-width="${R * 0.062}" filter="url(#gaugeGlow)"/>
      <path class="gauge-recoil" fill="none" stroke="url(#recoilGrad)" stroke-linecap="round"
            stroke-width="${R * 0.062}" filter="url(#gaugeGlow)"/>
      <path class="gauge-shine" fill="none" stroke="#fff" stroke-width="${R * 0.062}"
            stroke-linecap="round" opacity="0.4" mask="url(#gaugeSweepMask)"/>
      <path class="gauge-hairline" fill="none" stroke="rgba(120,160,170,0.10)" stroke-width="1"
            d="${arcPath(CX, CY, R * 1.12, RECOIL_END, DRIVE_END)}"/>
      <g class="gauge-needle">
        <line x1="${CX}" y1="${CY - R * 0.16}" x2="${CX}" y2="${CY - R * 0.92}" stroke-width="2.2"
              stroke-linecap="round" filter="url(#gaugeGlow)"/>
      </g>
      <circle class="gauge-hub" cx="${CX}" cy="${CY}" r="${R * 0.05}" fill="#0e151a" stroke-width="1.6"/>
      <text class="gauge-lbl-drive" x="${polar(CX, CY, R * 1.3, ZERO + SPAN * 0.55)[0].toFixed(1)}"
            y="${polar(CX, CY, R * 1.3, ZERO + SPAN * 0.55)[1].toFixed(1)}"
            text-anchor="middle" dominant-baseline="middle">DRIVE</text>
      <text class="gauge-lbl-recup" x="${polar(CX, CY, R * 1.3, ZERO - SPAN * 0.55)[0].toFixed(1)}"
            y="${polar(CX, CY, R * 1.3, ZERO - SPAN * 0.55)[1].toFixed(1)}"
            text-anchor="middle" dominant-baseline="middle">RECUP</text>
    </svg>
    <div class="gauge-chrome">
      <div class="gauge-speed">
        <div class="digit-roll"><span class="digit-strip"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></div>
        <div class="digit-roll"><span class="digit-strip"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></div>
        <div class="digit-roll"><span class="digit-strip"><i>0</i><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i><i>6</i><i>7</i><i>8</i><i>9</i></span></div>
      </div>
      <div class="gauge-unit">KM/H</div>
      <div class="gauge-kw"></div>
    </div>`;

  const svg = mount.querySelector('.gauge-svg');
  const driveArc = mount.querySelector('.gauge-drive');
  const recoilArc = mount.querySelector('.gauge-recoil');
  const shine = mount.querySelector('.gauge-shine');
  const sweepBand = mount.querySelector('.sweep-band');
  const needle = mount.querySelector('.gauge-needle');
  const hub = mount.querySelector('.gauge-hub');
  const lblDrive = mount.querySelector('.gauge-lbl-drive');
  const lblRecup = mount.querySelector('.gauge-lbl-recup');
  const speedWrap = mount.querySelector('.gauge-speed');
  const digitStrips = [...mount.querySelectorAll('.digit-strip')];
  const digitRolls = [...mount.querySelectorAll('.digit-roll')];
  const kwEl = mount.querySelector('.gauge-kw');
  const driveStop0 = mount.querySelector('.drive-stop-0');
  const driveStop1 = mount.querySelector('.drive-stop-1');

  const digitState = [-1, -1, -1];

  // build tick ring once (static — matches canvas version, mode-invariant)
  const ticksGroup = mount.querySelector('.gauge-ticks');
  for (let i = -10; i <= 10; i++) {
    const frac = i / 10;
    const ang = ZERO + SPAN * frac;
    const major = i % 5 === 0;
    const r1 = R + R * 0.02;
    const r2 = R + (major ? R * 0.10 : R * 0.05);
    const [x1, y1] = polar(CX, CY, r1, ang);
    const [x2, y2] = polar(CX, CY, r2, ang);
    ticksGroup.appendChild(svgEl('line', {
      x1: x1.toFixed(2), y1: y1.toFixed(2), x2: x2.toFixed(2), y2: y2.toFixed(2),
      stroke: `rgba(170,200,210,${major ? 0.30 : 0.14})`,
      'stroke-width': major ? 1.3 : 0.8
    }));
  }

  function applyHue(hex) {
    activeHue = hex;
    driveStop0.setAttribute('stop-color', hex);
    driveStop1.setAttribute('stop-color', lighten(hex, 0.42));
    lblDrive.style.fill = hex;
  }
  applyHue(mode.hue);

  function setMode(nextMode) {
    // path-morph driven color transition — the arcs themselves already morph
    // every frame from live power; this only re-grades the gradient + needle
    // hue smoothly instead of an alpha crossfade between two static states.
    const from = { t: 0 };
    const start = activeHue;
    gsapColorTween(start, nextMode.hue, applyHue);
  }

  // tiny local tween (no extra gsap import needed): rAF-driven color lerp
  function gsapColorTween(fromHex, toHex, apply, duration = 500) {
    const [r0, g0, b0] = hexToRgb(fromHex);
    const [r1, g1, b1] = hexToRgb(toHex);
    const t0 = performance.now();
    function step() {
      const p = Math.min(1, (performance.now() - t0) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const r = Math.round(r0 + (r1 - r0) * ease);
      const g = Math.round(g0 + (g1 - g0) * ease);
      const b = Math.round(b0 + (b1 - b0) * ease);
      apply(`#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- spring-damped needle ---------- */
  let needleAngle = ZERO, needleVel = 0;
  const SPRING_K = 170, SPRING_C = 19;

  function updateNeedle(targetAngle, dt) {
    let diff = targetAngle - needleAngle;
    const accel = diff * SPRING_K - needleVel * SPRING_C;
    needleVel += accel * dt;
    needleAngle += needleVel * dt;
    const deg = needleAngle * RAD2DEG + 90;
    needle.setAttribute('transform', `rotate(${deg.toFixed(2)} ${CX} ${CY})`);
  }

  /* ---------- digit-roll speed numeral ---------- */
  function setDigit(index, n) {
    n = Math.max(0, Math.min(9, n));
    if (digitState[index] === n) return;
    digitState[index] = n;
    digitStrips[index].style.transform = `translateY(-${n * 10}%)`;
  }
  function setSpeedDigits(speed) {
    const v = Math.max(0, Math.min(999, Math.round(speed)));
    const s = String(v).padStart(3, '0');
    for (let i = 0; i < 3; i++) setDigit(i, Number(s[i]));
    digitRolls[0].classList.toggle('dim', v < 100);
  }

  /* ---------- sweep band rotation ---------- */
  let sweepAngle = 0;

  function resize(w, h) {
    const outerR = Math.min(w * 0.21, h * 0.30);
    const size = (outerR / R) * VB;
    mount.style.width = `${size}px`;
    mount.style.height = `${size}px`;
    mount.style.left = `${w * 0.5}px`;
    mount.style.setProperty('--gauge-base', `${size}px`);
  }

  function update(state, layout, mode, dt) {
    const cyFrac = 0.585 - (0.585 - 0.52) * layout.pureFocus;
    mount.style.top = `${cyFrac * 100}%`;
    mount.style.transform = `translate(-50%,-50%) scale(${layout.gaugeScale})`;

    const gaugeA = Math.max(0, layout.gaugeAlpha * (1 - layout.pureFocus));
    svg.style.opacity = gaugeA;
    svg.style.visibility = gaugeA > 0.02 || layout.pureFocus > 0.02 ? 'visible' : 'hidden';

    const driveFill = Math.max(0, state.power);
    const recoilFill = Math.max(0, -state.power);
    const isRecup = state.power < 0;

    driveArc.setAttribute('d', driveFill > 0.005 ? arcPath(CX, CY, R, ZERO, ZERO + SPAN * driveFill) : '');
    recoilArc.setAttribute('d', recoilFill > 0.005 ? arcPath(CX, CY, R, ZERO, ZERO - SPAN * recoilFill) : '');
    driveArc.style.opacity = isRecup ? 0.18 : 1;
    recoilArc.style.opacity = isRecup ? 1 : 0.18;

    // shine mask only sweeps across whichever arc currently carries fill
    const shineD = isRecup
      ? (recoilFill > 0.005 ? arcPath(CX, CY, R, ZERO, ZERO - SPAN * recoilFill) : '')
      : (driveFill > 0.005 ? arcPath(CX, CY, R, ZERO, ZERO + SPAN * driveFill) : '');
    shine.setAttribute('d', shineD);
    sweepAngle = (sweepAngle + dt * 90) % 360;
    sweepBand.setAttribute('transform', `rotate(${sweepAngle.toFixed(1)} ${CX} ${CY})`);

    const pAng = ZERO + SPAN * Math.max(-1, Math.min(1, state.power));
    updateNeedle(pAng, Math.min(dt, 0.05));
    const needleColor = isRecup ? RECOIL : mode.hue;
    needle.querySelector('line').style.stroke = needleColor;
    hub.style.stroke = needleColor;

    lblRecup.style.fill = isRecup ? RECOIL : 'rgba(150,180,190,0.4)';
    lblDrive.style.fill = isRecup ? 'rgba(150,180,190,0.4)' : mode.hue;

    // speed numeral — always visible; grows with pureFocus, otherwise nests
    // inside the gauge scale (matches the old canvas's dual code path)
    const speedScale = layout.speedScale * (1 + layout.pureFocus * 0.18);
    speedWrap.style.transform = `scale(${speedScale})`;
    setSpeedDigits(state.speed);

    const powerKW = Math.round(Math.abs(state.power) * 240);
    const eF = layout.energyFocus;
    kwEl.textContent = `${isRecup ? '\u2212' : '+'}${powerKW} kW`;
    kwEl.style.color = isRecup ? RECOIL : mode.hue;
    kwEl.style.transform = `scale(${1 + eF * 0.28})`;
    kwEl.style.opacity = String(Math.max(0.4, gaugeA));
  }

  return { resize, update, setMode };
}
