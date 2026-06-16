function dedupeByTitle(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = `${item.title}_${item.mechanism}_${item.outcome}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function topForOutcome(items = [], preferredOutcomes = [], preferredMechanisms = []) {
  const exactMatches = items.filter(
    item => preferredOutcomes.includes(item.outcome) || preferredMechanisms.includes(item.mechanism)
  );
  return dedupeByTitle(exactMatches.length ? exactMatches : items).slice(0, 3);
}

function averageConfidence(positives, constraints) {
  const pool = [...positives, ...constraints];
  if (!pool.length) return 55;
  return Math.round(pool.reduce((sum, item) => sum + (item.confidence ?? 55), 0) / pool.length);
}

function summaryForScore(label, value, positives, constraints) {
  const topPositive = positives[0]?.title?.toLowerCase() ?? "multiple features";
  const topConstraint = constraints[0]?.title?.toLowerCase() ?? "the environment";

  if (value >= 75) {
    return `${label} is strong, driven mainly by ${topPositive}.`;
  }
  if (value <= 45) {
    return `${label} is limited mostly by ${topConstraint}.`;
  }
  return `${label} is mixed: ${topPositive} helps, but ${topConstraint} keeps the gain conditional.`;
}

export function buildScoreExplanations(scores, explanation) {
  const drivers = explanation.primaryDrivers ?? [];
  const constraints = explanation.mainConstraints ?? [];

  const config = {
    cooling: { outcomes: ["cooling"], mechanisms: ["airflow", "convectiveCooling", "evaporativeCooling"] },
    airflow: { outcomes: ["breathability"], mechanisms: ["airflow", "airGapExchange", "fabricFlutter"] },
    drying: { outcomes: ["drying"], mechanisms: ["dryingDynamics", "moistureTransport"] },
    comfort: { outcomes: ["comfort"], mechanisms: ["comfort", "skinContact", "moistureRetention"] },
    valueScore: { outcomes: ["value"], mechanisms: ["valuePressure", "weightGainWhenWet"] },
    environmentSuitability: { outcomes: ["cooling", "comfort", "drying"], mechanisms: ["airflow", "dryingDynamics", "convectiveCooling"] },
    wetClingRisk: { outcomes: ["wetCling"], mechanisms: ["moistureRetention", "skinContact", "wetStorage"] },
    overheatingRisk: { outcomes: ["thermalStress"], mechanisms: ["thermalLoad", "convectiveCooling", "evaporativeCooling"] }
  };

  return Object.fromEntries(
    Object.entries(config).map(([key, match]) => {
      const positives = topForOutcome(drivers, match.outcomes, match.mechanisms);
      const limiting = topForOutcome(constraints, match.outcomes, match.mechanisms);
      const value = key.endsWith("Risk") ? scores[`${key}Score`] ?? 0 : scores[key] ?? 0;

      return [
        key,
        {
          score: value,
          summary: summaryForScore(key.replace(/([A-Z])/g, " $1"), value, positives, limiting),
          positives,
          constraints: limiting,
          confidence: averageConfidence(positives, limiting)
        }
      ];
    })
  );
}
