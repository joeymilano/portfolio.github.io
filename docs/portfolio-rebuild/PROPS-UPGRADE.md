# Chair and desk props — 2026-09-27

Authored in Blender through `scripts/studio/build-room.py`; no generated asset or additional Hyper3D credits were needed.

- Chair back uses a contoured upholstered surface and continuous matching perimeter rails. Seat brackets, arm mounts, tilt housing and dual casters make the connections explicit.
- Mouse has a lower shell, palm shell, two click paddles and a recessed metal scroll wheel.
- Curved props use smoother silhouettes. Task lamp has physical hinges and a visible underside diffuser.
- Existing staging, named interaction targets, day/night lighting and avatar are retained.

Rebuild with Blender in background mode, then pack `explore/assets/room-day-night.glb` with glTF Transform `meshopt --quantize-position 16`. Preserve original textures. The broad `optimize` preset introduces palette UVs on the monitor, preventing its runtime image from spanning the screen; the asset test detects this regression.

Validation: 31 studio tests pass; Chrome desktop, side/detail views, mobile layout and day/night posters checked. Browser reported no failed resources or page errors. Source Blender files remain under the ignored `explore/assets/source/`; uncompressed intermediates are archived under `/Users/joeyzhao/Documents/portfolio-studio-source-archive/2026-09-27/props-upgrade/`.
