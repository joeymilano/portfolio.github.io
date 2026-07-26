/* ============================================================
   ID.AURA — Horizon Cluster
   A driver-first instrument surface built around the road model:
   one continuous route ribbon, contextual ADAS, restrained energy
   data and drive-mode atmospheres. No legacy twin-dial metaphor.
   ============================================================ */

const MODES = {
  eco: {
    hue: '#75e2bd',
    soft: 'rgba(117,226,189,.16)',
    label: 'ECO',
    max: 190,
    response: 0.42
  },
  comfort: {
    hue: '#62d8ee',
    soft: 'rgba(98,216,238,.16)',
    label: 'AURA',
    max: 230,
    response: 0.62
  },
  sport: {
    hue: '#f1a06f',
    soft: 'rgba(241,160,111,.16)',
    label: 'GT',
    max: 270,
    response: 0.96
  }
};

export function createCluster(layer) {
  layer.innerHTML = `
    <div class="horizon-cluster">
      <canvas class="cluster-canvas"></canvas>
      <div class="cluster-heading">
        <span class="cluster-pilot"><i></i> AURA PILOT</span>
        <span class="cluster-heading-rule"></span>
        <span>ASSISTED DRIVE · ACTIVE</span>
      </div>
      <div class="cluster-modes" aria-label="Drive mode">
        ${Object.entries(MODES).map(([key, mode], i) =>
          `<button data-mode="${key}" class="${i === 1 ? 'active' : ''}" style="--c:${mode.hue}">
            <span>${mode.label}</span>
          </button>`).join('')}
      </div>
    </div>`;

  const canvas = layer.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const modeButtons = [...layer.querySelectorAll('.cluster-modes button')];
  const state = {
    active: false,
    mode: 'comfort',
    speed: 86,
    targetSpeed: 86,
    power: 0.28,
    soc: 82,
    range: 412,
    phase: 'cruise',
    phaseTime: 0,
    time: 0,
    modePulse: 0
  };

  modeButtons.forEach((button) => button.addEventListener('click', () => {
    state.mode = button.dataset.mode;
    state.modePulse = 1;
    modeButtons.forEach((item) => item.classList.toggle('active', item === button));
  }));

  function roundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  }

  function text(value, x, y, size, color, align = 'left', weight = 500, family = 'Sometype Mono') {
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px "${family}", monospace`;
    ctx.fillText(value, x, y);
  }

  function line(points, color, width = 1, glow = 0) {
    ctx.beginPath();
    points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = glow;
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  function updateDrive(dt) {
    state.phaseTime += dt;
    const mode = MODES[state.mode];
    if (state.phase === 'cruise' && state.phaseTime > 7.5) {
      state.phase = 'regen';
      state.phaseTime = 0;
    } else if (state.phase === 'regen') {
      state.targetSpeed = Math.max(42, state.targetSpeed - 36 * dt);
      if (state.targetSpeed <= 42.5) {
        state.phase = 'launch';
        state.phaseTime = 0;
      }
    } else if (state.phase === 'launch') {
      state.targetSpeed = Math.min(mode.max * 0.48, state.targetSpeed + mode.response * 92 * dt);
      if (state.targetSpeed >= mode.max * 0.48 - 0.5) {
        state.phase = 'cruise';
        state.phaseTime = 0;
      }
    }
    state.speed += (state.targetSpeed - state.speed) * Math.min(1, dt * 2.4);
    const targetPower = state.phase === 'launch' ? 0.74 : state.phase === 'regen' ? -0.28 : 0.24;
    state.power += (targetPower - state.power) * Math.min(1, dt * 2.1);
    state.modePulse = Math.max(0, state.modePulse - dt * 1.4);
  }

  function drawBackdrop(w, h, mode) {
    const background = ctx.createRadialGradient(w * 0.5, h * 0.46, 10, w * 0.5, h * 0.5, w * 0.74);
    background.addColorStop(0, '#0a151c');
    background.addColorStop(0.42, '#050b11');
    background.addColorStop(1, '#010306');
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);

    const horizonGlow = ctx.createLinearGradient(0, h * 0.28, 0, h * 0.72);
    horizonGlow.addColorStop(0, 'rgba(0,0,0,0)');
    horizonGlow.addColorStop(0.48, mode.soft);
    horizonGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, h * 0.2, w, h * 0.6);

    ctx.strokeStyle = 'rgba(140,196,214,.055)';
    ctx.lineWidth = 1;
    const horizon = h * 0.43;
    for (let i = 0; i < 13; i++) {
      const y = horizon + Math.pow(i / 12, 1.7) * h * 0.48;
      ctx.beginPath();
      ctx.moveTo(w * 0.18, y);
      ctx.lineTo(w * 0.82, y);
      ctx.stroke();
    }
  }

  function drawLandscape(w, h) {
    const horizon = h * 0.43;
    const drift = Math.sin(state.time * 0.12) * 18;
    const left = [];
    const right = [];
    for (let i = 0; i <= 24; i++) {
      const x = i * w / 24;
      const ridge = horizon - 16 - Math.sin(i * 0.72 + 0.8) * 18 - Math.sin(i * 0.23) * 23;
      if (x < w / 2) left.push([x + drift, ridge]);
      else right.push([x + drift, ridge]);
    }
    line(left, 'rgba(111,169,184,.11)', 1);
    line(right, 'rgba(111,169,184,.11)', 1);
    line([[0, horizon + 6], [w, horizon + 6]], 'rgba(98,216,238,.08)', 1);
  }

  function drawRoad(w, h, mode) {
    const vx = w * 0.5;
    const vy = h * 0.435;
    const bottom = h * 0.91;

    const roadGradient = ctx.createLinearGradient(0, vy, 0, bottom);
    roadGradient.addColorStop(0, 'rgba(19,31,37,.34)');
    roadGradient.addColorStop(1, 'rgba(2,5,8,.92)');
    ctx.fillStyle = roadGradient;
    ctx.beginPath();
    ctx.moveTo(vx - w * 0.018, vy);
    ctx.lineTo(w * 0.24, bottom);
    ctx.lineTo(w * 0.76, bottom);
    ctx.lineTo(vx + w * 0.018, vy);
    ctx.closePath();
    ctx.fill();

    const dashOffset = (state.time * 0.2) % 1;
    [-1, 1].forEach((side) => {
      for (let i = 0; i < 9; i++) {
        const p0 = ((i / 9 + dashOffset) % 1);
        const p1 = Math.min(1, p0 + 0.045 + p0 * 0.04);
        const y0 = vy + Math.pow(p0, 1.55) * (bottom - vy);
        const y1 = vy + Math.pow(p1, 1.55) * (bottom - vy);
        const x0 = vx + side * Math.pow(p0, 1.48) * w * 0.12;
        const x1 = vx + side * Math.pow(p1, 1.48) * w * 0.12;
        line([[x0, y0], [x1, y1]], 'rgba(205,232,236,.33)', 1.2 + p0 * 1.8);
      }
    });

    line([[vx - w * 0.018, vy], [w * 0.24, bottom]], 'rgba(98,216,238,.13)', 1);
    line([[vx + w * 0.018, vy], [w * 0.76, bottom]], 'rgba(98,216,238,.13)', 1);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(vx, bottom);
    ctx.bezierCurveTo(vx + w * 0.035, h * 0.76, vx - w * 0.045, h * 0.57, vx + 3, vy);
    ctx.strokeStyle = mode.hue;
    ctx.lineWidth = 4.5;
    ctx.shadowColor = mode.hue;
    ctx.shadowBlur = 18;
    ctx.globalAlpha = 0.88;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(239,254,255,.9)';
    ctx.stroke();
    ctx.restore();

    const vehicleY = h * 0.765;
    line([[vx - 13, vehicleY + 10], [vx - 13, vehicleY - 9], [vx - 5, vehicleY - 15]], mode.hue, 1.4, 8);
    line([[vx + 13, vehicleY + 10], [vx + 13, vehicleY - 9], [vx + 5, vehicleY - 15]], mode.hue, 1.4, 8);
    line([[vx - 9, vehicleY + 10], [vx + 9, vehicleY + 10]], mode.hue, 1.4, 8);
  }

  function drawTurnCue(w, h, mode) {
    const x = w * 0.5;
    const y = h * 0.16;
    roundedRect(x - 190, y - 34, 380, 68, 18);
    ctx.fillStyle = 'rgba(2,7,11,.68)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(132,205,217,.14)';
    ctx.lineWidth = 1;
    ctx.stroke();
    line([[x - 154, y + 12], [x - 154, y - 8], [x - 140, y - 22], [x - 112, y - 22]], mode.hue, 2.8, 10);
    line([[x - 122, y - 30], [x - 112, y - 22], [x - 122, y - 14]], mode.hue, 2.8, 10);
    text('1.2 KM', x - 88, y - 9, 19, '#eff8fa', 'left', 600);
    text('BEAR RIGHT · OAKWOOD AVENUE', x - 88, y + 14, 10, 'rgba(159,187,196,.64)', 'left', 500);
  }

  function drawMetrics(w, h, mode) {
    const leftX = w * 0.135;
    const metricY = h * 0.63;
    text(String(Math.round(state.speed)).padStart(2, '0'), leftX, metricY, Math.min(112, h * 0.15), '#f4f8f9', 'center', 300, 'Manrope');
    text('KM/H', leftX, metricY + h * 0.09, 11, 'rgba(164,191,199,.55)', 'center', 600);
    text('CURRENT VELOCITY', leftX, metricY - h * 0.095, 9, 'rgba(164,191,199,.42)', 'center', 500);

    const rightX = w * 0.86;
    const powerValue = Math.round(Math.abs(state.power) * 100);
    text(state.power < 0 ? 'RECUP' : 'DRIVE', rightX, metricY - h * 0.095, 9, 'rgba(164,191,199,.42)', 'center', 500);
    text(String(powerValue).padStart(2, '0'), rightX, metricY, Math.min(70, h * 0.105), state.power < 0 ? '#75e2bd' : mode.hue, 'center', 300, 'Manrope');
    text('% ENERGY', rightX, metricY + h * 0.067, 10, 'rgba(164,191,199,.55)', 'center', 600);

    const gaugeY = metricY + h * 0.116;
    const gaugeW = Math.min(150, w * 0.105);
    roundedRect(rightX - gaugeW / 2, gaugeY, gaugeW, 3, 2);
    ctx.fillStyle = 'rgba(160,193,201,.12)';
    ctx.fill();
    roundedRect(rightX - gaugeW / 2, gaugeY, gaugeW * state.soc / 100, 3, 2);
    ctx.fillStyle = mode.hue;
    ctx.fill();
    text(`${state.soc}%  ·  ${state.range} KM`, rightX, gaugeY + 20, 10, 'rgba(207,226,231,.7)', 'center', 500);

    text('D', w * 0.5, h * 0.825, 26, mode.hue, 'center', 500, 'Manrope');
    text(`${mode.label} MODE`, w * 0.5, h * 0.862, 9, 'rgba(166,193,201,.52)', 'center', 600);

    if (state.modePulse > 0) {
      ctx.globalAlpha = state.modePulse;
      ctx.strokeStyle = mode.hue;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.825, 30 + (1 - state.modePulse) * 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  function drawStatus(w, h, mode) {
    const top = h * 0.104;
    text(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), w * 0.055, top, 11, 'rgba(190,211,216,.62)', 'left', 500);
    text('21.5°  ·  BERLIN', w * 0.945, top, 11, 'rgba(190,211,216,.62)', 'right', 500);
    text('ACC  120', w * 0.275, top, 10, 'rgba(174,200,206,.5)', 'center', 500);
    text('LANE CENTERED', w * 0.725, top, 10, mode.hue, 'center', 500);
  }

  function draw() {
    const dpr = Math.min(devicePixelRatio, 2);
    const w = layer.clientWidth;
    const h = layer.clientHeight;
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const mode = MODES[state.mode];
    drawBackdrop(w, h, mode);
    drawLandscape(w, h);
    drawRoad(w, h, mode);
    drawTurnCue(w, h, mode);
    drawMetrics(w, h, mode);
    drawStatus(w, h, mode);
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
  }

  function onExit() {
    state.active = false;
  }

  return {
    update,
    onEnter,
    onExit,
    activate: onEnter,
    deactivate: onExit,
    setView: (on) => on ? onEnter() : onExit(),
    get speed() { return state.speed; },
    get mode() { return state.mode; }
  };
}
