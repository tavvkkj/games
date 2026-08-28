# tavvkkj browser games archive

Static files for the browser-game catalog used by `tavvkkj.xyz`.

- 73 catalog entries from pages 1–7 of the authorized public archive.
- Original `/assets/games/...` directory layout preserved.
- Subway Surfers variants excluded.
- Cloudflare challenge payloads, analytics and advertising resources excluded.
- Per-file SHA-256 data available in `catalog/integrity-manifest.jsonl`.

Run `npm test` to verify every SHA-256 hash, all 73 catalog entries, entry documents and exclusion rules. Run `npm run manifest` only after intentionally changing archived files.

The production site reads these files through its same-origin `/github-games/*` proxy. The proxy fetches the matching path from this repository, applies the appropriate browser content type and caches immutable assets at the edge.

The game files remain the property of their respective authors and rights holders. This repository does not grant a new license or claim affiliation with the original publishers.
