// Dźwięk końca czasu (wibracje nie działają w Safari na iOS).
// iOS pozwala grać dźwięk dopiero po dotknięciu ekranu, więc kontekst odblokowujemy przy każdym dotyku.
let ctx = null;

export function odblokujDzwiek() {
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state !== 'running') {
      ctx.resume();
      const cisza = ctx.createBufferSource();
      cisza.buffer = ctx.createBuffer(1, 1, 22050);
      cisza.connect(ctx.destination);
      cisza.start(0);
    }
  } catch {
    // brak Web Audio — zostaje samo miganie ekranu
  }
}

export function alarm() {
  if (!ctx) return;
  try {
    const t0 = ctx.currentTime;
    [0, 0.25, 0.5, 1.1, 1.35, 1.6].forEach((d, k) => {
      const osc = ctx.createOscillator();
      const glosnosc = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = k % 3 === 2 ? 1175 : 880;
      glosnosc.gain.setValueAtTime(0.0001, t0 + d);
      glosnosc.gain.exponentialRampToValueAtTime(0.25, t0 + d + 0.02);
      glosnosc.gain.exponentialRampToValueAtTime(0.0001, t0 + d + 0.2);
      osc.connect(glosnosc).connect(ctx.destination);
      osc.start(t0 + d);
      osc.stop(t0 + d + 0.22);
    });
  } catch {
    // ignorujemy — miganie i tak się pokaże
  }
}
