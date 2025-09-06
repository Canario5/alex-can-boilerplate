# Codecov Configuration
This project uses [Codecov](https://codecov.io/) to report code coverage metrics. The configuration is in [codecov.yml](../codecov.yml).

## Validation
You can validate the configuration file using:
- **Official [VS Code extension](https://marketplace.visualstudio.com/items?itemName=Codecov.codecov)**
- **PowerShell (Windows)**:  
  `Invoke-RestMethod -Uri "https://codecov.io/validate" -Method Post -InFile "codecov.yml" -ContentType "application/octet-stream"`
- **Bash/Shell (Linux/macOS)**:  
  `curl -X POST --data-binary @codecov.yml https://codecov.io/validate`

## Adjusting Settings
- Target coverage values (`target` and `threshold`) can be modified in `codecov.yml`.
- The default settings are conservative (50% coverage) for early project stages. As the project grows, consider the changing the config.
- Refer to the [official Codecov documentation](https://docs.codecov.com/docs/common-recipe-list) for advanced options.

## CI Integration
Codecov runs automatically in the CI pipeline (see `.github/workflows/tests.yml`) and reports coverage results to pull requests.

## Tip
- Install Codecov **[Browser extension](https://docs.codecov.com/docs/the-codecov-browser-extension)**
