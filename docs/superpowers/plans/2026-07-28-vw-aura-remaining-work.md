# ID.AURA Cinematic HMI Upgrade — Remaining Work (as of 2026-07-28)

> Source of truth this was extracted from: `/memories/session/plan.md` (session-scoped, will be cleared). This file is the persistent handoff for starting a **new session** to continue the ID.AURA (`vw-id-aura/`) Cluster + Console rebuild.

## Locked decisions (do not re-litigate)
- Scope: **Cluster + Console** only. Showroom/Autonomous get shared-foundation upgrades only, no rebuild.
- Cluster architecture: **Hybrid** = live-action video plate + WebGL shader FX layer + SVG vector UI (currently still Canvas2D — see B2/B3 below).
- Video plates go into **both** Cluster and Console backgrounds.
- Assets: CC0 only (Pexels/Pixabay/Coverr/Mixkit/Poly Haven/ambientCG) + Sketchfab CC-BY (needs manual login). **No AI-generated "art"** — data visualizations (LiDAR cloud, soundfield, airflow) are fine since they're data, not art.
- Perf budget: moderate, 60fps target on MacBook Air class, quality tiers required (`js/quality.js` already exists).
- Local dev server: use a **Range-request-aware** Python server (`python3 -m http.server` does NOT support Range requests, which breaks pmtiles map loading). Recreate a small custom range server if testing locally — none is committed to the repo currently.

## Codebase quick facts
- `js/cluster.js` (Canvas2D, drawn over static image) — modes pure/drive/energy/gt via GSAP-tweened `layout` + `LAYOUT_TARGET`. Exposes QA hook `window.__cluster` (`update`, `onEnter/onExit`, `setMode`, `get layout()`).
- `js/console.js` + `js/console-map.js` — DOM cards + a **real** MapLibre/pmtiles Wolfsburg map (already built this session, see "Done" below).
- `js/main.js` — `switchView()`, camera presets, boot ritual, keyboard 1-4 + L.
- `js/scene.js` + `js/postfx.js` — WebGLRenderer + full post-processing chain (SSAO→Bokeh/DOF→Bloom→FilmGrade→SMAA→Output), quality-tier gated.
- `js/quality.js` — GPU tier probe + auto-demote.
- `js/car.js`, `js/audio.js` — vehicle model + Web Audio analyser (`levels(n)`).
- `styles.css` — single ~1200-line file, NOT yet split into `css/tokens.css` / `css/system.css` etc.
- `vendor/` — three.js r160, gsap, maplibre-gl (UMD, loaded via `<script>` not import), pmtiles, fflate (transitive dep of pmtiles.js).
- `assets/map/` — `wolfsburg.pmtiles` (4.8MB), `route-wolfsburg.geojson`, `route-maneuvers.json`, `pois.geojson`, `landmarks.geojson` — all real baked OSM/OSRM data, already committed.

## Already DONE this project (do not redo)
- Phase A1/A2/A3/A4/A7: postfx addons vendored, `postfx.js` composer chain, `quality.js` tiers, self-hosted fonts (Manrope/Sometype Mono/Chakra Petch/Technor, zero Google Fonts requests), 59 Phosphor icons.
- Phase B4: Cluster missing-instrument content (telltales, nav card, SOC sparkline, trip computer, speed-limit badge, ADAS tag, GT perf panel + G-force) — fully implemented and collision-verified in GT mode.
- Phase C2 (core): real Wolfsburg vector map via MapLibre + pmtiles — road casing/fill, building fill-extrusion, landmarks (real OSM heights), POIs, baked route with traveled/remaining split, animated 2D ego marker with chase camera, mandatory OpenMapTiles/OSM credit shown on-map.
- Phase C3 (core): digital twin FX — battery/thermal glow plane, torque/energy flow arrow cones, X-RAY toggle (material fade + wheel explode), per-corner tyre load/temp readout row.
- Asset pipeline Tasks 0–6, 8–11, 13(partial) done (map data, HDRIs, materials, fonts, icons, credits file).
- **Phase B3 — SVG instrument rewrite** (2026-07-28 session): `js/cluster.js` split into `js/cluster/{index.js,gauge.js}`; Canvas2D power gauge/speed numeral replaced with SVG gradient-stroke arcs, mask-sweep glow, spring-damped needle, digit-roll speed numeral, mode transitions via CSS-driven color/opacity crossfade. Verified across all 4 drive modes, zero pageerrors.
- **Phase C5 — Design system**: `css/tokens.css` (spacing/radius/elevation/motion/density tokens) + `css/system.css` (`.btn`, `.ui-card`, `.ui-list`, `.ui-dialog`, `.ui-slider`, `.ui-toggle`, `.ui-chip`, `.ui-progress`, `.ui-tabdock`) — actively consumed by the C1 scenario dock and C4 color swatches, not a dead stylesheet.
- **Phase C1 — Dynamic Console layout engine**: `js/console/layout.js` — card registry with `priority(ctx)` scoring, 6 scenario presets (PARKED/CHARGING/COMMUTE/HIGHWAY-PILOT/ARRIVING/NIGHT), FLIP-based reflow via GSAP, S/M/L card density via `data-size` + flexbox. Verified all 6 scenarios produce correct card rankings.
- **Phase C4 — Ambience/media viz**: `js/console/ambience.js` — mini orthographic Three.js scene (concentric ring LineLoops + audio-reactive Points cloud), ambient-light color picker driving `--view-accent`. Registered as a 4th competing card in the C1 layout engine.

