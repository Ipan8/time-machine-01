import * as fs from "fs";

// Funniest Time Machine Warning Label — make.fun entry
// The entry line is the funniest warning label for a time machine.
// Character count: 128 (limit 200).
const entry =
  "WARNING: Do not meet yourself. Do not kill your grandfather. Do not press the red button twice. Warranty void if paradox occurs.";

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", entry + "\n");
console.log("Entry written to /output/entry.txt");
