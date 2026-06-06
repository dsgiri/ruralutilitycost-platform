# 🔄 Agile Workflow & Development Practices

This document outlines the operational tempo and methodology for building and extending the Rural Utility Cost platform.

## 1. Principles
* **Iterative Delivery:** Ship small, meaningful units of value frequently. 
* **User-Centric Spec:** Every calculator or feature must map directly to a rural pain point (e.g., "Will my freezer stay cold during an outage?").
* **Fail Fast, Fix Faster:** Utilize strong typing, inline validation, and robust reviews to catch errors. Protect the main branch.

## 2. The Implementation Lifecycle
1. **Request & Triage:** Understand the user's core problem. Do not guess. If requirements are ambiguous, clarify before writing code.
2. **Registry Verification:**
   * **MANDATORY:** Check `/docs/CALCULATOR_REGISTRY.md` to ensure the requested capability doesn't already exist or overlap heavily with an existing one. 
   * If an overlap exists, pause and prompt the administrator for confirmation to merge, update, or branch out.
3. **Plan:** Outline a brief approach. Define inputs, outputs, maths, and edge cases.
4. **Implement:** Write the UI layout and the backing mathematical logic simultaneously. Build cleanly following the `CODING_STANDARDS.md`.
5. **Document Registry:** Upon completion, immediately log the new calculator logic, standardizing it with a `CALC-` ID code in `CALCULATOR_REGISTRY.md`.
6. **Validate:** Test the edges (0 values, empty values, extremely large values). 

## 3. Communication Rules (The "Vibe" Coding Agent)
* **Be direct.** State the action, execute, report the successful additions.
* **No fluff.** Do not use marketing adjectives to describe code achievements. 
* **Prioritize accuracy and safety.** If a calculation involves regulatory thresholds, emphasize disclaimers.

## 4. Continuous Refactoring
* If a pattern emerges across 3 or more calculators (e.g., an identical Output Summary card or Input Field styling), refactor it into `/src/components/shared/` immediately to reduce repetition.
* Clean up unused imports and obsolete files actively during development cycles.
