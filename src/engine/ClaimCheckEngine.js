import { findEvidenceByRelationship } from "../ontology/EvidenceRegistry.js";

function levelRank(level) {
  return { direct: 4, strong: 3, moderate: 2, emerging: 1, assumption: 0 }[level] ?? 0;
}

function bestEvidence(items = []) {
  const evidence = items
    .map(item => findEvidenceByRelationship(item.relationshipId))
    .filter(Boolean)
    .sort((a, b) => levelRank(b.evidenceLevel) - levelRank(a.evidenceLevel));

  return evidence[0] ?? {
    evidenceLevel: "assumption",
    confidence: "low",
    rationale: "No stronger evidence placeholder is attached yet.",
    sourcePlaceholder: "Future evidence required"
  };
}

function confidenceLabel(value) {
  if (value >= 78) return "High";
  if (value >= 62) return "Moderate";
  return "Low";
}

export function buildClaimCheck(scores, explanation) {
  const drivers = explanation.primaryDrivers ?? [];
  const constraints = explanation.mainConstraints ?? [];
  const evidence = bestEvidence([...drivers.slice(0, 2), ...constraints.slice(0, 1)]);
  const confidence = explanation.confidence ?? 55;
  const uncertainty = constraints[0]?.detail ?? "The recommendation may change if humidity, wind, or sweat rate shifts.";

  return {
    claim: `This shirt will likely ${scores.cooling >= scores.drying ? "win on cooling-first performance" : "win on moisture recovery"} in the current scenario.`,
    confidence: confidenceLabel(confidence),
    confidenceScore: confidence,
    evidenceLevel: evidence.evidenceLevel,
    rationale: evidence.rationale,
    sourcePlaceholder: evidence.sourcePlaceholder,
    uncertainty
  };
}
