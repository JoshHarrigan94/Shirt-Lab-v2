export class PerforationVisual {
  constructor(state) {
    this.layer = document.getElementById("perforation-layer");
    state.subscribe(s => this.render(s));
  }

  clear() { this.layer.innerHTML = ""; }

  hole(x, y, cls = "") {
    const h = document.createElement("i");
    h.className = `hole ${cls}`;
    h.style.left = `${x}%`;
    h.style.top = `${y}%`;
    this.layer.appendChild(h);
  }

  render(s) {
    this.clear();
    if (s.perforation === "none") return;
    if (s.perforation === "grid") {
      for (let y = 26; y <= 72; y += 9) for (let x = 34; x <= 62; x += 9) this.hole(x, y);
    }
    if (s.perforation === "spine") {
      for (let y = 24; y <= 76; y += 7) this.hole(50 + Math.sin(y) * 2, y, "slit");
    }
    if (s.perforation === "mothtech") {
      const clusters = [[36,28],[64,28],[38,52],[62,52],[50,68]];
      clusters.forEach(([cx, cy], ci) => {
        for (let i = 0; i < 11; i++) {
          const a = (i / 11) * Math.PI * 2 + ci;
          const r = 4 + (i % 3) * 2.4;
          this.hole(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        }
      });
    }
  }
}
