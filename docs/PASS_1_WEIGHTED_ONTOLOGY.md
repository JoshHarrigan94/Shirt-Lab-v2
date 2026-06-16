# Pass 1 — Weighted Ontology

Pass 1 turns ShirtLab's static ontology into a computable weighted knowledge graph.

## What changed

Added:

- `src/ontology/RelationshipWeights.js`
- `src/ontology/ConfidenceRegistry.js`
- `src/ontology/ReasoningEngine.js`

Updated:

- `src/ontology/RelationshipMap.js`
- `src/ontology/ExplanationEngine.js`
- `src/ontology/GarmentOntology.js`

## Why this matters

The previous ontology could say:

```text
Perforation density → Airflow → Cooling
```

The weighted ontology can now say:

```text
Perforation density → Airflow → Cooling
contribution: +0.38
confidence: 78%
```

This enables:

- ranked drivers
- ranked constraints
- contribution-based explanations
- future recommendation logic
- confidence-aware design reasoning

## Current model

The graph has two weighted stages:

```text
Design feature → Mechanism → Outcome
```

Each relationship can carry:

- weight
- polarity
- confidence
- evidence level
- rationale

## Example output

```text
Driver:
Perforation density (+0.41)
Perforation density → Airflow → Breathability
Confidence 78% (moderate)
```

## Important note

This is still heuristic. It is designed to make the ontology computational and explainable before adding evidence-backed calibration.
