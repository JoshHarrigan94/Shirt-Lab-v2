export const humanFactors = {
  anthropometrics: {
    label: "Anthropometrics",
    variables: ["height", "weight", "bodyFat", "muscleMass", "surfaceArea", "shoulderWidth", "torsoShape"],
    mechanisms: ["heatStorage", "surfaceAreaCooling", "skinContact", "airGapExchange"]
  },

  physiology: {
    label: "Physiology",
    variables: ["sweatRate", "heatProduction", "fitnessLevel", "vo2Max", "heatAcclimation"],
    mechanisms: ["metabolicHeat", "evaporativeCooling", "moistureSaturation", "thermalStress"]
  },

  movement: {
    label: "Movement context",
    variables: ["pace", "exerciseIntensity", "armSwing", "strideRate", "stopStartPattern"],
    mechanisms: ["apparentWind", "fabricFlutter", "boundaryLayerDisruption", "airGapExchange"]
  }
};
