import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

const from = resolve("dist", "particle-cloud-card.js");
const to = resolve("particle-cloud-card.js");

copyFileSync(from, to);
console.log(`Copied ${from} -> ${to}`);
