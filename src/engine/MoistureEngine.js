import { materials } from "../data/materials.js";
import { shirts } from "../data/shirts.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export function calculateMoisture(state) {
  const shirt = shirts[state.shirt] ?? shirts.standard;
  const material = materials[state.material] ?? materials[shirt.material] ?? materials.polyester;

  const sweatLoad = state.sweatRate * 55 + state.exerciseIntensity * 4;
  const humidityLoad = state.humidity * 0.22;
  const dryingRelief = material.drying * state.windSpeed * 1.5;
  const absorptionLoad = material.absorption * 35;

  const wetness = clamp(sweatLoad + humidityLoad + absorptionLoad - dryingRelief);
  const dryingScore = clamp(material.drying * 82 + state.windSpeed * 1.4 - state.humidity * 0.35);
  const clingRisk = clamp(material.cling * 70 + wetness * 0.32);

  return { wetness, dryingScore, clingRisk };
}
