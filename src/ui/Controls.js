import { shirts, perforations } from "../data/shirts.js";
import { materials } from "../data/materials.js";
import { environments } from "../data/environments.js";

export class Controls {
  constructor(state) {
    this.state = state;
    this.root = document.getElementById("controls-root");
    this.render();
    this.bind();
  }

  render() {
    this.root.innerHTML = `
      <details class="control-card" open>
        <summary>Garment</summary>
        <div class="control-grid">
          ${this.select("shirt", "Shirt", shirts)}
          ${this.select("material", "Material", materials)}
          ${this.select("fit", "Fit", {
            compression: { label: "Compression" }, regular: { label: "Regular" }, oversized: { label: "Oversized" }
          })}
          ${this.select("perforation", "Perforation", perforations)}
        </div>
      </details>
      <details class="control-card" open>
        <summary>Environment</summary>
        <div class="control-grid">
          ${this.select("environment", "Scenario", environments)}
          ${this.range("windSpeed", "Wind speed", 0, 25, 1, "mph")}
          ${this.range("temperature", "Temperature", 0, 38, 1, "°C")}
          ${this.range("humidity", "Humidity", 10, 95, 1, "%")}
        </div>
      </details>
      <details class="control-card" open>
        <summary>Athlete</summary>
        <div class="control-grid">
          ${this.range("exerciseIntensity", "Exercise intensity", 1, 10, 1, "")}
          ${this.range("sweatRate", "Sweat rate", 0, 1, 0.05, "")}
        </div>
      </details>
    `;
  }

  select(key, label, options) {
    const state = this.state.get();
    return `<label>${label}<select data-key="${key}">${Object.entries(options).map(([value, item]) => `<option value="${value}" ${state[key] === value ? "selected" : ""}>${item.label}</option>`).join("")}</select></label>`;
  }

  range(key, label, min, max, step, suffix) {
    const state = this.state.get();
    return `<label>${label}: <span data-value="${key}">${state[key]}${suffix}</span><input data-key="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${state[key]}"></label>`;
  }

  bind() {
    this.root.addEventListener("input", e => {
      const key = e.target.dataset.key;
      if (!key) return;
      let value = e.target.value;
      if (e.target.type === "range") value = Number(value);
      if (key === "environment") {
        const env = environments[value];
        this.state.set({ environment: value, temperature: env.temperature, humidity: env.humidity, windSpeed: env.windSpeed });
        this.render();
        this.bind();
        return;
      }
      if (key === "shirt") {
        const shirt = shirts[value];
        this.state.set({ shirt: value, material: shirt.material, perforation: shirt.perforation ?? this.state.get().perforation });
        this.render();
        this.bind();
        return;
      }
      this.state.set({ [key]: value });
      const valueEl = this.root.querySelector(`[data-value="${key}"]`);
      if (valueEl) valueEl.textContent = `${value}${this.suffixFor(key)}`;
    });
  }

  suffixFor(key) { return key === "windSpeed" ? "mph" : key === "temperature" ? "°C" : key === "humidity" ? "%" : ""; }
}
