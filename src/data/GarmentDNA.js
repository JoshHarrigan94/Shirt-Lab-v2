export const garmentPresets = {
  plainCottonTee: {
    id: "plainCottonTee",
    label: "Plain Cotton Tee",
    visualTone: "cream",
    price: 24,
    dna: {
      material: "cotton",
      gsm: 180,
      weightClass: "midweight",
      fit: "regular",
      sleeveLength: "short",
      coverage: "standard",
      perforationDensity: 0,
      perforationLocation: "none",
      perforationType: "none",
      meshPanelConstruction: "none",
      moistureBehaviour: "holds sweat and dries slowly",
      airflowBehaviour: "moderate airflow, low active ventilation"
    }
  },
  plainPolyRunningTee: {
    id: "plainPolyRunningTee",
    label: "Plain Polyester Running Tee",
    visualTone: "light",
    price: 30,
    dna: {
      material: "polyester",
      gsm: 128,
      weightClass: "light",
      fit: "regular",
      sleeveLength: "short",
      coverage: "standard",
      perforationDensity: 0,
      perforationLocation: "none",
      perforationType: "none",
      meshPanelConstruction: "none",
      moistureBehaviour: "sheds moisture quickly with low storage",
      airflowBehaviour: "stable baseline airflow with quick recovery"
    }
  },
  meshPerformanceTee: {
    id: "meshPerformanceTee",
    label: "Mesh Performance Tee",
    visualTone: "blue",
    price: 56,
    dna: {
      material: "mesh",
      gsm: 110,
      weightClass: "ultralight",
      fit: "regular",
      sleeveLength: "short",
      coverage: "athletic",
      perforationDensity: 0.24,
      perforationLocation: "distributed",
      perforationType: "knit-open",
      meshPanelConstruction: "full body mesh knit",
      moistureBehaviour: "very low wet storage and fast drying",
      airflowBehaviour: "high permeability across the whole torso"
    }
  },
  mothTechStyleCotton: {
    id: "mothTechStyleCotton",
    label: "MothTech-style Perforated Cotton Tee",
    visualTone: "cream",
    price: 150,
    dna: {
      material: "cotton",
      gsm: 170,
      weightClass: "midweight",
      fit: "regular",
      sleeveLength: "short",
      coverage: "standard",
      perforationDensity: 0.18,
      perforationLocation: "mapped chest and back clusters",
      perforationType: "laser cluster",
      meshPanelConstruction: "none",
      moistureBehaviour: "improved venting but still retains moisture",
      airflowBehaviour: "targeted flow spikes through mapped open areas"
    }
  },
  diyPunchedHoleCotton: {
    id: "diyPunchedHoleCotton",
    label: "DIY Punched-hole Cotton Tee",
    visualTone: "cream",
    price: 12,
    dna: {
      material: "cotton",
      gsm: 190,
      weightClass: "midweight",
      fit: "regular",
      sleeveLength: "short",
      coverage: "standard",
      perforationDensity: 0.14,
      perforationLocation: "uniform front grid",
      perforationType: "manual punch",
      meshPanelConstruction: "none",
      moistureBehaviour: "vented but moisture-heavy under sustained sweat",
      airflowBehaviour: "some local airflow gain with rough execution"
    }
  }
};

export const fitProfiles = {
  compression: {
    label: "Compression",
    silhouetteScale: 0.93,
    airGap: 0.18,
    contact: 0.92
  },
  regular: {
    label: "Regular",
    silhouetteScale: 1,
    airGap: 0.48,
    contact: 0.56
  },
  oversized: {
    label: "Oversized",
    silhouetteScale: 1.1,
    airGap: 0.84,
    contact: 0.32
  }
};

export const perforationModes = {
  none: {
    label: "None",
    densityShift: 0,
    airflowBoost: 0,
    structureRisk: 0,
    visual: "none"
  },
  grid: {
    label: "Grid Holes",
    densityShift: 0.12,
    airflowBoost: 0.14,
    structureRisk: 0.3,
    visual: "grid"
  },
  spine: {
    label: "Spine Vent",
    densityShift: 0.1,
    airflowBoost: 0.16,
    structureRisk: 0.14,
    visual: "spine"
  },
  mothtech: {
    label: "MothTech-style Clusters",
    densityShift: 0.18,
    airflowBoost: 0.2,
    structureRisk: 0.18,
    visual: "mothtech"
  },
  diy: {
    label: "DIY Punched",
    densityShift: 0.13,
    airflowBoost: 0.11,
    structureRisk: 0.38,
    visual: "diy"
  }
};

export function listGarmentPresets() {
  return Object.fromEntries(
    Object.values(garmentPresets).map(preset => [preset.id, { label: preset.label }])
  );
}
