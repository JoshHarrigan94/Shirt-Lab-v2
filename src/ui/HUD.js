export class HUD {
  constructor(state, scoreEngine) {
    this.root = document.getElementById("hud-root");
    this.scoreEngine = scoreEngine;
    state.subscribe(snapshot => this.render(snapshot));
  }

  render(state) {
    const scores = this.scoreEngine(state);
    const explanation = scores.explanation;
    const activeLabel = scores.activeSide === "B" ? "Shirt B" : "Shirt A";

    this.root.innerHTML = `
      ${scores.compareEnabled && scores.comparisonVerdict ? this.verdictHero(scores) : ""}

      <section class="metric-card score-hero">
        <div class="eyebrow">Active stage garment</div>
        <h3>${activeLabel}: ${scores.garment.label}</h3>
        <p>${explanation.summary}</p>
        <div class="signal-strip">
          <span>Confidence ${explanation.confidence}%</span>
          <span>${scores.overheatingRisk} overheating risk</span>
          <span>${scores.wetClingRisk} wet cling risk</span>
        </div>
      </section>

      <section class="score-grid">
        ${this.metric("Cooling", scores.explanations.cooling)}
        ${this.metric("Airflow", scores.explanations.airflow)}
        ${this.metric("Drying", scores.explanations.drying)}
        ${this.metric("Comfort", scores.explanations.comfort)}
        ${this.metric("Value", scores.explanations.valueScore)}
        ${this.metric("Environment", scores.explanations.environmentSuitability)}
      </section>

      <section class="metric-card">
        <h3>Primary drivers</h3>
        ${this.signalList(explanation.primaryDrivers)}
      </section>

      <section class="metric-card">
        <h3>Main constraints</h3>
        ${this.constraintList(explanation.mainConstraints)}
      </section>

      <section class="metric-card">
        <h3>Trade-off intelligence</h3>
        ${this.tradeoffList(scores.tradeoffIntelligence)}
      </section>

      <section class="metric-card">
        <h3>Garment DNA</h3>
        ${this.dnaList(scores.garment)}
      </section>

      <section class="metric-card intelligence-card">
        <h3>Recommendation</h3>
        <p>${explanation.recommendation}</p>
        <h3>Claim check</h3>
        <p>${scores.claimCheckDetail.claim}</p>
        <div class="signal-strip">
          <span>${scores.claimCheckDetail.confidence} confidence</span>
          <span>${scores.claimCheckDetail.evidenceLevel} evidence</span>
        </div>
        <p class="metric-copy">${scores.claimCheckDetail.uncertainty}</p>
      </section>

      ${scores.compareEnabled && scores.comparison ? this.comparisonSupport(scores) : ""}
    `;
  }

  verdictHero(scores) {
    const verdict = scores.comparisonVerdict;
    return `
      <section class="metric-card verdict-card">
        <div class="eyebrow">Verdict</div>
        <h3>Winner: ${verdict.winner}</h3>
        <p>${verdict.whyWinnerWins}</p>
        <div class="signal-strip">
          <span>${verdict.confidence} confidence</span>
          <span>${scores.comparison.warning}</span>
        </div>
        <div class="stack-list">
          <article class="stack-item">
            <strong>Why it wins</strong>
            <p>${verdict.whyWinnerWins}</p>
          </article>
          <article class="stack-item">
            <strong>Why the other shirt loses</strong>
            <p>${verdict.whyLoserLoses}</p>
          </article>
          <article class="stack-item">
            <strong>Best use case</strong>
            <p>${verdict.recommendedUseCase}</p>
          </article>
          <article class="stack-item">
            <strong>When this changes</strong>
            <p>${verdict.sensitivity.summary}</p>
          </article>
        </div>
      </section>
    `;
  }

  metric(label, detail) {
    return `
      <div class="metric-card compact">
        <h3>${label}</h3>
        <div class="metric-row">
          <div class="bar"><span style="width:${detail.score}%"></span></div>
          <div class="metric-value">${detail.score}</div>
        </div>
        <p class="metric-copy">${detail.summary}</p>
      </div>
    `;
  }

  signalList(items) {
    return `
      <div class="stack-list">
        ${items.map(item => `
          <article class="stack-item">
            <strong>${item.title}</strong>
            <span>${item.strength} · ${item.confidence}% confidence · ${item.evidenceLevel}</span>
            <p>${item.detail}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  constraintList(items) {
    return `
      <div class="stack-list">
        ${items.map(item => `
          <article class="stack-item">
            <strong>${item.title}</strong>
            <span>${item.severity} · ${item.confidence}% confidence · ${item.evidenceLevel}</span>
            <p>${item.detail}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  tradeoffList(tradeoffIntelligence) {
    const items = tradeoffIntelligence?.items ?? [];
    if (!items.length) return `<p class="metric-copy">${tradeoffIntelligence?.summary ?? "No dominant trade-off detected."}</p>`;
    return `
      <div class="stack-list">
        ${items.map(item => `
          <article class="stack-item">
            <strong>${item.title}</strong>
            <p>${item.summary}</p>
          </article>
        `).join("")}
      </div>
    `;
  }

  dnaList(garment) {
    return `
      <div class="dna-grid">
        <div><span>Material</span><strong>${garment.material.label}</strong></div>
        <div><span>GSM</span><strong>${garment.dna.gsm}</strong></div>
        <div><span>Fit</span><strong>${garment.fit.label}</strong></div>
        <div><span>Perforation</span><strong>${garment.perforationMode.label}</strong></div>
        <div><span>Location</span><strong>${this.prettyLabel(garment.dna.perforationLocation)}</strong></div>
        <div><span>Panels</span><strong>${garment.dna.meshPanelConstruction}</strong></div>
        <div><span>Moisture</span><strong>${garment.dna.likelyMoistureBehaviour}</strong></div>
        <div><span>Airflow</span><strong>${garment.dna.likelyAirflowBehaviour}</strong></div>
      </div>
    `;
  }

  comparisonSupport(scores) {
    const comparison = scores.comparison;
    const verdict = scores.comparisonVerdict;
    return `
      <section class="metric-card comparison-card">
        <div class="eyebrow">Comparison support</div>
        <h3>${comparison.overallWinner === "Tie" ? "Scenario split" : `${comparison.overallWinner} leads`}</h3>
        <p>${comparison.verdict}</p>
        <div class="signal-strip">
          <span>Shirt A: ${scores.shirtA.garment.label}</span>
          <span>Shirt B: ${scores.shirtB.garment.label}</span>
        </div>
        <div class="comparison-grid">
          ${comparison.winners.map(item => `
            <div class="compare-row ${item.winner === "Tie" ? "tie" : ""}">
              <strong>${item.label}</strong>
              <span>${item.winner}</span>
              <div class="delta-chip">Delta ${item.delta}</div>
              <p>${item.why}</p>
            </div>
          `).join("")}
        </div>
        <p class="warning-copy">${verdict.sensitivity.summary}</p>
        <p class="metric-copy">${scores.claimCheckDetail.rationale}</p>
      </section>
    `;
  }

  prettyLabel(value) {
    return String(value)
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, char => char.toUpperCase());
  }
}
