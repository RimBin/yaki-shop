import fs from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const SOURCE_ROOT = path.join(process.cwd(), 'public', 'assets', 'evaluator');
const OUTPUT_ROOT = path.join(process.cwd(), 'public', 'assets', 'evaluator-framed');
const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function parsePointLabel(label) {
  const match = label.match(/^(\d+)\.(\d+)$/);
  if (!match) {
    return null;
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
  };
}

function shouldFramePoint(label) {
  const point = parsePointLabel(label);
  if (!point) {
    return false;
  }

  return point.major < 9 || (point.major === 9 && point.minor <= 1);
}

function formatLabelFromPath(relativePath) {
  const baseName = path.basename(relativePath, path.extname(relativePath));
  return baseName
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function* walk(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }

    yield fullPath;
  }
}

function buildSvgOverlay({ pointLabel, screenshotLabel, width, height }) {
  const safePointLabel = escapeHtml(pointLabel);
  const safeScreenshotLabel = escapeHtml(screenshotLabel || 'Screenshot');

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#EEF2F6"/>
          <stop offset="100%" stop-color="#E4E9EF"/>
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#F8FAFC"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" rx="36" fill="url(#bg)"/>
      <rect x="48" y="42" width="${width - 96}" height="${height - 84}" rx="34" fill="url(#panel)" stroke="#D8E0EA" stroke-width="2"/>
      <rect x="80" y="74" width="184" height="38" rx="19" fill="#161616"/>
      <text x="172" y="98" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">Punktas ${safePointLabel}</text>
      <text x="80" y="152" font-family="Segoe UI, Arial, sans-serif" font-size="36" font-weight="700" fill="#111827">${safeScreenshotLabel}</text>
      <text x="80" y="184" font-family="Segoe UI, Arial, sans-serif" font-size="18" fill="#5F6B7A">Vienodintas evaluator irodymo kadras</text>
      <rect x="80" y="220" width="${width - 160}" height="${height - 300}" rx="24" fill="#FFFFFF" stroke="#D8E0EA" stroke-width="2"/>
      <rect x="80" y="${height - 58}" width="260" height="10" rx="5" fill="#D8E0EA" opacity="0.65"/>
    </svg>
  `);
}

async function createFramedScreenshot(sourcePath, outputPath, pointLabel) {
  const width = 1800;
  const height = 1280;
  const screenshotLabel = formatLabelFromPath(path.relative(SOURCE_ROOT, sourcePath));

  const overlay = buildSvgOverlay({
    pointLabel,
    screenshotLabel,
    width,
    height,
  });

  const composedImage = await sharp(sourcePath)
    .resize({
      width: width - 240,
      height: height - 420,
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 238, g: 242, b: 246, alpha: 1 },
    },
  })
    .composite([
      { input: overlay, top: 0, left: 0 },
      { input: composedImage, top: 252, left: 120 },
    ])
    .png()
    .toFile(outputPath);
}

async function main() {
  let generatedCount = 0;

  for await (const sourcePath of walk(SOURCE_ROOT)) {
    const extension = path.extname(sourcePath).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.has(extension)) {
      continue;
    }

    const relativePath = path.relative(SOURCE_ROOT, sourcePath);
    const firstSegment = relativePath.split(path.sep)[0];

    if (!shouldFramePoint(firstSegment)) {
      continue;
    }

    const outputPath = path.join(OUTPUT_ROOT, relativePath).replace(/\.(jpg|jpeg|webp)$/i, '.png');
    await createFramedScreenshot(sourcePath, outputPath, firstSegment);
    generatedCount += 1;
    console.log(`Generated ${path.relative(process.cwd(), outputPath)}`);
  }

  console.log(`Done. Generated ${generatedCount} framed evaluator screenshots.`);
}

await main();