# Implementation checkpoint — 2026-09-26

## Approval and release state
Desktop-v2 and mobile-v1 are approved production visual targets. Quality has priority; up to 200 existing Hyper3D credits are authorized. Actual character likeness and actual web visuals have not been approved. No production deployment, push or commit performed. Existing homepage remains Classic with the mode capsule addition in the isolated worktree.

## Implemented locally
- /explore/ real Three.js room, Hyper3D record player with repaired mechanical parts, independent record/arm motion, and seated Hyper3D avatar.
- Editable Blender masters. Avatar keeps its original connected pose and intact head/neck; experimental head deformations were rejected. Desktop 250k / mobile 120k character triangles, original 2K color, restrained dielectric material. Dedicated face/side/front comparison page uses the real GLB.
- Actual Finfold screen, real artwork, 12 existing project destinations, resume and distinct recruiting/project email intents.
- Bilingual HTML panels, native dialog, keyboard restoration, URL state, explicit-load music/video and external fallbacks.
- Classic capsule, direct Classic exit inside dialogs. Actual WebGL first-frame posters; mobile poster intentionally lightweight 195×422, desktop 1440×900.
- Meshopt geometry compression with original turntable mechanical pivots restored and tested. Decoder license retained.

## Verification performed
- 12 state/content/packed-asset tests pass. They decode actual room, turntable and both character files; browser image decoding alone is stubbed in Node.
- Writing 9 articles and SEO 39 pages/ 12 bilingual pairs pass.
- Chromium in-app browser 1440×900 and 390×844: no mobile horizontal overflow; Finfold refresh/Back restoration; nested panel focus restoration; no media iframe before explicit load.
- Ten Explore/Classic round trips completed before final avatar integration; current final scene reload and mode/navigation controls verified visually.
- Model failure server returns 503 for GLBs: explicit fallback and all 12 project links remain usable.
- WebGL-unavailable fixture returns null for WebGL contexts: fallback and project navigation remain usable. Real context loss is not tested.
- Final warm local desktop: ready event 155ms, first rendered frame 287ms, sampled 60.0fps, 62 draw calls/309236 visible triangles. 390×844 on same desktop: ready 94ms, first frame 175ms, sampled 60.0fps, 33 draw calls/153836 visible triangles. These are local desktop Chromium samples, not cold network or real-device results. Ready event precedes first painted frame.
- NetEase cross-origin iframe errors observed, also on Classic. External links retained; successful embedded audio playback not verified.

## Current transfer estimates
Full file manifest: artifacts/portfolio-rebuild/core-budget.json.
- Desktop 7.30MB raw; 6.13MB with estimated gzip for text files.
- Mobile 5.88MB raw; 4.71MB with estimated gzip for text files.
These include geometry, texture, decoder, JS/CSS/HTML, scene poster and initial project images. They are file calculations, not a network trace. Mobile raw sum exceeds provisional 5MB; compressed production transfer still needs verification and further optimization. Large masters/internal artifacts must be excluded from a production delivery package.

## Remaining gates and work
Character likeness review is now concrete at the comparison page. Scene remains below the approved cinematic target: environment detail/materials, plants, framing and lighting need further art work. Current avatar retains original desk-facing pose; a toward-camera pose needs proper regeneration/rigging after likeness feedback. Mobile music object is outside the camera, accessible through Work; mobile composition needs refinement.

Safari, true mobile devices, weak network, real context loss, final recordings/videos/covers, and 8–10 target visitor sessions are not complete. No conversion improvement has been measured. Production and social publishing require separate explicit authorization.

Preview: http://127.0.0.1:4186/explore/
Character: http://127.0.0.1:4186/artifacts/portfolio-rebuild/character-review/

## Subsequent checkpoint — V3 studio integration

User asked to keep the current V2 face for now and defer further facial refinement. That head is now assembled onto the seated body in `scripts/studio/assemble-avatar.py`, preserving editable `explore/assets/source/avatar-v2.blend` and the raw sources. Face oriented toward the visitor; original body posture retained. Independent transparent eyewear and facial UVs survive Meshopt compression, covered by a new test.

