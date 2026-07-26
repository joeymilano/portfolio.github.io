/* ============================================================
   ID.AURA — Centre Console
   Live infotainment surface: real audio playback (EQ-driven),
   animated nav route with moving position dot and live ETA
   countdown, fan-segment climate control and working vehicle
   toggles. Every control responds.
   ============================================================ */

export function createConsole(layer, audio) {
  layer.innerHTML = `
    <div class="console">
      <header class="console-top">
        <div>
          <span class="console-clock">14:02</span>
          <span class="console-date">FRI · 25 JUL</span>
        </div>
        <div class="console-status">
          <span>LTE▂▄▆</span><span>🔋 82%</span>
        </div>
      </header>

      <div class="console-grid">
        <section class="ccard cc-media">
          <h3>NOW PLAYING <span class="cc-live"></span></h3>
          <div class="cc-media-body">
            <div class="cc-art" data-art></div>
            <div class="cc-media-info">
              <div class="cc-track" data-track>—</div>
              <div class="cc-artist" data-artist>—</div>
              <div class="cc-eq" data-eq>${'<span></span>'.repeat(10)}</div>
            </div>
          </div>
          <div class="cc-progress"><i data-prog></i></div>
          <div class="cc-times"><span data-cur>1:24</span><span data-dur>4:12</span></div>
          <div class="cc-controls">
            <button aria-label="prev">⏮</button>
            <button data-play aria-label="play">▶</button>
            <button data-next aria-label="next">⏭</button>
          </div>
        </section>

        <section class="ccard cc-nav">
          <h3>NAVIGATION</h3>
          <svg viewBox="0 0 240 150" aria-hidden="true">
            <defs>
              <pattern id="ccGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M22 0 L0 0 0 22" fill="none" stroke="rgba(120,190,255,0.07)" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="240" height="150" fill="url(#ccGrid)"/>
            <g class="cc-streets" stroke="rgba(120,190,255,0.06)" stroke-width="7" fill="none">
              <line x1="-2" y1="48" x2="242" y2="48"/>
              <line x1="-2" y1="112" x2="242" y2="112"/>
              <line x1="86" y1="-2" x2="86" y2="152"/>
              <line x1="168" y1="-2" x2="168" y2="152"/>
            </g>
            <path class="cc-road" d="M20,130 C60,110 70,80 110,78 S160,60 175,34 L218,20"/>
            <path class="cc-route" data-route d="M20,130 C60,110 70,80 110,78 S160,60 175,34 L218,20"/>
            <circle class="cc-dest" cx="218" cy="20" r="5"/>
            <circle class="cc-dot" data-dot r="6"/>
          </svg>
          <div class="cc-eta">
            <b data-eta>18 min</b><span>· 12.4 km · arrive 14:20</span>
          </div>
        </section>

        <section class="ccard cc-climate">
          <h3>CLIMATE</h3>
          <div class="cc-temp">
            <button data-t="-1">−</button>
            <b data-tv>21.5°</b>
            <button data-t="1">+</button>
          </div>
          <div class="cc-fan" data-fan>
            ${'<span></span>'.repeat(4)}
          </div>
          <div class="cc-climate-meta">
            <span>AUTO</span><span data-fanv>FAN 2</span><span>SYNC</span>
          </div>
        </section>

        <section class="ccard cc-car">
          <h3>VEHICLE</h3>
          <ul>
            <li><span>Range</span><b data-range>486 km</b></li>
            <li><span>Charge</span><b>82% · 11 kW AC</b></li>
            <li><span>Tyre</span><b class="ok">2.5 bar ×4</b></li>
            <li><span>OTA</span><b class="ok">v3.2 current</b></li>
          </ul>
        </section>
      </div>

      <footer class="console-dock">
        <button class="tg on" data-tg><i>◈</i>HVAC</button>
        <button class="tg on" data-tg><i>◉</i>SEAT</button>
        <button class="tg" data-tg><i>◍</i>AMBIENT</button>
        <button class="tg on" data-tg><i>⛨</i>ASSIST</button>
      </footer>
    </div>`;

  const $ = (s) => layer.querySelector(s);

  /* ---------- clock ---------- */
  const clockEl = $('.console-clock');
  function tickClock() {
    const d = new Date();
    clockEl.textContent =
      String(d.getHours()).padStart(2, '0') + ':' +
      String(d.getMinutes()).padStart(2, '0');
  }
  tickClock();
  setInterval(tickClock, 10_000);

  /* ---------- media: real audio ---------- */
  const eqBars = [...layer.querySelectorAll('[data-eq] span')];
  const trackEl = $('[data-track]');
  const artistEl = $('[data-artist]');
  const artEl = $('[data-art]');
  const curEl = $('[data-cur]');
  const progEl = $('[data-prog]');
  const playBtn = $('[data-play]');
  let progress = 0.32;
  let playing = false;

  function refreshTrack() {
    trackEl.textContent = audio.currentName().toUpperCase();
    artistEl.textContent = (audio.currentArtist ? audio.currentArtist() : 'HOME').toUpperCase() + ' · ODYSSEY';
    artEl.style.backgroundImage = `url("${audio.currentArt()}")`;
  }
  function setPlaying(p) {
    playing = p;
    playBtn.textContent = p ? '⏸' : '▶';
    layer.querySelector('.cc-media').classList.toggle('playing', p);
  }
  playBtn.addEventListener('click', () => {
    if (playing) { audio.pause(); setPlaying(false); }
    else {
      audio.play().then((ok) => { if (ok) setPlaying(true); });
    }
  });
  $('[data-next]').addEventListener('click', () => {
    audio.next();
    refreshTrack();
    progress = 0;
    if (playing) audio.play().then((ok) => { if (ok) setPlaying(true); });
  });
  refreshTrack();
  // auto-refresh art + title when the engine advances tracks (ended)
  audio.onUpdate(() => refreshTrack());

  /* ---------- nav route ---------- */
  const route = $('[data-route]');
  const dot = $('[data-dot]');
  const etaEl = $('[data-eta]');
  const routeLen = route.getTotalLength();
  let navU = 0.12;

  /* ---------- climate ---------- */
  const tv = $('[data-tv]');
  let temp = 21.5;
  layer.querySelectorAll('[data-t]').forEach((b) =>
    b.addEventListener('click', () => {
      temp = Math.min(28, Math.max(16, temp + Number(b.dataset.t) * 0.5));
      tv.textContent = temp.toFixed(1) + '°';
    })
  );
  const fanSegs = [...layer.querySelectorAll('[data-fan] span')];
  const fanLabel = $('[data-fanv]');
  let fan = 2;
  function renderFan() {
    fanSegs.forEach((s, i) => s.classList.toggle('on', i < fan));
    fanLabel.textContent = 'FAN ' + fan;
  }
  fanSegs.forEach((s, i) =>
    s.addEventListener('click', () => { fan = i + 1; renderFan(); }));
  renderFan();

  /* ---------- toggles ---------- */
  layer.querySelectorAll('[data-tg]').forEach((b) =>
    b.addEventListener('click', () => b.classList.toggle('on')));

  /* ---------- range ---------- */
  let range = 486;
  const rangeEl = $('[data-range]');

  /* ---------- frame ---------- */
  let slowT = 0;
  function update(t, dt) {
    // EQ from real analyser when playing, idle shimmer otherwise
    const levels = playing ? audio.levels(eqBars.length) : null;
    eqBars.forEach((bar, i) => {
      const v = levels ? levels[i]
        : 0.14 + 0.1 * Math.sin(t * 2.2 + i * 1.3);
      bar.style.transform = `scaleY(${Math.max(0.08, v)})`;
    });

    // progress
    if (playing) progress = (progress + dt * 0.0035) % 1;
    progEl.style.width = (progress * 100).toFixed(1) + '%';
    const dur = 252; // 4:12
    const cs = Math.round(progress * dur);
    curEl.textContent = Math.floor(cs / 60) + ':' + String(cs % 60).padStart(2, '0');

    // nav dot along route
    navU = (navU + dt * 0.008) % 0.94;
    const p = route.getPointAtLength(navU * routeLen);
    dot.setAttribute('cx', p.x);
    dot.setAttribute('cy', p.y);

    // slow ticks (ETA / range)
    slowT += dt;
    if (slowT > 1) {
      slowT = 0;
      const remain = Math.max(1, Math.round((1 - navU) * 20));
      etaEl.textContent = remain + ' min';
      if (Math.random() < 0.05) {
        range = Math.max(120, range - 1);
        rangeEl.textContent = range + ' km';
      }
    }
  }

  function onEnter() {}
  function onExit() {}

  return { update, onEnter, onExit };
}
