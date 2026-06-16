export const mechanisms = {
  airflow: {
    label: "Airflow",
    description: "Movement of air around and through the garment.",
    outcomes: ["cooling", "breathability", "drying"]
  },
  convectiveCooling: {
    label: "Convective cooling",
    description: "Heat removed as moving air passes over skin, sweat or fabric.",
    outcomes: ["cooling", "thermalStress", "comfort"]
  },
  evaporativeCooling: {
    label: "Evaporative cooling",
    description: "Heat removed as sweat or water evaporates from skin or fabric.",
    outcomes: ["cooling", "comfort", "drying"]
  },
  moistureRetention: {
    label: "Moisture retention",
    description: "Water held inside the fabric rather than evaporating or transporting away.",
    outcomes: ["wetCling", "comfort", "weightGainWhenWet"]
  },
  moistureTransport: {
    label: "Moisture transport",
    description: "Movement of sweat across or through the fabric structure.",
    outcomes: ["drying", "comfort", "breathability"]
  },
  dryingDynamics: {
    label: "Drying dynamics",
    description: "How quickly the garment returns from wet to dry under a given environment.",
    outcomes: ["drying", "comfort", "wetCling"]
  },
  skinContact: {
    label: "Skin contact",
    description: "How much wet or dry fabric touches the body.",
    outcomes: ["comfort", "chafing", "wetCling"]
  },
  airGapExchange: {
    label: "Air gap exchange",
    description: "Exchange of warm humid air trapped between skin and garment with cooler outside air.",
    outcomes: ["cooling", "breathability", "comfort"]
  },
  boundaryLayerDisruption: {
    label: "Boundary layer disruption",
    description: "Breaking up the still warm air layer around the body or garment.",
    outcomes: ["cooling", "airflow", "thermalStress"]
  },
  solarGain: {
    label: "Solar gain",
    description: "Heat added by sun exposure and colour/coverage choices.",
    outcomes: ["thermalStress", "comfort"]
  },
  fabricFlutter: {
    label: "Fabric flutter",
    description: "Visible movement of loose fabric under wind and body motion.",
    outcomes: ["airflow", "comfort", "chafing"]
  },
  chafingFriction: {
    label: "Chafing friction",
    description: "Mechanical irritation from seams, wet fabric, fit and repetitive motion.",
    outcomes: ["chafing", "comfort"]
  }
};
