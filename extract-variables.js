import * as sass from "sass";
import { readFileSync, writeFileSync } from "fs";

// Compile SCSS to ensure variables are processed
try {
  sass.compile("./utils/variables.scss", {
    loadPaths: ["./utils"], // Resolve @use "./functions"
    style: "expanded",
  });
} catch (error) {
  console.error("Error compiling SCSS:", error);
  process.exit(1);
}

// Parse variables from SCSS content
const scssContent = readFileSync("./utils/variables.scss", "utf-8");
// Join lines to handle multi-line values, remove comments
const cleanedContent = scssContent
  .replace(/\/\/.*$/gm, "") // Remove single-line comments
  .replace(/\/\*[\s\S]*?\*\//g, "") // Remove multi-line comments
  .split("\n")
  .map(line => line.trim())
  .join(" ");

// Match variables, capturing complex values until semicolon
const variableRegex = /\$([a-zA-Z0-9-]+)\s*:\s*([^;]*?);/g;
const extractedVariables = {};
const baseFontSize = 16; // Matches rem function's 16px base

let match;
while ((match = variableRegex.exec(cleanedContent)) !== null) {
  const [, scssKey, value] = match;
  // Convert kebab-case to camelCase for TypeScript
  const key = scssKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
  // Colors
  if (
    key.startsWith("white") ||
    key.startsWith("black") ||
    key.includes("blue") ||
    key.startsWith("grey") ||
    key.includes("primary") ||
    key.includes("normal") ||
    key.includes("success") ||
    key.includes("warning") ||
    key.includes("danger") ||
    key.includes("info") ||
    key === "link"
  ) {
    // Remove !important and trim
    extractedVariables[key] = value.replace(/!important/, "").trim();
  }
  // Typography: rem($pixels) -> ($pixels / 16) * 1rem, convert to pixels
  else if (key.startsWith("body") || key.startsWith("h")) {
    const remMatch = value.match(/rem\((\d+)\)/);
    extractedVariables[key] = remMatch ? parseFloat(remMatch[1]) : parseFloat(value) * baseFontSize;
  }
  // Breakpoints: em units, convert to pixels
  else if (key.startsWith("min") || key.startsWith("max")) {
    const emMatch = value.match(/([\d.]+)em/);
    extractedVariables[key] = emMatch
      ? Math.round(parseFloat(emMatch[1]) * baseFontSize)
      : key === "maxExtraLargeDesktop"
      ? null
      : parseFloat(value);
  }
  // Shadows: preserve complex values with commas
  else if (key.startsWith("shadow")) {
    extractedVariables[key] = value.trim();
  }
  // Transitions
  else if (key.startsWith("transition")) {
    extractedVariables[key] = value.trim();
  }
}

const tsContent = `
export const variables = ${JSON.stringify(extractedVariables, null, 2).replace(/"([^"]+)":/g, "$1:")} as const;

export type Variables = {
  whiteOne: string;
  whiteTwo: string;
  whiteThree: string;
  whiteFour: string;
  whiteFive: string;
  blackOne: string;
  blackTwo: string;
  blackThree: string;
  blackFour: string;
  blueOne: string;
  blueOneComplimentary: string;
  blueOneComplimentaryTwo: string;
  greyOne: string;
  greyTwo: string;
  greyThree: string;
  greyFour: string;
  primary: string;
  primaryHover: string;
  primaryDisabled: string;
  normal: string;
  normalHover: string;
  normalDisabled: string;
  success: string;
  successHover: string;
  successDisabled: string;
  warning: string;
  warningHover: string;
  warningDisabled: string;
  danger: string;
  dangerHover: string;
  dangerDisabled: string;
  info: string;
  infoHover: string;
  infoDisabled: string;
  link: string;
  body: number;
  h0: number;
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  minMobile: number;
  maxMobile: number;
  minTablet: number;
  maxTable: number;
  minSmallDesktop: number;
  maxSmallDesktop: number;
  minLargeDesktop: number;
  maxLargeDesktop: number;
  minExtraLargeDesktop: number;
  maxExtraLargeDesktop: null;
  shadowGradient: string;
  shadowOne: string;
  shadowTwo: string;
  shadowThree: string;
  shadowFour: string;
  shadowFive: string;
  shadowSix: string;
  shadowSeven: string;
  shadowEight: string;
  transitionOne: string;
  transitionTwo: string;
  transitionThree: string;
};
`;

writeFileSync("./utils/typescript-variables/variables.ts", tsContent);
console.log("Generated variables.ts successfully");