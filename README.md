# ShirtLab V3

A static GitHub Pages-ready prototype for a cinematic sportswear wind-tunnel interface.

This version intentionally separates:

- **Visual experience**: Curtains.js/shader-inspired visual layer, CSS wind, wetness, perforation masks and fabric movement.
- **Maths scoring**: lightweight heuristic engine for cooling, airflow, comfort, drying, wetness, cling and value.
- **Shared state**: one state object drives both visuals and metrics.

## Run

Open `index.html` directly or upload the repo root to GitHub Pages.

No npm, no node_modules, no build step.

## Structure

```text
src/app/App.js
src/state/SimulationState.js
src/visual/
src/engine/
src/data/
src/ui/
```

## Product direction

ShirtLab is not pretending to be CFD. It is a visual decision interface for comparing shirts, materials, perforations, environment and athlete intensity.
