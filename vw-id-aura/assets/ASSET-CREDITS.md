# ID.AURA visual asset credits

The experience uses human-authored photography, PBR materials and 3D models.
No generative imagery is used in the Showroom, Cluster or Autonomous worlds.

## Showroom hero vehicle

- **Car Concept**
- Model and textures by Eric Chadwick, Darmstadt Graphics Group GmbH
- Source: https://github.com/KhronosGroup/glTF-Sample-Assets/tree/main/Models/CarConcept
- License: CC BY 4.0 International
- Local optimization: geometry compressed with Draco and embedded textures
  transcoded to WebP at quality 95 using glTF Transform 4.4.2; mesh hierarchy,
  interior, material extensions and 162K-vertex source detail preserved
- Presentation adaptation: Khronos/3D Commerce marks and license plate hidden;
  paint, glass, lighting and turntable direction re-authored for ID.AURA

## Intro and Autonomous concept film

- **High-Speed Night Drive Through Urban Tunnel**
- Video by とら にい on Pexels
- Source: https://www.pexels.com/video/high-speed-night-drive-through-urban-tunnel-31196472/
- License: Pexels License
- Local edit: nine-second H.264 loop, color graded for ID.AURA, with source
  audio and metadata removed

## Showroom exhibition wall

- **An expansive indoor stage with dramatic lighting setup**
- Photo by Dawn Lio on Pexels
- Source: https://www.pexels.com/photo/stage-with-lightings-2177813/
- License: Pexels License

## Cluster road world

- **Driving through city tunnel at night with GPS**
- Photo by Allen Boguslavsky on Pexels
- Source: https://www.pexels.com/photo/driving-through-city-tunnel-at-night-with-gps-32560104/
- License: Pexels License

## Showroom floor

- **Painted Concrete 02**
- Material by Rob Tuytel on Poly Haven
- Source: https://polyhaven.com/a/painted_concrete_02
- License: CC0

## Autonomous city

- **City Kit (Commercial), version 2.1**
- Models by Kenney
- Source: https://kenney.nl/assets/city-kit-commercial
- License: CC0 (see `models/city/License.txt`)

## Autonomous ambient traffic

- **Car Kit, version 3.1**
- Sedan, hatchback, SUV and van models by Kenney
- Source: https://kenney.nl/assets/car-kit
- License: CC0 (see `models/traffic/License.txt`)

## Autonomous pedestrian

- **CZ casual avatar / canonical 53-bone rig**
- Rigged Avaturn character distributed by three-ws
- Source: https://huggingface.co/three-ws/avatars/blob/main/cz.glb
- License: MIT (see `models/pedestrian/LICENSE.txt`)

## Interface iconography

- **Phosphor Icons**
- Source: https://github.com/phosphor-icons/core
- Pinned revision: `2b75f3ad12b420c9504ef05df8d2564a28f8500e`
- License: MIT (see `icons/phosphor/LICENSE`)
- Expanded from 15 to 59 icons for Cluster/Console instrument, nav, climate and media glyphs.

## Console / Cluster studio & environment lighting

- **Studio Small 09**
- HDRI by Greg Zaal on Poly Haven
- Source: https://polyhaven.com/a/studio_small_09
- License: CC0

- **Hansaplatz**
- HDRI by Andreas Mischok on Poly Haven
- Source: https://polyhaven.com/a/hansaplatz
- License: CC0

## Console / digital twin interior materials

- **Metal 009** (brushed steel — trim, bezels)
- **Leather 039** (suede — Alcantara-style cabin surfaces)
- **Fabric 004** (carbon fibre weave — GT mode accents)
- Materials by ambientCG
- Source: https://ambientcg.com/view?id=Metal009, https://ambientcg.com/view?id=Leather039, https://ambientcg.com/view?id=Fabric004
- License: CC0

## Typography (self-hosted, no Google Fonts runtime dependency)

- **Manrope** — UI typeface. Source: https://fonts.google.com/specimen/Manrope. License: OFL.
- **Sometype Mono** — data/numeric typeface. Source: https://fonts.google.com/specimen/Sometype+Mono. License: OFL.
- **Chakra Petch** — geometric/technical accents. Source: https://fonts.google.com/specimen/Chakra+Petch. License: OFL.
- **Technor** — wide technical display face for numerals/brand (replaces Michroma). Source: https://www.fontshare.com/fonts/technor. License: Fontshare Free Font License (free for commercial use).
- All woff2 files fetched once and vendored under `assets/fonts/`; no runtime requests to fonts.googleapis.com / fonts.gstatic.com.

## Console — Wolfsburg map

- **Map data**: © OpenStreetMap contributors, available under the Open Database License (ODbL). https://www.openstreetmap.org/copyright
- **Tileset schema/style**: produced work is styled per the OpenMapTiles schema (CC-BY 4.0) — https://github.com/openmaptiles/openmaptiles — on-map credit "© OpenMapTiles © OpenStreetMap contributors" is rendered in the Console map corner.
- **Tileset build**: Planetiler (Apache-2.0) — https://github.com/onthegomap/planetiler
- **Base OSM extract**: Geofabrik Niedersachsen — https://download.geofabrik.de/europe/germany/niedersachsen.html
- **Map rendering**: MapLibre GL JS (BSD-3-Clause) — https://github.com/maplibre/maplibre-gl-js
- **Tile transport**: PMTiles / pmtiles JS (BSD-3-Clause) — https://github.com/protomaps/PMTiles
- **Decompression dependency**: fflate (MIT) — https://github.com/101arrowz/fflate — required by pmtiles JS for gzip-compressed tile entries, vendored at `vendor/fflate.js`.
- **Route**: one real driving route (Allersee → Autostadt) computed once via the OSRM demo routing API (https://router.project-osrm.org) and baked to `assets/map/route-wolfsburg.geojson` / `route-maneuvers.json`. Routing data derived from OpenStreetMap (ODbL).
- **Points of interest & landmarks**: charging stations, fuel, parking, museums/attractions (`assets/map/pois.geojson`) and building footprints for VW Kraftwerk chimneys, Autostadt pavilions, Phaeno and Volkswagen Arena (`assets/map/landmarks.geojson`), queried once via the Overpass API (https://overpass-api.de) from OpenStreetMap data (ODbL). Real OSM `height` tags on the Kraftwerk chimneys drive the 3D massing extrusion on the map — not a modeled/decorative asset.
