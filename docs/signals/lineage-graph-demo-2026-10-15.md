# Lineage graph interaction demo — 2026-10-15

## Verified behavior

Checked the logged-in Signals development product in Chrome via Computer Use after the user restored the session. Clicking a non-current node opens its action menu. Expand Lineage reveals the next level; Collapse Lineage hides it again. In the inspected record, expanding the complex changed the Children table from 7 to 8 records; collapsing restored 7. View Entity opened the related batch record in a new browser tab. The product record and its data were not edited.

Read-only reference: local `elements-ui2.1`, Materials/Components/Pages/Lineage (`LineageMap.jsx`, `NodePopover.jsx`, `hooks/useNodeActions.jsx`, `hooks/useLineageTable.js`) and lineage Playwright coverage. Original committed Vega colors were used instead of local redesign colors. The user's dirty source checkout was not modified.

## Portfolio implementation

The demo follows the observed click → node menu → expand/collapse or View Entity sequence. It uses the product's blue current node, green asset and orange batch palette, hover preview, zoom, graph panning, and linked parent/child tables. The existing case-study styling and screenshots remain in place.

Nine explicitly labeled example records form a small upstream/downstream tree. These are illustrative data, not customer records or experimental findings. View Entity opens a separate, simplified example record page with identity and relationships. This is a static interaction adaptation, not the complete Signals application. Unrelated product actions such as permission handling, marking a new current node, export and multi-level expansion are outside this demo. The separate Show/Hide Properties demo remains unchanged.

## Verification

- Nested branch expansion: 4 → 5 → 7 visible nodes; collapsing the ancestor returns to 4.
- Independent upstream expansion: 3 parent records; collapsing downstream does not affect upstream.
- Node menu opens corresponding record in a new tab; parent/child relationships retain their correct direction.
- Chinese/English switching, Escape return focus, arrow-key table tabs, zoom and reset.
- Browser checks at 390, 768, 1440 and 1920 widths; phone graph and table scroll within their frame.
- `node scripts/validate-lineage-demo.mjs` verifies ancestor visibility, independent branches, root/leaf restrictions and relationship direction.
- JavaScript syntax, `npm run validate:seo`, and `git diff --check` pass.

The historical purple release tag and external archive are retained; no process/source files are removed.
