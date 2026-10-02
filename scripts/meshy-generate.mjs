// Generates the hero's 3D character with Meshy (text-to-3D) and saves it as a .glb.
//
//   setx MESHY_API_KEY "msy_..."   (once, then reopen the terminal)
//   npm run model
//
// Meshy works in two steps: "preview" builds the shape, "refine" paints the textures.
// Both spend Meshy credits. The key is read from the environment and never written anywhere.

import { mkdir, writeFile } from "node:fs/promises";

const KEY = process.env.MESHY_API_KEY;
const API = "https://api.meshy.ai/openapi/v2/text-to-3d";
const OUT = "public/models/spirit.glb";
const PREVIEW_IMG = "scripts/out/spirit-thumbnail.png";

// No-Face (Kaonashi) from Spirited Away, described visually
const PROMPT =
  "Cute stylized spirit character from a Japanese hand-drawn anime film, standing upright, full body, front facing. " +
  "Tall smooth rounded body like a soft black hooded cloak, slightly translucent shadowy black. " +
  "Flat white oval porcelain mask as the face, two small dark eye holes with a purple mark above and below each eye, " +
  "a small thin dark mouth line. Small thin arms hanging at the sides. Simple soft shapes, clean silhouette, no base, no background.";

if (!KEY) {
  console.error('No MESHY_API_KEY found. Run:  setx MESHY_API_KEY "your-key"  then reopen the terminal.');
  process.exit(1);
}

const headers = { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" };

async function call(method, url, body) {
  const res = await fetch(url, { method, headers, body: body && JSON.stringify(body) });
  const text = await res.text();
  if (!res.ok) throw new Error(`Meshy ${method} ${url} -> ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function waitFor(id, label) {
  for (;;) {
    const t = await call("GET", `${API}/${id}`);
    process.stdout.write(`\r${label}: ${t.status} ${t.progress ?? 0}%   `);
    if (t.status === "SUCCEEDED") return (process.stdout.write("\n"), t);
    if (t.status === "FAILED" || t.status === "CANCELED") throw new Error(`${label} ${t.status}: ${JSON.stringify(t.task_error ?? t)}`);
    await new Promise((r) => setTimeout(r, 5000));
  }
}

async function download(url, path) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${res.status} for ${path}`);
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
}

const { result: previewId } = await call("POST", API, {
  mode: "preview",
  prompt: PROMPT,
  art_style: "realistic",
  should_remesh: true,
  topology: "triangle",
  target_polycount: 30000,
});
console.log("preview task", previewId);
await waitFor(previewId, "shape");

const { result: refineId } = await call("POST", API, { mode: "refine", preview_task_id: previewId, enable_pbr: false });
console.log("refine task", refineId);
const done = await waitFor(refineId, "textures");

await mkdir("public/models", { recursive: true });
await mkdir("scripts/out", { recursive: true });
await download(done.model_urls.glb, OUT);
if (done.thumbnail_url) await download(done.thumbnail_url, PREVIEW_IMG);
console.log(`saved ${OUT}${done.thumbnail_url ? ` and ${PREVIEW_IMG}` : ""}`);
