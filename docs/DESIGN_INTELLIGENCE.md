# Design Intelligence

## What this layer does

The design intelligence layer explains why a garment performs the way it does.

It sits above the score layer and turns shared-state signals into:

- primary drivers
- main constraints
- trade-offs
- confidence
- recommendation
- claim check

## Reasoning pathway

```text
Garment DNA / environment / athlete
  ↓
Feature signals
  ↓
Mechanisms
  ↓
Human outcomes
  ↓
Human-readable explanation
```

## Important files

- `src/ontology/ReasoningEngine.js`
- `src/ontology/DriverRanking.js`
- `src/ontology/ConstraintAnalysis.js`
- `src/ontology/ExplanationEngineV2.js`
- `src/ontology/EvidenceRegistry.js`

## Current output style

The app now aims for language like:

> Cooling improves mainly through perforation density and airflow, but the benefit is limited by humidity and cotton moisture retention.

That is intentional. The product should sound like a premium design intelligence tool, not a score dump.

## Confidence and evidence

Each relationship can carry:

- relationship id
- evidence level
- confidence
- rationale
- source placeholder

These are placeholders for future evidence-backed calibration.

## Claim discipline

The claim-check step exists to prevent simplistic marketing logic such as:

- more holes always means better cooling
- premium price automatically means better performance
- one winning shirt is always the winner in every environment

## Current limitations

- ontology weights are still heuristic
- confidence values are not experimentally calibrated
- comparison warnings are based on scenario logic, not measured wear-test data
