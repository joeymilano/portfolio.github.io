/* ============================================================
   ID.AURA — Spatial Console
   An asymmetrical cockpit home surface: navigation owns the
   visual field while media, climate and vehicle intelligence
   stay glanceable on a calm peripheral rail.
   ============================================================ */

import { gsap } from 'gsap';
import { createConsoleMap } from './console-map.js?v=20260728-3';
import { createLayoutEngine } from './console/layout.js';
import { createAmbience, SWATCHES as AMB_SWATCHES } from './console/ambience.js';

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

      <div class="console-scenario-dock ui-tabdock" role="tablist" aria-label="Scenario">
        ${['PARKED', 'CHARGING', 'COMMUTE', 'HIGHWAY-PILOT', 'ARRIVING', 'NIGHT'].map((name, i) =>
          `<button class="ui-chip${i === 2 ? ' active' : ''}" data-scenario="${name}">${name}</button>`).join('')}
      </div>

      <main class="aura-console-grid">
        <section class="aura-map">
          <div class="map-heading">
            <div>
              <span class="aura-kicker"><i class="ph-icon ph-navigation-arrow" aria-hidden="true"></i>NAVIGATION · WOLFSBURG</span>
              <h2>Autostadt</h2>
              <p data-via>via Heinrich-Nordhoff-Straße · real route</p>
            </div>
            <div class="map-turn">
              <svg viewBox="0 0 52 52" aria-hidden="true">
                <path d="M11 42V25c0-8 5-14 14-14h16M33 4l8 7-8 7"/>
              </svg>
              <span><b data-turn-dist>320</b> m</span>
            </div>
          </div>

          <div class="map-field">
            <div class="map-canvas" data-maplibre role="img" aria-label="Real vector map of the route through Wolfsburg to Autostadt"></div>
          </div>

          <footer class="map-footer">
            <div class="map-eta">
              <span data-eta>9 min</span>
              <small>ARRIVAL <span data-arrival>—</span></small>
            </div>
            <div class="map-distance">
              <span data-dist>4.3 km</span>
              <small>WOLFSBURG · OSM DATA</small>
            </div>
            <div class="map-energy">
              <span data-energy>−1%</span>
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
            <div class="vehicle-tyres" data-tyres>
              <div class="tyre-corner"><span>FL</span><b data-load>4.1</b><small data-temp>36&deg;</small></div>
              <div class="tyre-corner"><span>FR</span><b data-load>4.1</b><small data-temp>36&deg;</small></div>
              <div class="tyre-corner"><span>RL</span><b data-load>3.8</b><small data-temp>34&deg;</small></div>
              <div class="tyre-corner"><span>RR</span><b data-load>3.8</b><small data-temp>34&deg;</small></div>
            </div>
          </section>

          <section class="aura-card aura-ambience" hidden>
            <div class="card-label"><i class="ph-icon ph-sparkle" aria-hidden="true"></i>AMBIENCE</div>
            <div class="amb-stage" aria-hidden="true"></div>
            <div class="amb-swatches">
              ${AMB_SWATCHES.map((hex, i) =>
                `<button class="ui-chip${i === 0 ? ' active' : ''}" data-amb-color="${hex}" style="--sw:${hex}">
                  <i class="ui-chip-swatch" style="color:${hex}"></i>
                </button>`).join('')}
            </div>
          </section>
        </aside>
      </main>

      <div class="console-stage-hint" aria-hidden="true">
        <i class="ph-icon ph-hand-tap"></i>
        <span>TAP BODY · REPAINT &nbsp;&nbsp;·&nbsp;&nbsp; TAP LAMPS · TOGGLE</span>
      </div>

      <footer class="console-dock">
        <button class="tg on" data-tg><i class="ph-icon ph-house-simple" aria-hidden="true"></i>HOME</button>
        <button class="tg on" data-tg><i class="ph-icon ph-navigation-arrow" aria-hidden="true"></i>NAV</button>
        <button class="tg" data-tg><i class="ph-icon ph-sparkle" aria-hidden="true"></i>AMBIENCE</button>
        <button class="tg on" data-tg><i class="ph-icon ph-steering-wheel" aria-hidden="true"></i>AURA</button>
        <button class="tg" data-xray><i class="ph-icon ph-cube-transparent" aria-hidden="true"></i>X-RAY</button>
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

  const route = $('[data-maplibre]');
  const etaEl = $('[data-eta]');
  const distEl = $('[data-dist]');
  const arrivalEl = $('[data-arrival]');
  const turnDistEl = $('[data-turn-dist]');

  const consoleMap = createConsoleMap(route, {
    onEta({ remainingKm, etaMin, nextTurnMeters }) {
      etaEl.textContent = `${etaMin} min`;
      distEl.textContent = `${remainingKm.toFixed(1)} km`;
      turnDistEl.textContent = nextTurnMeters;
      const arrival = new Date(Date.now() + etaMin * 60000);
      arrivalEl.textContent = String(arrival.getHours()).padStart(2, '0') + ':' + String(arrival.getMinutes()).padStart(2, '0');
    }
  });

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

  /* ---------- C1: dynamic rail layout engine ---------- */
  const rail = $('.aura-rail');
  const ambienceCard = $('.aura-ambience');
  const ambience = createAmbience(ambienceCard, audio);

  const layoutCards = [
    {
      id: 'media', el: $('.aura-media'),
      priority(ctx) {
        let s = 50;
        if (ctx.charging) s -= 30;
        if (ctx.driveMode === 'cruise') s += 10;
        if (ctx.navState === 'arriving') s -= 15;
        if (ctx.occupancy > 1) s += 5;
        return s;
      }
    },
    {
      id: 'comfort', el: $('.aura-comfort'),
      priority(ctx) {
        let s = 40;
        if (ctx.speed < 5) s += 20;
        if (ctx.weather === 'cold' || ctx.weather === 'hot') s += 10;
        if (ctx.navState === 'arriving') s -= 10;
        return s;
      }
    },
    {
      id: 'vehicle', el: $('.aura-vehicle'),
      priority(ctx) {
        let s = 35;
        if (ctx.charging) s += 25;
        if (ctx.navState === 'highway') s += 20;
        if (ctx.navState === 'arriving') s += 15;
        if (ctx.soc < 25) s += 5;
        return s;
      }
    },
    {
      id: 'ambience', el: ambienceCard,
      priority(ctx) {
        let s = 20;
        if (ctx.timeOfDay === 'night') s += 35;
        if (ctx.speed < 5) s += 30;
        if (ctx.navState === 'highway') s -= 20;
        if (ctx.ambienceBoost) s += 50;
        return s;
      }
    }
  ];

  const layout = createLayoutEngine({ rail, cards: layoutCards, gsap });
  layout.setScenario('COMMUTE');

  layer.querySelectorAll('[data-scenario]').forEach((button) =>
    button.addEventListener('click', () => {
      layer.querySelectorAll('[data-scenario]').forEach((b) => b.classList.toggle('active', b === button));
      layout.setScenario(button.dataset.scenario);
      ambience.resize();
    }));

  layer.querySelectorAll('[data-amb-color]').forEach((button) =>
    button.addEventListener('click', () => {
      layer.querySelectorAll('[data-amb-color]').forEach((b) => b.classList.toggle('active', b === button));
      ambience.setColor(button.dataset.ambColor);
    }));

  layer.querySelectorAll('[data-tg]').forEach((button) =>
    button.addEventListener('click', () => {
      const on = button.classList.toggle('on');
      if (button.querySelector('.ph-sparkle')) {
        layout.applyContext({ ambienceBoost: on });
        if (on) ambience.resize();
      }
    }));

  const xrayBtn = $('[data-xray]');
  let xrayOn = false;
  xrayBtn?.addEventListener('click', () => {
    xrayOn = !xrayOn;
    xrayBtn.classList.toggle('on', xrayOn);
    layer.dispatchEvent(new CustomEvent('aura:xray', { detail: { on: xrayOn } }));
  });

  let range = 486;
  const rangeEl = $('[data-range]');
  let slowTimer = 0;

  const tyreCorners = Array.from(layer.querySelectorAll('.tyre-corner'));
  const tyrePhase = [0.2, 1.4, 2.6, 3.8];

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

    consoleMap.tick(dt);

    if (!ambienceCard.hidden) ambience.update(time, dt);

    tyreCorners.forEach((corner, index) => {
      const isFront = index < 2;
      const load = (isFront ? 4.1 : 3.8) + Math.sin(time * 0.6 + tyrePhase[index]) * 0.12;
      const temp = (isFront ? 36 : 34) + Math.sin(time * 0.4 + tyrePhase[index] * 1.3) * 2.2;
      const loadEl = corner.querySelector('[data-load]');
      const tempEl = corner.querySelector('[data-temp]');
      if (loadEl) loadEl.textContent = load.toFixed(1);
      if (tempEl) {
        tempEl.textContent = `${Math.round(temp)}\u00b0`;
        tempEl.classList.toggle('hot', temp > 37);
      }
    });

    slowTimer += dt;
    if (slowTimer > 1) {
      slowTimer = 0;
      if (Math.random() < 0.04) {
        range = Math.max(120, range - 1);
        rangeEl.textContent = String(range);
      }
    }
  }

  function onEnter() {
    layer.querySelector('.aura-console').classList.add('is-live');
    consoleMap.setActive(true);
    ambience.resize();
  }

  function onExit() {
    layer.querySelector('.aura-console').classList.remove('is-live');
    consoleMap.setActive(false);
  }

  return { update, onEnter, onExit };
}
