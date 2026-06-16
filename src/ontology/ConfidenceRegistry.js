export const confidenceRegistry = {
  perforationDensity_airflow: {
    relationshipId: "perforationDensity_airflow",
    score: 0.78,
    evidenceLevel: "moderate",
    confidence: "directional",
    rationale: "Open area plausibly improves airflow, but realised benefit depends on placement, movement and wind angle.",
    sourcePlaceholder: "Future airflow bench tests / permeability comparisons"
  },
  perforationLocation_convectiveCooling: {
    relationshipId: "perforationLocation_convectiveCooling",
    score: 0.72,
    evidenceLevel: "moderate",
    confidence: "directional",
    rationale: "Mapped vents are more credible when aligned to high-heat and high-sweat body zones.",
    sourcePlaceholder: "Future sweat map + thermal imaging validation"
  },
  meshPanel_airflow: {
    relationshipId: "meshPanel_airflow",
    score: 0.86,
    evidenceLevel: "strong",
    confidence: "high",
    rationale: "Mesh construction directly raises permeability and open area.",
    sourcePlaceholder: "Future air permeability comparison"
  },
  fabricAbsorption_moistureRetention: {
    relationshipId: "fabricAbsorption_moistureRetention",
    score: 0.88,
    evidenceLevel: "strong",
    confidence: "high",
    rationale: "Absorbent fabrics store more liquid and commonly feel heavier and slower to recover.",
    sourcePlaceholder: "Future dry-to-wet mass and drying curve tests"
  },
  fabricDrying_dryingDynamics: {
    relationshipId: "fabricDrying_dryingDynamics",
    score: 0.84,
    evidenceLevel: "strong",
    confidence: "high",
    rationale: "Drying rate strongly affects how quickly a garment recovers from sweat saturation.",
    sourcePlaceholder: "Future timed drying protocol"
  },
  fabricWeight_airflow: {
    relationshipId: "fabricWeight_airflow",
    score: 0.67,
    evidenceLevel: "moderate",
    confidence: "directional",
    rationale: "Heavier fabrics generally reduce flutter, drape openness and drying responsiveness.",
    sourcePlaceholder: "Future GSM vs mobility and dry-down testing"
  },
  windSpeed_convectiveCooling: {
    relationshipId: "windSpeed_convectiveCooling",
    score: 0.82,
    evidenceLevel: "strong",
    confidence: "high",
    rationale: "Moving air strongly influences convective heat loss and evaporation potential.",
    sourcePlaceholder: "Future environmental chamber validation"
  },
  highHumidity_evaporativeCooling: {
    relationshipId: "highHumidity_evaporativeCooling",
    score: 0.9,
    evidenceLevel: "strong",
    confidence: "high",
    rationale: "High humidity reduces the evaporation gradient and limits sweat-cooling effectiveness.",
    sourcePlaceholder: "Future hot-humid scenario validation"
  },
  oversizedFit_airGapExchange: {
    relationshipId: "oversizedFit_airGapExchange",
    score: 0.62,
    evidenceLevel: "emerging",
    confidence: "medium",
    rationale: "Loose fit can improve air exchange during movement but may trap warm pockets in still air.",
    sourcePlaceholder: "Future motion test observations"
  },
  compressionFit_skinContact: {
    relationshipId: "compressionFit_skinContact",
    score: 0.7,
    evidenceLevel: "moderate",
    confidence: "medium",
    rationale: "Compression increases skin contact and may improve transport contact while raising cling perception.",
    sourcePlaceholder: "Future wearer comfort tests"
  },
  shirtPrice_valuePressure: {
    relationshipId: "shirtPrice_valuePressure",
    score: 0.95,
    evidenceLevel: "direct",
    confidence: "high",
    rationale: "Price is a direct input to value-for-money scoring.",
    sourcePlaceholder: "Internal pricing model"
  }
};

export const evidenceRegistry = Object.values(confidenceRegistry);

export function getRelationshipConfidence(feature, mechanism) {
  const key = `${feature}_${mechanism}`;
  return confidenceRegistry[key] ?? {
    relationshipId: key,
    score: 0.55,
    evidenceLevel: "assumption",
    confidence: "low",
    rationale: "Heuristic relationship included for early-stage design reasoning.",
    sourcePlaceholder: "Future evidence required"
  };
}