Runtime now loads avatar-v2-packed.glb (desktop 3.47 MB) and avatar-v2-mobile-packed.glb (mobile 1.72 MB). Room foliage uses curved elliptical geometry instead of four-triangle diamonds; desk plant reduced in height and walnut grain contrast reduced. Mobile camera moved closer, with persistent Work/Music/About links when physical objects are outside the frame. Desktop and mobile first-frame posters regenerated from actual WebGL.

Validation: 13 tests pass; Writing and SEO validators pass. Chromium checked at desktop and 390x844; Finfold and mobile music panel open normally. Playback inside the third-party music iframe remains unverified. No Safari or physical-device claim. Current file budget: desktop raw 7,849,320 bytes / text-gzip estimate 6,675,019; mobile raw 6,026,997 / text-gzip estimate 4,852,696. Raw mobile remains above 5 MB; production transfer must be measured.

No new Hyper3D spending in this checkpoint. No deployment. Cinematic environment refinement, mobile scene composition, broader device verification and final delivery recordings remain incomplete. The current room is a working 3D slice, not a claim of matching the approved concept's full visual quality.

## 2026-09-27 — V4 posture correction

- Enlarged the accepted V2 head from scale .155 to .185; facial likeness remains deferred.
- Moved avatar and chair to [1.244, .5976, .177] (chair at floor height), outside the desk short edge. Reoriented the keyboard across the seated user and placed it under both hands. Lifted hand contact geometry 18 mm to avoid key penetration.
- Added separate left/right hand morphs, alternating typing bursts with pauses, disabled while a panel is open or reduced motion is requested. This is a subtle hand animation, not individually rigged fingers.
- Checked desktop, side, overhead, hand close-up, and a 390 x 844 scene fixture in the local browser. Actual mobile devices and Safari remain untested.
- Updated desktop/mobile first-frame images. Browser animation DOM values varied between active and idle, desktop sample reported 60 fps on this machine (not a device benchmark).
- 14 state/asset tests pass, including decoded typing morphs on both character LODs.
- No additional Hyper3D credits used; no production deployment.

## 2026-09-27 — Bounded exploration

Drag and focused-canvas arrow keys now move a clamped spherical camera offset: desktop yaw ±0.22 rad, mobile ±0.12 rad, pitch ±0.10 rad. Radius and target stay fixed; no zoom or walking. Reset/Home clears intent. Content selection clears intent and keeps existing panel camera behavior. Pointer capture and an 8 px drag threshold prevent accidental object selection. Persistent Work navigation remains available throughout.

No new 3D assets, controls library, render loop, shadows, or raycasts during dragging. Existing damping handles camera movement; reduced motion uses immediate positioning. Local desktop sample remained 60 fps / 73 draw calls / 358816 triangles. Browser drag, Reset, Work opening and closing verified. Two camera-bound tests plus the existing fourteen state/asset tests pass. Real phone performance remains unverified. Not deployed.

## 2026-09-27 — Books and record collections

User explicitly selected Cali's existing collection. Added 15 book metadata entries and 14 album entries from the public page and its public collection data; direct book destination/Apple Music links retained. Cover URLs currently load from cali.so and depend on that host. No book excerpts, personal reviews, or audio files copied. Independent lightweight DOM shelves reproduce spine-to-cover selection and an angled record selection layout; this is not a verified pixel-identical port. Original site browser interaction was unavailable, so reference HTML and supplied screenshot were used.

Book placeholder replaced; record shelf precedes Joey's existing music/MV player. Click and keyboard selection, horizontal overflow, reduced motion, cover error fallback, and selected title links supported. All 15 book and 14 album covers loaded in local desktop browser. Book selection and album selection verified. Existing sixteen tests pass. Mobile touch and every external destination's current availability remain unverified. No production deployment.


## 2026-09-27 — Desk refinement and authorized production release

Desk length reduced from 2.55 to 2.05, keeping the seated edge and keyboard contact fixed. Left accessories and trestle moved inward. Monitor moved 0.55 toward the user and rotated another 15 degrees. Finfold hotspot now derives from screen bounds. Mobile camera reframed to retain both person and monitor. Posters recaptured from the real scene. Homepage enters Explore; explicit Classic links and anchored homepage links retain Classic. User explicitly requested deployment.

Local checks: 16 tests, Writing and SEO validations; desktop and 390x844 browser inspection; Finfold panel opens. Safari and physical phones untested.
