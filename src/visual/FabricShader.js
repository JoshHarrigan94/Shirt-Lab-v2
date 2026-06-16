export function fabricVertexShader() {
  return `
    precision mediump float;
    attribute vec3 aVertexPosition;
    attribute vec2 aTextureCoord;
    uniform mat4 uMVMatrix;
    uniform mat4 uPMatrix;
    uniform float uTime;
    uniform float uWind;
    varying vec2 vTextureCoord;
    void main() {
      vec3 pos = aVertexPosition;
      pos.z += sin((pos.y * 8.0) + uTime * 2.0) * 0.015 * uWind;
      gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
      vTextureCoord = aTextureCoord;
    }
  `;
}

export function fabricFragmentShader() {
  return `
    precision mediump float;
    varying vec2 vTextureCoord;
    uniform float uMoisture;
    uniform float uHeat;
    void main() {
      vec2 uv = vTextureCoord;
      vec3 base = vec3(0.92, 0.93, 0.88);
      float shade = 0.08 * sin(uv.y * 30.0) + 0.05 * sin(uv.x * 20.0);
      float wetPatch = smoothstep(0.45, 0.05, distance(uv, vec2(0.48, 0.38))) + smoothstep(0.35, 0.05, distance(uv, vec2(0.58, 0.62)));
      vec3 wet = mix(base, vec3(0.18, 0.28, 0.40), clamp(wetPatch * uMoisture, 0.0, 0.85));
      vec3 heat = mix(wet, vec3(1.0, 0.42, 0.18), uHeat * 0.18);
      gl_FragColor = vec4(heat + shade, 1.0);
    }
  `;
}
