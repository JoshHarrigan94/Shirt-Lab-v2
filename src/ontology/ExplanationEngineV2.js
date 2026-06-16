import { reasonOverDesign } from "./ReasoningEngine.js";
import { rankDrivers, rankMechanisms } from "./DriverRanking.js";
import { analyseConstraints, identifyTradeoffs } from "./ConstraintAnalysis.js";

function verdictFrom(scores, drivers, constraints) {
  const topDriver = drivers[0];
  const topConstraint = constraints[0];

  if (scores.cooling >= 78 && scores.comfort >= 72 && scores.environmentSuitability >= 68) {
    return {
      label: "Strong scenario match",
      summary: `Cooling looks credible here, led mainly by ${topDriver?.title?.toLowerCase() ?? "multiple garment features"}.`
    };
  }

  if (scores.airflow >= 74 && scores.wetClingRisk === "high") {
    return {
      label: "Ventilation without moisture control",
      summary: "Airflow improves, but sweat handling still limits comfort once the garment loads up."
    };
  }

  if (topConstraint && Math.abs(topConstraint.contribution) > Math.abs(topDriver?.contribution ?? 0)) {
    return {
      label: "Constraint-led design",
      summary: `${topConstraint.title} is doing more to define the experience than the intended ventilation story.`
    };
  }

  return {
    label: "Context-dependent design",
    summary: `The benefit is real but conditional: ${topDriver?.title ?? "the main driver"} helps, while ${topConstraint?.title ?? "the main constraint"} caps the gain.`
  };
}

function buildRecommendation(scores, drivers, constraints, garment) {
  const constraintKeys = new Set(constraints.map(item => item.feature));

  if (constraintKeys.has("highHumidity")) {
    return "Cooling improves mainly through perforation density and airflow, but the benefit is limited by humidity and moisture retention. Prioritise faster drying before adding more open area.";
  }

  if (constraintKeys.has("fabricAbsorption")) {
    return "Shift this concept toward lower absorption or mapped mesh zones. Otherwise the cotton-like moisture load will overpower the airflow story.";
  }

  if (scores.overheatingRisk === "high") {
    return "Reduce heat storage with lighter GSM or more distributed ventilation. This scenario is punishing enough that local vents alone are not the whole answer.";
  }

  if (garment.price > 100 && scores.valueScore < 56) {
    return "The mechanism looks plausible, but the premium-value case is not yet persuasive. Validate whether the same effect can be reached with simpler construction.";
  }

  return "This is a coherent direction. The next validation pass should test wearer comfort, wet weight, and drying recovery rather than just chasing one bigger headline score.";
}

function buildClaimCheck(drivers, constraints, garment) {
  const hasPerforationDriver = drivers.some(item => item.feature === "perforationDensity" || item.feature === "perforationLocation");
  const humidityConstraint = constraints.some(item => item.feature === "highHumidity");
  const valueConstraint = constraints.some(item => item.feature === "shirtPrice");

  if (!hasPerforationDriver) {
    return "No strong perforation claim is active in this scenario. The result is being driven more by fabric and environment than hole patterning.";
  }

  if (humidityConstraint) {
    return "Perforation is directionally helpful, but not always better. In humid conditions, moisture handling can dominate the outcome.";
  }

  if (valueConstraint && garment.price > 100) {
    return "Perforation benefit is plausible, but the premium-price story is still weaker than the performance story.";
  }

  return "Perforation is directionally supported here, especially when airflow and evaporation are both active.";
}

function scoreConfidence(drivers, constraints) {
  const pool = [...drivers.slice(0, 3), ...constraints.slice(0, 2)];
  if (!pool.length) return 55;
  return Math.round(pool.reduce((sum, item) => sum + (item.confidence ?? 55), 0) / pool.length);
}

function humanTradeoffSentence(drivers, constraints) {
  const airflowDriver = drivers.find(item => item.feature === "perforationDensity" || item.mechanism === "airflow");
  const humidityConstraint = constraints.find(item => item.feature === "highHumidity");
  const absorptionConstraint = constraints.find(item => item.feature === "fabricAbsorption");

  if (airflowDriver && humidityConstraint) {
    return "Perforation and airflow help, but humidity suppresses evaporation, so the gain compresses as the scenario gets wetter.";
  }

  if (airflowDriver && absorptionConstraint) {
    return "Ventilation can make the garment feel faster early on, but absorbent fabric still drags down recovery once sweat accumulates.";
  }

  return "This garment is not always better; the advantage depends on whether the scenario activates its strongest mechanisms.";
}

