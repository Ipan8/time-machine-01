// Funniest Time Machine Warning Label — make.fun entry.
//
// The joke: a warning label for a time machine has to cover the three
// classic ways a tourist breaks causality in one breath — meeting your
// past self, erasing your own grandfather, and fiddling with the big
// red button — then shrug at the end with a warranty disclaimer, as if
// a paradox were just a manufacturing defect. The humour lands because
// the label treats the end of the universe like a terms-of-service
// footnote. Keep it deadpan: no exclamation marks, no extra flair,
// just three bans and a voided warranty.
//
// Approach: build the label from small named parts instead of one long
// literal, so every clause can be checked on its own. A guard then
// rejects the label if it ever grows past the 200-character limit,
// and the final step writes it to the file the grader reads.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = "/output";
const OUT_FILE = "/output/entry.txt";
const MAX_CHARS = 200;

// The three bans, in escalating order of bad idea.
const BANS: string[] = [
  "Do not meet yourself.",
  "Do not kill your grandfather.",
  "Do not press the red button twice.",
];

// The punchline: the warranty gives up before you do.
const DISCLAIMER = "Warranty void if paradox occurs.";

// Join the header, the bans and the disclaimer into one label.
function buildLabel(): string {
  const parts = ["WARNING:", ...BANS, DISCLAIMER];
  return parts.join(" ");
}

// Sanity check: every ban must survive assembly — if a clause goes
// missing the joke loses a leg, so fail loudly instead of shipping
// a label that only warns about two of the three disasters.
function verifyBans(label: string): void {
  for (const ban of BANS) {
    if (!label.includes(ban)) {
      throw new Error(`Label is missing a ban: ${ban}`);
    }
  }
  if (!label.includes(DISCLAIMER)) {
    throw new Error("Label is missing the warranty disclaimer.");
  }
}

// Refuse to ship a label that busts the character limit.
function checkLength(label: string): void {
  if (label.length > MAX_CHARS) {
    throw new Error(
      `Label is ${label.length} chars, over the ${MAX_CHARS} limit.`,
    );
  }
}

// Write the finished label, with a trailing newline, to the output file.
function saveLabel(label: string): void {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, label + "\n", "utf8");
}

function main(): void {
  const label = buildLabel();
  verifyBans(label);
  checkLength(label);
  saveLabel(label);
  console.log(`Wrote ${label.length}-char label to ${OUT_FILE}`);
}

main();
