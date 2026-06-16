import { labelFromKey } from "./ReasoningEngine.js";

const outcomeLabels = {
  cooling: "cooling",
  breathability: "breathability",
  comfort: "comfort",
  drying: "drying",
  wetCling: "wet cling",
  chafing: "chafing",
  thermalStress: "thermal stress",
  weightGainWhenWet: "wet weight gain",
  value: "value"
};

function pathSentence(path) {
  const outcome = outcomeLabels[path.outcome] ?? labelFromKey(path.outcome).toLowerCase();
  const feature = labelFromKey(path.feature).toLowerCase();
  const mechanism = labelFromKey(path.mechanism).toLowerCase();

  if (path.contribution >= 0) {
    return `${feature} improves ${outcome} by increasing ${mechanism}.`;
  }

  return `${feature} limits ${outcome} through ${mechanism}.`;
}

function strengthLabel(value) {
  const abs = Math.abs(value);
  if (abs >= 0.55) return "High";
  if (abs >= 0.28) return "Medium";
  return "Low";
}

export function rankDrivers(reasoning, limit = 5) {
  return reasoning.rankedDrivers.slice(0, limit).map((path, index) => ({
    rank: index + 1,
    feature: path.feature,
    mechanism: path.mechanism,
    outcome: path.outcome,
    title: labelFromKey(path.feature),
    detail: pathSentence(path),
    contribution: path.contribution,
    strength: strengthLabel(path.contribution),
    confidence: Math.round((path.confidence ?? 0.55) * 100),
    evidenceLevel: path.evidenceLevel ?? "emerging",
    rationale: path.rationale ?? "Heuristic relationship pending validation.",
    relationshipId: `${path.feature}_${path.mechanism}`,
    sourcePlaceholder: path.sourcePlaceholder ?? "Future evidence required"
  }));
}

export function rankMechanisms(reasoning, limit = 5) {
  return Object.entries(reasoning.mechanismScores)
    .map(([key, score]) => ({
      key,
      label: labelFromKey(key),
      score,
      magnitude: Math.abs(score),
      polarity: score >= 0 ? "supporting" : "limiting"
    }))
    .sort((a, b) => b.magnitude - a.magnitude)
    .slice(0, limit);
}
