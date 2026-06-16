import { relationshipWeights } from "./RelationshipWeights.js";
import { getRelationshipConfidence } from "./ConfidenceRegistry.js";

const caveats = {
  perforationDensity: "Only strongly positive when external or apparent wind exists.",
  perforationLocation: "Most valuable over high-heat zones such as upper back, chest and underarms.",
  fabricAbsorption: "Absorbent fabrics can feel good dry but carry water and dry slowly when saturated.",
  fabricDrying: "Benefit depends on construction and skin contact, not material alone.",
  oversizedFit: "Can trap warm air in still conditions but improves exchange during movement.",
  compressionFit: "Improves wicking contact but increases cling perception when saturated.",
  highHumidity: "Humidity limits evaporation regardless of perforation strategy.",
  windSpeed: "Higher airflow improves cooling but may increase chill risk when wet and cool.",
  meshPanel: "Coverage, durability and UV protection can fall as open area rises.",
  shirtPrice: "A performance mechanism can be real while still being poor value."
};

export const relationshipMap = Object.entries(relationshipWeights.featureToMechanism).flatMap(([feature, mechanisms]) => {
  return Object.entries(mechanisms).flatMap(([mechanism, featureMechanismWeight]) => {
    const confidence = getRelationshipConfidence(feature, mechanism);
    const outcomes = relationshipWeights.mechanismToOutcome[mechanism] ?? {};

    return Object.entries(outcomes).map(([outcome, mechanismOutcomeWeight]) => ({
      feature,
      mechanism,
      outcome,
      polarity: featureMechanismWeight * mechanismOutcomeWeight >= 0 ? "positive" : "negative",
      strength: Math.abs(Number((featureMechanismWeight * mechanismOutcomeWeight).toFixed(2))),
      featureMechanismWeight,
      mechanismOutcomeWeight,
      confidence: confidence.score,
      evidenceLevel: confidence.evidenceLevel,
      caveat: caveats[feature] ?? confidence.rationale
    }));
  });
});
