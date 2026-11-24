// One Line, One Minute: The Vending Machine Pickup Line Contest
// A vending machine flirts with a passing human, in one line.
// Writes the line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
// Deterministic: no clock reads, no randomness, no network, no secrets.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I only take exact change, but for you I'll drop something sweet — press B4 and let my coils do the flirting.";

function validate(line: string): void {
  // Count Unicode code points, so multi-byte characters count as one.
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  // Round-trip through UTF-8 to prove the line is valid UTF-8 text.
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("entry line is not valid UTF-8 text");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
