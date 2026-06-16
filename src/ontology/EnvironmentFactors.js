export const environmentFactors = {
  weather: {
    label: "Weather",
    variables: ["temperature", "humidity", "windSpeed", "solarRadiation", "cloudCover", "rain", "altitude"],
    mechanisms: ["convectiveCooling", "evaporativeCooling", "solarGain", "windChill", "dryingDynamics"]
  },

  activityContext: {
    label: "Activity context",
    variables: ["roadRunning", "trailRunning", "hiking", "cycling", "gym", "commute"],
    mechanisms: ["apparentWind", "sweatProduction", "thermalStress", "fabricSaturation"]
  }
};
