import { fabricVertexShader, fabricFragmentShader } from "./FabricShader.js";

export class CurtainsScene {
  constructor(state) {
    this.state = state;
    this.curtains = null;
    this.plane = null;
    this.uniforms = { wind: 0.5, moisture: 0, heat: 0.25, time: 0 };
    this.tryStart();
    this.state.subscribe(s => this.applyState(s));
  }

  tryStart() {
    const CurtainsGlobal = window.Curtains;
    const PlaneGlobal = window.Plane;
    if (!CurtainsGlobal || !PlaneGlobal) return;

    try {
      this.curtains = new CurtainsGlobal({ container: "curtains-canvas", watchScroll: false, pixelRatio: Math.min(1.5, window.devicePixelRatio) });
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
    } catch (error) {
      console.warn("Curtains fallback active", error);
    }
  }

  applyState(s) {
    this.uniforms.wind = Math.min(2, s.windSpeed / 10);
    this.uniforms.moisture = Math.min(1, s.sweatRate * 0.55 + s.humidity / 180);
    this.uniforms.heat = Math.min(1, Math.max(0.05, (s.temperature - 10) / 28));
    if (this.plane?.uniforms) {
      this.plane.uniforms.uWind.value = this.uniforms.wind;
      this.plane.uniforms.uMoisture.value = this.uniforms.moisture;
      this.plane.uniforms.uHeat.value = this.uniforms.heat;
    }
  }
}
