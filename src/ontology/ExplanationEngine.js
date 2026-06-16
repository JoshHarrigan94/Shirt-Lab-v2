import { materials } from "../data/materials.js";
import { shirts, perforations } from "../data/shirts.js";
import { reasonOverDesign, labelFromKey } from "./ReasoningEngine.js";

function formatPath(path) {
  return `${labelFromKey(path.feature)} → ${labelFromKey(path.mechanism)} → ${labelFromKey(path.outcome)}`;
}

function toSignal(path) {
  const signed = path.contribution >= 0 ? "+" : "";
  const confidence = Math.round((path.confidence ?? 0.55) * 100);

  return {
    title: `${labelFromKey(path.feature)} (${signed}${path.contribution})`,
    detail: `${formatPath(path)}. Confidence ${confidence}% (${path.evidenceLevel}).`,
    mechanism: path.mechanism,
    outcome: path.outcome,
    contribution: path.contribution,
    confidence: path.confidence,
    evidenceLevel: path.evidenceLevel,
    rationale: path.rationale
  };
}

export function explainDesign(state, scores) {
  const shirt = shirts[state.shirt] ?? shirts.standard;
  const material = materials[state.material] ?? materials[shirt.material] ?? materials.polyester;
  const perforationKey = state.perforation ?? shirt.perforation ?? "none";
  const perf = perforations[perforationKey] ?? perforations.none;
  const reasoning = reasonOverDesign(state);

  const positives = reasoning.rankedDrivers.slice(0, 5).map(toSignal);
  const limitations = reasoning.rankedConstraints.slice(0, 5).map(toSignal);

  return {
    summary: buildSummary(scores, positives, limitations, { shirt, material, perf, state }),
    positives,
    limitations,
    mechanisms: buildMechanismList(reasoning),
    reasoning,
    topOutcomeInfluences: summarizeOutcomeInfluences(reasoning)
  };
}

function buildSummary(scores, positives, limitations, context) {
  const topPositive = positives[0]?.title ?? "no dominant positive driver";
  const topLimit = limitations[0]?.title ?? "no major limiting factor";

  if (scores.cooling >= 80 && scores.value >= 65) {
    return `Strong design: cooling and value are both favourable. Main driver: ${topPositive}.`;
  }

  if (scores.cooling >= 75 && scores.value < 55) {
    return `Real mechanism, questionable value: ${context.perf.label} contributes, but price pressure weakens the overall case.`;
  }

  if (limitations.length > positives.length) {
    return `Context-limited design: ${topLimit} is currently constraining the system more than the strongest benefit.`;
  }

  return `Context-dependent design: strongest driver is ${topPositive}; main constraint is ${topLimit}.`;
}

function buildMechanismList(reasoning) {
  return Object.entries(reasoning.mechanismScores)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 6)
    .map(([key, value]) => ({
      key,
      label: labelFromKey(key),
      score: value
    }));
}

function summarizeOutcomeInfluences(reasoning) {
  return Object.entries(reasoning.outcomeScores)
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
    .slice(0, 6)
    .map(([key, value]) => ({
      key,
      label: labelFromKey(key),
      score: value
    }));
}
