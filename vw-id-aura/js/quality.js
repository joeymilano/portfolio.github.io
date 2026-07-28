/* ============================================================
   ID.AURA — Quality tiers
   One-shot GPU probe (renderer string heuristics) + a rolling
   frame-time sampler that auto-demotes the tier if the device
   can't hold the budget. Consumed by scene.js (dpr, postfx
   pass toggles) and by cluster/console modules (particle counts,
   map extrusion/shader detail).
   Tiers: HIGH (dpr 2, all passes) · MID (dpr 1.5, drop SSAO+DOF)
   · LOW (dpr 1, bloom+SMAA only).
   Contract: { tier, dprCap, ssao, dof, sample(dt), onChange(cb) }
   ============================================================ */

const TIERS = {
  HIGH: { dprCap: 2,   ssao: true,  dof: true,  particles: 1,    label: 'HIGH' },
  MID:  { dprCap: 1.5, ssao: false, dof: false, particles: 0.6,  label: 'MID' },
  LOW:  { dprCap: 1,   ssao: false, dof: false, particles: 0.28, label: 'LOW' }
};

const FRAME_BUDGET_MS = 18;   // demote if avg frame > this for a sustained window
const SAMPLE_WINDOW = 60;     // frames
const WARMUP_FRAMES = 40;     // ignore load-time jank before judging

function probeGpuTier() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'LOW';
    const dbg = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = (dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)) || '';
    const r = String(renderer).toLowerCase();

    // Low-power / integrated signals.
    if (/(intel|mali|adreno[- ]?[1-5]\d\d|powervr|swiftshader|software)/.test(r)) return 'MID';
    // Apple Silicon + discrete desktop/laptop GPUs read as HIGH.
    if (/(apple m\d|apple gpu|nvidia|geforce|rtx|gtx|radeon|amd)/.test(r)) return 'HIGH';

    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    if (isMobile) return 'MID';
    if (cores <= 4) return 'MID';
    return 'HIGH';
  } catch {
    return 'MID';
  }
}

export function createQuality() {
  let tierName = probeGpuTier();
  let tier = TIERS[tierName];
  const cbs = [];
  const frames = [];
  let framesSeen = 0;
  let demoted = false;

  function setTier(name) {
    if (name === tierName || !TIERS[name]) return;
    tierName = name;
    tier = TIERS[name];
    cbs.forEach((cb) => cb(tier, tierName));
  }

  // Called once per rAF frame with delta-time in seconds.
  function sample(dt) {
    framesSeen++;
    if (framesSeen <= WARMUP_FRAMES) return;
    frames.push(dt * 1000);
    if (frames.length > SAMPLE_WINDOW) frames.shift();
    if (!demoted && frames.length === SAMPLE_WINDOW) {
      const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
      if (avg > FRAME_BUDGET_MS) {
        demoted = true;
        if (tierName === 'HIGH') setTier('MID');
        else if (tierName === 'MID') setTier('LOW');
      }
    }
  }

  return {
    get tier() { return tierName; },
    get dprCap() { return tier.dprCap; },
    get ssao() { return tier.ssao; },
    get dof() { return tier.dof; },
    get particleScale() { return tier.particles; },
    sample,
    onChange(cb) { cbs.push(cb); },
    setTier // manual override, e.g. from a debug/QA control
  };
}
