# Noor Lumen prerelease record

Release candidate: `0.2.0-lumen.0`

Verification environment: Node `22.23.2`, npm `10.9.8`, pinned Playwright
Chromium `140.0.7339.16` (build `1187`).

## Size record

The baseline was captured from commit `4a53894` after `npm ci` and before
Lumen source changes. Values are generated, uncompressed production files.

| Artifact     |  Baseline | Lumen prerelease |            Change |
| ------------ | --------: | ---------------: | ----------------: |
| ESM main     | 118,446 B |        122,335 B |  +3,889 B (+3.3%) |
| CJS main     | 130,748 B |        134,681 B |  +3,933 B (+3.0%) |
| Provider ESM |   5,086 B |          9,089 B |          +4,003 B |
| Token ESM    |   5,265 B |          6,799 B |          +1,534 B |
| Compiled CSS |  43,462 B |         51,865 B | +8,403 B (+19.3%) |

Final gzip reference: main ESM `22,395 B`; compiled CSS `10,628 B`.
No runtime dependency was added. `@playwright/test` and
`@axe-core/playwright` are development-only.

## Verification record

- TypeScript, ESLint, production build, and Storybook build pass.
- Vitest: 11 files, 50 tests passed (baseline: 8 files, 33 tests).
- Playwright: 15 pinned-Chromium tests passed in normal comparison mode:
  10 visual/runtime scenarios and 5 automated axe audits.
- Browser assertions cover nonblank rendering, error overlays, console/page
  errors, focus, scoped portal inheritance, mobile Drawer behavior, and the
  computed reduced-transparency fallback.
- Visual baselines cover default light LTR and dark mobile RTL compatibility;
  Lumen dark/light; desktop/mobile; Arabic and Sorani RTL; reduced motion and
  transparency; focus; loading/streaming; agent error; and an open overlay.
- Axe audits cover the dark and Sorani composers, the desktop workspace,
  semantic agent-error content, and an open material dialog. Storybook-only
  full-page landmark rules are excluded because these are isolated component
  documents; component semantics, contrast, names, focus, and all other rules
  remain enforced.
- The touched Storybook catalogues use `a11y.test: "error"`; the global policy
  remains `todo` until untouched legacy stories are audited.

## Preserved baseline warnings

- Two Radix Tabs keyboard tests emit existing React `act(...)` warnings while
  still passing. These were present before Lumen and were not expanded.
- Storybook emits existing Radix `"use client"` bundling notices, the missing
  MDX glob notice, and large documentation-chunk warnings.
- `npm audit` reported 12 advisories before the work and 14 after adding the
  Playwright development graph. No forced or breaking dependency upgrade is
  included in this visual release. `npm audit --omit=dev` reports zero
  production-dependency advisories.
