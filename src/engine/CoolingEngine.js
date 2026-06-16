import { materials } from "../data/materials.js";
import { shirts, perforations } from "../data/shirts.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export function calculateCooling(state) {
  const shirt = shirts[state.shirt] ?? shirts.standard;
  const material = materials[state.material] ?? materials[shirt.material] ?? materials.polyester;
  const perf = perforations[state.perforation] ?? perforations.none;

  const wind = state.windSpeed / 20;
  const heatPressure = Math.max(0, (state.temperature - 16) / 20);
  const humidityPenalty = state.humidity / 100;
  const intensity = state.exerciseIntensity / 10;

  const convective = (material.breathability + shirt.baseAirflow + perf.airflowBoost) / 3;
  const evaporative = material.drying * (1 - humidityPenalty * 0.65);
  const fitFactor = state.fit === "compression" ? 0.72 : state.fit === "oversized" ? 1.12 : 1;

  return clamp(
    42 +
    convective * 28 * fitFactor +
    evaporative * 22 +
    wind * 18 -
    heatPressure * intensity * 12
  );
}
