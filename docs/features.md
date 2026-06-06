# 🌟 Product Features Document

This document acts as an explicit inventory of all high-level features, core capabilities, and functional modules across the Rural Utility Cost application.

## 1. Core Architecture & UX Features
- **SPA Architecture:** Client-side routing utilizing React Router for immediate page transitions.
- **Offline & Local Persistence:** High-value tools securely save user state to the browser's `localStorage` so data survives page refreshes.
- **Responsive Layouts:** Mobile-first layout scaling gracefully to desktop via standard `max-w-6xl` containers.
- **Design Standard:** Enforced design standard utilizing Tailwind CSS.
- **Print & Export Readiness:** Standardized media queries ensuring summary views format cleanly for physical printing and PDF generation.

## 2. Calculator Modules by Category

### Property & Construction
- **Rural Land Value (`/rural-land`):** Estimate selling proceeds or evaluate a parcel's suitability score for buying.
- **Septic Tank Size (`/septic`):** Calculate the right septic tank size based on bedrooms, state codes, and soil type.
- **Fill Dirt Cost (`/fill-dirt`):** Calculate fill dirt cost for grading and backfill.
- **Gravel Cost (`/gravel`):** Calculate gravel cost per ton for driveways.
- **Fencing Cost (`/fencing`):** Estimate the cost of rural fencing (barbed wire, woven wire, wood, electric).
- **Well Water Drilling (`/well`):** Calculate well drilling cost per foot based on depth and soil type.

### Energy & Utilities
- **Peak Energy Demand (`/energy-demand`):** Calculate peak kW demand charges.
- **Generator Runtime (`/gen-runtime`):** Estimate runtime on available fuel.
- **Generator Fuel Cost (`/gen-fuel-cost`):** Estimate fuel usage and operating costs for backup generators.
- **Critical Load Backup (`/gen-critical-load`):** Determine if current fuel reserve will support mission-critical loads.
- **Water Fill Charge (`/water-fill`):** Calculate water delivery cost.
- **Propane Refill (`/propane`):** Calculate cost to refill propane tanks.
- **Off-Grid Solar (`/solar`):** Calculate solar panel and battery size.
- **Rural Internet Cost (`/internet`):** Compare internet options (Starlink, DSL, fiber, cell).
- **Cable TV Cost (`/cable`):** Compare cable TV and streaming packages.

### Agriculture & Habitat
- **Take-Home Meat Yield (`/meat-yield`):** Estimate meat yield from live hanging weight.
- **Meat Processing Cost (`/meat-processing`):** Estimate total processing fees for butchering.
- **Cost Per Lb & Break-Even (`/meat-cost-per-lb`):** Calculate break-even cost per pound for livestock.
- **Hive Startup Cost (`/hive-startup`):** Estimate cost of starting beekeeping.
- **Honey Yield (`/honey-yield`):** Estimate honey production.
- **Beekeeper Syrup Mix (`/syrup-mix`):** Calculate syrup mix ratios.
- **Habitat Restoration Cost (`/habitat-cost`):** Estimate habitat conversion costs.
- **Livestock Water (`/livestock`):** Calculate daily water needs for farm animals.
- **Animal Gestation (`/gestation`):** Estimate due dates for livestock.
- **Egg Incubation (`/incubation`):** Calculate hatch dates for poultry.

### Business & Profit
- **Pain Point Priority (`/pain-point-priority`):** Rank farm problems by severity and frequency.
- **Cut Cost Calculator (`/cut-cost`):** Target expense reduction to hit profit numbers.
- **Expand Profit Calculator (`/expand-profit`):** Calculate required revenue growth for margins.
- **Food Processing Compliance (`/compliance`):** Estimate organic certification costs and FDA readiness.

### Government & Grants
- **Grant Match & Readiness (`/grant-readiness`):** Calculate mandated cash match and reimbursable bridge funding.
- **Grant & Aid Finder (`/grant-finder`):** Search for government programs, rebates, and aid.
