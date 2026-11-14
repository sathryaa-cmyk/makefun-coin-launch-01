// MakeFun Ghost — the make.fun coin-launch entry.
//
// The agent already created the coin on pump.fun. This program is the
// entry's hand-off to the grader: it takes the launch record
// (LAUNCH.json: the coin's mint address plus the base58 signature of the
// transaction that created it) from the repository and places a copy in
// the output directory, where the gate reads it.
//
// Nothing here touches the network or the chain. It only moves one file.
// The coin's name is MakeFun Ghost (GHOST); its metadata description
// carries the sentence the competition requires.
//
// Local run (the grader's /bot and /output become these two variables):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

function fail(message) {
  console.error(message);
  process.exit(1);
}

const repoRoot = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const launchRecord = join(repoRoot, 'LAUNCH.json');
const launchCopy = join(outDir, 'LAUNCH.json');

if (!existsSync(launchRecord)) {
  fail(`no LAUNCH.json in ${repoRoot} — nothing to hand to the grader`);
}

mkdirSync(outDir, { recursive: true });

try {
  copyFileSync(launchRecord, launchCopy);
} catch (error) {
  fail(`could not copy LAUNCH.json to ${outDir}: ${error.message}`);
}
