// Clip & Play auto-sync worker. Runs a speech AI (Whisper, via transformers.js) in the background so the
// page stays responsive. On first use it downloads the library from jsDelivr and the model from Hugging Face;
// the browser keeps both, so later songs start faster. Audio is processed here on the device, never uploaded.
const LIB = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/transformers.min.js';
const MODEL = 'onnx-community/whisper-base_timestamped';
let asr = null;

async function load(id){
  const T = await import(LIB);
  T.env.allowLocalModels = false;
  const files = {};
  const progress_callback = p => {
    if (p && p.status === 'progress' && p.file){
      files[p.file] = { loaded: p.loaded || 0, total: p.total || 0 };
      let loaded = 0, total = 0; for (const f of Object.values(files)){ loaded += f.loaded; total += f.total; }
      postMessage({ id, type: 'progress', loaded, total });
    }
  };
  // Smallest compressed versions first, to stay inside a phone's memory limit. The full-size version is
  // deliberately not used: it's several times larger and phones close the app when it loads.
  let lastErr;
  for (const dtype of [{ encoder_model: 'q8', decoder_model_merged: 'q4' }, 'q8', 'uint8']){
    try { return await T.pipeline('automatic-speech-recognition', MODEL, { device: 'wasm', dtype, progress_callback }); }
    catch (e) { lastErr = e; }
  }
  throw lastErr;
}

self.onmessage = async e => {
  const { id, audio, light } = e.data || {};
  try {
    if (!asr) asr = await load(id);
    // Listen in 30-second pieces, one at a time, so the AI's working memory is released after each piece
    // instead of building up over the whole song. On phones ("light"), ask for phrase timing instead of
    // word timing: word timing keeps much more data in memory while it works.
    const RATE = 16000, PIECE = 30 * RATE, total = audio.length / RATE, words = [];
    for (let start = 0; start < audio.length; start += PIECE){
      const offset = start / RATE;
      postMessage({ id, type: 'listening', done: offset, total });
      const out = await asr(audio.subarray(start, Math.min(audio.length, start + PIECE)), { return_timestamps: light ? true : 'word' });
      for (const c of (out && out.chunks) || []){
        const ts = c.timestamp || [];
        if (typeof ts[0] !== 'number') continue;
        words.push({ w: c.text, s: ts[0] + offset, e: typeof ts[1] === 'number' ? ts[1] + offset : undefined });
      }
    }
    postMessage({ id, type: 'done', words });
  } catch (err) {
    postMessage({ id, type: 'error', message: String((err && err.message) || err) });
  }
};
