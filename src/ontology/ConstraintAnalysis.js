import { labelFromKey } from "./ReasoningEngine.js";

function constraintAdvice(path, state) {
  if (path.feature === "highHumidity") {
    return "Humidity is suppressing evaporation; prioritise airflow and fast-drying fabric over simple hole count.";
  }

  if (path.feature === "fabricAbsorption") {
    return "Absorbent fabric may feel comfortable when dry but can hold sweat and increase cling as intensity rises.";
  }

  if (path.feature === "fabricWeight") {
    return "Fabric weight is likely increasing heat storage and wet weight; lighter constructions should improve this use case.";
  }

  if (path.feature === "compressionFit") {
    return "Compression improves contact but reduces free air movement; use it when wicking matters more than ventilation.";
  }

  if (path.feature === "shirtPrice") {
    return "The design may work, but the value case is weak unless the user strongly weights feel, brand or aesthetics.";
  }

  if ((state?.windSpeed ?? 0) < 6 && path.mechanism === "airflow") {
    return "Low external wind means ventilation features need movement-generated airflow to matter.";
  }

  return `This limits performance through ${labelFromKey(path.mechanism).toLowerCase()}.`;
}

function severityLabel(value) {
  const abs = Math.abs(value);
  if (abs >= 0.55) return "Major";
  if (abs >= 0.28) return "Moderate";
  return "Minor";
}

export function analyseConstraints(reasoning, state, limit = 5) {
  return reasoning.rankedConstraints.slice(0, limit).map((path, index) => ({
    rank: index + 1,
    feature: path.feature,
    mechanism: path.mechanism,
    outcome: path.outcome,
    title: labelFromKey(path.feature),
    detail: constraintAdvice(path, state),
    contribution: path.contribution,
    severity: severityLabel(path.contribution),
    confidence: Math.round((path.confidence ?? 0.55) * 100),
    evidenceLevel: path.evidenceLevel ?? "emerging"
  }));
}

export function identifyTradeoffs(drivers, constraints) {
  const tradeoffs = [];

  const hasAirflowDriver = drivers.some(d => d.mechanism === "airflow");
  const hasClingConstraint = constraints.some(c => c.outcome === "wetCling");
  const hasValueConstraint = constraints.some(c => c.outcome === "value" || c.feature === "shirtPrice");

  if (hasAirflowDriver && hasClingConstraint) {
    tradeoffs.push({
      title: "Ventilation vs wet cling",
      detail: "The design improves airflow, but moisture behaviour can still undermine comfort once the fabric saturates."
    });
  }

  if (hasAirflowDriver && hasValueConstraint) {
    tradeoffs.push({
      title: "Real effect vs price",
      detail: "The ventilation mechanism is plausible, but the value case depends on whether the performance gain justifies the premium."
    });
  }

  if (tradeoffs.length === 0) {
    tradeoffs.push({
      title: "Context dependency",
      detail: "The design is most meaningful when the environment and athlete profile activate its strongest mechanisms."
    });
  }

  return tradeoffs;
}
