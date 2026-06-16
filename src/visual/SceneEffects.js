import { shirts } from "../data/shirts.js";

export class SceneEffects {
  constructor(state) {
    this.shirt = document.getElementById("shirt-plane");
    this.heat = document.getElementById("heat-layer");
    state.subscribe(s => this.render(s));
  }

  render(s) {
    const shirt = shirts[s.shirt] ?? shirts.standard;
    const fitScale = s.fit === "compression" ? 0.94 : s.fit === "oversized" ? 1.12 : 1;
    const windRipple = Math.min(2.6, s.windSpeed / 8) * (s.fit === "oversized" ? 1.6 : s.fit === "compression" ? 0.35 : 1);
    this.shirt.style.setProperty("animation-duration", `${Math.max(0.75, 2.4 - windRipple * 0.32)}s`);
    this.shirt.style.transform = `translateX(-50%) scaleX(${fitScale}) scaleY(${s.fit === "oversized" ? 1.04 : 1})`;
    this.shirt.style.background = this.getShirtGradient(shirt.visualTone, s.material);
    this.heat.style.opacity = Math.min(0.55, Math.max(0.08, (s.temperature - 8) / 42 + s.exerciseIntensity / 45));
  }

  getShirtGradient(tone, material) {
    if (tone === "blue" || material === "mesh") return "linear-gradient(145deg, #dff8ff, #75aebd)";
    if (tone === "cream" || material === "cotton") return "linear-gradient(145deg, #fff3d8, #cdbd9c)";
    if (material === "merino") return "linear-gradient(145deg, #e7e5de, #8f9294)";
    return "linear-gradient(145deg, #f5f5ec, #cfd4d8)";
  }
}
