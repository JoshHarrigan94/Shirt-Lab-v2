import { buildVariantState, assembleGarment } from "../engine/GarmentAssembler.js";

export class WindVisual {
  constructor(state) {
    this.layer = document.getElementById("wind-layer");
    this.lines = [];
    this.pulses = [];
    this.createStreams();
    state.subscribe(s => this.render(s));
  }

  createStreams() {
    for (let i = 0; i < 18; i++) {
      const line = document.createElement("div");
      line.className = "wind-line";
      line.style.top = `${10 + i * 4.2}%`;
      line.style.animationDelay = `${-(i * 0.13)}s`;
      this.layer.appendChild(line);
      this.lines.push(line);
    }

    for (let i = 0; i < 8; i++) {
      const pulse = document.createElement("div");
      pulse.className = "wind-pulse";
      pulse.style.top = `${22 + i * 7}%`;
      pulse.style.animationDelay = `${-(i * 0.27)}s`;
      this.layer.appendChild(pulse);
      this.pulses.push(pulse);
    }
  }

  render(state) {
    const garment = assembleGarment(buildVariantState(state, state.activeGarmentView === "B" ? "B" : "A"));
    const duration = Math.max(0.6, 3.8 - state.windSpeed * 0.13);
    const opacity = Math.min(1, 0.26 + state.windSpeed / 18);
    const ventBoost = garment.dna.perforationDensity * 24;
    const focusMap = {
      chest: 50,
      upperBack: 52,
      spine: 50,
      underarms: 62,
      shoulders: 48,
      fullBody: 56
    };
    this.layer.style.opacity = opacity;
    this.layer.style.setProperty("--wind-speed-scale", `${0.7 + state.windSpeed / 18}`);
    this.layer.style.setProperty("--wind-focus", `${focusMap[garment.dna.perforationLocation] ?? 50}%`);

    this.lines.forEach((line, i) => {
      const thickness = 1 + (i % 3) * 0.7 + state.windSpeed * 0.05;
      line.style.height = `${thickness}px`;
      line.style.animationDuration = `${duration + (i % 4) * 0.16}s`;
      line.style.transform = `translateY(${Math.sin(i * 0.8) * ((garment.fitKey === "oversized" ? 11 : garment.perforationKey === "none" ? 4 : 9) - garment.dna.weightFactor * 3)}px)`;
      line.style.opacity = `${0.18 + garment.effectiveAirflowPotential * 0.52 + (i % 4) * 0.05}`;
      line.style.width = `${26 + state.windSpeed * 1.4 + (i % 5) * 5 + garment.dna.perforationDensity * 18}%`;
    });

    this.pulses.forEach((pulse, i) => {
      pulse.style.animationDuration = `${Math.max(1.1, duration + 0.5 + i * 0.08)}s`;
      pulse.style.left = `${(focusMap[garment.dna.perforationLocation] ?? 50) - 10 + (i % 3) * 8 + ventBoost * 0.12}%`;
      pulse.style.opacity = `${0.18 + garment.dna.perforationDensity * 1.1}`;
    });
  }
}
