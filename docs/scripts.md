# Available Scripts

## Docker & Production

| Script         | What it does                                                  | When to use                             |
|----------------|---------------------------------------------------------------|-----------------------------------------|
| `docker:dev`   | Starts dev container with hot-reload on http://localhost:5173 | Daily development workflow              |
| `docker:build` | Builds production Docker image `alex-can-boilerplate-prod`    | Before deployment or production testing |
| `docker:run`   | Runs production image on http://localhost:8080 (detached)     | Local production environment testing    |
| `docker:stop`  | Stops and removes all running containers                      | Cleanup after testing                   |

## Security Scanning

| Script             | What it does                                                  | When to use                     |
|--------------------|---------------------------------------------------------------|---------------------------------|
| `trivy:code`       | Scans source code for secrets and misconfigurations           | Regular security audits         |
| `trivy:image`      | Scans built Docker image for secrets and misconfigurations    | After building production image |
| `trivy:build-scan` | Builds production image and scans it for secrets/misconfigs   | Pre-deployment security gate    |
| `trivy:vuln`       | Deep dependency vulnerability scan including dev dependencies | Comprehensive security review   |

**Note**: The `trivy:code`, `trivy:image`, and `trivy:build-scan` scripts scan for secrets and misconfigurations only. But GitHub Actions runs full scanning including vulnerabilities. That test can be run locally with `trivy:vuln` if needed.

## Code Quality & Tooling

| Script             | What it does                                                                        | When to use                          |
|--------------------|-------------------------------------------------------------------------------------|--------------------------------------|
| `lint:check`       | Runs Biome linter in read-only mode                                                 | CI checks, manual verification       |
| `lint:apply`       | Auto-fixes all fixable Biome issues                                                 | After writing new code               |
| `lint:staged`      | Lints only Git staged files (used by pre-commit hook)                               | Automatic via Git hooks              |
| `lint:commit`      | Validates commit message format (conventional commits)                              | Automatic via Git hooks              |
| `check:types`      | TypeScript type checking without compilation                                        | CI pipeline, pre-push verification   |
| `knip:check`       | Detects unused files, exports, and dependencies                                     | Weekly codebase cleanup              |
| `knip:apply`       | Auto-removes detected unused code (use with caution)                                | After manual review of knip:check    |
| `knip:prod`        | Production-focused unused code detection                                            | Pre-release cleanup                  |
| `dep-cruise:check` | Validates import/dependency rules and architecture                                  | CI pipeline, architecture compliance |
| `validate`         | Runs comprehensive checks: knip:prod + dep-cruise + types + lint                    | One-command CI gate, pre-release     |
| `prepare`          | This script prevents build failures in environments without Git caused by Lefthook. | Initial project setup                |

## Quick Reference

**Daily Development:**

```bash
pnpm run docker:dev   # Start development
pnpm run lint:apply   # Fix code style
```

**Before Deployment:**

All code quality checks run automatically via Git Hooks (Lefthook):
- **pre-commit**: Runs `knip:check`, `check:types`, `dep-cruise:check`, and `lint:staged`
- **commit-msg**: Validates commit messages with `lint:commit`
- **pre-push**: Scans code security with `trivy:code`

No manual execution needed - just commit and push!

**Important**: Git hooks (pre-push) require Docker daemon to be running as they execute Trivy via docker-compose. Make sure Docker is running before pushing (Docker Desktop on Windows/macOS, dockerd on Linux); otherwise docker-compose will fail to start Trivy and the push will be blocked.

**Troubleshooting:**

```bash
pnpm run docker:stop   # Clean up containers
pnpm run knip:check    # Find unused code
pnpm run validate      # Scripts which run in pre-commit hook
```
