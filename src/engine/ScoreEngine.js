import { calculateCooling } from "./CoolingEngine.js";
import { calculateMoisture } from "./MoistureEngine.js";
import { materials } from "../data/materials.js";
import { shirts, perforations } from "../data/shirts.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

export function calculateScores(state) {
  const shirt = shirts[state.shirt] ?? shirts.standard;
  const material = materials[state.material] ?? materials[shirt.material] ?? materials.polyester;
  const perf = perforations[state.perforation] ?? perforations.none;

  const cooling = calculateCooling(state);
  const moisture = calculateMoisture(state);
  const airflow = clamp(45 + material.breathability * 30 + perf.airflowBoost * 70 + state.windSpeed * 0.9);
  const comfort = clamp(88 - moisture.clingRisk * 0.42 - Math.max(0, state.temperature - 24) * 1.6 + cooling * 0.18);
  const value = clamp(material.value * 52 + airflow * 0.22 + cooling * 0.16 - shirt.price * 0.12);

  return {
    cooling: Math.round(cooling),
    comfort: Math.round(comfort),
    airflow: Math.round(airflow),
    drying: Math.round(moisture.dryingScore),
    wetness: Math.round(moisture.wetness),
    clingRisk: Math.round(moisture.clingRisk),
    value: Math.round(value),
    claim: perf.airflowBoost > 0.18 && shirt.price > 100 ? "Real benefit, weak value" : perf.airflowBoost > 0 ? "Context-dependent" : "No perforation advantage"
  };
}
