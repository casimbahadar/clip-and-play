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
  const { id, audio } = e.data || {};
  try {
    if (!asr) asr = await load(id);
    postMessage({ id, type: 'listening' });
    const out = await asr(audio, { return_timestamps: 'word', chunk_length_s: 30, stride_length_s: 5 });
    const words = (out && out.chunks || []).map(c => ({ w: c.text, s: c.timestamp && c.timestamp[0], e: c.timestamp && c.timestamp[1] }));
    postMessage({ id, type: 'done', words });
  } catch (err) {
    postMessage({ id, type: 'error', message: String((err && err.message) || err) });
  }
};
