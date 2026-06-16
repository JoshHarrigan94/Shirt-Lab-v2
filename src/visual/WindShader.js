export class WindVisual {
  constructor(state) {
    this.layer = document.getElementById("wind-layer");
    this.lines = [];
    this.createLines();
    state.subscribe(s => this.render(s));
  }
  createLines() {
    for (let i = 0; i < 26; i++) {
      const line = document.createElement("div");
      line.className = "wind-line";
      line.style.top = `${7 + i * 3.6}%`;
      line.style.animationDelay = `${-(i * 0.11)}s`;
      line.style.opacity = `${0.18 + (i % 5) * 0.12}`;
      this.layer.appendChild(line);
      this.lines.push(line);
    }
  }
  render(s) {
    const duration = Math.max(0.7, 4.2 - s.windSpeed * 0.16);
    const opacity = Math.min(1, 0.35 + s.windSpeed / 22);
    this.layer.style.opacity = opacity;
    this.lines.forEach((line, i) => {
      line.style.animationDuration = `${duration + (i % 4) * 0.18}s`;
      line.style.transform = `translateY(${Math.sin(i) * (s.perforation === "none" ? 2 : 8)}px)`;
    });
  }
}
