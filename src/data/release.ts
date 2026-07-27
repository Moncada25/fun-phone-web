import bundledRelease from './release-manifest.json';

export interface ReleaseManifest {
  versionName: string;
  versionCode: number;
  minSdk: number;
  targetSdk: number;
  distributions: {
    community: {
      applicationId: string;
      firebase: boolean;
    };
    play: {
      applicationId: string;
      firebase: boolean;
    };
  };
  coreCapabilities: string[];
  optionalTools: string[];
}

function parseReleaseManifest(rawManifest: string | undefined): ReleaseManifest {
  const candidate = rawManifest ? JSON.parse(rawManifest) : bundledRelease;
  if (
    typeof candidate.versionName !== 'string' ||
    !Number.isInteger(candidate.versionCode) ||
    !Number.isInteger(candidate.minSdk) ||
    !Number.isInteger(candidate.targetSdk)
  ) {
    throw new Error('Invalid Fun Phone release manifest.');
  }
  return candidate as ReleaseManifest;
}

const androidVersionByApi: Record<number, string> = {
  28: '9',
  29: '10',
  30: '11',
  31: '12',
  32: '12L',
  33: '13',
  34: '14',
  35: '15',
  36: '16',
  37: '17',
};

export const release = parseReleaseManifest(process.env.FUN_PHONE_RELEASE_MANIFEST_JSON);
export const releaseLabel = `v${release.versionName}`;
export const releaseBuildLabel = `${releaseLabel} · build ${release.versionCode}`;
export const releaseMajorMinorLabel = `v${release.versionName.split('.').slice(0, 2).join('.')}`;
export const minimumAndroidLabel = `Android ${androidVersionByApi[release.minSdk] ?? `API ${release.minSdk}`}+`;
