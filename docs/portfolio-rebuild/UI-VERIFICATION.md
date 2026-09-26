# Studio UI verification — 2026-09-26

## Evidence and content

- The Finfold panel summarizes the existing `finfold.html` case: origin/problem in the hero; Product Lead scope in the case metadata and MY ROLE section; the three-step workbench and mobile density trade-off in DECISION; brand memory/rules in SYSTEM & MOAT. It adds no measured outcomes or new research claims.
- Recruiting and project collaboration have separate mailto subjects in English and Chinese. Both use the existing public address from `index.html`, `super666joey@gmail.com`. Opening these links drafts an email; it does not send one.
- All 12 project destinations are retained from Classic and checked against existing files.
- Writing chooses the verified `/en/writing/...` or `/writing/...` article according to the studio language. All three selected articles exist in both languages.
- All seven NetEase track IDs come from the existing Classic track list. The video ID is present in `yao.html`, its external CTA and existing embedded player.
- Resume, Finfold screenshot, YAO cover and public portrait are real existing assets. Books remain clearly labeled internal preview props. Photography is not offered.

## Automated checks

`node --test tests/studio-state.test.mjs`: **9 passing tests**.

Coverage includes validated shared object IDs; explicit versus remembered language; URL query/hash preservation; safe closing; invalid-input rejection; project retention and destination files; both-language writing paths; existing public music IDs; distinct contact intents.

`node --check explore/ui.mjs` and `node --check assets/studio-mode.js`: passed.

## Interaction contract

- UI listens for `studio:ready`, `studio:failure`, and `studio:pick` with `{id}`.
- UI emits `studio:select` with `{id: string|null}` and `studio:language` with `{language: 'en'|'zh'}`.
- Runtime positions initially hidden `button[data-object]` elements for `finfold`, `music`, `books`, `about`, `work`, and `writing`.
- Native modal dialog handles focus containment; closing and Escape restore the trigger. History navigation does not create new entries.
- Players are created only by an explicit button press, never advertise playback state, and are removed on panel changes, language changes, closing, visibility loss, page exit, or mode switching. The embedded player's own controls start playback; external links remain available.
- Explicit routes never redirect according to remembered mode. The mode adapter only adds the shared capsule.

## Remaining verification

Root owns rendered browser QA, runtime integration and visual acceptance. No live third-party playback success is claimed. The Classic content remains in its existing HTML; the studio registry records verified current content and has drift tests, but does not migrate Classic to a new rendering system.

## Content access and focus audit

The Work dialog also includes Music, About, Writing, and Books (explicit internal preview), so mobile visitors and unavailable scene objects retain content access. Lightweight HTML deep links appear immediately during loading or failure and disappear only after `studio:ready`.

Nested selection preserves the original trigger outside the dialog instead of replacing it with a soon-to-be-removed Work button. Closing restores that trigger if it remains visible, otherwise the top Work navigation button. Selection updates have an equality guard and the dialog close event does not call selection again; the shared click handler prevents default navigation for object links. These code paths were inspected; rendered focus/keyboard verification remains part of root browser QA.

The modal header now contains a bilingual Classic exit link using the same mode persistence/media disposal handler, since native modal dialogs correctly make the outside capsule inert. Desktop panels align right to leave the left side of the room visible; mobile sizing is unchanged.
