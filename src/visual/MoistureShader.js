import { buildVariantState, assembleGarment } from "../engine/GarmentAssembler.js";

export class MoistureVisual {
  constructor(state) {
    this.layer = document.getElementById("moisture-layer");
    state.subscribe(s => this.render(s));
  }

  render(state) {
    const garment = assembleGarment(buildVariantState(state, state.activeGarmentView === "B" ? "B" : "A"));
    const wetness = Math.min(1, state.sweatRate * 0.58 + state.exerciseIntensity / 20 + state.humidity / 220 + garment.effectiveMoistureRisk * 0.28);
    const spread = garment.materialKey === "cotton" ? 1.22 : garment.materialKey === "mesh" ? 0.82 : 1;
    const density = garment.materialKey === "cotton" ? 1.08 : garment.materialKey === "mesh" ? 0.72 : 0.9;
    const heavyBoost = 1 + garment.dna.weightFactor * 0.18;

    this.layer.style.opacity = (wetness * density * heavyBoost).toFixed(2);
    this.layer.style.transform = `scale(${1 + wetness * 0.05})`;
    this.layer.style.setProperty("--wet-chest", `${Math.min(0.82, wetness * 0.92 * heavyBoost)}`);
    this.layer.style.setProperty("--wet-back", `${Math.min(0.84, wetness * 0.86 * spread * heavyBoost)}`);
    this.layer.style.setProperty("--wet-underarm", `${Math.min(0.86, wetness * 1.02)}`);
    this.layer.style.setProperty("--wet-lower", `${Math.min(0.74, wetness * 0.68 * spread * heavyBoost)}`);
    this.layer.dataset.material = garment.materialKey;
  }
}
