import { assembleGarment } from "./GarmentAssembler.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export function calculateCooling(state, garment = assembleGarment(state)) {
  const { material } = garment;
  const density = garment.dna.perforationDensity ?? 0;
  const airflowPotential = garment.effectiveAirflowPotential ?? 0.5;
  const dryingPotential = garment.effectiveDryingPotential ?? 0.5;

  const wind = state.windSpeed / 20;
  const heatPressure = Math.max(0, (state.temperature - 16) / 20);
  const humidityPenalty = state.humidity / 100;
  const intensity = state.exerciseIntensity / 10;
  const fitFactor = garment.fitKey === "compression" ? 0.72 : garment.fitKey === "oversized" ? 1.12 : 1;
  const convective = airflowPotential * (0.76 + wind * 0.18) + density * 0.16;
  const evaporative = dryingPotential * (1 - humidityPenalty * 0.65);
  const shimmerBonus = Math.max(0, (state.temperature - 24) / 20) * density * 6;

  return clamp(
    36 +
    convective * 31 * fitFactor +
    evaporative * 24 +
    wind * 18 -
    heatPressure * intensity * 14 +
    shimmerBonus
  );
}
