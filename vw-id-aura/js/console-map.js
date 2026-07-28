/* ============================================================
   ID.AURA — Console real vector map (Wolfsburg)
   MapLibre GL JS + PMTiles vector basemap baked from real OSM
   data via Planetiler (OpenMapTiles schema). Dark cinematic style
   authored to match design tokens — no procedural/decorative map
   art. Real baked route (OSRM) + real POIs + real landmark
   massing (actual OSM height tags on VW Kraftwerk chimneys etc,
   extruded — "massing model", not AI/decorative art). Ego marker
   chases the baked route under a pitched camera.
   MapLibre GL JS ships as a UMD bundle (no ESM export), so it is
   loaded as a classic script in index.html and read off
   `window.maplibregl` here — see index.html for the <script> tag.
   Mandatory credit: © OpenStreetMap contributors · © OpenMapTiles
   (rendered as a small on-map label — see assets/ASSET-CREDITS.md).
   Contract: { resize(), setActive(on), getEta(), getNextTurn(), destroy() }
   ============================================================ */

import { Protocol } from 'pmtiles';

const maplibregl = window.maplibregl;
let protocolRegistered = false;

function ensurePmtilesProtocol() {
  if (protocolRegistered || !maplibregl) return;
  const protocol = new Protocol();
  maplibregl.addProtocol('pmtiles', protocol.tile);
  protocolRegistered = true;
}

async function loadJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  return res.json();
}

