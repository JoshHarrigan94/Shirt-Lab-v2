# ShirtLab V3

ShirtLab V3 is a static GitHub Pages-ready garment intelligence demo.

It combines:

1. A cinematic visual layer
2. A lightweight heuristic score layer
3. A weighted ontology and explanation layer
4. A shared simulation state that keeps visuals, controls, scores, and reasoning aligned

This is not a CFD simulator. It is a premium sportswear concept sandbox designed to make airflow, sweat, and performance trade-offs legible.

## Run locally

Open `index.html` directly in a browser.

No npm.
No build step.
No backend.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to deploy from the default branch root.
4. Publish the site from `/ (root)`.

Because the app is fully static, `index.html` is the entry point and the `src/` modules load directly in the browser.

## Main architecture

- `src/state/SimulationState.js`
- `src/visual/`
- `src/engine/`
- `src/data/`
- `src/ontology/`
- `src/ui/`

## Current pass highlights

- visual hero upgrade with clearer shirt silhouette, wind flow, wetness zoning, and perforation storytelling
- subtle visual-engine status indicator for `Curtains active` vs `CSS fallback`
- comparison-aware hero presentation
- demo preset shortcuts for premium cotton vs poly, hot humid, cool windy, high sweat, and DIY punched-hole tests
- repo cleanup for GitHub Pages hygiene

## Key docs

- `docs/ARCHITECTURE.md`
- `docs/DESIGN_INTELLIGENCE.md`
- `docs/GARMENT_DNA.md`
- `docs/ROADMAP.md`

## Constraints

- no `node_modules`
- no `package.json`
- no build tooling
- no backend
- no paid API dependency

Curtains is CDN-loaded and the app is designed to fall back gracefully when that visual engine is unavailable.
