# MissionGet case study

Bilingual editorial portfolio case: `/missionget-glasses` and `/en/missionget-glasses`.

- Generate both HTML files with `python3 scripts/build-missionget-case.py`.
- `case.css` and `case.mjs` contain the presentation and browser interactions.
- `journey.mjs` contains fixed, local examples and the confirmation state machine. It has no MissionGet API, account, microphone, or payment integration.
- Run `npm run test:missionget`, `npm run validate:seo`, and `npm run validate:writing` before publishing.

Visuals: `lifestyle.webp` is an AI-assisted scenario image. `glasses.webp` is the AG05 device render. `voice-early.webp`, `prototype-early.webp`, and `workbench.webp` show project interfaces. `at-the-demo-redacted.webp` is the supplied hackathon photograph. `campaign.webp` shows the approved campaign artwork. `icon.webp` is cropped from the supplied official MissionGet logo. `cover.webp` and `og-cover.jpg` are composed portfolio covers. `media/demo-approved.mp4` is the supplied project demo, compressed for click-to-play delivery.

The fixed interaction examples and the real integration evidence are labeled separately. Project credits distinguish Joey's product/experience/prototype role from the MissionGet platform team and the glasses vendor.

Approved video source: `MissionGet_DEMO_原色_含日程截图_29s.mp4`, SHA-256 `cf39a4b9d9cbc886890a72d2d0cc19afe35afab163740e034d4d151ec6fc6cf6`. It is a 28.733-second, 1080p BT.2020 HLG recording. The website version is rendered to Rec.709 using AVFoundation's native video composition color conversion, then compressed to H.264 at 1080p. The original AAC audio is copied directly. Shot order, subtitles and the ending calendar view are unchanged. The poster is extracted at 3 seconds from the final web video, so it cannot drift from the player version. No custom tone curve, exposure, brightness, saturation or CSS color filters are applied. The rejected `demo-sdr.mp4` and `demo-poster-sdr.webp` are removed; new asset paths avoid cached copies. The supplied source file is retained unchanged outside the public site.

Mobile UI: `app-home.webp` and `app-device.webp` are supplied screenshots from the same four-tab app layout. `app-task-detail.webp` is a crop of the supplied phone workbench task, preserving its in-progress state. The older three-tab chat image and the full account-watermarked captures are excluded from the public gallery.

Privacy: the two exposed QR-code regions in `at-the-demo-redacted.webp` are covered with opaque coarse mosaics. Imagegen produced the mosaic texture; only the code footprints were composited onto the supplied photograph. Pixels outside those footprints were verified identical to the previous decoded image. Both the page image and its full-size viewer use this redacted asset. The original supplied photograph remains outside the public site.
