import { readFile } from 'node:fs/promises';

const manifestPath = new URL('../src/data/release-manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const requiredIntegerFields = ['versionCode', 'minSdk', 'targetSdk'];

if (typeof manifest.versionName !== 'string' || manifest.versionName.length === 0) {
  throw new Error('release-manifest.json requires versionName.');
}

for (const field of requiredIntegerFields) {
  if (!Number.isInteger(manifest[field])) {
    throw new Error(`release-manifest.json requires integer ${field}.`);
  }
}

if (!manifest.distributions?.play?.applicationId || !manifest.distributions?.community?.applicationId) {
  throw new Error('release-manifest.json requires Play and Community distributions.');
}

console.log(`Release manifest valid: v${manifest.versionName} (${manifest.versionCode})`);
