# ⚙️ Technical Test Cases

This document tracks non-functional, integration, architecture, and structural edge-case technical tests to ensure project stability across environments.

## 1. Storage & Persistence
| Test ID | Component / Area | Scenario | Expected Result | Status |
|---|---|---|---|---|
| T-STO-01 | LocalStorage I/O Safety | Parse invalid JSON payload from `recentlyUsedCalcs` or `ruralPainPoints` key manually via DevTools | App `try/catch` sequence triggers and gracefully falls back to empty state without crashing the render tree. | ⏳ Pending |
| T-STO-02 | State Size Limits | Add abnormally large strings to priority matrix | Handled without obvious memory leak/performance lag; component manages large state variables predictably. | ⏳ Pending |

## 2. Responsiveness & UI Layout
| Test ID | Component / Area | Scenario | Expected Result | Status |
|---|---|---|---|---|
| T-UI-01 | Mobile Viewport Safety | Load app at 375px width (iPhone SE) | Sidebar collapses to hamburger menu. Grid systems safely collapse to 1-col. Padding is reduced. Inputs do not overflow horizontally. | ⏳ Pending |
| T-UI-02 | Typography Readability | Resize window past `1280px` breakpoint | Container clamps at `max-w-6xl` or `max-w-7xl` to prevent unreadable, infinite-width text lines. | ⏳ Pending |
| T-UI-03 | Input Density | View Grant Readiness & Match on 400px width | Tab labels remain readable, wrapping cleanly without breaking border radiuses. | ⏳ Pending |

## 3. Input Validation & Edge Cases
| Test ID | Component / Area | Scenario | Expected Result | Status |
|---|---|---|---|---|
| T-INP-01 | Numeric Boundaries | Enter negative number in cost or weight inputs across any module | Input restricts or internal math logic safely sanitizes using `Math.max(0, val)`. | ⏳ Pending |
| T-INP-02 | Zero-Division Checks | Enter 0 for Reimbursable "Phases" or "Days" in any calculator | Application handles it via bounding `Math.max(1, value)` to prevent `Infinity`/`NaN` errors mapping to text nodes. | ⏳ Pending |
| T-INP-03 | UI Float Boundaries | Enter extremely large numbers ($99,999,999) | `Intl.NumberFormat` applied across components gracefully without breaking the flex boundaries of metric cards. | ⏳ Pending |
| T-INP-04 | Null/Empty Injection | Quickly backspace out required fields causing empty strings | Components evaluate as 0 rather than rendering `NaN` or unhandled exceptions. | ⏳ Pending |

## 4. Platform Rules Compliance
| Test ID | Component / Area | Scenario | Expected Result | Status |
|---|---|---|---|---|
| T-RUL-01 | Print & Export CSS | Trigger `Ctrl+P` on Cut Cost or Grant Readiness modules | `print:` media queries successfully hide navigational sidebars and header search, isolating just the relevant calculator panel. | ⏳ Pending |
| T-RUL-02 | Client Routing | Open app via a direct deeply-nested URL link (e.g. `/gen-runtime`) | Express/Vite routing correctly falls back to SPA `index.html` allowing React Router to mount the correct view. | ⏳ Pending |

## 5. Accessibility (a11y)
| Test ID | Component / Area | Scenario | Expected Result | Status |
|---|---|---|---|---|
| T-ACC-01 | Contrast Standards | Assess dynamic colored badges (e.g., Quick Win, Pain Point score) | Text contrast meets standard WCAG AA ratio against colored background. | ⏳ Pending |
| T-ACC-02 | Keyboard Nav | Press `Tab` cyclically starting from Home page | Focus rings apply consistently via Tailwind `focus-visible:` indicating active state. | ⏳ Pending |
