function pushTradeoff(list, title, gain, sacrifice) {
  list.push({ title, gain, sacrifice, summary: `You gained ${gain} but sacrificed ${sacrifice}.` });
}

export function buildTradeoffIntelligence(scores, explanation) {
  const garment = scores.garment;
  const tradeoffs = [];

  if (garment.dna.perforationDensity >= 0.5) {
    pushTradeoff(
      tradeoffs,
      "Ventilation trade-off",
      "airflow and cooling headroom",
      "coverage confidence and construction robustness"
    );
  }

  if (garment.dna.weightFactor >= 0.6) {
    pushTradeoff(
      tradeoffs,
      "Heavy fabric trade-off",
      "body and hand feel",
      "drying speed and cooling responsiveness"
    );
  }

  if (garment.fitKey === "oversized") {
    pushTradeoff(
      tradeoffs,
      "Loose fit trade-off",
      "air exchange and movement-driven ventilation",
      "stable skin-level moisture transfer"
    );
  }

  if (garment.fitKey === "compression") {
    pushTradeoff(
      tradeoffs,
      "Compression trade-off",
      "contact and moisture transfer",
      "free airflow around the torso"
    );
  }

  if (garment.dna.meshPanelFactor) {
    pushTradeoff(
      tradeoffs,
      "Mesh panel trade-off",
      "local breathability and drying",
      "uniform coverage and visual subtlety"
    );
  }

  const fallback = explanation.tradeoffs?.[0]?.detail ?? "The strongest gains remain conditional on the environment and athlete profile.";

  return {
    items: tradeoffs.slice(0, 3),
    summary: tradeoffs[0]?.summary ?? fallback
  };
}
