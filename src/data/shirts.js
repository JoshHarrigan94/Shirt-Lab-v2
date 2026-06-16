export const shirts = {
  standard: { label: "Standard Running Tee", material: "polyester", price: 35, baseAirflow: 0.62, visualTone: "light" },
  mothtech: { label: "MothTech-style Cotton", material: "cotton", price: 150, baseAirflow: 0.58, visualTone: "cream", perforation: "mothtech" },
  diy: { label: "DIY Punched Cotton", material: "cotton", price: 8, baseAirflow: 0.52, visualTone: "cream", perforation: "grid" },
  mesh: { label: "Budget Mesh Tee", material: "mesh", price: 20, baseAirflow: 0.88, visualTone: "blue" }
};

export const perforations = {
  none: { label: "Plain", airflowBoost: 0, structureRisk: 0, visual: "none" },
  grid: { label: "Grid Holes", airflowBoost: 0.16, structureRisk: 0.28, visual: "grid" },
  spine: { label: "Spine Vent", airflowBoost: 0.18, structureRisk: 0.14, visual: "spine" },
  mothtech: { label: "MothTech-style Clusters", airflowBoost: 0.20, structureRisk: 0.18, visual: "mothtech" }
};
