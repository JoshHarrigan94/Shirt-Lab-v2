export class HUD {
  constructor(state, scoreEngine) {
    this.root = document.getElementById("hud-root");
    this.scoreEngine = scoreEngine;
    state.subscribe(s => this.render(s));
  }

  render(state) {
    const scores = this.scoreEngine(state);
    this.root.innerHTML = `
      ${this.metric("Cooling", scores.cooling)}
      ${this.metric("Comfort", scores.comfort)}
      ${this.metric("Airflow", scores.airflow)}
      ${this.metric("Drying", scores.drying)}
      <div class="metric-card">
        <h3>Risk</h3>
        <div class="metric-row"><span>Wetness</span><strong>${scores.wetness}%</strong></div>
        <div class="metric-row"><span>Cling risk</span><strong>${scores.clingRisk}%</strong></div>
        <div class="metric-row"><span>Value score</span><strong>${scores.value}</strong></div>
      </div>
      <div class="metric-card">
        <h3>Claim check</h3>
        <p style="margin:0;color:var(--muted);line-height:1.45">${scores.claim}</p>
      </div>
    `;
  }

  metric(label, value) {
    return `
      <div class="metric-card">
        <h3>${label}</h3>
        <div class="metric-row">
          <div class="bar"><span style="width:${value}%"></span></div>
          <div class="metric-value">${value}</div>
        </div>
      </div>
    `;
  }
}
