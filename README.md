# GobData CL – Government Data Explorer

Open-source fullstack project to explore official economic, social, and demographic indicators of Chile by government period. The goal is to provide a neutral, data-first view of indicators using free public data sources (INE, Central Bank of Chile, datos.gob.cl, and other official APIs).

## Status
Scaffolding in progress. Upcoming steps:
1) Backend bootstrap with FastAPI and SQLite.
2) Core data models and mock seed.
3) Summary and compare endpoints.
4) Frontend React/Vite UI for exploration and comparison.

## Tech stack
- Backend: Python 3, FastAPI, SQLAlchemy, Pydantic, SQLite.
- Frontend: React, Vite, TypeScript, Recharts.

## Open-source
This repository is intended to remain open-source. Contributions are welcome once the initial API and UI are stable.

## Neutrality and data integrity
- Neutral wording only; no political judgments.
- Show official data only; missing values stay missing and are explicitly labeled.
- Disclaimer: “This tool only visualizes official data. It does not rank or evaluate governments.”