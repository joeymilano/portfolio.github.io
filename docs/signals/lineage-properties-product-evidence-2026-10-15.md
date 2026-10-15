# Material Lineage property-panel evidence — 2026-10-15

Captured through Computer Use in the user's authenticated Chrome Signals development environment. Navigation: Materials → Cell Lines → 0001 → Lineage → Children → Show/Hide Properties.

## Published assets

- `properties-filter-menu.png`: native browser screenshot clip of the open Filters dropdown. Predefined: All, Common. Library: Cell Lines, Complexes.
- `properties-filtered-selection.png`: native browser screenshot clip after filtering to Complexes and adding Protein Sequence and Total Molecular Weight to Selected. Six properties remain Available; two are Selected for that filter.

Neither screenshot is reconstructed or generated. Full viewport originals are retained locally in `artifacts/lineage-properties-2026-10-15/`; publication crops exclude the surrounding record's account information. Images document the current development product, not a claim about the exact 2024 release UI.

## Behavior checked

- Filtering to Complexes shows its eight available properties and hides other library/common properties from the displayed lists.
- Checking two properties and Add moves them to Selected.
- Add All moves the remaining six into Selected (eight total for Complexes).
- Remove All returns all eight to Available.
- Move Up / Move Down controls were observed; reordering was not exercised.
- Cancel closed the dialog without saving. The original nine table columns remained unchanged: Material ID, Material Type, Material Name, Asset/Batch, Lineage, Submission Date, Submitter, Modified, Modifier. No material data was edited.

## Case-study integration

Added the two implemented UI states beneath the historical Miro discussion, keeping the original contribution narrative and compact discussion screenshot. Prototype language about select all / select none is preserved as historical context; current implementation copy uses its actual Add All / Remove All controls. Chinese and English captions and accessible image labels are included; existing zoom behavior is reused.

## Validation

Reviewed Chinese and English at 1440px desktop and 390px mobile. Both screenshots loaded, no horizontal overflow, image zoom opened and Escape closed it. SEO validation passed (43 public pages, 12 bilingual article pairs).

## Interactive entry added — 2026-10-15

User requested the actual Show/Hide Properties entry point and suggested the local Elements UI implementation. Read-only review of `/Users/joeyzhao/Documents/elements-ui2.1` confirmed:

- `src/components/Materials/Components/Pages/Lineage/LineageTable.jsx`: the button sits above the non-empty lineage table and opens the selector; Save updates that relationship's table configuration.
- `SelectProperties/SelectProperties.jsx`: filter scopes both lists; Add All and Remove All operate on visible properties; Material ID is mandatory; ordering is available under All; edits are staged until Save.
- `SelectProperties/ColumnSelection.jsx` and `orderUtils.js`: library grouping, single-side checkbox selection, ordering boundaries.
- `playwright/tests/materials/lineageView.test.js`: table-column configuration workflow and default nine columns.

A standalone, source-informed JavaScript demo now sits above the original product screenshots. It does not import the production application or call any product API. Three explicitly labeled example rows contain no private customer or experimental data. Chinese UI labels are a portfolio translation; the entry and modal title retain the product's Show/Hide Properties wording. The native select and compact layout are adaptations for this static portfolio. The original screenshots remain the record of the actual English product UI.

Browser checks: entry opens the modal; two additions change the table from 9 to 11 columns; Cancel and Escape discard draft changes and restore focus; filtered Add All selects 8 Complexes fields; Remove All under All retains Material ID; moving Material Name above Material Type changes the saved table order and disables upward movement at the mandatory-column boundary. Chinese and English reviewed at desktop 1440px and mobile 390px, with no modal overflow. Language switch updates labels; no backend, login or persistence is required.
