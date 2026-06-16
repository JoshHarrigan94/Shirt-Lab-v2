export const garmentFeatures = {
  material: {
    label: "Material system",
    description: "The fabric composition and surface properties that shape heat, moisture and comfort.",
    variables: [
      "materialType",
      "materialBlend",
      "fabricWeightGSM",
      "fabricThickness",
      "surfaceTexture",
      "stretch",
      "compression",
      "moistureAbsorption",
      "dryingRate",
      "thermalConductivity",
      "uvReflectivity"
    ],
    mechanisms: [
      "evaporativeCooling",
      "moistureRetention",
      "dryingDynamics",
      "skinContact",
      "conductiveHeatTransfer"
    ]
  },

  fit: {
    label: "Fit and air gap",
    description: "How close the garment sits to skin and how much moving air can enter the microclimate.",
    variables: [
      "compressionFit",
      "regularFit",
      "relaxedFit",
      "oversizedFit",
      "torsoFit",
      "sleeveFit",
      "hemFit",
      "airGap"
    ],
    mechanisms: [
      "airGapExchange",
      "skinContact",
      "boundaryLayerDisruption",
      "fabricFlutter",
      "chafingFriction"
    ]
  },

  ventilation: {
    label: "Ventilation architecture",
    description: "Intentional openings, mesh zones and perforation strategies designed to move heat and moisture.",
    variables: [
      "perforationDensity",
      "perforationSize",
      "perforationShape",
      "perforationDistribution",
      "perforationLocation",
      "meshPanels",
      "openAreaPercentage"
    ],
    mechanisms: [
      "convectiveCooling",
      "airflow",
      "boundaryLayerDisruption",
      "evaporativeCooling",
      "moistureTransport"
    ]
  },

  construction: {
    label: "Construction and coverage",
    description: "Pattern cutting, seams, sleeve length and panel layout that determine where fabric covers, clings or vents.",
    variables: [
      "seamPlacement",
      "panelCount",
      "bodyMapping",
      "hybridMaterials",
      "neckOpening",
      "sleeveLength",
      "coverageArea",
      "sideSplits"
    ],
    mechanisms: [
      "skinContact",
      "chafingFriction",
      "solarGain",
      "coverageProtection",
      "airGapExchange"
    ]
  }
};
