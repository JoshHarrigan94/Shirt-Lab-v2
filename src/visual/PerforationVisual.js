import { buildVariantState, assembleGarment } from "../engine/GarmentAssembler.js";

const locationZones = {
  chest: { x1: 32, x2: 68, y1: 18, y2: 42, trailX: 58, trailY: 28 },
  upperBack: { x1: 34, x2: 66, y1: 20, y2: 44, trailX: 60, trailY: 30 },
  spine: { x1: 47, x2: 53, y1: 18, y2: 78, trailX: 56, trailY: 42 },
  underarms: { x1: 22, x2: 78, y1: 28, y2: 48, split: true, trailX: 66, trailY: 36 },
  shoulders: { x1: 28, x2: 72, y1: 8, y2: 24, trailX: 60, trailY: 16 },
  fullBody: { x1: 28, x2: 72, y1: 16, y2: 78, trailX: 60, trailY: 40 }
};

export class PerforationVisual {
  constructor(state) {
    this.layer = document.getElementById("perforation-layer");
    this.ventTrails = document.getElementById("vent-trails");
    state.subscribe(s => this.render(s));
  }

  clear() {
    this.layer.innerHTML = "";
    this.ventTrails.innerHTML = "";
  }

  hole(x, y, cls = "") {
    const hole = document.createElement("i");
    hole.className = `hole ${cls}`.trim();
    hole.style.left = `${x}%`;
    hole.style.top = `${y}%`;
    this.layer.appendChild(hole);
  }

  trail(x, y, stretch = 1) {
    const trail = document.createElement("i");
    trail.className = "vent-trail";
    trail.style.left = `${x}%`;
    trail.style.top = `${y}%`;
    trail.style.width = `${18 * stretch}px`;
    this.ventTrails.appendChild(trail);
  }

  zonePoints(locationKey, densityCount) {
    const zone = locationZones[locationKey] ?? locationZones.chest;
    const cols = Math.max(2, Math.round(Math.sqrt(densityCount)));
    const rows = Math.max(2, Math.ceil(densityCount / cols));
    const points = [];

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (points.length >= densityCount) break;
        const x = zone.x1 + ((zone.x2 - zone.x1) * (col + 0.5)) / cols;
        const y = zone.y1 + ((zone.y2 - zone.y1) * (row + 0.5)) / rows;
        if (zone.split && x > 43 && x < 57) continue;
        points.push([x, y]);
      }
    }

    return { zone, points };
  }

  render(state) {
    const garment = assembleGarment(buildVariantState(state, state.activeGarmentView === "B" ? "B" : "A"));
    this.clear();

    if (garment.perforationKey === "none" || garment.dna.perforationDensity <= 0) return;

    const densityCount = Math.max(6, Math.round(garment.dna.perforationDensity * 42));
    const { zone, points } = this.zonePoints(garment.dna.perforationLocation, densityCount);

    points.forEach(([x, y], index) => {
      if (garment.perforationKey === "spine") {
        this.hole(50 + Math.sin(y * 0.45) * 1.8, y, "slit");
      } else if (garment.perforationKey === "mothtech") {
        const offsetX = Math.sin(index * 1.3) * 2.4;
        const offsetY = Math.cos(index * 0.8) * 1.6;
        this.hole(x + offsetX, y + offsetY, index % 2 === 0 ? "organic" : "");
      } else if (garment.perforationKey === "diy") {
        this.hole(x + ((index % 3) - 1) * 1.2, y + (index % 2) * 1.3, index % 4 === 0 ? "rough" : "");
      } else {
        this.hole(x, y);
      }

      if (index % Math.max(2, Math.round(10 - garment.dna.perforationDensity * 8)) === 0) {
        this.trail(x + 4, y, 0.9 + garment.dna.perforationDensity * 1.2);
      }
    });

    this.trail(zone.trailX, zone.trailY, 1.2 + garment.dna.perforationDensity * 1.5);
    if (garment.dna.perforationLocation === "underarms") {
      this.trail(30, 38, 1.3);
      this.trail(70, 38, 1.3);
    }
  }
}
