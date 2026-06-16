export const scenarios = {
  hotDry5k: {
    id: "hotDry5k",
    label: "Hot dry 5K",
    temperature: 31,
    humidity: 28,
    windSpeed: 9,
    exerciseIntensity: 8,
    sweatRate: 0.72,
    narrative: "Dry air supports evaporation, so airflow and vent mapping can feel dramatic."
  },
  hotHumid10k: {
    id: "hotHumid10k",
    label: "Hot humid 10K",
    temperature: 29,
    humidity: 78,
    windSpeed: 4,
    exerciseIntensity: 8,
    sweatRate: 0.82,
    narrative: "Humidity suppresses evaporation, so moisture retention becomes the dominant limiter."
  },
  coolWindyTrailRun: {
    id: "coolWindyTrailRun",
    label: "Cool windy trail run",
    temperature: 13,
    humidity: 52,
    windSpeed: 17,
    exerciseIntensity: 7,
    sweatRate: 0.48,
    narrative: "Ambient wind does much of the work, which can reduce the payoff from aggressive perforation."
  },
  mountainHike: {
    id: "mountainHike",
    label: "Mountain hike",
    temperature: 16,
    humidity: 48,
    windSpeed: 12,
    exerciseIntensity: 5,
    sweatRate: 0.38,
    narrative: "Steady output rewards comfort balance and broad environment suitability over peak cooling."
  },
  gymSession: {
    id: "gymSession",
    label: "Gym session",
    temperature: 24,
    humidity: 58,
    windSpeed: 2,
    exerciseIntensity: 7,
    sweatRate: 0.66,
    narrative: "Low ambient wind means fabric drying and movement-generated airflow matter more."
  },
  stopStartSport: {
    id: "stopStartSport",
    label: "Stop-start sport",
    temperature: 22,
    humidity: 62,
    windSpeed: 8,
    exerciseIntensity: 9,
    sweatRate: 0.7,
    narrative: "Changing effort magnifies trade-offs between ventilation, wet cling, and recovery between bursts."
  }
};

export function listScenarios() {
  return Object.fromEntries(
    Object.values(scenarios).map(scenario => [scenario.id, { label: scenario.label }])
  );
}
