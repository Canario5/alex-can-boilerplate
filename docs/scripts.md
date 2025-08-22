# Available Scripts

## Docker & Production

| Script         | What it does                                               | When to use                             |
|----------------|------------------------------------------------------------|-----------------------------------------|
| `docker:dev`   | Starts dev container with hot-reload on port 5173          | Daily development workflow              |
| `docker:build` | Builds production Docker image `alex-can-boilerplate-prod` | Before deployment or production testing |
| `docker:run`   | Runs production image on http://localhost:8080 (detached)  | Local production environment testing    |
| `docker:stop`  | Stops and removes all running containers                   | Cleanup after testing                   |

## Security Scanning

| Script             | What it does                                                  | When to use                          |
|--------------------|---------------------------------------------------------------|--------------------------------------|
| `trivy:code`       | Scans source code for HIGH/CRITICAL vulnerabilities           | Regular security audits, CI pipeline |
| `trivy:image`      | Scans built Docker image for vulnerabilities                  | After building production image      |
| `trivy:build-scan` | Builds production image and scans it (combines above two)     | Pre-deployment security gate         |
| `trivy:vuln`       | Deep dependency vulnerability scan including dev dependencies | Comprehensive security review        |

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
npm run docker:dev   # Start development
npm run lint:apply   # Fix code style
```

**Before Deployment:**

All code quality checks run automatically via Git Hooks (Lefthook):
- **pre-commit**: Runs `knip:check`, `check:types`, `dep-cruise:check`, and `lint:staged`
- **commit-msg**: Validates commit messages with `lint:commit`
- **pre-push**: Scans code security with `trivy:code`

No manual execution needed - just commit and push!

**Troubleshooting:**

```bash
npm run docker:stop   # Clean up containers
npm run knip:check    # Find unused code
npm run validate      # Scripts which run in pre-commit hook
```
