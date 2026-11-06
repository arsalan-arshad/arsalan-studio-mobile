# Arsalan Studio — Mobile

Expo (SDK 58) client for [Arsalan Arshad](https://github.com/arsalan-arshad)’s studio marketplace. Talks to the web API over short-lived Bearer access JWTs (1h) plus rotatable refresh tokens (30d, stored locally; refreshed on 401).

| | |
|---|---|
| **Brand** | Arsalan Arshad (short name: Arsalan) |
| **Package / bundle ID** | `studio.arsalan.app` |
| **Expo slug** | `arsalan-studio` |
| **Domain** | `arsalandev.studio` |
| **API** | [`arsalan-studio-web`](https://github.com/arsalan-arshad/arsalan-studio-web) |
| **License** | [MIT](./LICENSE) |

Open source PRs are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## Screens

- **Profile** — login / signup against `EXPO_PUBLIC_API_URL`
- **Messages** — client threads, or **admin inbox** when `role=ADMIN`
- **Contact** — public `POST /api/contact`

---

## Local setup

```bash
cp .env.example .env
# EXPO_PUBLIC_API_URL=http://localhost:3000
npm install
npm start
```

Typecheck:

```bash
npm run typecheck
```

Point production / preview builds at your Railway URL first, then `https://arsalandev.studio` after DNS:

```bash
# .env / eas.json env
EXPO_PUBLIC_API_URL=https://YOUR-SERVICE.up.railway.app
```

---

## Builds: Expo EAS + Fastlane wrappers

**Preferred path:** cloud builds and store submit via **Expo Application Services (EAS)**. Fastlane lanes wrap the same flows for release automation (matches common iOS/Android release workflows).

| Tool | Role |
|---|---|
| **EAS Build / Submit** | Produce iOS/Android binaries; upload to App Store Connect / Play |
| **Fastlane** | `fastlane/` lanes call `eas` (or document prebuild+native lanes) — credentials stay in env / CI secrets |

### EAS

```bash
npm i -g eas-cli
eas login
eas init                    # replace app.json extra.eas.projectId
eas build --profile preview --platform all
eas build --profile production --platform ios
eas submit --platform ios   # after Apple credentials configured
```

`eas.json` already has development / preview / production profiles. Update preview `EXPO_PUBLIC_API_URL` to your Railway domain.

### Fastlane

```bash
cd mobile   # this repo root
bundle install
bundle exec fastlane ios beta      # → eas build + submit (placeholders)
bundle exec fastlane android beta
```

Layout:

```
Gemfile
fastlane/
  Appfile          # package_name / app_identifier = studio.arsalan.app
  Fastfile         # ios/android build + beta lanes
  README.md        # credential env vars
```

**Never commit** App Store Connect API keys, `.p8`, Play service accounts, or keystores. Use:

| Env var (examples) | Purpose |
|---|---|
| `ASC_KEY_ID` / `ASC_ISSUER_ID` / `ASC_KEY_PATH` | App Store Connect API |
| `GOOGLE_PLAY_JSON_KEY_PATH` | Play Console service account JSON |
| `EXPO_TOKEN` | Non-interactive `eas` in CI |

See [fastlane/README.md](./fastlane/README.md).

---

## Contributing

Issues and PRs welcome. Keep PRs focused; `npm run typecheck` must pass. See [CONTRIBUTING.md](./CONTRIBUTING.md).
