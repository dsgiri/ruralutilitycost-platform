# Sprint 6 Strategy & Backlog

## Sprint Goal
Execute Phase 4 and Phase 5 of the Practical Ranking Roadmap: **AI-Friendly Content Structure & Structured Metadata**. This sprint focuses on ensuring key pages have rich JSON-LD Schema (FAQ, WebSite), optimized meta tags, and structured semantic HTML (bullet points, clear headings) that AI models and search engines can easily parse.

## Sprint Backlog
- [x] **Task 1:** Create `/docs/SPRINT_6_PLAN.md` (This document).
- [x] **Task 2:** Audit and enhance the `<SEO />` component in `src/components/SEO.tsx` to handle dynamic schemas robustly.
- [x] **Task 3:** Inject AI-friendly FAQ sections and JSON-LD schema into the top high-value calculators (e.g., Generator Runtime, Septic Tank, Well Drilling).
- [x] **Task 4:** Create a static XML Sitemap (`public/sitemap.xml`) to ensure all hub pages and calculators are perfectly indexable.

## Rationale
To win in modern search (both traditional Google and AI Overviews), content must be semantically structured. By formatting our top calculators with clear FAQs and wrapping those answers in JSON-LD `FAQPage` schema, we feed the exact data shape that AI engines prioritize for snippets.

---
*Status: Completed*
