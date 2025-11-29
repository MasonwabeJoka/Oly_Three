import "tsconfig-paths/register.js";

import * as sass from "sass";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const variablesPath = resolve(__dirname, "utils/variables.scss");

// Custom importer so Sass understands "@/utils/..."
const aliasImporter = {
  findFileUrl(url) {
    if (url.startsWith("@/")) {
      const relativePath = url.slice(2); // remove "@/"
      const fullPath = resolve(__dirname, relativePath);
      // Try with .scss extension if missing
      const candidate = fullPath.endsWith(".scss") ? fullPath : `${fullPath}.scss`;
      try {
        // Just check if file exists (fs.accessSync would be sync, we fake it with URL)
        return new URL(`file://${candidate}`);
      } catch {
        return null;
      }
    }
    return null;
  },
};

// 1. Compile SCSS — now @/ works perfectly
try {
  sass.compile(variablesPath, {
    loadPaths: ["."],
    importers: [aliasImporter],
    style: "expanded",
  });
  console.log("SCSS compiled successfully");
} catch (err) {
  console.error("SCSS compilation failed:", err.message);
  process.exit(1);
}

// 2. Parse variables (your existing parser — unchanged)
const content = readFileSync(variablesPath, "utf-8");

const variableMap = new Map();
let currentName = "";
let currentValue = "";

for (const rawLine of content.split("\n")) {
  let line = rawLine.trim();
  if (!line || line.startsWith("//") || line.startsWith("/*") || line.startsWith("@")) continue;

  if (line.startsWith("$") && line.includes(":")) {
    if (currentName) variableMap.set(currentName, currentValue.trim());

    const colonIdx = line.indexOf(":");
    currentName = line.slice(0, colonIdx).trim();
    let rest = line.slice(colonIdx + 1).trim().replace(/[;!\w]+$/, "").trim();

    if (rest.endsWith(",")) {
      currentValue = rest.slice(0, -1);
    } else {
      variableMap.set(currentName, rest);
      currentName = currentValue = "";
    }
  } else if (currentName) {
    if (line.endsWith(",")) {
      currentValue += " " + line.slice(0, -1);
    } else {
      currentValue += " " + line.replace(";", "");
      variableMap.set(currentName, currentValue.trim());
      currentName = currentValue = "";
    }
  }
}
if (currentName) variableMap.set(currentName, currentValue.trim());

// 3. Convert to camelCase + process values
const extracted = {};
const baseFontSize = 16;
const toCamelCase = (s) => s.replace("$", "").replace(/-([a-z])/g, (_, l) => l.toUpperCase());

for (const [name, value] of variableMap) {
  const key = toCamelCase(name);
  let val = value.replace(/!default|!important/g, "").trim();

  if (/white|black|blue|grey|primary|normal|success|warning|danger|info|link|shadow|transition/.test(key)) {
    extracted[key] = val;
  } else if (/^(body|h\d)$/.test(key)) {
    const m = val.match(/rem\((\d+)\)/);
    extracted[key] = m ? Number(m[1]) : Number(val) * baseFontSize;
  } else if (key.startsWith("min") || key.startsWith("max")) {
    const m = val.match(/([\d.]+)em/);
    extracted[key] = m ? Math.round(Number(m[1]) * baseFontSize) : val === "null" ? null : val;
  } else {
    extracted[key] = val;
  }
}

// 4. Write TS file
const ts = `// Auto-generated — do not edit
export const variables = ${JSON.stringify(extracted, null, 2).replace(/"([^"]+)":/g, "$1:")} as const;

export type Variables = typeof variables;
`;

writeFileSync("./utils/typescript-variables/variables.ts", ts.trim() + "\n");
console.log("variables.ts generated successfully!");