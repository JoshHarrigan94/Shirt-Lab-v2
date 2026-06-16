import { listGarmentPresets, fitProfiles, perforationModes } from "../data/GarmentDNA.js";
import { materials } from "../data/materials.js";
import { listScenarios, scenarios } from "../data/scenarios.js";
import { demoPresets } from "../data/demoPresets.js";

const perforationLocations = {
  chest: { label: "Chest" },
  upperBack: { label: "Upper back" },
  spine: { label: "Spine" },
  underarms: { label: "Underarms" },
  shoulders: { label: "Shoulders" },
  fullBody: { label: "Full body" }
};

const gsmProfiles = {
  lightweight: { label: "Lightweight", value: 115 },
  medium: { label: "Medium", value: 160 },
  heavy: { label: "Heavy", value: 205 }
};

function optionsMarkup(value, options) {
  return Object.entries(options)
    .map(([key, item]) => `<option value="${key}" ${value === key ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function metricSlider(key, label, min, max, step, value, suffix) {
  return `
    <label class="range-field">
      <span class="field-top">
        <span>${label}</span>
        <strong data-value="${key}">${value}${suffix}</strong>
      </span>
      <input data-key="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
    </label>
  `;
}

export class Controls {
  constructor(state) {
    this.state = state;
    this.root = document.getElementById("controls-root");
    this.boundInput = event => this.onInput(event);
    this.boundClick = event => this.onClick(event);
    this.root.addEventListener("input", this.boundInput);
    this.root.addEventListener("change", this.boundInput);
    this.root.addEventListener("click", this.boundClick);
    state.subscribe(snapshot => this.render(snapshot));
  }

  render(state) {
    const scenario = scenarios[state.scenario];
    this.root.innerHTML = `
      <section class="control-card intro-card">
        <div class="eyebrow">Shared simulation state</div>
        <h3>Cinematic garment intelligence</h3>
        <p>${scenario?.narrative ?? "Use the controls to tune the same state that drives visuals, scores and explanations."}</p>
      </section>

      <details class="control-card" open>
        <summary>Demo presets</summary>
        <div class="demo-chip-grid">
          ${Object.values(demoPresets).map(preset => `
            <button class="chip demo-chip" data-demo="${preset.id}">${preset.label}</button>
          `).join("")}
        </div>
      </details>

      <details class="control-card" open>
        <summary>Scenario</summary>
        <div class="control-grid">
          <label>
            Scenario preset
            <select data-key="scenario">${optionsMarkup(state.scenario, listScenarios())}</select>
          </label>
          ${metricSlider("windSpeed", "Wind speed", 0, 25, 1, state.windSpeed, " mph")}
          ${metricSlider("temperature", "Temperature", 0, 38, 1, state.temperature, "°C")}
          ${metricSlider("humidity", "Humidity", 10, 95, 1, state.humidity, "%")}
          ${metricSlider("exerciseIntensity", "Exercise intensity", 1, 10, 1, state.exerciseIntensity, "/10")}
          ${metricSlider("sweatRate", "Sweat rate", 0, 1, 0.05, state.sweatRate, "")}
        </div>
      </details>

      <details class="control-card" open>
        <summary>Comparison mode</summary>
        <div class="toggle-row">
          <button class="chip ${state.compareEnabled ? "active" : ""}" data-action="toggle-compare">Comparison ${state.compareEnabled ? "On" : "Off"}</button>
          <button class="chip ${state.activeGarmentView === "A" ? "active" : ""}" data-view="A">Active shirt: A</button>
          <button class="chip ${state.activeGarmentView === "B" ? "active" : ""}" data-view="B">Active shirt: B</button>
        </div>
      </details>

      ${this.garmentCard("A", "Shirt A", state)}
      ${this.garmentCard("B", "Shirt B", state)}
    `;
  }

  garmentCard(side, title, state) {
    const shirtKey = state[`shirtPreset${side}`];
    const materialKey = state[`material${side}`];
    const fitKey = state[`fit${side}`];
    const perforationKey = state[`perforation${side}`];
    const perforationDensity = state[`perforationDensity${side}`];
    const perforationLocation = state[`perforationLocation${side}`];
    const gsm = state[`gsm${side}`];
    const meshPanels = Boolean(state[`meshPanels${side}`]);

    return `
      <details class="control-card ${state.activeGarmentView === side ? "focus-card" : ""}" open>
        <summary>${title}</summary>
        <div class="control-grid garment-grid">
          <label>
            Preset
            <select data-key="shirtPreset${side}">${optionsMarkup(shirtKey, listGarmentPresets())}</select>
          </label>
          <label>
            Material
            <select data-key="material${side}">${optionsMarkup(materialKey, materials)}</select>
          </label>
          <label>
            Fit intensity
            <select data-key="fit${side}">${optionsMarkup(fitKey, fitProfiles)}</select>
          </label>
          <label>
            Perforation pattern
            <select data-key="perforation${side}">${optionsMarkup(perforationKey, perforationModes)}</select>
          </label>
          ${metricSlider(`perforationDensity${side}`, "Perforation density", 0, 100, 1, perforationDensity, "%")}
          <label>
            Perforation location
            <select data-key="perforationLocation${side}">${optionsMarkup(perforationLocation, perforationLocations)}</select>
          </label>
          ${metricSlider(`gsm${side}`, "Material weight / GSM", 100, 220, 5, gsm, " gsm")}
          <label>
            Weight profile
            <select data-key="gsmProfile${side}">
              ${optionsMarkup(this.gsmProfileKey(gsm), gsmProfiles)}
            </select>
          </label>
          <label class="toggle-check">
            <input data-key="meshPanels${side}" type="checkbox" ${meshPanels ? "checked" : ""}>
            <span>Mesh panel zones</span>
          </label>
          <div class="mini-note">Sandbox changes update the hero visual, score stack, and explanation layer from the same garment state.</div>
        </div>
      </details>
    `;
  }

  onClick(event) {
    const { action, view } = event.target.dataset;
    if (action === "toggle-compare") {
      this.state.set({ compareEnabled: !this.state.get().compareEnabled });
    }
    if (view) {
      this.state.set({ activeGarmentView: view });
    }
    if (event.target.dataset.demo) {
      this.applyDemoPreset(event.target.dataset.demo);
    }
  }

  onInput(event) {
    const key = event.target.dataset.key;
    if (!key) return;

    let value;
    if (event.target.type === "checkbox") value = event.target.checked;
    else {
      value = event.target.value;
      if (event.target.type === "range") value = Number(value);
    }

    if (key === "scenario") {
      const scenario = scenarios[value];
      this.state.set({
        scenario: value,
        temperature: scenario.temperature,
        humidity: scenario.humidity,
        windSpeed: scenario.windSpeed,
        exerciseIntensity: scenario.exerciseIntensity,
        sweatRate: scenario.sweatRate
      });
      return;
    }

    if (key.startsWith("shirtPreset")) {
      const side = key.endsWith("B") ? "B" : "A";
      const defaults = this.defaultsForPreset(value);
      this.state.set({
        [`shirtPreset${side}`]: value,
        [`material${side}`]: defaults.material,
        [`fit${side}`]: defaults.fit,
        [`perforation${side}`]: defaults.perforation,
        [`perforationDensity${side}`]: defaults.perforationDensity,
        [`perforationLocation${side}`]: defaults.perforationLocation,
        [`gsm${side}`]: defaults.gsm,
        [`meshPanels${side}`]: defaults.meshPanels
      });
      return;
    }

    if (key.startsWith("gsmProfile")) {
      const side = key.endsWith("B") ? "B" : "A";
      this.state.set({ [`gsm${side}`]: gsmProfiles[value].value });
      return;
    }

    this.state.set({ [key]: value });
  }

  defaultsForPreset(preset) {
    const map = {
      plainCottonTee: { material: "cotton", fit: "regular", perforation: "none", perforationDensity: 0, perforationLocation: "chest", gsm: 180, meshPanels: false },
      plainPolyRunningTee: { material: "polyester", fit: "regular", perforation: "none", perforationDensity: 0, perforationLocation: "chest", gsm: 128, meshPanels: false },
      meshPerformanceTee: { material: "mesh", fit: "regular", perforation: "none", perforationDensity: 24, perforationLocation: "fullBody", gsm: 110, meshPanels: true },
      mothTechStyleCotton: { material: "cotton", fit: "regular", perforation: "mothtech", perforationDensity: 68, perforationLocation: "upperBack", gsm: 170, meshPanels: false },
      diyPunchedHoleCotton: { material: "cotton", fit: "regular", perforation: "diy", perforationDensity: 56, perforationLocation: "fullBody", gsm: 190, meshPanels: false }
    };
    return map[preset] ?? map.plainPolyRunningTee;
  }

  gsmProfileKey(gsm) {
    if (gsm <= 130) return "lightweight";
    if (gsm >= 190) return "heavy";
    return "medium";
  }

  applyDemoPreset(id) {
    const preset = demoPresets[id];
    if (!preset) return;
    const scenario = scenarios[preset.scenario];
    const {
      scenario: presetScenario,
      activeGarmentView,
      shirtPresetA,
      materialA,
      fitA,
      perforationA,
      perforationDensityA,
      perforationLocationA,
      gsmA,
      meshPanelsA,
      shirtPresetB,
      materialB,
      fitB,
      perforationB,
      perforationDensityB,
      perforationLocationB,
      gsmB,
      meshPanelsB,
      compareEnabled,
      sweatRate,
      exerciseIntensity
    } = preset;
    this.state.set({
      scenario: presetScenario,
      activeGarmentView,
      shirtPresetA,
      materialA,
      fitA,
      perforationA,
      perforationDensityA,
      perforationLocationA,
      gsmA,
      meshPanelsA,
      shirtPresetB,
      materialB,
      fitB,
      perforationB,
      perforationDensityB,
      perforationLocationB,
      gsmB,
      meshPanelsB,
      compareEnabled,
      temperature: scenario.temperature,
      humidity: scenario.humidity,
      windSpeed: scenario.windSpeed,
      exerciseIntensity: exerciseIntensity ?? scenario.exerciseIntensity,
      sweatRate: sweatRate ?? scenario.sweatRate
    });
  }
}
