# Codecov Configuration
This project uses [Codecov](https://codecov.io/) to report code coverage metrics. The configuration is in [codecov.yml](../codecov.yml).

Refer to the [official Codecov documentation](https://docs.codecov.com/docs/common-recipe-list) for advanced options.
## Validation
You can validate the configuration file using:
- **Official [VS Code extension](https://marketplace.visualstudio.com/items?itemName=Codecov.codecov)**
- **PowerShell (Windows)**:  
```powershell
Invoke-RestMethod -Uri "https://codecov.io/validate" -Method Post -InFile "codecov.yml" -ContentType "application/octet-stream"
```

- **Bash/Shell (Linux/macOS)**:  
```bash
curl -X POST --data-binary @codecov.yml https://codecov.io/validate
```

## Adjusting Settings
- Target coverage values (`target` and `threshold`) can be modified in `codecov.yml`.
- Project are values for complete project, patch are for current pr only.
- Flag-Based targets can be setup indenpendently - Unit test focus on high coverage, when integration and e2e are informational only.
- The default settings are conservative (50% coverage) for early project stages. As the project grows, consider the changing the config.

### Important Features
- **Carryforward**: Enabled - preserves coverage history between commits
- **CI requirement**: Coverage reports only from successful CI runs

## CI Integration
Codecov runs automatically in the CI pipeline (see `.github/workflows/tests.yml`, `.github/workflows/e2e.yml`) and reports coverage results to pull requests.

## Tip
- Install Codecov **[Browser extension](https://docs.codecov.com/docs/the-codecov-browser-extension)**
