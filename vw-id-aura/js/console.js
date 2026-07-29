/* ============================================================
   ID.AURA — Spatial Console
   An asymmetrical cockpit home surface: navigation owns the
   visual field while media, climate and vehicle intelligence
   stay glanceable on a calm peripheral rail.
   ============================================================ */

import { gsap } from 'gsap';
import { createConsoleMap } from './console-map.js?v=20260729-1';
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
            <div class="cc-lyric" data-lyric>Through the static we become the signal</div>
            <div class="cc-eq" data-eq>${'<span></span>'.repeat(20)}</div>
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
            <div class="card-label"><i class="ph-icon ph-thermometer" aria-hidden="true"></i>CABIN CLIMATE <button class="climate-sync on" data-sync aria-label="Toggle zone sync">SYNC</button></div>
            <div class="climate-zones">
              <div class="climate-zone">
                <button data-dt="-1" aria-label="Driver temperature down">−</button>
                <div class="zone-temp"><b data-dtv>21.5°</b><span>DRIVER</span></div>
                <button data-dt="1" aria-label="Driver temperature up">+</button>
              </div>
              <div class="climate-divider"></div>
              <div class="climate-zone">
                <button data-pt="-1" aria-label="Passenger temperature down">−</button>
                <div class="zone-temp"><b data-ptv>22.0°</b><span>PASS</span></div>
                <button data-pt="1" aria-label="Passenger temperature up">+</button>
              </div>
            </div>
            <div class="climate-seats">
              <button class="seat-heat lv2" data-seat-heat="driver" aria-label="Driver seat heating">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v7c0 2.8 2.2 5 5 5s5-2.2 5-5V4M5 20h14" fill="none"/><path class="sh-waves" d="M9 7c.8 1 .8 2 0 3M12 7c.8 1 .8 2 0 3M15 7c.8 1 .8 2 0 3" fill="none"/></svg>
                <span class="seat-pips"><i></i><i></i><i></i></span>
              </button>
              <div class="climate-vents" role="group" aria-label="Airflow direction">
                <button class="on" data-vent="face" aria-label="Face vents"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="3.4" fill="none"/><path d="M12 14v6M8.5 15.5 6 20M15.5 15.5 18 20" fill="none"/></svg></button>
                <button data-vent="feet" aria-label="Footwell vents"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h12M6 5c0 6 2 8 6 8s6-2 6-8" fill="none"/><path d="M9 16v3M12 17v3M15 16v3" fill="none"/></svg></button>
                <button data-vent="defrost" aria-label="Defrost"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14c2-5 5-8 8-8s6 3 8 8" fill="none"/><path d="M9 16v4M12 17v4M15 16v4" fill="none"/></svg></button>
              </div>
              <button class="seat-heat lv1" data-seat-heat="pass" aria-label="Passenger seat heating">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v7c0 2.8 2.2 5 5 5s5-2.2 5-5V4M5 20h14" fill="none"/><path class="sh-waves" d="M9 7c.8 1 .8 2 0 3M12 7c.8 1 .8 2 0 3M15 7c.8 1 .8 2 0 3" fill="none"/></svg>
                <span class="seat-pips"><i></i><i></i><i></i></span>
              </button>
            </div>
            <div class="cc-fan" data-fan>${'<span></span>'.repeat(4)}</div>
            <div class="comfort-meta">
              <span data-fanv>FAN 2</span>
              <span class="aqi"><i class="aqi-dot"></i>PM2.5 · <b data-pm>12</b> · CLEAN</span>
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
              <div class="tyre-corner fl"><span>FL</span><b data-load>4.1</b><small data-temp>36&deg;</small></div>
              <svg class="tyre-car" viewBox="0 0 48 92" aria-hidden="true">
                <rect x="13" y="5" width="22" height="82" rx="9" class="tc-body"/>
                <rect x="17" y="15" width="14" height="17" rx="3" class="tc-glass"/>
                <rect x="17" y="60" width="14" height="13" rx="3" class="tc-glass"/>
                <line x1="14" y1="46" x2="34" y2="46" class="tc-line"/>
              </svg>
              <div class="tyre-corner fr"><span>FR</span><b data-load>4.1</b><small data-temp>36&deg;</small></div>
              <div class="tyre-corner rl"><span>RL</span><b data-load>3.8</b><small data-temp>34&deg;</small></div>
              <div class="tyre-corner rr"><span>RR</span><b data-load>3.8</b><small data-temp>34&deg;</small></div>
            </div>
          </section>

          <section class="aura-card aura-charge" hidden>
            <div class="card-label"><i class="ph-icon ph-lightning" aria-hidden="true"></i>ENERGY FLOW <span class="cc-live charge-live"></span></div>
            <div class="charge-hero">
              <div class="charge-ring-wrap">
                <svg class="charge-ring" viewBox="0 0 120 120" aria-hidden="true">
                  <g class="cr-ticks">${Array.from({ length: 60 }, (_, i) => {
                    const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
                    const inner = i % 15 === 0 ? 44.5 : 46.5;
                    return `<line x1="${(60 + Math.cos(a) * inner).toFixed(1)}" y1="${(60 + Math.sin(a) * inner).toFixed(1)}" x2="${(60 + Math.cos(a) * 50).toFixed(1)}" y2="${(60 + Math.sin(a) * 50).toFixed(1)}"${i % 15 === 0 ? ' class="major"' : ''}/>`;
                  }).join('')}</g>
                  <circle class="cr-track" cx="60" cy="60" r="41"/>
                  <circle class="cr-prog" cx="60" cy="60" r="41" data-ch-ring/>
                </svg>
                <div class="charge-soc"><b data-ch-soc>38</b><span>%</span></div>
              </div>
              <div class="charge-side">
                <div class="charge-power"><b data-ch-kw>142</b><span>kW</span></div>
                <small class="charge-mode" data-ch-mode>DC FAST · 800V</small>
                <div class="charge-flow" aria-hidden="true">
                  <i class="ph-icon ph-charging-station"></i>
                  <div class="charge-flow-line"><span></span><span></span><span></span></div>
                  <i class="ph-icon ph-car-side"></i>
                </div>
              </div>
            </div>
            <div class="charge-stats">
              <div><b data-ch-kwh>24.6</b><small>kWh ADDED</small></div>
              <div><b data-ch-eta>18</b><small>MIN TO 80%</small></div>
              <div><b data-ch-gain>+186</b><small>KM GAINED</small></div>
            </div>
            <svg class="charge-curve" viewBox="0 0 200 34" aria-hidden="true">
              <path class="cc-fill" d="M2 26 C 20 8, 40 5, 62 7 S 105 12, 128 18 S 175 27, 198 29 L198 34 L2 34 Z"/>
              <path class="cc-line" d="M2 26 C 20 8, 40 5, 62 7 S 105 12, 128 18 S 175 27, 198 29" fill="none"/>
              <circle class="cc-now" data-ch-now cx="128" cy="18" r="2.4"/>
            </svg>
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

  /* ---------- dual-zone climate ---------- */
  const dTempEl = $('[data-dtv]');
  const pTempEl = $('[data-ptv]');
  const syncBtn = $('[data-sync]');
  let dTemp = 21.5, pTemp = 22.0, syncOn = true;

  function renderTemps() {
    dTempEl.textContent = dTemp.toFixed(1) + '°';
    pTempEl.textContent = pTemp.toFixed(1) + '°';
  }
  function bumpTemp(zone, delta) {
    if (zone === 'd') {
      dTemp = Math.min(28, Math.max(16, dTemp + delta * 0.5));
      if (syncOn) pTemp = dTemp;
    } else {
      pTemp = Math.min(28, Math.max(16, pTemp + delta * 0.5));
      if (syncOn && pTemp !== dTemp) {
        syncOn = false;
        syncBtn.classList.remove('on');
      }
    }
    renderTemps();
  }
  layer.querySelectorAll('[data-dt]').forEach((button) =>
    button.addEventListener('click', () => bumpTemp('d', Number(button.dataset.dt))));
  layer.querySelectorAll('[data-pt]').forEach((button) =>
    button.addEventListener('click', () => bumpTemp('p', Number(button.dataset.pt))));
  syncBtn.addEventListener('click', () => {
    syncOn = !syncOn;
    syncBtn.classList.toggle('on', syncOn);
    if (syncOn) { pTemp = dTemp; renderTemps(); }
  });

  /* seat heating — click cycles 0→1→2→3→0 */
  layer.querySelectorAll('[data-seat-heat]').forEach((seat) => {
    seat.addEventListener('click', () => {
      const lv = (Number(seat.dataset.lv || seat.className.match(/lv(\d)/)?.[1] || 0) + 1) % 4;
      seat.dataset.lv = lv;
      seat.classList.remove('lv0', 'lv1', 'lv2', 'lv3');
      seat.classList.add('lv' + lv);
    });
  });

  /* airflow direction — single select */
  const ventBtns = [...layer.querySelectorAll('[data-vent]')];
  ventBtns.forEach((button) =>
    button.addEventListener('click', () => {
      ventBtns.forEach((b) => b.classList.toggle('on', b === button));
    }));

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

  /* ---------- ENERGY FLOW charge card ---------- */
  const pmEl = $('[data-pm]');
  const chargeCard = $('.aura-charge');
  const chSocEl = $('[data-ch-soc]');
  const chKwEl = $('[data-ch-kw]');
  const chKwhEl = $('[data-ch-kwh]');
  const chEtaEl = $('[data-ch-eta]');
  const chGainEl = $('[data-ch-gain]');
  const chRingEl = $('[data-ch-ring]');
  const chModeEl = $('[data-ch-mode]');
  const chNowEl = $('[data-ch-now]');
  const RING_LEN = 2 * Math.PI * 41;
  const charge = { soc: 38, kw: 142, kwh: 24.6, eta: 18, gain: 186 };
  let lastCharging = null;

  function renderCharge() {
    const soc = Math.min(100, charge.soc);
    chSocEl.textContent = String(Math.round(soc));
    chRingEl.style.strokeDasharray = RING_LEN.toFixed(1);
    chRingEl.style.strokeDashoffset = (RING_LEN * (1 - soc / 100)).toFixed(1);
    chKwEl.textContent = String(Math.round(charge.kw));
    chKwhEl.textContent = charge.kwh.toFixed(1);
    chEtaEl.textContent = String(Math.max(0, Math.round(charge.eta)));
    chGainEl.textContent = '+' + Math.round(charge.gain);
    // charging-curve playhead follows soc 20%→80% along the x axis
    const t = Math.min(1, Math.max(0, (soc - 20) / 60));
    chNowEl.setAttribute('cx', (2 + t * 196).toFixed(1));
    chNowEl.setAttribute('cy', (26 - t * 3 + Math.sin(t * 5) * 6).toFixed(1));
  }

  let lastCtxSoc = null;
  function syncChargeContext(ctx) {
    // resync when charging flag flips OR scenario switch jumps the soc baseline
    const socJumped = lastCtxSoc !== null && Math.abs(ctx.soc - lastCtxSoc) > 8 && !lastCharging;
    if (ctx.charging === lastCharging && !socJumped) return;
    lastCharging = ctx.charging;
    lastCtxSoc = ctx.soc;
    if (ctx.charging) {
      charge.soc = Math.max(12, ctx.soc);
      charge.kw = charge.soc < 55 ? 148 : charge.soc < 70 ? 118 : 74; // jump onto the curve
      charge.kwh = 8 + (charge.soc - 12) * 0.55;
      charge.eta = (80 - charge.soc) * 0.62;
      charge.gain = charge.kwh * 7.2;
      chModeEl.textContent = 'DC FAST · 800V';
    } else {
      charge.soc = ctx.soc;
      charge.kw = 0;
      chModeEl.textContent = ctx.soc < 25 ? 'LOW · FIND CHARGER' : 'ON BATTERY';
    }
    chargeCard.classList.toggle('is-charging', !!ctx.charging);
    chargeCard.classList.toggle('is-low', !ctx.charging && ctx.soc < 25);
    renderCharge();
  }

  function tickCharge(dt, time) {
    if (!lastCharging) return;
    // taper power as soc approaches 80% (real DC fast-charge curve)
    const target = charge.soc < 55 ? 148 : charge.soc < 70 ? 118 : 74;
    charge.kw += (target - charge.kw) * Math.min(1, dt * 0.8);
    charge.kw += Math.sin(time * 1.7) * 14 * dt; // dt-scaled ripple — bounded, frame-rate independent
    const rate = (charge.kw / 77) * 100; // % per hour on a 77 kWh pack
    charge.soc = Math.min(80, charge.soc + (rate / 3600) * dt * 20); // 20× demo speed
    charge.kwh += (charge.kw / 3600) * dt * 20;
    charge.eta = Math.max(0, ((80 - charge.soc) / rate) * 60);
    charge.gain = charge.kwh * 7.2;
    renderCharge();
  }

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
      id: 'charge', el: chargeCard,
      priority(ctx) {
        let s = 12;
        if (ctx.charging) s += 95;                    // charging → owns the top slot
        if (!ctx.charging && ctx.soc < 25) s += 48;   // low battery → surface as warning
        if (ctx.navState === 'arriving') s += 12;     // check state-of-charge on arrival
        if (ctx.driveMode === 'park' && ctx.soc < 50) s += 10;
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

    syncChargeContext(layout.context);
    if (!chargeCard.hidden) tickCharge(dt, time);
    pmEl.textContent = String(Math.round(11 + Math.sin(time * 0.23) * 4 + Math.sin(time * 0.071) * 3));

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
