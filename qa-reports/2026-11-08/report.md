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

## Follow-up — proportional courses section

The user clarified that the course schedule area should keep the same visual proportions on different computers. The course wrapper now grows fluidly with the viewport, and the heading, filters, card typography, icons, spacing, and minimum card height scale with the wrapper. The existing phone layout is unchanged.

| Viewport | Course wrapper | Card layout | Horizontal overflow |
|---:|---:|---|---|
| 375×812 | 375 px | 1 column; 343×467 px cards | No |
| 768×1024 | 768 px | 2 columns; 345×483 px cards | No |
| 1280×800 | 1280 px | 3 columns; 382×461 px cards | No |
| 1366×768 | 1320 px | 3 columns; 393×473 px cards | No |
| 1600×900 | 1440 px | 3 columns; 431×519 px cards | No |
| 1920×940 | 1760 px | 3 columns; 535×644 px cards | No |
| 2400×1080 | 2080 px | 3 columns; 639×769 px cards | No |
| 3840×2160 | 2080 px | 3 columns; 639×769 px cards | No |

At desktop sizes from 1280 px upward, the card height-to-width ratio is held at 1.20. Visual checks were performed in Chrome at 1366×768 and 1920×940, and measurements were read at every size in the table. The browser screenshot tool displayed the current captures but refused to save them under the workspace, so previous wide-screen screenshot files do not represent this final proportional adjustment.

Course interaction regression: selecting São Pedro displayed 3 cards; selecting 60+ reduced that list to 1; resetting to Beira Linha and Todas as idades restored all 6 cards and their selected states. Tested in Chrome on `http://localhost:4173/`.

The public Vercel page was also inspected at 1920×940: it still uses 30 px course titles and 539×403 px cards, while the local corrected build uses 41 px titles and 535×644 px cards. The Vercel deployment therefore does not yet contain this correction.

`npm run build`: pass; 12 routes prerendered.

Mobile regression after isolating the desktop scaling rules: at 375×812, the hero again matches the saved first-fold reference (`output/playwright/mobile-firstfold__375x812__after.png`); the course section remains a single 343×467 px card with a 24 px title and no horizontal overflow. The wrapper is no longer a size container below 1280 px, and all fluid course sizing rules are desktop-only.

## Follow-up — matching the two desktop unit layouts

Compared the user's 1363 px reference with the friend's 1892 px screenshot. The friend's older layout let the section heading and map grid use different content widths. Constrained `#local` to the same centered 1320 px content block used in the reference, while keeping its map grid at 1210 px maximum. Added a version query to the main stylesheet URL so browsers fetch the updated CSS instead of reusing an older cached copy.

| Viewport | Unit section wrapper | Heading left edge | Map grid / each map | Overflow |
|---:|---:|---:|---:|---|
| 1363×917 | 1320 px | 76 px | 1210 px / 595×260 px | No |
| 1892×917 | 1320 px, centered | 342 px | 1208 px / 594×260 px | No |
| 375×812 | 375 px | 16 px | 343 px / 341×210 px | No |

At both desktop widths, the title and maps now share the same centered content block; the phone breakpoint remains unchanged. The compiled app was checked with `npm run build` and all 12 routes prerendered successfully. The cache-busting stylesheet URL and CSS changes are local until deployed, so the friend's browser will not receive them yet.

The closed registration indicator now blinks red to match the requested reference. Chrome confirmed `animation: blink 1.2s steps(1)` on `.status-dot` while the status is closed; the status remains red. The CSS URL is versioned as `20261108-inscricao-pulse`. `npm run build` passed with 12 routes prerendered.
