export class MoistureVisual {
  constructor(state) {
    this.layer = document.getElementById("moisture-layer");
    state.subscribe(s => this.render(s));
  }
  render(s) {
    const wetness = Math.min(1, s.sweatRate * 0.62 + s.exerciseIntensity / 22 + s.humidity / 250);
    this.layer.style.opacity = wetness.toFixed(2);
    this.layer.style.transform = `scale(${1 + wetness * 0.08})`;
  }
}