## NOT DONE — organized by priority/effort

### Tier 1 — Medium, self-contained (Phase A5/C5/C4 done — see "Already DONE" above)
1. **Phase B6 — Day/Night + tunnel auto-dim**: `data-theme` swap driven by sampling video-plate luminance (1x1 canvas every 500ms). Blocked in practice until B1 video plates exist; the day/night token seed already exists in `css/tokens.css` (`body[data-theme="day"]`) but is not wired to any live sampling yet.

### Tier 2 — Large, multi-step
5. ~~Phase B3~~ — DONE, see above.
6. ~~Phase C1~~ — DONE, see above.
7. **Phase B2 — Cluster WebGL FX layer** (`js/cluster/fx.js`): separate tiny Three.js scene (ortho cam + fullscreen quad + instanced points) with its own bloom composer — speed streaks/radial blur, anamorphic flare, 2000-pt particle field, energy-mode curl-noise ribbons, GT-mode heat shimmer. Downscale 0.6x on MID tier, disable on LOW.
8. **Phase B5 — Choreographed events** (`js/cluster/script.js`): ~45s deterministic scripted timeline — ACC engage ritual, lane-change + blind-spot alert, tunnel auto-dim, "TAKE OVER" amber handover, charge-arrival. Add a dev scenario scrubber.
9. **Phase C3b — Interior/cockpit material + live-screen upgrade**: `MeshPhysicalMaterial` pass on existing `car.glb` interior (anisotropy for brushed alu, sheen for Alcantara, clearcoat for piano-black, transmission/ior for glass), ambientCG textures already downloaded (`assets/materials/`), dedicated interior lighting rig, and — highest value — render the live Cluster SVG/canvas output to a `CanvasTexture` mapped onto the interior display mesh (ties all 3 views together visually).

### Tier 3 — Deferred / optional / blocked on manual steps
10. **Phase C2 remaining gaps**: on-map text labels (needs self-hosted glyph SDF PBFs + `glyphs` style URL — separate sub-task), `sky` layer (current vendored MapLibre build rejects `type:"sky"` — would need a newer/untrimmed build), real `car.glb` driving on the map via a shared-GL-context Three.js custom layer with headlight cone projection (currently just a simplified 2D DOM marker).
11. **Phase C3 remaining gaps**: per-corner suspension travel animation (GLB has no separate damper/link meshes — would need new geometry), aero streamline visualization, literal battery-pack-shaped heatmap geometry (vs. current ambient footprint glow).
12. **Task 7 — Video plate assets** (needed for Phase B1): manual CC0 selection from Pexels/Pixabay/Coverr/Mixkit — **do not attempt to automate/select this autonomously**, needs human judgment on quality/no-dashboard/no-watermark. This blocks B1, which blocks B2's video-plate-linked filters and B6's luminance sampling.
13. **Task 12 — Sketchfab models** (optional): EV battery pack/skateboard chassis (worth the search effort for twin X-ray layer), cockpit/yoke models (optional, skip if quality bar not met — C3b fallback path is the safe default).
14. **Task 13 (finish)**: delete `assets/art/cluster-night-road.jpg` (AI-generated) once B1 video plates actually replace its usage in `cluster.js` — do NOT delete before that, it would break the live site.
15. **Task 14/15**: re-run pre-push size gate (`find . -type f -size +90M -not -path './.git/*'` must print nothing) and, after next deploy, the GitHub Pages Range-request gate (`curl -H "Range: bytes=0-1023" -I https://joeyzhao.cc/vw-id-aura/assets/map/wolfsburg.pmtiles` must return `206`).

