# Garment DNA

## Purpose

Garment DNA makes each preset decomposable instead of treating a shirt as a single score token.

The current pass introduces:

- material
- GSM / weight
- fit
- sleeve length
- coverage
- perforation density
- perforation location
- perforation type
- mesh / panel construction
- likely moisture behaviour
- likely airflow behaviour

## Files

- `src/data/GarmentDNA.js`
- `src/engine/GarmentAssembler.js`

## Presets

The current preset set includes:

- Plain cotton tee
- Plain polyester running tee
- Mesh performance tee
- MothTech-style perforated cotton tee
- DIY punched-hole cotton tee

## Assembly

The assembler turns preset DNA plus user overrides into an effective garment model with:

- airflow potential
- drying potential
- moisture risk
- weight factor
- mapped perforation density

This gives the score layer and ontology layer richer input while preserving a static architecture.

## Why this matters

Garment DNA is the bridge between the cinematic visual layer and the explainable maths layer.

Without it, presets are just labels.
With it, presets become structured design concepts.
