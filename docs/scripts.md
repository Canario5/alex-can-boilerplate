# Available Scripts

## Docker & Production

| Script         | What it does                                                    | When to use                                   |
|----------------|-----------------------------------------------------------------|-----------------------------------------------|
| `start:dev`    | Starts dev container with hot-reload on <http://localhost:5173> | Daily development workflow                    |
| `rebuild:dev`  | Rebuilds dev container without cache                            | When dependencies or build process change     |
| `stop:dev`     | Stops dev container                                             | Cleanup after development                     |
| `shell:dev`    | Opens a shell inside the running dev container                  | Quick debugging or manual command execution   |
| `start:prod`   | Runs production image on <http://localhost:8080> (detached)     | Build and serve static files                  |
| `rebuild:prod` | Rebuilds production container without cache                     | Full clean build (for major changes/releases) |
| `stop:prod`    | Stops production container                                      | Stop prod image with nginx                    |
| `stop:docker`  | Stops all containers (dev, prod, tools)                         | Complete cleanup after testing                |

## Security Scanning

| Script             | What it does                                                  | When to use                     |
|--------------------|---------------------------------------------------------------|---------------------------------|
| `trivy:code`       | Scans source code for secrets and misconfigurations           | Regular security audits         |
| `trivy:image`      | Scans built Docker image for secrets and misconfigurations    | After building production image |
| `trivy:vuln`       | Deep dependency vulnerability scan including dev dependencies | Comprehensive security review   |

**Note**: The `trivy:code` and `trivy:image` scripts scan for secrets and misconfigurations only. But GitHub Actions runs full scanning including vulnerabilities. That test can be run locally with `trivy:vuln` if needed.

## Code Quality & Tooling

| Script             | What it does                                                                        | When to use                          |
|--------------------|-------------------------------------------------------------------------------------|--------------------------------------|
| `lint:check`       | Runs Biome linter in read-only mode                                                 | CI checks, manual verification       |
| `lint:apply`       | Auto-fixes all fixable Biome issues                                                 | After writing new code               |
| `lint:staged`      | Lints only Git staged files (used by pre-commit hook)                               | Automatic via Git hooks              |
| `commitlint:check` | Validates commit message format (conventional commits)                              | Automatic via Git hooks              |
| `check:types`      | TypeScript type checking without compilation                                        | CI pipeline, pre-push verification   |
| `knip:check`       | Detects unused files, exports, and dependencies                                     | Weekly codebase cleanup              |
| `knip:apply`       | Auto-removes detected unused code (use with caution)                                | After manual review of knip:check    |
| `knip:prod`        | Production-focused unused code detection                                            | Pre-release cleanup                  |
| `depcruise:check`  | Validates import/dependency rules and architecture                                  | CI pipeline, architecture compliance |
| `validate`         | Runs comprehensive checks: knip:prod + depcruise:check + check:types + lint         | One-command CI gate, pre-release     |

**Before Deployment:**

All code quality checks run automatically via Git Hooks (Lefthook):
**pre-commit**: Runs `knip:check`, `check:types`, `depcruise:check`, and `lint:staged`
**commit-msg**: Validates commit messages with `commitlint:check`
**pre-push**: Scans code security with `trivy:code`

No manual execution needed - just commit and if everything pass, push!

**Important**: Git hooks (pre-push) require Docker daemon to be running as they execute Trivy via docker compose. Make sure Docker is running before pushing (Docker Desktop on Windows/macOS, dockerd on Linux); otherwise docker compose will fail to start Trivy and the push will be blocked.

## Quick Reference

**Daily Development:**

```bash
pnpm run start:dev    # Start development
pnpm run shell:dev    # Open a shell inside the dev container
pnpm run lint:apply   # Fix code style
```

**Troubleshooting:**

```bash
pnpm run stop:docker   # Clean up all containers
pnpm run knip:check    # Find unused code
pnpm run validate      # Scripts which run in pre-commit hook
```
