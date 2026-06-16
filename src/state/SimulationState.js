export class SimulationState {
  constructor(initial = {}) {
    this.value = {
      scenario: "hotHumid10k",
      compareEnabled: true,
      shirtPresetA: "plainPolyRunningTee",
      materialA: "polyester",
      fitA: "regular",
      perforationA: "none",
      perforationDensityA: 0,
      perforationLocationA: "chest",
      gsmA: 128,
      meshPanelsA: false,
      shirtPresetB: "mothTechStyleCotton",
      materialB: "cotton",
      fitB: "regular",
      perforationB: "mothtech",
      perforationDensityB: 68,
      perforationLocationB: "upperBack",
      gsmB: 170,
      meshPanelsB: false,
      activeGarmentView: "B",
      windSpeed: 4,
      temperature: 29,
      humidity: 78,
      exerciseIntensity: 8,
      sweatRate: 0.82,
      ...initial
    };
    this.listeners = new Set();
  }

  get() { return { ...this.value }; }

  set(patch) {
    this.value = { ...this.value, ...patch };
    this.emit();
  }

  subscribe(fn) {
    this.listeners.add(fn);
    fn(this.get());
    return () => this.listeners.delete(fn);
  }

  emit() {
    const snapshot = this.get();
    this.listeners.forEach(fn => fn(snapshot));
  }
}
