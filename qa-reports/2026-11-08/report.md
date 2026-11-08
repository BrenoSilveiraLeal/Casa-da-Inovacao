# QA report — Casa da Inovação — 2026-11-08

## Environment
- Local app: `http://localhost:4173/` (`npm run dev -- --host 127.0.0.1 --port 4173`)
- Browser: Playwright CLI / Chromium 156.0.8078.80
- Source revision: working tree; no commit created.
- Evidence: `output/playwright/`. This is a focused responsive QA run for the reported hero issue, with route and interaction spot checks.

## Inventory

| Route | Page/flow | Status |
|---|---|---|
| `/` | Landing page, facade hero, courses, history, founder, orchestra, gallery, location, registration CTA | Covered at all seven required viewports |
| `/pre-matricula` | Unit selection and closed-registration state | Covered at all seven required viewports |
| `/cursos/:id` | Course detail; sampled `/cursos/ingles` | Covered at all seven required viewports |
| `/cursos/sao-pedro/:id` | São Pedro course detail; sampled `/cursos/sao-pedro/games` | Covered at all seven required viewports |
| `/api/pre-matricula` | Submission endpoint | Not exercised; no real submission was needed for the responsive issue |

## Coverage

| Route | Viewport(s) | Result and evidence |
|---|---|---|
| `/` | 375×812, 430×932, 768×1024, 1366×768, 1536×864, 1920×1080, 3840×2160 | Pass: homepage loaded; no horizontal overflow. Hero screenshots: `home__<width>x<height>__after.png`. Before/after comparison: `home__3840x2160__before.png`, `home__3840x2160__after.png`. |
| `/pre-matricula` | All seven required sizes | Pass: HTTP 200 and no horizontal overflow at every size. Screenshots: `pre-matricula__<width>x<height>.png`. |
| `/cursos/ingles` | All seven required sizes | Pass: HTTP 200 and no horizontal overflow at every size. Screenshots: `cursos_ingles__<width>x<height>.png`. |
| `/cursos/sao-pedro/games` | All seven required sizes | Pass: HTTP 200 and no horizontal overflow at every size. Screenshots: `cursos_sao-pedro_games__<width>x<height>.png`. |
| Mobile menu | 375×812, click menu button | Pass: `aria-expanded` changed `false` → `true`; screenshot `home__375x812__menu.png`. |
| Course unit tabs | Home, click São Pedro | Pass: selected state changed from Beira Linha to São Pedro. |
| Reduced motion | Home, `prefers-reduced-motion: reduce` | Pass: preference detected; no hidden reveal items remained. |
| Images/fonts/network | Home and sampled routes | Pass in this run: no broken images found; Google fonts and local CSS/JS/image requests returned successfully. No browser console errors or warnings were observed. |

All four page patterns were checked at the seven required viewports. The dynamic course route families were sampled with one course ID per unit.

## Findings

- **QA-01 / medium — Fixed**
  - **Location:** `/`, facade hero, tablet and wide desktop/TV widths.
  - **Observed:** The final responsive rule capped the hero title at `8.6rem` from 861 px upwards, overriding the larger-screen scale set elsewhere. At 768 px the title rendered at ~66 px; at 1920 px and 4K it stopped at ~138 px. The text column also stayed about 470–504 px wide on large screens, leaving the supporting copy visibly compressed.
  - **Expected:** The approved design should scale with the available viewport while preserving a readable minimum and phone-specific layout.
  - **Correction:** Added a desktop/tablet title scale of `clamp(5.4rem, 8.2vw, 10rem)` and expanded the large-screen text column up to 720 px in `public/css/dia-noite.css`.
  - **Retest:** Title measured ~86 px at 768, 112 px at 1366, 157 px at 1920, and 160 px at 3840. Text column measured 664 px at 1920 and 720 px at 3840. Phone measurements remained 71–82 px. No overflow at any required homepage viewport. See after screenshots and `wide-screen-final.js`.

## Regression

| Check | Result |
|---|---|
| `npm run build` (part of `npm test`) | Pass; 12 routes prerendered. |
| `npm test` rendered HTML assertion | Fail: existing test expects `/Nossos cursos/`, while the current page heading is “Cursos, dias e horários.” The test assertion appears stale against current page copy. |
| `npm run lint` | Fail: 20 errors and 4 warnings in existing `app/pre-matricula/page.tsx`, `public/js/main.js`, `public/js/site.js`, plus font/style warnings in `app/layout.tsx`. No reported lint issue in the changed CSS. |
| Browser route, viewport, menu, unit tab and reduced-motion checks | Pass; see coverage table. |

## Limitations and untested items

- TV physical output, browser zoom, operating-system text scaling, and the exact TV CSS viewport/device scale factor were not available. The 3840×2160 viewport was used as the 4K reference.
- The dynamic course route families were sampled with one Beira Linha and one São Pedro course ID each; other course IDs were not individually opened.
- The `/api/pre-matricula` endpoint was not submitted; the current registration page states that registrations are closed.
- `npm test` is blocked by a copy assertion that does not match current homepage copy; lint also reports pre-existing issues listed above.

## Optional suggestions

- Consider updating the stale rendered-HTML assertion to match the current heading so the project test suite can pass.
- Consider addressing the existing lint findings when those files are next changed.

## Summary

- Routes inventoried: 4 page patterns plus the pre-registration API.
- Browser-tested routes: 4 page patterns at all 7 required viewports (28 route/viewport combinations).
- Confirmed responsive issue fixed: 1.
- Overall status: **Pass with limitations** for the reported responsive issue; project lint and one rendered-HTML assertion remain failing.



