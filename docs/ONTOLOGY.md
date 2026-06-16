# ShirtLab Ontology Layer

ShirtLab V3 now separates the product into three layers:

1. Visual experience layer — shaders, wind, fabric motion and moisture illusion.
2. Maths scoring layer — cooling, airflow, drying, comfort and value scores.
3. Ontology/explanation layer — design feature → mechanism → human outcome.

The ontology is intentionally simple and extensible. It is designed to explain why a garment scores well or poorly.

## Core pathway

```text
Garment Feature
  ↓
Physical Mechanism
  ↓
Human Outcome
```

Example:

```text
Back perforation cluster
  ↓
Increased convective airflow
  ↓
Reduced thermal load and improved drying
```

## Key files

- `src/ontology/GarmentFeatures.js`
- `src/ontology/HumanFactors.js`
- `src/ontology/EnvironmentFactors.js`
- `src/ontology/Mechanisms.js`
- `src/ontology/Outcomes.js`
- `src/ontology/RelationshipMap.js`
- `src/ontology/ExplanationEngine.js`

## Design philosophy

ShirtLab should not only say which shirt wins. It should explain why.

The long-term product is a garment design intelligence platform, not merely a visual simulator.
