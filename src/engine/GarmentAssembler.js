import { garmentPresets, fitProfiles, perforationModes } from "../data/GarmentDNA.js";
import { materials } from "../data/materials.js";

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function weightFactor(gsm = 150) {
  return clamp01((gsm - 90) / 140);
}

function densityFromPreset(preset, perforationMode) {
  return clamp01((preset.dna.perforationDensity ?? 0) + (perforationMode?.densityShift ?? 0));
}

function densityFromControl(config, preset, perforationMode) {
  if (typeof config.perforationDensity === "number") {
    return clamp01(config.perforationDensity / 100);
  }
  return densityFromPreset(preset, perforationMode);
}

function normalizeLocation(value, fallback) {
  return value ?? fallback ?? "chest";
}

export function assembleGarment(config) {
  const preset = garmentPresets[config.shirtPreset] ?? garmentPresets.plainPolyRunningTee;
  const material = materials[config.material ?? preset.dna.material] ?? materials[preset.dna.material] ?? materials.polyester;
  const fit = fitProfiles[config.fit ?? preset.dna.fit] ?? fitProfiles.regular;
  const perforationMode = perforationModes[config.perforation ?? "none"] ?? perforationModes.none;

  const perforationDensity = densityFromControl(config, preset, perforationMode);
  const gsm = config.gsm ?? preset.dna.gsm;
  const perforationLocation = normalizeLocation(config.perforationLocation, preset.dna.perforationLocation);
  const meshPanelsEnabled = Boolean(config.meshPanels) || preset.dna.meshPanelConstruction !== "none";
  const coverageFactor = preset.dna.coverage === "athletic" ? 0.88 : 1;
  const sleeveFactor = preset.dna.sleeveLength === "sleeveless" ? 0.85 : 1;
  const locationAirflowBonus = ["fullBody", "upperBack", "underarms", "spine"].includes(perforationLocation) ? 0.08 : 0.03;
  const locationCoolingBonus = ["upperBack", "spine", "underarms"].includes(perforationLocation) ? 0.06 : 0.02;

  return {
    id: preset.id,
    label: preset.label,
    visualTone: preset.visualTone,
    price: preset.price,
    materialKey: material.id ?? config.material ?? preset.dna.material,
    material,
    fitKey: config.fit ?? preset.dna.fit,
    fit,
    perforationKey: config.perforation ?? "none",
    perforationMode,
    dna: {
      ...preset.dna,
      material: material.id ?? config.material ?? preset.dna.material,
      fit: config.fit ?? preset.dna.fit,
      gsm,
      weightFactor: weightFactor(gsm),
      perforationDensity,
      perforationLocation,
      perforationType: perforationMode.visual === "none" ? preset.dna.perforationType : perforationMode.visual,
      likelyMoistureBehaviour: preset.dna.moistureBehaviour,
      likelyAirflowBehaviour: preset.dna.airflowBehaviour,
      effectiveCoverageFactor: coverageFactor,
      effectiveSleeveFactor: sleeveFactor,
      meshPanelFactor: meshPanelsEnabled ? 1 : 0,
      meshPanelConstruction: meshPanelsEnabled ? "mapped mesh panels" : preset.dna.meshPanelConstruction
    },
    effectiveAirflowPotential: clamp01(
      material.breathability * 0.52 +
      perforationDensity * (0.24 + locationAirflowBonus) +
      fit.airGap * 0.16 +
      (meshPanelsEnabled ? 0.14 : 0)
    ),
    effectiveDryingPotential: clamp01(
      material.drying * 0.62 +
      (1 - weightFactor(gsm)) * 0.18 +
      perforationDensity * (0.09 + locationCoolingBonus) +
      fit.airGap * 0.08 +
      (meshPanelsEnabled ? 0.08 : 0)
    ),
    effectiveMoistureRisk: clamp01(
      material.absorption * 0.56 +
      material.cling * 0.22 +
      weightFactor(gsm) * 0.12 -
      perforationDensity * 0.06 -
      (meshPanelsEnabled ? 0.08 : 0)
    )
  };
}

export function buildVariantState(state, side = "A") {
  const suffix = side === "B" ? "B" : "A";
  const shirtPreset = state[`shirtPreset${suffix}`];
  const material = state[`material${suffix}`];
  const fit = state[`fit${suffix}`];
  const perforation = state[`perforation${suffix}`];
  const perforationDensity = state[`perforationDensity${suffix}`];
  const perforationLocation = state[`perforationLocation${suffix}`];
  const gsm = state[`gsm${suffix}`];
  const meshPanels = state[`meshPanels${suffix}`];

  return {
    ...state,
    shirtPreset,
    material,
    fit,
    perforation,
    perforationDensity,
    perforationLocation,
    gsm,
    meshPanels
  };
}
