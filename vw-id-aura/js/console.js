/* ============================================================
   ID.AURA — Spatial Console
   An asymmetrical cockpit home surface: navigation owns the
   visual field while media, climate and vehicle intelligence
   stay glanceable on a calm peripheral rail.
   ============================================================ */

export function createConsole(layer, audio) {
  layer.innerHTML = `
    <div class="aura-console">
      <header class="console-top">
        <div class="console-time">
          <span class="console-clock">14:02</span>
          <span class="console-date">FRIDAY · 25 JULY</span>
        </div>
        <div class="console-journey">
          <span class="journey-state"><i></i> JOURNEY ACTIVE</span>
          <span>LTE</span>
          <span class="journey-battery"><i class="ph-icon ph-battery-high" aria-hidden="true"></i>82%</span>
        </div>
      </header>

      <main class="aura-console-grid">
        <section class="aura-map">
          <div class="map-heading">
            <div>
              <span class="aura-kicker"><i class="ph-icon ph-navigation-arrow" aria-hidden="true"></i>NAVIGATION · NIGHT ROUTE</span>
              <h2>Teufelsberg</h2>
              <p>via Heerstraße · quiet roads preferred</p>
            </div>
            <div class="map-turn">
              <svg viewBox="0 0 52 52" aria-hidden="true">
                <path d="M11 42V25c0-8 5-14 14-14h16M33 4l8 7-8 7"/>
              </svg>
              <span><b>320</b> m</span>
            </div>
          </div>

          <div class="map-field">
            <svg viewBox="0 0 720 420" aria-label="Route to Teufelsberg">
              <defs>
                <linearGradient id="routeGlow" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stop-color="#78e3c0"/>
                  <stop offset=".58" stop-color="#61d8eb"/>
                  <stop offset="1" stop-color="#ec9c76"/>
                </linearGradient>
                <radialGradient id="mapBloom">
                  <stop offset="0" stop-color="#62d8ee" stop-opacity=".18"/>
                  <stop offset="1" stop-color="#62d8ee" stop-opacity="0"/>
                </radialGradient>
                <pattern id="fineGrid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M48 0H0V48" fill="none" stroke="rgba(146,198,209,.055)" stroke-width="1"/>
                </pattern>
              </defs>
              <rect width="720" height="420" fill="url(#fineGrid)"/>
              <circle cx="363" cy="212" r="168" fill="url(#mapBloom)"/>
              <g class="map-contours">
                <path d="M-30 75C97 21 183 107 306 68s194-79 318-18 147 39 178 11"/>
                <path d="M-44 112C78 70 175 146 282 101s216-79 339-13 149 33 193 12"/>
                <path d="M-58 344C92 281 186 372 319 326s198-79 327-18 139 38 184 16"/>
                <path d="M-64 382C93 324 205 408 330 364s205-76 333-15 131 27 169 8"/>
                <path d="M83-20c51 95-24 139 9 218s114 93 76 222"/>
                <path d="M606-28c-74 107 6 143-42 222s-106 106-70 252"/>
              </g>
              <g class="map-roads">
                <path d="M-30 293C109 238 159 278 249 223S429 127 746 92"/>
                <path d="M136 438c52-102 73-150 134-220S370 94 408-30"/>
                <path d="M-20 155c144 31 232 3 341 51s211 89 430 58"/>
              </g>
              <g class="map-buildings">
                <path d="M91 142h40v24H91zM151 119h31v48h-31zM542 271h56v29h-56zM616 238h37v55h-37z"/>
                <path d="M215 310h52v31h-52zM286 329h37v22h-37zM456 78h48v27h-48z"/>
              </g>
              <path class="cc-road" d="M112 354C167 332 182 286 240 271s80-8 118-61 81-67 132-71 84-32 126-73"/>
              <path class="cc-route" data-route d="M112 354C167 332 182 286 240 271s80-8 118-61 81-67 132-71 84-32 126-73"/>
              <circle class="route-destination" cx="616" cy="66" r="20"/>
              <circle class="route-destination-core" cx="616" cy="66" r="5"/>
              <circle class="cc-dot" data-dot r="9"/>
            </svg>
            <div class="map-compass">N</div>
            <div class="map-scale">200 M</div>
          </div>

          <footer class="map-footer">
            <div class="map-eta">
              <span data-eta>18 min</span>
              <small>ARRIVAL 14:20</small>
            </div>
            <div class="map-distance">
              <span>12.4 km</span>
              <small>9.8 KM ELECTRIC</small>
            </div>
            <div class="map-energy">
              <span>−3%</span>
              <small>EST. BATTERY</small>
            </div>
          </footer>
        </section>

        <aside class="aura-rail">
          <section class="aura-card aura-media">
            <div class="card-label"><i class="ph-icon ph-music-notes" aria-hidden="true"></i>NOW PLAYING <span class="cc-live"></span></div>
            <div class="media-art-wrap">
              <div class="cc-art" data-art></div>
              <div class="media-vinyl"></div>
            </div>
            <div class="cc-track" data-track>—</div>
            <div class="cc-artist" data-artist>—</div>
            <div class="cc-eq" data-eq>${'<span></span>'.repeat(12)}</div>
            <div class="cc-progress"><i data-prog></i></div>
            <div class="cc-times"><span data-cur>1:24</span><span data-dur>4:12</span></div>
            <div class="cc-controls">
              <button data-prev aria-label="Previous track">
                <i class="ph-icon ph-skip-back" aria-hidden="true"></i>
              </button>
              <button data-play aria-label="Play"><i class="ph-icon ph-play" aria-hidden="true"></i></button>
              <button data-next aria-label="Next track">
                <i class="ph-icon ph-skip-forward" aria-hidden="true"></i>
              </button>
            </div>
          </section>

          <section class="aura-card aura-comfort">
            <div class="card-label"><i class="ph-icon ph-thermometer" aria-hidden="true"></i>CABIN CLIMATE</div>
            <div class="comfort-main">
              <button data-t="-1">−</button>
              <div><b data-tv>21.5°</b><span>AUTO · SYNC</span></div>
              <button data-t="1">+</button>
            </div>
            <div class="cc-fan" data-fan>${'<span></span>'.repeat(4)}</div>
            <div class="comfort-meta">
              <span data-fanv>FAN 2</span><span>AIR CLEAN 96%</span>
            </div>
          </section>

          <section class="aura-card aura-vehicle">
            <div class="card-label"><i class="ph-icon ph-car-profile" aria-hidden="true"></i>VEHICLE PULSE</div>
            <div class="vehicle-range">
              <div><b data-range>486</b><span>KM RANGE</span></div>
              <svg viewBox="0 0 86 42" aria-hidden="true">
                <path d="M4 35C15 35 15 19 27 19s13 12 23 12 10-24 19-24 7 16 13 16"/>
              </svg>
            </div>
            <div class="vehicle-health">
              <span><i></i> ALL SYSTEMS NOMINAL</span>
              <b>82%</b>
            </div>
          </section>
        </aside>
      </main>

      <footer class="console-dock">
        <button class="tg on" data-tg><i class="ph-icon ph-house-simple" aria-hidden="true"></i>HOME</button>
        <button class="tg on" data-tg><i class="ph-icon ph-navigation-arrow" aria-hidden="true"></i>NAV</button>
        <button class="tg" data-tg><i class="ph-icon ph-sparkle" aria-hidden="true"></i>AMBIENCE</button>
        <button class="tg on" data-tg><i class="ph-icon ph-steering-wheel" aria-hidden="true"></i>AURA</button>
      </footer>
    </div>`;

  const $ = (selector) => layer.querySelector(selector);
  const clockEl = $('.console-clock');

  function tickClock() {
    const date = new Date();
    clockEl.textContent =
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0');
  }
  tickClock();
  setInterval(tickClock, 10_000);

  const eqBars = [...layer.querySelectorAll('[data-eq] span')];
  const trackEl = $('[data-track]');
  const artistEl = $('[data-artist]');
  const artEl = $('[data-art]');
  const currentTimeEl = $('[data-cur]');
  const progressEl = $('[data-prog]');
  const playButton = $('[data-play]');
  let progress = 0.32;
  let playing = audio.playing;

  function refreshTrack() {
    trackEl.textContent = audio.currentName().toUpperCase();
    artistEl.textContent = `${audio.currentArtist().toUpperCase()} · AURA SOUNDSPACE`;
    artEl.style.backgroundImage = `url("${audio.currentArt()}")`;
  }

  function setPlaying(on) {
    playing = on;
    playButton.innerHTML = `<i class="ph-icon ${on ? 'ph-pause' : 'ph-play'}" aria-hidden="true"></i>`;
    playButton.setAttribute('aria-label', on ? 'Pause' : 'Play');
    layer.querySelector('.aura-media').classList.toggle('playing', on);
  }

  playButton.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then((ok) => {
        if (ok) setPlaying(true);
      });
    }
  });

  $('[data-prev]').addEventListener('click', () => {
    audio.prev();
    refreshTrack();
    progress = 0;
    if (playing) audio.play().then((ok) => {
      if (ok) setPlaying(true);
    });
  });

  $('[data-next]').addEventListener('click', () => {
    audio.next();
    refreshTrack();
    progress = 0;
    if (playing) audio.play().then((ok) => {
      if (ok) setPlaying(true);
    });
  });

  refreshTrack();
  setPlaying(audio.playing);
  audio.onUpdate((state) => {
    refreshTrack();
    setPlaying(state.on);
  });

  const route = $('[data-route]');
  const routeDot = $('[data-dot]');
  const etaEl = $('[data-eta]');
  const routeLength = route.getTotalLength();
  let routeProgress = 0.12;

  const temperatureEl = $('[data-tv]');
  let temperature = 21.5;
  layer.querySelectorAll('[data-t]').forEach((button) =>
    button.addEventListener('click', () => {
      temperature = Math.min(28, Math.max(16, temperature + Number(button.dataset.t) * 0.5));
      temperatureEl.textContent = temperature.toFixed(1) + '°';
    })
  );

  const fanSegments = [...layer.querySelectorAll('[data-fan] span')];
  const fanLabel = $('[data-fanv]');
  let fan = 2;
  function renderFan() {
    fanSegments.forEach((segment, index) => segment.classList.toggle('on', index < fan));
    fanLabel.textContent = `FAN ${fan}`;
  }
  fanSegments.forEach((segment, index) =>
    segment.addEventListener('click', () => {
      fan = index + 1;
      renderFan();
    }));
  renderFan();

  layer.querySelectorAll('[data-tg]').forEach((button) =>
    button.addEventListener('click', () => button.classList.toggle('on')));

  let range = 486;
  const rangeEl = $('[data-range]');
  let slowTimer = 0;

  function update(time, dt) {
    const levels = playing ? audio.levels(eqBars.length) : null;
    eqBars.forEach((bar, index) => {
      const value = levels ? levels[index] : 0.12 + 0.09 * Math.sin(time * 1.8 + index * 0.9);
      bar.style.transform = `scaleY(${Math.max(0.06, value)})`;
    });

    if (playing) progress = (progress + dt * 0.0035) % 1;
    progressEl.style.width = `${(progress * 100).toFixed(1)}%`;
    const duration = 252;
    const elapsed = Math.round(progress * duration);
    currentTimeEl.textContent = `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, '0')}`;

    routeProgress = (routeProgress + dt * 0.007) % 0.94;
    const point = route.getPointAtLength(routeProgress * routeLength);
    routeDot.setAttribute('cx', point.x);
    routeDot.setAttribute('cy', point.y);

    slowTimer += dt;
    if (slowTimer > 1) {
      slowTimer = 0;
      etaEl.textContent = `${Math.max(1, Math.round((1 - routeProgress) * 20))} min`;
      if (Math.random() < 0.04) {
        range = Math.max(120, range - 1);
        rangeEl.textContent = String(range);
      }
    }
  }

  function onEnter() {
    layer.querySelector('.aura-console').classList.add('is-live');
  }

  function onExit() {
    layer.querySelector('.aura-console').classList.remove('is-live');
  }

  return { update, onEnter, onExit };
}
