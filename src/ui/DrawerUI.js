export class DrawerUI {
  constructor() {
    this.controls = document.getElementById("controls-drawer");
    this.results = document.getElementById("results-drawer");
    this.controlsToggle = document.getElementById("controls-toggle");
    this.resultsToggle = document.getElementById("results-toggle");
    this.controlsToggle.addEventListener("click", () => this.toggle(this.controls, this.controlsToggle));
    this.resultsToggle.addEventListener("click", () => this.toggle(this.results, this.resultsToggle));
  }

  toggle(drawer, button) {
    drawer.classList.toggle("open");
    button.classList.toggle("active", drawer.classList.contains("open"));
  }
}
