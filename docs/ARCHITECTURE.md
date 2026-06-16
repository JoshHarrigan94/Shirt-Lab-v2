# Architecture

## Core decision

ShirtLab V3 uses a split architecture:

```text
SimulationState
  ├─ Visual layer
  └─ Maths engine
```

The visual layer and maths layer consume the same state but do not need to be physically identical. They need to be coherent.

## Visual Layer

- `CurtainsScene.js`: attempts Curtains.js integration and shader-style fabric effects.
- `WindShader.js`: CSS wind ribbons/flow-line illusion.
- `MoistureShader.js`: wetness opacity and spread.
- `PerforationVisual.js`: visual hole patterns.
- `SceneEffects.js`: fit, shirt tone, heat overlay and fabric movement.

## Engine Layer

- `CoolingEngine.js`
- `MoistureEngine.js`
- `ScoreEngine.js`

Scores are heuristic and designed for product communication first.
