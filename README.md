# React + TypeScript + Vite

**Important notes**: 
- **Docker daemon** must be running for the pre‑push Git hook (Trivy scans).  
  If Docker is not available, pushes will be blocked.

## Overview
This repository provides a minimal starter kit for a React application built with TypeScript and Vite, packaged in Docker devcontainer.

## Documentation
- This `README.md` works as the central guide for human devs.
- The `agents.md` file is the main entry point for LLM agents.


- **/docs/** - For **human developers** - contains detailed, topic‑specific documentation (e.g., `docs/scripts.md`, `docs/tests.md`).
- **/agents/** - For **LLM agents** - concise, machine‑readable instructions are stored in the **`/agents/`** folder (the main entry file is `agents.md`).

| File                         | Content                                                                              |
|------------------------------|--------------------------------------------------------------------------------------|
| **`docs/scripts.md`**        | List of available npm scripts with description and typical usage.                    |
| **`docs/docker.md`**         | (planned)                                                                            |
| **`docs/architecture.md`**   | (planned)                                                                            |
| **`docs/tests.md`**          | How to create and run the different test layers (unit, component, integration, e2e). |

## Development Workflow

1.  **Open in Container**:
    When you open this repository in VS Code, it will detect the `.devcontainer` folder and prompt you to **"Reopen in Container"**. Accept this. It will build the `dev` image (installing Node 24, Trivy, D2, etc.). First run may take a few minutes.

2.  **The Terminal**:
    The integrated terminal in VS Code runs **inside** the dev container. All standard commands (`pnpm install`, `pnpm run dev`, `pnpm test`) execute within this isolated environment.

3.  **Adding Dependencies**:
    If you add a new package, simply run `pnpm install` in container terminal. The container uses a pnpm cache, so subsequent installs are fast.

4.  **Git Hooks**:
    Ensure Docker Desktop is running before pushing.

## Quick start (manual commands)
```bash
# Development workflow
pnpm run dev:up     # starts the development container (in container start Vite server with `pnpm run vite`; http://localhost:5173)
pnpm run dev:shell     # Open shell inside development container in your favorite terminal
pnpm run dev:rebuild   # Rebuild development container without cache (when deps or Dockerfiles change)
pnpm run dev:down      # Stops the development container

pnpm run prod:up    # Run production image (detached mode; http://localhost:8080)
pnpm run prod:rebuild  # Rebuild production container without cache
pnpm run prod:down     # Stops the production container

pnpm run docker:stop   # Stop all containers
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

## Troubleshooting
### Container Issues
**Changes not reflecting?** If you modified `Dockerfile.dev`, `.devcontainer.json`, or changed the base image, you must rebuild.
- Solution: Run ```pnpm run dev:rebuild``` (cleans cache and rebuilds).
- Note: VS Code might prompt you to "Rebuild Container" automatically.
### Dependency Issues
**"Module not found" errors?**
- Solution: Ensure you are running `pnpm` commands inside the VS Code terminal (Dev Container), not your local machine's terminal, unless you are explicitly using `docker compose run ...`.
### Git Hooks & Security
**Trivy fails on git push?** The pre-push hook relies on Docker.
- Solution: Ensure Docker Desktop (Linux/Windows) or dockerd is running.
- Error: Cannot connect to the Docker daemon -> Start Docker.
