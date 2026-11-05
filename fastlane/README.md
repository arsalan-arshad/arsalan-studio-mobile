# Fastlane — Arsalan Studio Mobile

Package ID: **`studio.arsalan.app`**

Builds are done with **Expo EAS**. Fastlane lanes wrap `eas build` / `eas submit` so release steps stay familiar if you already use Fastlane.

## Setup

```bash
bundle install
npm install
npm i -g eas-cli   # or use npx eas-cli
eas login
eas init           # write real projectId into app.json
```

## Lanes

| Lane | What it does |
|---|---|
| `fastlane ios typecheck` | `npm run typecheck` |
| `fastlane ios preview` | EAS preview build (iOS) |
| `fastlane ios build` | EAS production build (iOS) |
| `fastlane ios beta` | Production build + `eas submit` (ASC) |
| `fastlane android preview` | EAS preview build |
| `fastlane android build` | EAS production build |
| `fastlane android beta` | Production build + Play submit |

## Credentials (env only — never commit)

### Expo / CI

| Variable | Notes |
|---|---|
| `EXPO_TOKEN` | [expo.dev access token](https://expo.dev/settings/access-tokens) for CI |

### Apple / App Store Connect

Configure via `eas credentials` or ASC API key for submit:

| Variable | Notes |
|---|---|
| `FASTLANE_APPLE_ID` | Apple ID email (optional for Appfile) |
| `FASTLANE_TEAM_ID` | Developer Team ID |
| `FASTLANE_ITC_TEAM_ID` | App Store Connect team |
| `ASC_KEY_ID` | App Store Connect API Key ID |
| `ASC_ISSUER_ID` | Issuer ID |
| `ASC_KEY_PATH` | Path to `.p8` (gitignored) |

Or let EAS manage Apple credentials interactively once, then reuse in CI with `EXPO_TOKEN`.

### Google Play

| Variable | Notes |
|---|---|
| `GOOGLE_PLAY_JSON_KEY_PATH` | Service account JSON path (gitignored) |

Wire the same path into `eas.json` submit config when you enable store submit.

## Alternative: prebuild + native Fastlane

If you need classic Gym/Gradle lanes instead of EAS:

```bash
npx expo prebuild
# then add ios/ / android/ Fastlane projects — those folders are gitignored by default
```

Prefer staying on EAS unless you have a hard requirement for local signing.
