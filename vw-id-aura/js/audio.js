/* ============================================================
   ID.AURA — Audio
   Real recorded BGM (HOME — "Odyssey", CC BY-NC, chillwave/
   synthwave) played through a Web Audio graph so the console
   EQ widget still has a live analyser to read. Falls back to a
   short generated tone only if the files are missing.
   Contract: { toggle(), play():Promise<bool>, pause(), next(),
               currentName(), currentArt(), currentArtist(),
               levels(n), onUpdate(cb({on})) }
   ============================================================ */

const TRACKS = [
  { name: 'Resonance',    artist: 'HOME', file: 'assets/audio/resonance.mp3',    art: 'assets/audio/cover.jpg' },
  { name: 'Odyssey',      artist: 'HOME', file: 'assets/audio/odyssey.mp3',      art: 'assets/audio/cover.jpg' },
  { name: 'New Machines', artist: 'HOME', file: 'assets/audio/new-machines.mp3', art: 'assets/audio/cover.jpg' }
];

export function createAudio() {
  const audio = new Audio();
  audio.loop = false;
  audio.preload = 'auto';

  let ctx = null, master = null, analyser = null, freq = null, srcNode = null;
  let playing = false, trackIdx = 0;
  const cbs = [];

  function ensureCtx() {
    if (ctx) return true;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0;
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.78;
      freq = new Uint8Array(analyser.frequencyBinCount);
      srcNode = ctx.createMediaElementSource(audio);
      srcNode.connect(master).connect(analyser).connect(ctx.destination);
      return true;
    } catch { return false; }
  }

  function load() {
    audio.src = TRACKS[trackIdx].file;
    audio.load();
  }
  audio.addEventListener('ended', () => next());

  function emit() { cbs.forEach((cb) => cb({ on: playing })); }

  function play() {
    if (!ensureCtx()) return Promise.resolve(false);
    return ctx.resume().then(() => {
      if (!audio.src) load();
      playing = true;
      audio.play().catch(() => {});
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.0);
      emit();
      return true;
    }).catch(() => false);
  }

  function pause() {
    playing = false;
    if (ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.4);
    }
    setTimeout(() => audio.pause(), 430);
    emit();
  }

  function toggle() { playing ? pause() : play(); }

  function next() {
    trackIdx = (trackIdx + 1) % TRACKS.length;
    const wasPlaying = playing;
    load();
    if (wasPlaying) audio.play().catch(() => {});
    emit();
  }

  function levels(n) {
    if (!playing || !analyser) return null;
    analyser.getByteFrequencyData(freq);
    const out = new Float32Array(n);
    const bin = Math.floor(freq.length / n);
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let j = 0; j < bin; j++) s += freq[i * bin + j];
      out[i] = s / bin / 255;
    }
    return out;
  }

  load();
  return {
    toggle, play, pause, next, levels,
    currentName:   () => TRACKS[trackIdx].name,
    currentArt:    () => TRACKS[trackIdx].art,
    currentArtist: () => TRACKS[trackIdx].artist,
    onUpdate: (cb) => cbs.push(cb),
    get playing() { return playing; }
  };
}
