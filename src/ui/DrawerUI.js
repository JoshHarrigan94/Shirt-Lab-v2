export class DrawerUI {
  constructor() {
    this.controls = document.getElementById("controls-drawer");
    this.results = document.getElementById("results-drawer");
    document.getElementById("controls-toggle").addEventListener("click", () => this.controls.classList.toggle("open"));
    document.getElementById("results-toggle").addEventListener("click", () => this.results.classList.toggle("open"));
  }
}
