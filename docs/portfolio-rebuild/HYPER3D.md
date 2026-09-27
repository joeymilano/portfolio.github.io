# Hyper3D production record

User approved up to 200 existing credits for portfolio quality, 2026-09-26.
Initial observed balance 219.5. Latest observed balance 217.5: 2.0 credits consumed across the turntable and character workflow. Material confirmed and downloaded; no recharge or subscription changes.

Turntable asset: https://hyper3d.ai/workspace/rodin/22878f57-055f-4478-af6f-0d1dfbb6498e
Private lock enabled. Gen-2.5, medium geometry; high native material effort and De-light. Downloaded 4K PBR GLB master (43,840,584 bytes) in user Downloads ZIP and copied to internal artifacts.

Master had warped platter/implausible arm. Local Blender repair retains source walnut body, replaces platter with exact circular grooves and tonearm with one articulated assembly. Final web GLB 883,812 bytes, 23,640 triangles. All editable source and provenance retained. Do not deploy the large master with runtime assets.

Character asset: https://hyper3d.ai/workspace/rodin/3089d1b5-b8f1-4604-9081-76b7ba822353

Chrome file access fixed by user; reference uploaded successfully. Gen-2.5 Extreme-High geometry, 1M triangle master; Native High material with 8K, Face Restore and De-light. Private lock verified visually. PBR GLB master downloaded (80,145,736 bytes) and preserved in internal artifacts/hyper3d/avatar-source. Separate likeness review remains required. Web adaptation and chair calibration completed for the first likeness-review candidate. Connected undeformed model retained; turn-head experiments rejected due to geometric artifacts. Packed desktop character2.92MB, mobile1.60MB. Likeness and final pose remain unapproved.

Room and repaired turntable now use Meshopt compression (16-bit position quantization, original texture pixels retained). Authored mechanical pivots restored as parent groups in runtime because quantization changes mesh origins. Source uncompressed GLBs and Blender files retained.

## Corner arcade — 2026-09-27

Asset: https://hyper3d.ai/workspace/rodin/c3ca60d6-a0cc-4c98-97f5-c5847888ad14

Gen-2.5 High geometry and Native High PBR, private generation. Prompt requested a compact walnut arcade with charcoal bezel, red joystick and ivory buttons. Original PBR GLB retained in `artifacts/portfolio-rebuild/hyper3d/arcade-source/base_basic_pbr.glb`. `scripts/studio/prepare-arcade.py` normalizes height to 1.13 m, sets the floor pivot, reduces to approximately 32k triangles and 1K textures. Meshopt packing produces `explore/assets/arcade-packed.glb`; a separate screen plane displays the existing Borrowed Light artwork. Integrated into the studio production release after local browser review.

## Editable source archive — 2026-09-27

Large source models, Blender files, generation records and uncompressed intermediates are preserved outside the release checkout at `/Users/joeyzhao/Documents/portfolio-studio-source-archive/2026-09-27/`, with their original relative paths. Restore the needed source paths into the checkout before rerunning the authoring scripts. Runtime packed models and release posters remain versioned; temporary review pages and caches are removed.
