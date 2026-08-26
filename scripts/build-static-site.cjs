const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "index.html");
const outputDir = path.join(root, "dist");
const output = path.join(outputDir, "index.html");

if (!fs.existsSync(source)) {
  throw new Error(`Missing static site entrypoint: ${source}`);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(source, output);
console.log(`Built static site: ${path.relative(root, output)}`);
