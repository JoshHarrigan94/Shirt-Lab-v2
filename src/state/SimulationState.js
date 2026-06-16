export class SimulationState {
  constructor(initial = {}) {
    this.value = {
      shirt: "standard",
      material: "polyester",
      fit: "regular",
      perforation: "none",
      environment: "temperate",
      windSpeed: 10,
      temperature: 22,
      humidity: 50,
      exerciseIntensity: 5,
      sweatRate: 0.5,
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