export function explainDesignV2(state, scores) {
  const reasoning = reasonOverDesign(state);
  const drivers = rankDrivers(reasoning, 6);
  const constraints = analyseConstraints(reasoning, state, 6);
  const mechanisms = rankMechanisms(reasoning, 6);
  const tradeoffs = identifyTradeoffs(drivers, constraints);
  const verdict = verdictFrom(scores, drivers, constraints);
  const confidence = scoreConfidence(drivers, constraints);

  return {
    version: "3.0",
    verdict,
    summary: verdict.summary,
    primaryDrivers: drivers.slice(0, 3),
    mainConstraints: constraints.slice(0, 3),
    tradeoffs,
    mechanisms,
    drivers,
    constraints,
    confidence,
    why: [
      ...drivers.slice(0, 2).map(item => ({ text: item.detail })),
      ...constraints.slice(0, 2).map(item => ({ text: item.detail }))
    ],
    recommendation: buildRecommendation(scores, drivers, constraints, scores.garment),
    claimCheck: buildClaimCheck(drivers, constraints, scores.garment),
    tradeoffSummary: humanTradeoffSentence(drivers, constraints),
    reasoning
  };
}

function winner(a, b) {
  if (a === b) return "Tie";
  return a > b ? "Shirt A" : "Shirt B";
}

function buildWhyWin(label, a, b, betterHigh = true) {
  if (a === b) return `${label} is effectively tied in this scenario.`;
  const lead = Math.abs(a - b);
  const winningSide = betterHigh ? (a > b ? "Shirt A" : "Shirt B") : (a < b ? "Shirt A" : "Shirt B");
  const losingReason = betterHigh ? "lower score" : "higher risk";
  return `${winningSide} wins ${label.toLowerCase()} by ${lead} points because the alternative shows a ${losingReason} under these conditions.`;
}

export function explainComparison(shirtA, shirtB, state) {
  const scoreRows = [
    { key: "cooling", label: "Cooling", betterHigh: true },
    { key: "airflow", label: "Airflow", betterHigh: true },
    { key: "drying", label: "Drying", betterHigh: true },
    { key: "comfort", label: "Comfort", betterHigh: true },
    { key: "valueScore", label: "Value", betterHigh: true },
    { key: "environmentSuitability", label: "Environment suitability", betterHigh: true },
    { key: "wetClingRiskScore", label: "Wet cling risk", betterHigh: false },
    { key: "overheatingRiskScore", label: "Overheating risk", betterHigh: false }
  ];

  const winners = scoreRows.map(row => ({
    ...row,
    delta: Math.abs(shirtA[row.key] - shirtB[row.key]),
    winner: winner(
      row.betterHigh ? shirtA[row.key] : -shirtA[row.key],
      row.betterHigh ? shirtB[row.key] : -shirtB[row.key]
    ),
    why: buildWhyWin(row.label, shirtA[row.key], shirtB[row.key], row.betterHigh)
  }));

  const leadA = winners.filter(item => item.winner === "Shirt A").length;
  const leadB = winners.filter(item => item.winner === "Shirt B").length;
  const overallWinner = leadA === leadB ? "Tie" : leadA > leadB ? "Shirt A" : "Shirt B";

  const humiditySensitive =
    state.humidity >= 70 &&
    ((shirtA.garment.materialKey === "cotton" && shirtA.garment.dna.perforationDensity > 0) ||
      (shirtB.garment.materialKey === "cotton" && shirtB.garment.dna.perforationDensity > 0));

  return {
    overallWinner,
    winners,
    summary:
      overallWinner === "Tie"
        ? "The two garments split the trade-offs in this scenario rather than producing a single clean winner."
        : `${overallWinner} wins more categories, but the margin is still scenario-dependent.`,
    why:
      overallWinner === "Shirt A"
        ? `${shirtA.garment.label} gains mainly through ${shirtA.explanation.primaryDrivers[0]?.title?.toLowerCase() ?? "its stronger design drivers"}.`
        : overallWinner === "Shirt B"
          ? `${shirtB.garment.label} gains mainly through ${shirtB.explanation.primaryDrivers[0]?.title?.toLowerCase() ?? "its stronger design drivers"}.`
          : "Each garment wins for different reasons, so selection should follow the use case rather than a universal ranking.",
    verdict:
      overallWinner === "Shirt A"
        ? "Shirt A wins cooling through airflow and perforation density, but Shirt B may still win where moisture retention and value dominate."
        : overallWinner === "Shirt B"
          ? "Shirt B wins more of the current scenario, but Shirt A may still hold narrower advantages in specific airflow-led cases."
          : "Neither shirt is universally better here. The winners change by metric and scenario pressure.",
    tradeoffs: [
      humanTradeoffSentence(shirtA.explanation.primaryDrivers, shirtA.explanation.mainConstraints),
      humanTradeoffSentence(shirtB.explanation.primaryDrivers, shirtB.explanation.mainConstraints)
    ],
    warning: humiditySensitive
      ? "Perforated cotton is not always better here. It can win airflow in drier wind, then lose its advantage once humidity and moisture retention dominate."
      : "Not always better: category wins can flip when humidity, wind or sweat rate changes."
  };
}
