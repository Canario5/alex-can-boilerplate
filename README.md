# React + TypeScript + Vite

**Important**: 
- Git hooks (pre-push) require Docker daemon to be running as they execute Trivy via docker-compose. Make sure Docker is running before pushing (Docker Desktop on Windows/macOS, dockerd on Linux); otherwise docker-compose will fail to start Trivy and the push will be blocked.

- To run "depcruise:report" script [d2 diagram language](https://github.com/terrastruct/d2) is needed.
