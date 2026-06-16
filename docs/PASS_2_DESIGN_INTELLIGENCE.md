# Pass 2 — Design Intelligence V2

Pass 2 upgrades ShirtLab from score reporting into explanation-led design intelligence.

## Added

- `src/ontology/DriverRanking.js`
- `src/ontology/ConstraintAnalysis.js`
- `src/ontology/ExplanationEngineV2.js`
- Updated `ScoreEngine.js` to use the V2 explanation layer
- Updated `HUD.js` with verdict, why bullets, ranked drivers, ranked constraints, trade-offs, recommendation and claim check

## What this unlocks

ShirtLab can now explain a garment configuration in terms of:

- primary design drivers
- active constraints
- mechanism-level trade-offs
- scenario-specific recommendation
- perforation claim check

## Product significance

This is the first pass where ShirtLab starts to behave like an explainable garment intelligence platform rather than a visual scoring demo.
