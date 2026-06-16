import { assembleGarment } from "../engine/GarmentAssembler.js";
import { relationshipWeights } from "./RelationshipWeights.js";
import { getRelationshipConfidence } from "./ConfidenceRegistry.js";

const clamp01 = value => Math.max(0, Math.min(1, value));
const round = value => Math.round(value * 100) / 100;
const undesirableOutcomes = new Set(["wetCling", "chafing", "thermalStress", "weightGainWhenWet"]);

function isBeneficialContribution(outcome, contribution) {
  return undesirableOutcomes.has(outcome) ? contribution < 0 : contribution > 0;
}

function getActiveFeatureSignals(state) {
  const garment = assembleGarment(state);
  const { material } = garment;
  const fit = garment.fitKey ?? "regular";
  const isCotton = material.id === "cotton";
  const isMesh = material.id === "mesh";
  const locationSignalMap = {
    chest: 0.46,
    upperBack: 0.82,
    spine: 0.86,
    underarms: 0.78,
    shoulders: 0.58,
    fullBody: 0.92
  };

  return {
    perforationDensity: clamp01(garment.dna.perforationDensity ?? 0),
    perforationLocation: (garment.dna.perforationDensity ?? 0) > 0 ? (locationSignalMap[garment.dna.perforationLocation] ?? 0.45) : 0,
    meshPanel: isMesh || garment.dna.meshPanelFactor ? 1 : 0,
    fabricBreathability: clamp01(material.breathability ?? 0),
    fabricAbsorption: clamp01(material.absorption ?? 0),
    fabricDrying: clamp01(material.drying ?? 0),
    fabricWeight: clamp01(garment.dna.weightFactor ?? (isCotton ? 0.72 : isMesh ? 0.18 : 0.38)),
    oversizedFit: fit === "oversized" ? 1 : 0,
    compressionFit: fit === "compression" ? 1 : 0,
    windSpeed: clamp01((state.windSpeed ?? 0) / 18),
    highHumidity: clamp01(((state.humidity ?? 50) - 55) / 35),
    exerciseIntensity: clamp01((state.exerciseIntensity ?? 5) / 10),
    sweatRate: clamp01(state.sweatRate ?? 0.5),
    shirtPrice: clamp01((garment.price ?? 0) / 150)
  };
}

export function reasonOverDesign(state) {
  const featureSignals = getActiveFeatureSignals(state);
  const mechanismScores = {};
  const outcomeScores = {};
  const paths = [];

  Object.entries(featureSignals).forEach(([feature, featureValue]) => {
    if (!featureValue) return;

    const mechanismLinks = relationshipWeights.featureToMechanism[feature] ?? {};

    Object.entries(mechanismLinks).forEach(([mechanism, featureMechanismWeight]) => {
      const mechanismContribution = featureValue * featureMechanismWeight;
      mechanismScores[mechanism] = (mechanismScores[mechanism] ?? 0) + mechanismContribution;

      const confidence = getRelationshipConfidence(feature, mechanism);
      const outcomeLinks = relationshipWeights.mechanismToOutcome[mechanism] ?? {};

      Object.entries(outcomeLinks).forEach(([outcome, mechanismOutcomeWeight]) => {
        const contribution = mechanismContribution * mechanismOutcomeWeight;
        outcomeScores[outcome] = (outcomeScores[outcome] ?? 0) + contribution;

        paths.push({
          feature,
          mechanism,
          outcome,
          featureValue: round(featureValue),
          featureMechanismWeight: round(featureMechanismWeight),
          mechanismOutcomeWeight: round(mechanismOutcomeWeight),
          contribution: round(contribution),
          direction: isBeneficialContribution(outcome, contribution) ? "driver" : "constraint",
          confidence: confidence.score,
          evidenceLevel: confidence.evidenceLevel,
          rationale: confidence.rationale,
          sourcePlaceholder: confidence.sourcePlaceholder
        });
      });
    });
  });

  const rankedDrivers = paths
    .filter(path => path.direction === "driver")
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const rankedConstraints = paths
    .filter(path => path.direction === "constraint")
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  return {
    featureSignals,
    mechanismScores: normalizeMap(mechanismScores),
    outcomeScores: normalizeMap(outcomeScores),
    paths,
    rankedDrivers,
    rankedConstraints
  };
}

function normalizeMap(map) {
  const values = Object.values(map).map(Math.abs);
  const max = Math.max(...values, 1);
  return Object.fromEntries(
    Object.entries(map).map(([key, value]) => [key, round(value / max)])
  );
}

export function labelFromKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, char => char.toUpperCase());
}
