import { buildVariantState, assembleGarment } from "../engine/GarmentAssembler.js";
import { scenarios } from "../data/scenarios.js";

export class SceneEffects {
  constructor(state) {
    this.shirt = document.getElementById("shirt-plane");
    this.heat = document.getElementById("heat-layer");
    this.cooling = document.getElementById("cooling-layer");
    this.stageWind = document.getElementById("stage-wind");
    this.stageMoisture = document.getElementById("stage-moisture");
    this.stageHeat = document.getElementById("stage-heat");
    this.stageSubtitle = document.getElementById("stage-subtitle");
    this.ghost = document.getElementById("comparison-ghost");
    this.ghostFront = this.ghost?.querySelector(".ghost-shirt-front");
    this.ghostRear = this.ghost?.querySelector(".ghost-shirt-rear");
    this.ghostLabel = this.ghost?.querySelector(".ghost-label");
    state.subscribe(snapshot => this.render(snapshot));
  }

  render(state) {
    const side = state.activeGarmentView === "B" ? "B" : "A";
    const otherSide = side === "A" ? "B" : "A";
    const garmentState = buildVariantState(state, side);
    const garment = assembleGarment(garmentState);
    const otherGarment = assembleGarment(buildVariantState(state, otherSide));
    const fitScale = garment.fit.silhouetteScale ?? 1;
    const fabricWeightDrag = 1 - garment.dna.weightFactor * 0.45;
    const windRipple = Math.min(2.8, state.windSpeed / 8) * (garment.fitKey === "oversized" ? 1.6 : garment.fitKey === "compression" ? 0.35 : 1) * fabricWeightDrag;
    const heatLevel = Math.min(0.62, Math.max(0.08, (state.temperature - 8) / 40 + state.exerciseIntensity / 42 + garment.dna.weightFactor * 0.1));
    const coolLevel = Math.min(0.58, garment.effectiveAirflowPotential * 0.38 + state.windSpeed / 60);
    const moistureLevel = state.sweatRate + state.humidity / 180 + garment.effectiveMoistureRisk * 0.22;
    const scenario = scenarios[state.scenario];

    this.shirt.style.setProperty("animation-duration", `${Math.max(0.78, 2.6 - windRipple * 0.34 + garment.dna.weightFactor * 0.6)}s`);
    this.shirt.style.transform = `translateX(-50%) scaleX(${fitScale}) scaleY(${garment.fitKey === "oversized" ? 1.05 : 1})`;
    this.shirt.style.background = this.getShirtGradient(garment);
    this.shirt.dataset.material = garment.materialKey;
    this.shirt.dataset.compare = state.compareEnabled ? "true" : "false";
    this.shirt.dataset.mesh = garment.dna.meshPanelFactor ? "true" : "false";
    this.shirt.dataset.fit = garment.fitKey;
    this.heat.style.opacity = heatLevel.toFixed(2);
    this.cooling.style.opacity = coolLevel.toFixed(2);
    this.cooling.style.setProperty("--cool-focus", `${40 + garment.dna.perforationDensity * 100}%`);
    this.heat.style.setProperty("--heat-strength", heatLevel.toFixed(2));

    this.stageWind.textContent = `${state.windSpeed} mph`;
    this.stageMoisture.textContent = moistureLevel > 1.2 ? "saturated" : moistureLevel > 0.85 ? "building" : "controlled";
    this.stageHeat.textContent = heatLevel > 0.42 ? "high load" : heatLevel > 0.24 ? "elevated" : "stable";
    this.stageSubtitle.textContent = `${side === "A" ? "Shirt A" : "Shirt B"} on stage · ${scenario?.label ?? "Custom scenario"} · ${garment.label} · ${garment.dna.gsm} gsm · ${this.prettyLocation(garment.dna.perforationLocation)}`;

    if (this.ghost) {
      this.ghost.dataset.open = state.compareEnabled ? "true" : "false";
      if (this.ghostFront) this.ghostFront.style.background = this.getGhostGradient(otherGarment);
      if (this.ghostRear) this.ghostRear.style.background = this.getGhostGradient(garment);
      if (this.ghostLabel) this.ghostLabel.textContent = `${otherSide === "A" ? "Shirt A" : "Shirt B"} · ${otherGarment.label}`;
    }
  }

  getShirtGradient(garment) {
    if (garment.visualTone === "blue" || garment.materialKey === "mesh") {
      return "linear-gradient(145deg, #f4fcff 0%, #a9deea 46%, #5f8ba2 74%, #2e475a 100%)";
    }
    if (garment.visualTone === "cream" || garment.materialKey === "cotton") {
      return "linear-gradient(145deg, #fff6df 0%, #e1cbab 46%, #ba9f74 72%, #8b6d4e 100%)";
    }
    if (garment.materialKey === "merino") {
      return "linear-gradient(145deg, #f1efe8 0%, #babdc0 48%, #7b8187 100%)";
    }
    return "linear-gradient(145deg, #f5f5ec 0%, #d5d9dd 48%, #8094a1 100%)";
  }

  getGhostGradient(garment) {
    if (garment.materialKey === "mesh") return "linear-gradient(160deg, rgba(130, 240, 255, 0.26), rgba(130, 240, 255, 0.06))";
    if (garment.materialKey === "cotton") return "linear-gradient(160deg, rgba(255, 224, 178, 0.22), rgba(255, 224, 178, 0.04))";
    return "linear-gradient(160deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.04))";
  }

  prettyLocation(value) {
    return value
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, char => char.toUpperCase());
  }
}
