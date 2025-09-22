title: "LLM Agent Instructions"
purpose: "Provide concise, context‑rich guidance for LLM agents interacting with the repository."

## No‑Emoji / Plain‑Text Policy
All documentation intended for agents must be plain markdown without decorative elements (emoji, images, styled tables). Use simple tables or bullet lists only.

## Repository Overview
- **Root**: Contains `package.json`, Docker configuration, and top‑level scripts.
- **`src/`**: Application source (React components, utilities).
- **`tests/`**: Test suites divided into `unit`, `component`, `integration`, and `e2e`.
- **`docs/`**: Human‑focused documentation (expanded topics).
- **`agents/`**: Machine‑focused documentation (this file and related markdown).

### Agent‑Focused Docs
- **`agents/scripts.md`** – concise list of npm scripts (table: `script | command | when`).
- **`agents/testing.md`** – instructions for running each test layer.


## Monitoring Tools
- Codecov: Used for code coverage reporting. Configuration file: `codecov.yml`.
