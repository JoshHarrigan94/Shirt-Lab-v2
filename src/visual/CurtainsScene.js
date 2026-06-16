import { fabricVertexShader, fabricFragmentShader } from "./FabricShader.js";
import { buildVariantState, assembleGarment } from "../engine/GarmentAssembler.js";

export class CurtainsScene {
  constructor(state) {
    this.state = state;
    this.curtains = null;
    this.plane = null;
    this.status = document.getElementById("visual-engine-status");
    this.uniforms = { wind: 0.5, moisture: 0, heat: 0.25, time: 0 };
    this.setStatus("css");
    this.tryStart();
    this.state.subscribe(s => this.applyState(s));
  }

  setStatus(mode) {
    if (!this.status) return;
    this.status.dataset.mode = mode;
    this.status.textContent = mode === "curtains" ? "Visual engine: Curtains active" : "Visual engine: CSS fallback";
  }

  tryStart() {
    const CurtainsGlobal = window.Curtains;
    const PlaneGlobal = window.Plane;
    if (!CurtainsGlobal || !PlaneGlobal) {
      this.setStatus("css");
      return;
    }

    try {
      this.curtains = new CurtainsGlobal({
        container: "curtains-canvas",
        watchScroll: false,
        pixelRatio: Math.min(1.5, window.devicePixelRatio)
      });
      const planeEl = document.getElementById("shirt-plane");
      this.plane = new PlaneGlobal(this.curtains, planeEl, {
        vertexShader: fabricVertexShader(),
        fragmentShader: fabricFragmentShader(),
        uniforms: {
          uTime: { name: "uTime", type: "1f", value: 0 },
          uWind: { name: "uWind", type: "1f", value: 0.5 },
          uMoisture: { name: "uMoisture", type: "1f", value: 0 },
          uHeat: { name: "uHeat", type: "1f", value: 0.25 }
        }
      });
      this.plane.onRender(() => {
        this.uniforms.time += 0.016;
        this.plane.uniforms.uTime.value = this.uniforms.time;
      });
      this.setStatus("curtains");
    } catch (error) {
      console.warn("Curtains fallback active", error);
      this.setStatus("css");
    }
  }

  applyState(s) {
    const variantState = buildVariantState(s, s.activeGarmentView === "B" ? "B" : "A");
    const garment = assembleGarment(variantState);
    this.uniforms.wind = Math.min(2.2, s.windSpeed / 9 + garment.dna.perforationDensity * 1.1);
    this.uniforms.moisture = Math.min(1, s.sweatRate * 0.55 + s.humidity / 180 + garment.effectiveMoistureRisk * 0.18);
    this.uniforms.heat = Math.min(1, Math.max(0.05, (s.temperature - 10) / 28 + garment.dna.weightFactor * 0.12));
    if (this.plane?.uniforms) {
      this.plane.uniforms.uWind.value = this.uniforms.wind;
      this.plane.uniforms.uMoisture.value = this.uniforms.moisture;
      this.plane.uniforms.uHeat.value = this.uniforms.heat;
    }
  }
}
