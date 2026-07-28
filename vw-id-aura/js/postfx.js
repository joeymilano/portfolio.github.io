/* ============================================================
   ID.AURA — Post-processing pipeline
   Composer chain: Render → SSAO → Bokeh(DOF) → UnrealBloom
   (anamorphic-leaning) → FilmGrade (custom: grain, chromatic
   aberration, vignette, lift/gamma/gain, barrel) → SMAA → Output.
   Every pass beyond RenderPass/Bloom/Output can be disabled via
   `.enabled` so quality.js can toggle SSAO/DOF/SMAA per tier
   without rebuilding the composer.
   Contract: { composer, bloom, film, ssaoPass, bokehPass, smaaPass,
               resize(w,h), setQualityTier(tier), setFilmGrade(opts) }
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

/* Custom "film grade" pass: animated grain + edge chromatic
   aberration + vignette + lift/gamma/gain + gentle barrel warp.
   Kept as one pass (not five) to save a render-target hop per effect. */
const FilmGradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    resolution: { value: new THREE.Vector2(1, 1) },
    grainAmount: { value: 0.035 },
    aberration: { value: 0.0016 },
    vignetteStrength: { value: 0.34 },
    vignetteSoftness: { value: 0.68 },
    lift: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
    gamma: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
    gain: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
    barrel: { value: 0.012 }
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec2 resolution;
    uniform float grainAmount;
    uniform float aberration;
    uniform float vignetteStrength;
    uniform float vignetteSoftness;
    uniform vec3 lift;
    uniform vec3 gamma;
    uniform vec3 gain;
    uniform float barrel;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(41.9, 289.1))) * 43758.5453);
    }

    void main() {
      vec2 centered = vUv - 0.5;
      float r2 = dot(centered, centered);

      // gentle barrel distortion (subtle, keeps UI legible)
      vec2 warped = vUv + centered * r2 * barrel;

      // chromatic aberration grows toward the frame edges
      vec2 dir = normalize(centered + 1e-5);
      float edge = smoothstep(0.0, 0.7, length(centered));
      float ca = aberration * edge;
      vec2 uvR = warped + dir * ca;
      vec2 uvB = warped - dir * ca;

      float cr = texture2D(tDiffuse, uvR).r;
      float cg = texture2D(tDiffuse, warped).g;
      float cb = texture2D(tDiffuse, uvB).b;
      vec3 color = vec3(cr, cg, cb);

      // lift / gamma / gain colour grade
      color = color * gain + lift;
      color = pow(max(color, 0.0), 1.0 / max(gamma, vec3(0.001)));

      // animated fine grain
      float g = hash(vUv * resolution.xy + time) - 0.5;
      color += g * grainAmount;

      // vignette
      float vig = 1.0 - vignetteStrength * smoothstep(vignetteSoftness, 1.0, length(centered) * 1.35);
      color *= vig;

      gl_FragColor = vec4(color, 1.0);
    }
  `
};

export function createPostFX(renderer, scene, camera, quality) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const ssaoPass = new SSAOPass(scene, camera, innerWidth, innerHeight);
  ssaoPass.kernelRadius = 0.32;
  ssaoPass.minDistance = 0.0018;
  ssaoPass.maxDistance = 0.09;
  ssaoPass.output = SSAOPass.OUTPUT ? SSAOPass.OUTPUT.Default : 0;
  composer.addPass(ssaoPass);

  const bokehPass = new BokehPass(scene, camera, { focus: 9.0, aperture: 0.00018, maxblur: 0.0045 });
  composer.addPass(bokehPass);

  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.1, 0.34, 0.92);
  composer.addPass(bloom);

  const film = new ShaderPass(FilmGradeShader);
  film.material.uniforms.resolution.value.set(innerWidth, innerHeight);
  composer.addPass(film);

  const smaaPass = new SMAAPass(innerWidth * renderer.getPixelRatio(), innerHeight * renderer.getPixelRatio());
  composer.addPass(smaaPass);

  composer.addPass(new OutputPass());

  function applyTier(tierName) {
    const t = tierName || (quality && quality.tier) || 'HIGH';
    ssaoPass.enabled = t === 'HIGH';
    bokehPass.enabled = t === 'HIGH';
    smaaPass.enabled = t !== 'LOW';
    film.enabled = t !== 'LOW';
  }
  applyTier();
  if (quality && typeof quality.onChange === 'function') {
    quality.onChange((_tier, tierName) => applyTier(tierName));
  }

  function resize(w, h) {
    const width = w || innerWidth;
    const height = h || innerHeight;
    composer.setSize(width, height);
    ssaoPass.setSize(width, height);
    bokehPass.uniforms.aspect.value = width / height;
    smaaPass.setSize(width * renderer.getPixelRatio(), height * renderer.getPixelRatio());
    film.material.uniforms.resolution.value.set(width, height);
  }

  function update(t, focusDistance) {
    film.material.uniforms.time.value = t;
    if (focusDistance !== undefined) bokehPass.uniforms.focus.value = focusDistance;
  }

  function setFilmGrade(opts = {}) {
    const u = film.material.uniforms;
    if (opts.grainAmount !== undefined) u.grainAmount.value = opts.grainAmount;
    if (opts.aberration !== undefined) u.aberration.value = opts.aberration;
    if (opts.vignetteStrength !== undefined) u.vignetteStrength.value = opts.vignetteStrength;
    if (opts.vignetteSoftness !== undefined) u.vignetteSoftness.value = opts.vignetteSoftness;
    if (opts.barrel !== undefined) u.barrel.value = opts.barrel;
    if (opts.lift) u.lift.value.set(opts.lift[0], opts.lift[1], opts.lift[2]);
    if (opts.gamma) u.gamma.value.set(opts.gamma[0], opts.gamma[1], opts.gamma[2]);
    if (opts.gain) u.gain.value.set(opts.gain[0], opts.gain[1], opts.gain[2]);
  }

  return {
    composer, bloom, film, ssaoPass, bokehPass, smaaPass,
    resize, update, setFilmGrade, applyTier
  };
}
