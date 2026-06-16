export const relationshipWeights = {
  featureToMechanism: {
    perforationDensity: {
      airflow: 0.78,
      boundaryLayerDisruption: 0.48,
      evaporativeCooling: 0.42,
      fabricFlutter: 0.16
    },
    perforationLocation: {
      convectiveCooling: 0.66,
      airGapExchange: 0.54,
      evaporativeCooling: 0.36
    },
    meshPanel: {
      airflow: 0.86,
      evaporativeCooling: 0.58,
      boundaryLayerDisruption: 0.45,
      moistureTransport: 0.32
    },
    fabricBreathability: {
      airflow: 0.68,
      evaporativeCooling: 0.44,
      dryingDynamics: 0.34
    },
    fabricAbsorption: {
      moistureRetention: 0.84,
      wetStorage: 0.72,
      dryingDynamics: -0.52,
      comfort: -0.35
    },
    fabricDrying: {
      dryingDynamics: 0.82,
      moistureTransport: 0.56,
      moistureRetention: -0.46
    },
    fabricWeight: {
      airflow: -0.34,
      moistureRetention: 0.48,
      convectiveCooling: -0.24,
      weightGainWhenWet: 0.55
    },
    oversizedFit: {
      airGapExchange: 0.72,
      fabricFlutter: 0.58,
      skinContact: -0.36,
      chafingFriction: 0.18
    },
    compressionFit: {
      skinContact: 0.82,
      airGapExchange: -0.52,
      fabricFlutter: -0.42,
      moistureTransport: 0.26
    },
    windSpeed: {
      airflow: 0.76,
      convectiveCooling: 0.72,
      airGapExchange: 0.56,
      dryingDynamics: 0.48
    },
    highHumidity: {
      evaporativeCooling: -0.82,
      dryingDynamics: -0.68,
      moistureRetention: 0.46
    },
    exerciseIntensity: {
      thermalLoad: 0.76,
      sweatProduction: 0.64,
      moistureRetention: 0.28
    },
    sweatRate: {
      sweatProduction: 0.82,
      evaporativeCooling: 0.36,
      moistureRetention: 0.44,
      wetStorage: 0.58
    },
    shirtPrice: {
      valuePressure: -0.78
    }
  },

  mechanismToOutcome: {
    airflow: {
      cooling: 0.62,
      breathability: 0.84,
      drying: 0.42,
      comfort: 0.28
    },
    convectiveCooling: {
      cooling: 0.78,
      thermalStress: -0.58,
      comfort: 0.35
    },
    evaporativeCooling: {
      cooling: 0.74,
      comfort: 0.38,
      drying: 0.46
    },
    moistureRetention: {
      wetCling: 0.82,
      comfort: -0.62,
      drying: -0.58,
      weightGainWhenWet: 0.72
    },
    moistureTransport: {
      drying: 0.66,
      comfort: 0.38,
      breathability: 0.32
    },
    dryingDynamics: {
      drying: 0.88,
      comfort: 0.44,
      wetCling: -0.52
    },
    skinContact: {
      comfort: -0.32,
      wetCling: 0.54,
      chafing: 0.38
    },
    airGapExchange: {
      cooling: 0.58,
      breathability: 0.62,
      comfort: 0.34
    },
    boundaryLayerDisruption: {
      cooling: 0.48,
      thermalStress: -0.36,
      breathability: 0.24
    },
    fabricFlutter: {
      airflow: 0.36,
      comfort: 0.18,
      chafing: 0.22
    },
    chafingFriction: {
      chafing: 0.86,
      comfort: -0.64
    },
    thermalLoad: {
      thermalStress: 0.82,
      comfort: -0.44,
      cooling: -0.22
    },
    sweatProduction: {
      wetCling: 0.56,
      evaporativeCooling: 0.34,
      comfort: -0.24
    },
    wetStorage: {
      weightGainWhenWet: 0.74,
      wetCling: 0.64,
      comfort: -0.42
    },
    valuePressure: {
      value: 0.86
    },
    weightGainWhenWet: {
      value: -0.38,
      comfort: -0.32
    },
    comfort: {
      comfort: 0.40
    }
  }
};

export function getFeatureMechanismWeight(feature, mechanism) {
  return relationshipWeights.featureToMechanism?.[feature]?.[mechanism] ?? 0;
}

export function getMechanismOutcomeWeight(mechanism, outcome) {
  return relationshipWeights.mechanismToOutcome?.[mechanism]?.[outcome] ?? 0;
}
