import { garmentPresets, perforationModes } from "./GarmentDNA.js";

export const shirts = {
  plainCottonTee: {
    label: garmentPresets.plainCottonTee.label,
    material: "cotton",
    price: garmentPresets.plainCottonTee.price,
    baseAirflow: 0.42,
    visualTone: garmentPresets.plainCottonTee.visualTone
  },
  plainPolyRunningTee: {
    label: garmentPresets.plainPolyRunningTee.label,
    material: "polyester",
    price: garmentPresets.plainPolyRunningTee.price,
    baseAirflow: 0.64,
    visualTone: garmentPresets.plainPolyRunningTee.visualTone
  },
  meshPerformanceTee: {
    label: garmentPresets.meshPerformanceTee.label,
    material: "mesh",
    price: garmentPresets.meshPerformanceTee.price,
    baseAirflow: 0.88,
    visualTone: garmentPresets.meshPerformanceTee.visualTone
  },
  mothTechStyleCotton: {
    label: garmentPresets.mothTechStyleCotton.label,
    material: "cotton",
    price: garmentPresets.mothTechStyleCotton.price,
    baseAirflow: 0.58,
    visualTone: garmentPresets.mothTechStyleCotton.visualTone,
    perforation: "mothtech"
  },
  diyPunchedHoleCotton: {
    label: garmentPresets.diyPunchedHoleCotton.label,
    material: "cotton",
    price: garmentPresets.diyPunchedHoleCotton.price,
    baseAirflow: 0.54,
    visualTone: garmentPresets.diyPunchedHoleCotton.visualTone,
    perforation: "grid"
  }
};

export const perforations = {
  none: perforationModes.none,
  grid: perforationModes.grid,
  spine: perforationModes.spine,
  mothtech: perforationModes.mothtech,
  diy: perforationModes.diy
};
