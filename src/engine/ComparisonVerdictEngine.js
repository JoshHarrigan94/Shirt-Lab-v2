function confidenceLabel(delta, tieCount) {
  if (tieCount >= 3 || delta < 8) return "Low";
  if (delta < 18) return "Moderate";
  return "High";
}

function scenarioLeanLabel(garment) {
  if (garment.materialKey === "cotton" && garment.effectiveMoistureRisk > 0.55) {
    return "more stable in drier air than in humid air";
  }
  if (garment.effectiveDryingPotential > 0.65) {
    return "stronger when humidity or sweat load rises";
  }
  return "highly dependent on the environment rather than universally better";
}

function likelyWinnerInCondition(shirtA, shirtB, condition) {
  const score = shirt => {
    if (condition === "hotDry") {
      return shirt.garment.effectiveAirflowPotential * 48 + shirt.cooling * 0.42 - shirt.garment.effectiveMoistureRisk * 18;
    }
    if (condition === "hotHumid") {
      return shirt.garment.effectiveDryingPotential * 42 + (100 - shirt.wetClingRiskScore) * 0.28 + shirt.comfort * 0.18;
    }
    return shirt.environmentSuitability + shirt.comfort * 0.2;
  };

  const a = score(shirtA);
  const b = score(shirtB);
  if (Math.abs(a - b) < 2) return "Tie";
  return a > b ? "Shirt A" : "Shirt B";
}

export function buildComparisonVerdict(shirtA, shirtB, comparison) {
  const metricWinsA = comparison.winners.filter(item => item.winner === "Shirt A").length;
  const metricWinsB = comparison.winners.filter(item => item.winner === "Shirt B").length;
  const overallDelta = Math.abs(metricWinsA - metricWinsB) * 6 + (comparison.winners[0]?.delta ?? 0);
  const tieCount = comparison.winners.filter(item => item.winner === "Tie").length;
  const winner = comparison.overallWinner;
  const loser = winner === "Shirt A" ? "Shirt B" : winner === "Shirt B" ? "Shirt A" : "Neither";
  const winnerScores = winner === "Shirt A" ? shirtA : shirtB;
  const loserScores = winner === "Shirt A" ? shirtB : shirtA;
  const dryWinner = likelyWinnerInCondition(shirtA, shirtB, "hotDry");
  const humidWinner = likelyWinnerInCondition(shirtA, shirtB, "hotHumid");

  return {
    winner,
    loser,
    confidence: confidenceLabel(overallDelta, tieCount),
    confidenceScore: Math.min(90, 52 + overallDelta * 1.4 - tieCount * 6),
    whyWinnerWins: winner === "Tie"
      ? "Neither shirt produces a decisive advantage. The trade-offs remain split across metrics."
      : `${winner} wins because ${winnerScores.explanation.primaryDrivers[0]?.detail?.toLowerCase() ?? "its strongest drivers align better with the scenario"}.`,
    whyLoserLoses: winner === "Tie"
      ? "Each shirt gives something back, so no single concept dominates the scenario."
      : `${loser} gives up ground because ${loserScores.explanation.mainConstraints[0]?.detail?.toLowerCase() ?? "its main constraints activate more strongly here"}.`,
    tradeoffs: [
      comparison.tradeoffs?.[0] ?? winnerScores.explanation.tradeoffSummary,
      comparison.tradeoffs?.[1] ?? loserScores.explanation.tradeoffSummary
    ],
    recommendedUseCase: winner === "Tie"
      ? "Choose based on preference: one shirt does not clearly dominate across all conditions."
      : `${winner} is the better buy for the current environment. It looks ${scenarioLeanLabel(winnerScores.garment)}.`,
    sensitivity: {
      hotDryWinner: dryWinner,
      hotHumidWinner: humidWinner,
      summary:
        dryWinner === humidWinner
          ? `The recommendation looks relatively stable across hot dry and hot humid conditions, leaning toward ${dryWinner}.`
          : `This is condition-sensitive: ${dryWinner} likely leads in hot dry air, while ${humidWinner} is better once humidity rises.`
    }
  };
}
