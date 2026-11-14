// MakeFun Ghost — makefun-coin-launch-01 entry (Node 22, standard library only).
//
// The coin itself was already launched on pump.fun by the agent. This
// program only hands the launch record to the grader: it copies
// LAUNCH.json from the repository root into the output directory, where
// the gate reads the mint and the create transaction's signature.
//
// LAUNCH.json holds:
//   { "mint": "<coin mint address>", "create_signature": "<create tx signature>" }
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const sourceFile = join(botDir, 'LAUNCH.json');
const targetFile = join(outputDir, 'LAUNCH.json');

// The grader reads the launch record from the output directory, so this
// copy is the entry's whole job: the mint and the create signature in
// LAUNCH.json are what the house checks against the chain.
if (!existsSync(sourceFile)) {
  console.error(`LAUNCH.json not found in ${botDir}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

try {
  copyFileSync(sourceFile, targetFile);
} catch (err) {
  console.error(`Failed to copy LAUNCH.json to ${outputDir}: ${(err as Error).message}`);
  process.exit(1);
}
