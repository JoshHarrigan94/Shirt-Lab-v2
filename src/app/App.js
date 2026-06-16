import { Bootstrap } from "../core/Bootstrap.js";
import { SimulationState } from "../state/SimulationState.js";
import { CurtainsScene } from "../visual/CurtainsScene.js";
import { WindVisual } from "../visual/WindShader.js";
import { MoistureVisual } from "../visual/MoistureShader.js";
import { PerforationVisual } from "../visual/PerforationVisual.js";
import { SceneEffects } from "../visual/SceneEffects.js";
import { Controls } from "../ui/Controls.js";
import { HUD } from "../ui/HUD.js";
import { DrawerUI } from "../ui/DrawerUI.js";
import { calculateScores } from "../engine/ScoreEngine.js";
import { scenarios } from "../data/scenarios.js";
import { demoPresets } from "../data/demoPresets.js";

const boot = new Bootstrap();

try {
  boot.info("Starting ShirtLab V3");
  const baselineScenario = scenarios.hotHumid10k;
  const {
    scenario: _presetScenario,
    ...baselineDemo
  } = demoPresets.premiumCottonVsPoly;
  const state = new SimulationState({
    ...baselineDemo,
    scenario: baselineScenario.id,
    temperature: baselineScenario.temperature,
    humidity: baselineScenario.humidity,
    windSpeed: baselineScenario.windSpeed,
    exerciseIntensity: baselineScenario.exerciseIntensity,
    sweatRate: baselineScenario.sweatRate
  });

  new DrawerUI();
  new Controls(state);
  new HUD(state, calculateScores);

  new CurtainsScene(state);
  new WindVisual(state);
  new MoistureVisual(state);
  new PerforationVisual(state);
  new SceneEffects(state);

  window.ShirtLab = { state, calculateScores };
  boot.info("Ready");
} catch (error) {
  boot.fail(error);
}
