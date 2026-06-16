# Architecture

## Core shape

ShirtLab V3 keeps one shared simulation state and lets multiple layers consume it:

```text
SimulationState
  ├─ Visual layer
  ├─ UI layer
  ├─ Score layer
  └─ Ontology / reasoning layer
```

The visual layer and maths layer are complementary, not identical.

## Deployment model

- entry point: `index.html`
- fully static
- GitHub Pages compatible
- no npm
- no bundler
- no backend

## Main modules

### State

- `src/state/SimulationState.js`

### Data

- `src/data/GarmentDNA.js`
- `src/data/scenarios.js`
- `src/data/demoPresets.js`
- `src/data/materials.js`

### Engine

- `src/engine/GarmentAssembler.js`
- `src/engine/CoolingEngine.js`
- `src/engine/MoistureEngine.js`
- `src/engine/ScoreEngine.js`

### Visual

- `src/visual/CurtainsScene.js`
- `src/visual/WindShader.js`
- `src/visual/MoistureShader.js`
- `src/visual/PerforationVisual.js`
- `src/visual/SceneEffects.js`

### UI

- `src/ui/Controls.js`
- `src/ui/HUD.js`
- `src/ui/DrawerUI.js`
- `src/ui/styles.css`

### Ontology

- `src/ontology/ReasoningEngine.js`
- `src/ontology/ExplanationEngineV2.js`
- `src/ontology/RelationshipWeights.js`
- `src/ontology/ConfidenceRegistry.js`
- `src/ontology/EvidenceRegistry.js`

## Fallback behavior

If Curtains.js loads successfully, the hero uses shader-driven fabric movement.

If Curtains.js fails or the CDN is unavailable, the app stays functional with CSS-only visuals. The interface exposes a subtle status tag so developers can see which visual engine is active.
