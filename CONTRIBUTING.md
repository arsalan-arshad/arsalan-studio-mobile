# Contributing

Thanks for helping improve Arsalan Studio (mobile).

## How to contribute

1. Fork the repo and create a branch from `main`.
2. Keep changes focused (one concern per PR).
3. Do not commit `.env`, credentials, keystores, or Fastlane report artifacts.
4. Run before opening a PR:

```bash
npm run typecheck
```

5. Open a PR against `main`. Branch protection requires a PR (and CI once checks are green).

## Local tips

- Point `EXPO_PUBLIC_API_URL` at a running [`arsalan-studio-web`](https://github.com/arsalan-arshad/arsalan-studio-web) instance.
- Package ID stays `studio.arsalan.app`.
- Prefer EAS for binary builds; Fastlane lanes are wrappers — see `fastlane/README.md`.

## Code of conduct

Be respectful. Match existing navigation and theme patterns unless the PR is an intentional redesign.
