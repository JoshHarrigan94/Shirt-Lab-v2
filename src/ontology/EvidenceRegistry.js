import { evidenceRegistry, getRelationshipConfidence } from "./ConfidenceRegistry.js";

export { evidenceRegistry, getRelationshipConfidence };

export function findEvidenceByRelationship(relationshipId) {
  return evidenceRegistry.find(item => item.relationshipId === relationshipId) ?? null;
}
