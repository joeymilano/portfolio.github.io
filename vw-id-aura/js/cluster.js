/* ============================================================
   ID.AURA — Digital Cockpit (cluster)
   Full canvas-rendered instrument cluster: twin arcs (speed /
   power), drive modes (ECO / COMFORT / SPORT) that re-theme the
   display, animated gear shifts with torque flare, G-meter,
   battery + range, ADAS telltales and a media mini-widget.
   Camera dollies to the driver's eye while this view is live.
   ============================================================ */

const MODES = {
  eco:      { hue: '#4dff9e', label: 'ECO',      vmax: 200, ramp: 0.35 },
  comfort:  { hue: '#38f0ff', label: 'COMFORT',  vmax: 240, ramp: 0.6 },
  sport:    { hue: '#ff5a3c', label: 'SPORT',    vmax: 280, ramp: 1.0 }
};

export function createCluster(layer) {
  layer.innerHTML = `
    <canvas class="cluster-canvas"></canvas>
    <div class="cluster-modes">
      ${Object.entries(MODES).map(([k, m], i) =>
        `<button data-mode="${k}" class="${i === 1 ? 'active' : ''}">${m.label}</button>`).join('')}
    </div>`;

  const cv = layer.querySelector('canvas');
  const ctx = cv.getContext('2d');
  const modeBtns = [...layer.querySelectorAll('.cluster-modes button')];

  const S = {
    mode: 'comfort', speed: 88, speedTarget: 88, power: 0.32,
    gear: 'D', soc: 82, range: 412, g: { x: 0, y: 0 },
    phase: 'cruise',          // start mid-cruise so frame one already reads as driving
    phaseT: 0, flare: 0, active: false, t: 0
  };

  modeBtns.forEach((b) => b.addEventListener('click', () => {
    S.mode = b.dataset.mode;
    modeBtns.forEach((x) => x.classList.toggle('active', x === b));
    S.flare = 1;
  }));

  /* ------- drive choreography: a living demo loop ------- */
  function drive(dt) {
    S.phaseT += dt;
    const M = MODES[S.mode];
    if (S.phase === 'idle' && S.phaseT > 1.2) { S.phase = 'launch'; S.phaseT = 0; S.flare = 1; }
    else if (S.phase === 'launch') {
      S.speedTarget = Math.min(M.vmax * 0.62, S.speedTarget + M.ramp * 260 * dt);
      if (S.speedTarget >= M.vmax * 0.62 - 1) { S.phase = 'cruise'; S.phaseT = 0; }
    } else if (S.phase === 'cruise' && S.phaseT > 8) { S.phase = 'regen'; S.phaseT = 0; }
    else if (S.phase === 'regen') {
      S.speedTarget = Math.max(0, S.speedTarget - 140 * dt);
      if (S.speedTarget <= 0.5) { S.phase = 'idle'; S.phaseT = 0; S.soc = Math.max(9, S.soc - 1); S.range = Math.round(S.soc * 5.02); }
    }
    // smooth chase
    S.speed += (S.speedTarget - S.speed) * Math.min(1, dt * 3.2);
    S.power += ((S.phase === 'launch' ? 0.9 : S.phase === 'cruise' ? 0.32 : S.phase === 'regen' ? -0.55 : 0) - S.power) * Math.min(1, dt * 2.4);
    // simulated lateral/longitudinal G
    S.g.x += (Math.sin(S.t * 0.7) * 0.35 * (S.speed / M.vmax) - S.g.x) * dt * 3;
    S.g.y += ((S.phase === 'launch' ? 0.5 : S.phase === 'regen' ? -0.6 : 0.05) - S.g.y) * dt * 3;
    S.flare = Math.max(0, S.flare - dt * 1.6);
  }

  /* ------- rendering ------- */
  function arc(cx, cy, r, a0, a1, frac, color, width, glow) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, a0, a0 + (a1 - a0) * Math.max(0.001, frac));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.shadowColor = color; ctx.shadowBlur = glow;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
  function arcTicks(cx, cy, r, a0, a1, n, vmax, color) {
    ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i <= n; i++) {
      const a = a0 + (a1 - a0) * (i / n);
      const major = i % 2 === 0;
      const r1 = r - (major ? 16 : 9), r2 = r - 3;
      ctx.strokeStyle = color; ctx.lineWidth = major ? 2.4 : 1.2;
      ctx.globalAlpha = major ? 0.9 : 0.45;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * r2, cy + Math.sin(a) * r2);
      ctx.stroke();
      if (major) {
        ctx.globalAlpha = 0.65;
        ctx.font = '600 15px "IBM Plex Mono", monospace';
        ctx.fillText(String(Math.round(vmax * i / n)), cx + Math.cos(a) * (r - 38), cy + Math.sin(a) * (r - 38));
      }
      ctx.globalAlpha = 1;
    }
  }

  function draw() {
    const dpr = Math.min(devicePixelRatio, 2);
    const w = layer.clientWidth, h = layer.clientHeight;
    if (cv.width !== w * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    // immersive dark backdrop — stops the 3D showroom car bleeding through
    const bg = ctx.createRadialGradient(w * 0.5, h * 0.42, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.75);
    bg.addColorStop(0, '#0b1626');
    bg.addColorStop(1, '#04070d');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    const M = MODES[S.mode];
    const cy = h * 0.66, cxL = w * 0.3, cxR = w * 0.7;
    const R = Math.min(w, h) * 0.34;
    const A0 = Math.PI * 0.82, A1 = Math.PI * 2.18;

    // dial beds
    arc(cxL, cy, R, A0, A1, 1, 'rgba(120,150,190,0.14)', 10, 0);
    arc(cxR, cy, R, A0, A1, 1, 'rgba(120,150,190,0.14)', 10, 0);
    arcTicks(cxL, cy, R, A0, A1, 14, M.vmax, 'rgba(150,180,215,0.8)');
    arcTicks(cxR, cy, R, A0, A1, 10, 100, 'rgba(150,180,215,0.55)');

    // live arcs
    const spdFrac = S.speed / M.vmax;
    arc(cxL, cy, R, A0, A1, spdFrac, M.hue, 10, 18 + S.flare * 30);
    const pFrac = S.power >= 0 ? S.power : 0;
    const rFrac = S.power < 0 ? -S.power : 0;
    arc(cxR, cy, R, A0, A0 + (A1 - A0) * 0.5, pFrac, M.hue, 10, 16);
    arc(cxR, cy, R, A1, A0 + (A1 - A0) * 0.5, rFrac, '#4dff9e', 10, 16);

    // needle
    const na = A0 + (A1 - A0) * spdFrac;
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.shadowColor = M.hue; ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(cxL + Math.cos(na) * (R * 0.2), cy + Math.sin(na) * (R * 0.2));
    ctx.lineTo(cxL + Math.cos(na) * (R - 20), cy + Math.sin(na) * (R - 20));
    ctx.stroke(); ctx.shadowBlur = 0;

    // speed numerals
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.font = `300 ${Math.round(R * 0.52)}px "IBM Plex Mono", monospace`;
    ctx.fillText(String(Math.round(S.speed)), cxL, cy - R * 0.12);
    ctx.fillStyle = 'rgba(150,180,215,0.7)';
    ctx.font = '600 15px "IBM Plex Mono", monospace';
    ctx.fillText('KM/H', cxL, cy + R * 0.16);

    // power labels
    ctx.fillStyle = 'rgba(150,180,215,0.7)';
    ctx.fillText('POWER %', cxR, cy + R * 0.16);
    ctx.fillStyle = S.power < 0 ? '#4dff9e' : M.hue;
    ctx.font = `300 ${Math.round(R * 0.3)}px "IBM Plex Mono", monospace`;
    ctx.fillText(String(Math.round(Math.abs(S.power) * 100)), cxR, cy - R * 0.1);

    /* centre stack */
    const cx = w / 2;
    // mode flare ring
    if (S.flare > 0.01) {
      ctx.globalAlpha = S.flare;
      arc(cx, cy - R * 0.35, 54 + (1 - S.flare) * 60, 0, Math.PI * 2, 1, M.hue, 3, 24);
      ctx.globalAlpha = 1;
    }
    // gear
    ctx.fillStyle = M.hue;
    ctx.font = `600 ${Math.round(R * 0.34)}px "IBM Plex Mono", monospace`;
    ctx.shadowColor = M.hue; ctx.shadowBlur = 18;
    ctx.fillText(S.gear, cx, cy - R * 0.4);
    ctx.shadowBlur = 0;
    // mode label
    ctx.fillStyle = 'rgba(200,220,245,0.85)';
    ctx.font = '600 14px "IBM Plex Mono", monospace';
    ctx.fillText(M.label + ' MODE', cx, cy - R * 0.2);

    // battery + range
    const bw = 120, bx = cx - bw / 2, by = cy + R * 0.06;
    ctx.strokeStyle = 'rgba(150,180,215,0.5)'; ctx.lineWidth = 1.5;
    ctx.strokeRect(bx, by, bw, 12);
    ctx.fillStyle = S.soc > 20 ? '#4dff9e' : '#ff5a3c';
    ctx.fillRect(bx + 2, by + 2, (bw - 4) * (S.soc / 100), 8);
    ctx.fillStyle = 'rgba(200,220,245,0.85)';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.fillText(`${S.soc}%  ·  ${S.range} KM`, cx, by + 30);

    // G-meter
    const gx = cx, gy = cy + R * 0.42, gr = 34;
    ctx.strokeStyle = 'rgba(150,180,215,0.3)';
    ctx.beginPath(); ctx.arc(gx, gy, gr, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.arc(gx, gy, gr * 0.5, 0, Math.PI * 2); ctx.stroke();
    const px = gx + THREE_clamp(S.g.x, -1, 1) * gr, py = gy - THREE_clamp(S.g.y, -1, 1) * gr;
    ctx.fillStyle = M.hue; ctx.shadowColor = M.hue; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(150,180,215,0.55)';
    ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.fillText('G', gx, gy + gr + 12);

    // next-turn widget — keeps the cluster informative, not just dials
    ctx.save();
    ctx.translate(w / 2, h * 0.135);
    const pillW = 290;
    ctx.fillStyle = 'rgba(10,20,34,0.78)';
    ctx.strokeStyle = 'rgba(56,240,255,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(-pillW / 2, -24, pillW, 48, 14); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = M.hue; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = M.hue; ctx.shadowBlur = 12;
    const ax = -pillW / 2 + 24;
    ctx.beginPath();
    ctx.moveTo(ax, 8); ctx.lineTo(ax, -6);
    ctx.quadraticCurveTo(ax, -18, ax + 12, -18); ctx.lineTo(ax + 38, -18);
    ctx.moveTo(ax + 28, -27); ctx.lineTo(ax + 40, -18); ctx.lineTo(ax + 28, -9);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff'; ctx.font = '600 18px "IBM Plex Mono", monospace';
    ctx.fillText('1.2 KM', ax + 54, -5);
    ctx.fillStyle = 'rgba(170,200,230,0.62)'; ctx.font = '600 10px "IBM Plex Mono", monospace';
    ctx.fillText('OAKWOOD AVE · BEAR RIGHT', ax + 54, 12);
    ctx.restore();

    // telltales
    const tt = ['◉ AUTOHOLD', '⛨ LANE', '◈ ACC', '⌁ READY'];
    ctx.font = '600 12px "IBM Plex Mono", monospace';
    tt.forEach((s, i) => {
      ctx.fillStyle = i === 3 ? '#4dff9e' : 'rgba(150,180,215,0.6)';
      ctx.fillText(s, w * (0.18 + i * 0.215), h * 0.1);
    });

    // top status line
    ctx.fillStyle = 'rgba(200,220,245,0.75)';
    ctx.font = '600 13px "IBM Plex Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), w * 0.045, h * 0.1);
    ctx.textAlign = 'right';
    ctx.fillText('21.5°C · ⛅', w * 0.955, h * 0.1);
  }

  function THREE_clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function activate() { S.active = true; }
  function deactivate() { S.active = false; S.speed = S.speedTarget = 0; S.phase = 'idle'; S.phaseT = 0; }
  function setView(on) { on ? activate() : deactivate(); }

  function update(t, dt) {
    S.t = t;
    if (!S.active) return;
    drive(dt);
    draw();
  }

  return {
    activate, deactivate, setView, update,
    onEnter: activate, onExit: deactivate,
    get speed() { return S.speed; }, get mode() { return S.mode; }
  };
}
