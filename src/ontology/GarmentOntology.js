import { garmentFeatures } from "./GarmentFeatures.js";
import { humanFactors } from "./HumanFactors.js";
import { environmentFactors } from "./EnvironmentFactors.js";
import { mechanisms } from "./Mechanisms.js";
import { outcomes } from "./Outcomes.js";
import { relationshipMap } from "./RelationshipMap.js";
import { relationshipWeights } from "./RelationshipWeights.js";
import { confidenceRegistry } from "./ConfidenceRegistry.js";
import { reasonOverDesign } from "./ReasoningEngine.js";

export const garmentOntology = {
  garmentFeatures,
  humanFactors,
  environmentFactors,
  mechanisms,
  outcomes,
  relationshipMap,
  relationshipWeights,
  confidenceRegistry
};

export function getMechanismsForFeature(featureKey) {
  return relationshipMap
    .filter(link => link.feature === featureKey)
    .map(link => ({
      mechanism: link.mechanism,
      weight: link.featureMechanismWeight,
      confidence: link.confidence
    }));
}

export function getOutcomePathways(outcomeKey) {
  return relationshipMap
    .filter(link => link.outcome === outcomeKey)
    .sort((a, b) => b.strength - a.strength);
}

export function reasonAboutGarment(state) {
  return reasonOverDesign(state);
}
