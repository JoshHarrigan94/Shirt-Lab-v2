import { assembleGarment } from "./GarmentAssembler.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export function calculateMoisture(state, garment = assembleGarment(state)) {
  const { material } = garment;
  const density = garment.dna.perforationDensity ?? 0;
  const weightPenalty = (garment.dna.weightFactor ?? 0.4) * 18;

  const sweatLoad = state.sweatRate * 55 + state.exerciseIntensity * 4;
  const humidityLoad = state.humidity * 0.22;
  const dryingRelief = garment.effectiveDryingPotential * state.windSpeed * 1.7;
  const absorptionLoad = material.absorption * 35 + weightPenalty;
  const ventRelief = density * 14;

  const wetness = clamp(sweatLoad + humidityLoad + absorptionLoad - dryingRelief - ventRelief);
  const dryingScore = clamp(garment.effectiveDryingPotential * 88 + state.windSpeed * 1.4 - state.humidity * 0.35);
  const clingRisk = clamp(material.cling * 70 + wetness * 0.32 + weightPenalty * 0.6 - density * 6);

  return { wetness, dryingScore, clingRisk };
}
