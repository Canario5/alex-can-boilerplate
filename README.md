# React + TypeScript + Vite

**Important notes**: 
- **Docker daemon** must be running for the pre‑push Git hook (Trivy scans).  
  If Docker is not available, pushes will be blocked.
- `depcruise:report` requires the [d2 diagram language](https://github.com/terrastruct/d2).

## Overview
This repository provides a minimal starter kit for a React application built with TypeScript and Vite, packaged in Docker containers.

## Documentation
- This `README.md` works as the central guide for human devs.
- The `agents.md` file is the main entry point for LLM agents.


- **/docs/** - For **human developers** - contains detailed, topic‑specific documentation (e.g., `docs/scripts.md`, `docs/tests.md`).
- **/agents/** - For **LLM agents** - concise, machine‑readable instructions are stored in the **`/agents/`** folder (the main entry file is `agents.md`).

| File                                 | Content                                                                              |
|--------------------------------------|--------------------------------------------------------------------------------------|
| **`docs/scripts.md`**                | List of available npm scripts with description and typical usage.                    |
| **`docs/docker.md`**                 | (planned)                                                                            |
| **`docs/architecture.md`** (planned) | (planned)                                                                            |
| **`docs/tests.md`**                  | How to create and run the different test layers (unit, component, integration, e2e). |

## Quick start
```bash
# Development workflow
pnpm run start:dev     # starts the development container (http://localhost:5173)
pnpm run shell:dev     # Open shell inside development container
pnpm run rebuild:dev   # Rebuild development container without cache (when deps or Dockerfile change)
pnpm run stop:dev      # Stops the development container

pnpm run start:prod    # Run production image (detached mode; http://localhost:8080)
pnpm run rebuild:prod  # Rebuild production container without cache
pnpm run stop:prod     # Stops production container (and tools as well)

pnpm run stop:docker   # Stop all containers (dev, prod, tools)
```

## Tools
This project uses several tools for code quality and monitoring:
- **[Codecov](https://codecov.io/)** – Tracks code coverage from tests. See [docs/codecov.md](./docs/codecov.md) for details.
- **Trivy** – Scans for vulnerabilities and misconfigurations (runs via Docker Compose).
- **Biome** – Code linter and formatter.
- **Dependency Cruiser** – Dependency analysis.

## Docker Usage

The project uses **Docker Compose profiles**:

| Profile | Description                                          |
|---------|------------------------------------------------------|
| `dev`   | Development environment with hot‑reload (port 5173). |
| `prod`  | Production image (nginx, port 8080).                 |
| `tools` | Auxiliary tools – e.g., Trivy for security scanning. |

