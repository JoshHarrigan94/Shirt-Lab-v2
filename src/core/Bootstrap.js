export class Bootstrap {
  constructor() { this.panel = document.getElementById("boot-panel"); }
  info(message) { console.log(`[ShirtLab] ${message}`); }
  fail(error) {
    console.error(error);
    if (!this.panel) return;
    this.panel.classList.add("show");
    this.panel.innerHTML = `<strong>ShirtLab failed to start</strong><br>${error.message ?? error}`;
  }
}