/* ---------- geometry helpers (no turf dependency) ---------- */
function haversine([lon1, lat1], [lon2, lat2]) {
  const R = 6371000;
  const toRad = Math.PI / 180;
  const dLat = (lat2 - lat1) * toRad;
  const dLon = (lon2 - lon1) * toRad;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function bearingBetween([lon1, lat1], [lon2, lat2]) {
  const toRad = Math.PI / 180, toDeg = 180 / Math.PI;
  const y = Math.sin((lon2 - lon1) * toRad) * Math.cos(lat2 * toRad);
  const x = Math.cos(lat1 * toRad) * Math.sin(lat2 * toRad) -
    Math.sin(lat1 * toRad) * Math.cos(lat2 * toRad) * Math.cos((lon2 - lon1) * toRad);
  return (Math.atan2(y, x) * toDeg + 360) % 360;
}

function lerpAngle(a, b, t) {
  let diff = ((b - a + 540) % 360) - 180;
  return (a + diff * t + 360) % 360;
}

// Precompute cumulative distance at each vertex, for O(log n)-ish scanning.
function buildRouteIndex(coords) {
  const cum = [0];
  for (let i = 1; i < coords.length; i++) {
    cum.push(cum[i - 1] + haversine(coords[i - 1], coords[i]));
  }
  return { coords, cum, total: cum[cum.length - 1] };
}

// progress: 0..1 along the route. Returns { point, bearing, coordsUpTo }.
function sampleRoute(index, progress) {
  const target = Math.max(0, Math.min(1, progress)) * index.total;
  let i = 1;
  while (i < index.cum.length && index.cum[i] < target) i++;
  i = Math.min(i, index.cum.length - 1);
  const segStart = index.cum[i - 1], segEnd = index.cum[i];
  const segT = segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;
  const a = index.coords[i - 1], b = index.coords[i];
  const point = [a[0] + (b[0] - a[0]) * segT, a[1] + (b[1] - a[1]) * segT];
  const bearing = bearingBetween(a, b);
  const coordsUpTo = index.coords.slice(0, i).concat([point]);
  return { point, bearing, coordsUpTo, remaining: index.total - target };
}

/* ---------- style ---------- */
function buildStyle() {
  // MapLibre only permits a single zoom-based interpolate/step curve per
  // expression, so the zoom interpolation must be the outermost node with
  // a per-class `match` nested inside each zoom stop (not the reverse).
  const byClass = (motorway, primary, secondary, minor, service, fallback) => ['match', ['get', 'class'],
    'motorway', motorway, 'trunk', motorway,
    'primary', primary,
    'secondary', secondary, 'tertiary', secondary,
    'minor', minor, 'service', service,
    fallback];
  const roadClassCasingWidth = ['interpolate', ['linear'], ['zoom'],
    10, byClass(0.6, 0.4, 0.3, 0.2, 0.1, 0.2),
    14, byClass(3.2, 2.2, 1.6, 1, 0.6, 1),
    17, byClass(9, 7, 5.5, 3.6, 2.2, 3.6)];
  const roadClassFillWidth = ['interpolate', ['linear'], ['zoom'],
    10, byClass(0.2, 0.15, 0.1, 0.06, 0.04, 0.06),
    14, byClass(1.8, 1.2, 0.9, 0.5, 0.3, 0.5),
    17, byClass(6.5, 4.8, 3.6, 2.2, 1.3, 2.2)];
  const roadClassColor = ['match', ['get', 'class'],
    'motorway', '#3a4552', 'trunk', '#3a4552',
    'primary', '#333d47',
    'secondary', '#2c343d', 'tertiary', '#2c343d',
    '#232a31'];

  return {
    version: 8,
    sources: {
      wolfsburg: { type: 'vector', url: 'pmtiles://assets/map/wolfsburg.pmtiles' },
      route: { type: 'geojson', lineMetrics: true, data: { type: 'FeatureCollection', features: [] } },
      'route-traveled': { type: 'geojson', data: { type: 'FeatureCollection', features: [] } },
      pois: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } },
      landmarks: { type: 'geojson', data: { type: 'FeatureCollection', features: [] } }
    },
    layers: [
      { id: 'bg', type: 'background', paint: { 'background-color': '#0a0d12' } },
      { id: 'landcover', type: 'fill', source: 'wolfsburg', 'source-layer': 'landcover',
        paint: { 'fill-color': ['match', ['get', 'class'], 'wood', '#0e1712', 'grass', '#101710', '#0e1310'], 'fill-opacity': 0.7 } },
      { id: 'landuse', type: 'fill', source: 'wolfsburg', 'source-layer': 'landuse',
        paint: { 'fill-color': ['match', ['get', 'class'],
          'industrial', '#121a20', 'residential', '#12151a', 'commercial', '#141821', 'railway', '#171a1e', '#101215'],
          'fill-opacity': 0.6 } },
      { id: 'park', type: 'fill', source: 'wolfsburg', 'source-layer': 'park',
        paint: { 'fill-color': '#0f1a13', 'fill-opacity': 0.55 } },
      { id: 'water', type: 'fill', source: 'wolfsburg', 'source-layer': 'water',
        paint: { 'fill-color': '#061a22', 'fill-opacity': 0.92 } },
      { id: 'waterway', type: 'line', source: 'wolfsburg', 'source-layer': 'waterway',
        paint: { 'line-color': '#0d3540', 'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.4, 16, 2.4] } },
      { id: 'road-casing', type: 'line', source: 'wolfsburg', 'source-layer': 'transportation',
        filter: ['!=', ['get', 'brunnel'], 'tunnel'],
        paint: { 'line-color': roadClassColor, 'line-width': roadClassCasingWidth, 'line-opacity': 0.9 } },
      { id: 'road-casing-tunnel', type: 'line', source: 'wolfsburg', 'source-layer': 'transportation',
        filter: ['==', ['get', 'brunnel'], 'tunnel'],
        paint: { 'line-color': '#1a2026', 'line-width': roadClassCasingWidth, 'line-opacity': 0.55, 'line-dasharray': [0.4, 0.6] } },
      { id: 'road-fill', type: 'line', source: 'wolfsburg', 'source-layer': 'transportation',
        paint: { 'line-color': ['match', ['get', 'class'], 'motorway', '#8a97a3', 'trunk', '#8a97a3', 'primary', '#6d7982', '#4a545c'],
          'line-width': roadClassFillWidth, 'line-opacity': 0.85 } },
      { id: 'road-bridge-glow', type: 'line', source: 'wolfsburg', 'source-layer': 'transportation',
        filter: ['==', ['get', 'brunnel'], 'bridge'],
        paint: { 'line-color': '#54d3e3', 'line-width': 1, 'line-opacity': 0.25, 'line-blur': 1.5 } },
      { id: 'buildings', type: 'fill-extrusion', source: 'wolfsburg', 'source-layer': 'building',
        minzoom: 13,
        paint: {
          'fill-extrusion-color': ['interpolate', ['linear'], ['coalesce', ['get', 'render_height'], 6],
            0, '#171c22', 20, '#232b34', 60, '#333f4a'],
          'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6],
          'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
          'fill-extrusion-opacity': 0.88,
          'fill-extrusion-vertical-gradient': true
        } },
      { id: 'landmarks', type: 'fill-extrusion', source: 'landmarks',
        paint: {
          'fill-extrusion-color': '#3d5560',
          'fill-extrusion-height': ['coalesce', ['to-number', ['get', 'height']], 30],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.94,
          'fill-extrusion-vertical-gradient': true
        } },
      { id: 'route-remaining', type: 'line', source: 'route',
        paint: { 'line-color': '#54d3e3', 'line-width': 3.2, 'line-opacity': 0.28, 'line-dasharray': [0.2, 1.6] } },
      { id: 'route-traveled', type: 'line', source: 'route-traveled',
        paint: { 'line-color': '#78e3c0', 'line-width': 4, 'line-opacity': 0.92 },
        layout: { 'line-cap': 'round', 'line-join': 'round' } },
      { id: 'route-traveled-glow', type: 'line', source: 'route-traveled',
        paint: { 'line-color': '#78e3c0', 'line-width': 9, 'line-opacity': 0.16, 'line-blur': 3 } },
      { id: 'poi-parking', type: 'circle', source: 'pois', filter: ['==', ['get', 'amenity'], 'parking'],
        paint: { 'circle-radius': 2.6, 'circle-color': '#e6a877', 'circle-opacity': 0.75 } },
      { id: 'poi-fuel', type: 'circle', source: 'pois', filter: ['==', ['get', 'amenity'], 'fuel'],
        paint: { 'circle-radius': 2.8, 'circle-color': '#e07d8a', 'circle-opacity': 0.8 } },
      { id: 'poi-charging-glow', type: 'circle', source: 'pois', filter: ['==', ['get', 'amenity'], 'charging_station'],
        paint: { 'circle-radius': 7, 'circle-color': '#54d3e3', 'circle-opacity': 0.14, 'circle-blur': 1 } },
      { id: 'poi-charging', type: 'circle', source: 'pois', filter: ['==', ['get', 'amenity'], 'charging_station'],
        paint: { 'circle-radius': 3, 'circle-color': '#54d3e3', 'circle-opacity': 0.95 } }
    ]
  };
}

export function createConsoleMap(container, { onEta } = {}) {
  ensurePmtilesProtocol();

  const map = new maplibregl.Map({
    container,
    style: buildStyle(),
    center: [10.7797, 52.4306],
    zoom: 14.2,
    pitch: 58,
    bearing: 20,
    interactive: false,
    attributionControl: false,
    maxPitch: 68
  });

  const credit = document.createElement('div');
  credit.className = 'map-credit';
  credit.textContent = '© OpenStreetMap contributors · © OpenMapTiles';
  container.appendChild(credit);

  const egoEl = document.createElement('div');
  egoEl.className = 'map-ego';
  const egoMarker = new maplibregl.Marker({ element: egoEl, rotationAlignment: 'map' }).setLngLat([10.760105, 52.438637]);

  let routeIndex = null;
  let maneuverBoundaries = [];
  let progress = 0.02;
  let smoothedBearing = 20;
  let active = false;
  let ready = false;
  let etaSeconds = 0, remainingKm = 0;

  Promise.all([
    loadJSON('assets/map/route-wolfsburg.geojson'),
    loadJSON('assets/map/pois.geojson'),
    loadJSON('assets/map/landmarks.geojson'),
    loadJSON('assets/map/route-maneuvers.json')
  ]).then(([routeFC, poisFC, landmarksFC, maneuvers]) => {
    const coords = routeFC.features[0].geometry.coordinates;
    routeIndex = buildRouteIndex(coords);
    etaSeconds = routeFC.features[0].properties.duration || 0;

    // Real per-maneuver segment lengths -> cumulative distance-along-route
    // boundaries, used to report an accurate "next turn" distance instead
    // of an approximation.
    let cum = 0;
    maneuverBoundaries = maneuvers
      .filter((m) => m.maneuver !== 'arrive')
      .map((m) => (cum += m.distance));

    map.once('idle', () => {
      map.getSource('route').setData(routeFC);
      map.getSource('pois').setData(poisFC);
      map.getSource('landmarks').setData(landmarksFC);
      egoMarker.addTo(map);
      ready = true;
    });
  }).catch((err) => console.warn('[console-map] data load failed', err));

  map.on('style.load', () => {
    // style already set via constructor `style:`; nothing else needed here,
    // kept as a hook for future style swaps (day/night).
  });

  function tick(dt) {
    if (!ready || !active || !routeIndex) return;
    progress = (progress + dt * 0.012) % 0.985;
    const { point, bearing, coordsUpTo, remaining } = sampleRoute(routeIndex, progress);
    smoothedBearing = lerpAngle(smoothedBearing, bearing, 0.08);

    egoMarker.setLngLat(point);
    egoMarker.setRotation(smoothedBearing);

    map.getSource('route-traveled').setData({
      type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coordsUpTo }
    });

    map.jumpTo({
      center: point,
      bearing: smoothedBearing,
      pitch: 58,
      zoom: 15.6
    });

    remainingKm = remaining / 1000;
    const traveledMeters = progress * routeIndex.total;
    const nextBoundary = maneuverBoundaries.find((b) => b > traveledMeters);
    const nextTurnMeters = nextBoundary != null ? Math.round(nextBoundary - traveledMeters) : Math.round(remaining);
    if (onEta) onEta({ progress, remainingKm, nextTurnMeters, etaMin: Math.max(1, Math.round((etaSeconds * (1 - progress)) / 60)) });
  }

  function resize() { map.resize(); }
  function setActive(on) {
    active = on;
    if (on) requestAnimationFrame(() => map.resize());
  }
  function destroy() { map.remove(); }

  return { resize, setActive, tick, destroy };
}
