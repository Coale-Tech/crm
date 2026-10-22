# Vendored `@framework/ui`

Snapshot of frappe's `ui/src` (frappe `version-16-hotfix` @ aa2c116), aliased as
`@framework/ui` in `vite.config.js`. Vendored because Frappe Cloud's frappe v16
release lacks components CRM `develop` imports (`GroupBy`, `DataImportWizard`).
Tests and stories were dropped. To refresh, re-copy `ui/src` from frappe
`version-16-hotfix` or `develop`, and add any new bare imports to `package.json`.
