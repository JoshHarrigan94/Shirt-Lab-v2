import { calculateCooling } from "./CoolingEngine.js";
import { calculateMoisture } from "./MoistureEngine.js";
import { assembleGarment, buildVariantState } from "./GarmentAssembler.js";
import { explainDesignV2, explainComparison } from "../ontology/ExplanationEngineV2.js";
import { buildScoreExplanations } from "./DriverExplanationEngine.js";
import { buildTradeoffIntelligence } from "./TradeoffEngine.js";
import { buildClaimCheck } from "./ClaimCheckEngine.js";
import { buildComparisonVerdict } from "./ComparisonVerdictEngine.js";

const clamp = (v, min = 0, max = 100) => Math.max(min, Math.min(max, v));

function riskBand(value) {
  if (value >= 67) return "high";
  if (value >= 40) return "medium";
  return "low";
}

function round(value) {
  return Math.round(value);
}

function calculateSingle(state) {
  const garment = assembleGarment(state);
  const cooling = calculateCooling(state, garment);
  const moisture = calculateMoisture(state, garment);
  const airflow = clamp(
    garment.effectiveAirflowPotential * 78 +
    state.windSpeed * 1.2 +
    state.exerciseIntensity * 0.8 -
    garment.dna.weightFactor * 14
  );
  const comfort = clamp(
    82 -
    moisture.clingRisk * 0.34 -
    Math.max(0, state.temperature - 24) * 1.2 +
    cooling * 0.2 +
    garment.material.softness * 8
  );
  const overheatingRiskScore = clamp(
    (state.temperature - 18) * 2.8 +
    state.exerciseIntensity * 4.2 +
    state.humidity * 0.2 -
    cooling * 0.42 -
    airflow * 0.18
  );
  const value = clamp(
    garment.material.value * 44 +
    comfort * 0.16 +
    airflow * 0.16 +
    cooling * 0.14 -
    garment.price * 0.18
  );
  const environmentSuitability = clamp(
    66 +
    cooling * 0.12 +
    moisture.dryingScore * 0.1 -
    overheatingRiskScore * 0.16 -
    Math.abs(state.humidity - 55) * 0.1
  );

  const scores = {
    garment,
    cooling: round(cooling),
    airflow: round(airflow),
    drying: round(moisture.dryingScore),
    comfort: round(comfort),
    wetClingRiskScore: round(moisture.clingRisk),
    overheatingRiskScore: round(overheatingRiskScore),
    valueScore: round(value),
    environmentSuitability: round(environmentSuitability),
    wetClingRisk: riskBand(moisture.clingRisk),
    overheatingRisk: riskBand(overheatingRiskScore)
  };

  scores.explanation = explainDesignV2(state, scores);
  scores.explanations = buildScoreExplanations(scores, scores.explanation);
  scores.tradeoffIntelligence = buildTradeoffIntelligence(scores, scores.explanation);
  scores.claimCheckDetail = buildClaimCheck(scores, scores.explanation);
  return scores;
}

export function calculateScores(state) {
  const activeSide = state.activeGarmentView === "B" ? "B" : "A";
  const sideAState = buildVariantState(state, "A");
  const sideBState = buildVariantState(state, "B");
  const shirtA = calculateSingle(sideAState);
  const shirtB = calculateSingle(sideBState);
  const active = activeSide === "B" ? shirtB : shirtA;

  const result = {
    ...active,
    shirtA,
    shirtB,
    activeSide,
    compareEnabled: Boolean(state.compareEnabled)
  };

  if (state.compareEnabled) {
    result.comparison = explainComparison(shirtA, shirtB, state);
    result.comparisonVerdict = buildComparisonVerdict(shirtA, shirtB, result.comparison);
  }

  return result;
}
