import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== RUNNING SGI BUILD PATCH FOR VERCEL ===");

const distDir = path.join(__dirname, 'dist');
const distAssetsDir = path.join(distDir, 'assets');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(distAssetsDir, { recursive: true });
}

// Copy root assets/index-CA1zPuPl.js to dist/assets/index-CA1zPuPl.js
const sourceBundle = path.join(__dirname, 'assets', 'index-CA1zPuPl.js');
const targetBundle = path.join(distAssetsDir, 'index-CA1zPuPl.js');

if (fs.existsSync(sourceBundle)) {
  fs.copyFileSync(sourceBundle, targetBundle);
  console.log("SUCCESSFULLY COPIED PATCHED BUNDLE TO DIST:", targetBundle);
} else {
  console.error("SOURCE BUNDLE NOT FOUND AT:", sourceBundle);
}

// Copy index.html to dist/index.html
const sourceHtml = path.join(__dirname, 'index.html');
const targetHtml = path.join(distDir, 'index.html');
if (fs.existsSync(sourceHtml)) {
  fs.copyFileSync(sourceHtml, targetHtml);
  console.log("SUCCESSFULLY COPIED INDEX.HTML TO DIST:", targetHtml);
}

// Copy css to dist/css if exists
const sourceCss = path.join(__dirname, 'css');
const targetCss = path.join(distDir, 'css');
if (fs.existsSync(sourceCss)) {
  fs.cpSync(sourceCss, targetCss, { recursive: true });
  console.log("COPIED CSS TO DIST");
}

// Copy js to dist/js if exists
const sourceJs = path.join(__dirname, 'js');
const targetJs = path.join(distDir, 'js');
if (fs.existsSync(sourceJs)) {
  fs.cpSync(sourceJs, targetJs, { recursive: true });
  console.log("COPIED JS TO DIST");
}

console.log("=== VERCEL BUILD PATCH COMPLETED SUCCESSFULLY ===");