### Phase D — Integration & polish (all NOT started, do last)
- D1: wire `switchView()` lifecycle to start/stop video plates, FX composers, map, twin — nothing should render off-screen.
- D2: enter/exit choreography per view (staggered reveal, `--ease-flip`, blade-sweep, cross-view accent morph).
- D3: accessibility — `prefers-reduced-motion` kills grain/streaks/particles, ARIA live regions for status, keyboard nav for cards/scrubber.
- D4: finish `assets/ASSET-CREDITS.md` (mostly done) + confirm in-map OSM/OpenMapTiles attribution is visible.
- D5: refresh `assets/card-cover.png` + `assets/og-cover.jpg` from new screenshots.
- D6: rewrite `REFACTOR-PLAN.md` to mark it superseded.

## Key technical gotchas to carry into the next session
- **MapLibre style-spec**: only ONE zoom-based `interpolate`/`step` allowed anywhere in an expression tree. Put `interpolate` on `["zoom"]` as the outermost expression and nest `match`/`case` literals inside each zoom stop — never the reverse.
- **`vendor/pmtiles.js` has a transitive bare import** `from "fflate"` — already fixed by vendoring `vendor/fflate.js` + importmap entry, but remember this pattern if vendoring other no-bundler ESM libs: grep for other bare `from"..."` specifiers before assuming self-contained.
- **`vendor/maplibre-gl.js` is UMD, not ESM** — loaded via a classic `<script defer>` tag setting `window.maplibregl`, NOT via the importmap. Any new map code must do `const maplibregl = window.maplibregl`.
- **BokehPass/DOF focus must be dynamic**, never a hardcoded constant — drive it from `camera.position.distanceTo(controls.target)` every frame, or the DOF will blur the wrong depth whenever the camera zooms/changes preset.
- **`multi_replace_string_in_file` failures are all-or-nothing** — if the call errors, assume NONE of its edits applied; don't do dependent follow-up edits until re-verified with `read_file`.
- **CSS grid-row overflow clipping is invisible in the accessibility/DOM snapshot** — `overflow:hidden` on a card silently clips new content even though the DOM text is present and updating. Always screenshot-verify (via `canvas.toDataURL()` workaround below, or careful full-page screenshots) after adding content to a densely-packed grid layout, not just DOM-snapshot-verify.
- **Playwright `page.screenshot()` / `screenshot_page` can return a vignette-only, content-free frame** on this app even when DOM/canvas state prove correct rendering — a headless-Chromium compositing artifact. Workaround: `canvas.toDataURL()` via `page.evaluate()` for ground truth.
- **The `#launch` button needs a native click**: `page.evaluate(() => document.getElementById('launch').click())`, not Playwright's synthetic `click()`/`click({force:true})`, which can silently fail to fire the listener on animated one-shot CTAs.
- **`window.__cluster`** QA hook (`setMode`, `layout` getter, `update(t,dt)`) lets you bypass GSAP/rAF for deterministic verification — but reload the page after any cache-bust bump, since an open tab keeps running the old cached ES module.
- Persistent, cross-project versions of the Playwright/base64/click gotchas are also saved in `/memories/tool-usage.md`.

## Suggested order for a fresh session
1. Re-run the local Range-aware Python server, do a full 4-view regression sweep (Showroom→Cluster→Autonomous→Console) checking zero `pageerror` events, to confirm nothing regressed since last session.
2. Pick ONE Tier 1 item (A5 tokens + C5 design system pair well together, or C4 ambience viz as a fully independent feature) and finish it completely before moving to Tier 2.
3. Only attempt B3 (SVG gauge rewrite) or C1 (dynamic layout engine) once a Tier 1 item is shipped — both are full-day-scale efforts.
4. Leave Task 7 (video plates) and Task 12 (Sketchfab models) as explicit checkpoints requiring user involvement — flag and pause rather than guessing asset quality.
