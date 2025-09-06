# React + TypeScript + Vite

**Important**: 
- Git hooks (pre-push) require Docker daemon to be running as they execute Trivy via docker-compose. Make sure Docker is running before pushing (Docker Desktop on Windows/macOS, dockerd on Linux); otherwise docker-compose will fail to start Trivy and the push will be blocked.

- To run "depcruise:report" script [d2 diagram language](https://github.com/terrastruct/d2) is needed.

## Tools
This project uses several tools for code quality and monitoring:
- **[Codecov](https://codecov.io/)** – Tracks code coverage from tests. See [docs/codecov.md](./docs/codecov.md) for details.
- **Trivy** – Scans for vulnerabilities and misconfigurations (runs via Docker Compose).
- **Biome** – Code linter and formatter.
- **Dependency Cruiser** – Dependency analysis.
