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




## Follow-up — user reference screenshots

The two supplied reference windows were reproduced at 1363×605 and 1920×940. The hero grid is now anchored at `50svh`, so the facade title begins at y=303 (50.1% of the shorter window) and y=470 (50% of the taller window), while keeping its width-responsive typography. Its left edge matches the supplied framing at x=76 and x=64. The subtitle, supporting copy, and CTA buttons all computed to opacity 1 with no transition at `scrollY=0`; no horizontal overflow occurred.

- 1363×605 after: `output/playwright/home__reference__1363x605__fixed.png`
- 1920×940 after: `output/playwright/home__reference__1920x940__fixed.png`
- Browser check: `output/playwright/reference-retest.js`
- Follow-up viewport sweep: nine sizes from 375×812 through 3840×2160; no hidden hero reveal items or horizontal overflow. The complete build passed after this change.

The mobile layout still stacks its CTAs vertically; at 375×812 the second button extends below the initial viewport, but it is visible in the document from first render and does not require scroll to animate in.

## Follow-up — phone first fold

Portrait phone spacing was tightened so the full introduction and both CTA buttons fit in the initial viewport without scrolling. In browser checks, button bottoms were y=691/700 (320×700), y=780/812 (375×812), y=812/844 (390×844), and y=900/932 (430×932). At each size, `scrollY` stayed 0, there were no hidden hero reveal items, and no horizontal overflow.

- Phone screenshots: `output/playwright/mobile-firstfold__320x700__after.png`, `mobile-firstfold__375x812__after.png`, `mobile-firstfold__390x844__after.png`, and `mobile-firstfold__430x932__after.png`.
- Browser capture script: `output/playwright/mobile-final-screens.js`.
- Production build passed after the phone adjustment.

## Follow-up — unit map sizing

The unit map containers kept a fixed 260 px height while their two-column cards widened on larger desktops. The unit grid is now capped at 1210 px and centered, preserving the original ~595×260 px maps across desktop widths.

- Before: 595×260 at 1366; 814×260 at 1920; 974×260 at 3840.
- After: 595×260 at 1366, 1920, and 3840; ratio remains ~2.29:1.
- Evidence: `output/playwright/maps__1366x768__after.png`, `maps__1920x940__after.png`; measurements in `output/playwright/map-size-retest.js`.

## Follow-up — courses section density

The courses cards also grew with the desktop wrapper: at 1366 px they were ~393 px wide and 471–495 px tall; at 1920 px they were ~539 px wide and 403 px tall, making the section shorter and visually sparse. Capping `#cursos .wrap` at 1320 px keeps card dimensions consistent while leaving the three-column layout intact.

- After: ~392–393 px card widths and 471–495 px heights at 1366, 1920, and 3840 px; no horizontal overflow.
- Screenshots: `output/playwright/courses__1366x768__after.png`, `courses__1920x940__after.png`.
- Measurements: `output/playwright/courses-size-retest.js`.

## Follow-up — course section density after clarification

The earlier 1320 px cap kept desktop course cards the same width at 1366 px and 1920 px, but left excessive unused space on wider computer screens. The course section now follows the site's wide-screen content widths: 1760 px from 1600 px, and 2080 px from 2400 px. The original 1320 px width remains through 1599 px.

| Viewport | Course wrapper | Card layout | Horizontal overflow |
|---:|---:|---|---|
| 375×812 | 375 px | 1 column; 343×467 px cards | No |
| 768×1024 | 768 px | 2 columns; 345×483 px cards | No |
| 1366×768 | 1320 px | 3 columns; 393×471 px cards | No |
| 1920×940 | 1760 px | 3 columns; 539×403 px cards | No |
| 3840×2160 | 2080 px | 3 columns; 645×403 px cards | No |

At 1920 px, the three course cards now span 1648 px including gaps, up from 1208 px, filling the wide monitor more like the user's reference. Browser visual review was performed in Chrome at 1920×940 and 3840×2160. The browser screenshot tool displayed the current captures but refused to write image files under the workspace, so the older wide-screen screenshots above still show the previous 1320 px cap. Measurements and interactions were read from the live page.

Course interaction regression: selecting São Pedro displayed 3 cards; selecting 60+ reduced that list to 1; resetting to Beira Linha and Todas as idades restored all 6 cards and their selected states. Tested with Chrome on `http://localhost:4173/`.
