import { scenarios } from "./scenarios.js";

export const environments = {
  hotDry5k: {
    label: scenarios.hotDry5k.label,
    temperature: scenarios.hotDry5k.temperature,
    humidity: scenarios.hotDry5k.humidity,
    windSpeed: scenarios.hotDry5k.windSpeed
  },
  hotHumid10k: {
    label: scenarios.hotHumid10k.label,
    temperature: scenarios.hotHumid10k.temperature,
    humidity: scenarios.hotHumid10k.humidity,
    windSpeed: scenarios.hotHumid10k.windSpeed
  },
  coolWindyTrailRun: {
    label: scenarios.coolWindyTrailRun.label,
    temperature: scenarios.coolWindyTrailRun.temperature,
    humidity: scenarios.coolWindyTrailRun.humidity,
    windSpeed: scenarios.coolWindyTrailRun.windSpeed
  },
  mountainHike: {
    label: scenarios.mountainHike.label,
    temperature: scenarios.mountainHike.temperature,
    humidity: scenarios.mountainHike.humidity,
    windSpeed: scenarios.mountainHike.windSpeed
  },
  gymSession: {
    label: scenarios.gymSession.label,
    temperature: scenarios.gymSession.temperature,
    humidity: scenarios.gymSession.humidity,
    windSpeed: scenarios.gymSession.windSpeed
  },
  stopStartSport: {
    label: scenarios.stopStartSport.label,
    temperature: scenarios.stopStartSport.temperature,
    humidity: scenarios.stopStartSport.humidity,
    windSpeed: scenarios.stopStartSport.windSpeed
  }
};
