# Tech Context: CI Template Technologies

## Technologies Used
- **CI Platform**: GitHub Actions
- **Languages**: JavaScript, TypeScript, Deno
- **Deployment Platform**: Deno Deploy
- **Package Managers**: npm, Yarn, pnpm, Deno
- **Testing Frameworks**: Jest, Mocha, Jasmine, Deno test
- **Linting Tools**: ESLint, Prettier, deno lint
- **Build Tools**: Webpack, Vite, Rollup, Deno bundle

## Development Setup
1. **Repository Structure**:
   ```
   .github/
     actions/             # Reusable GitHub Actions
       deno-deploy/       # Base deployment action for apps
       plugin-deploy/     # Plugin deployment (with transformations)
       plugin-adapter/    # Plugin transformation logic
       generate-project-name/  # Helper for project naming
     workflows/           # Test workflows for this repo
       test-plugin-deploy.yml  # Tests plugin deployment
       test-app-deploy.yml     # Tests app deployment
     examples/            # Example workflows for users
       example-plugin.yml
       example-app.yml
   docs/
     ... documentation files ...
   plugins/
     hello/               # Example Deno plugin
   apps/
     hello-world/         # Example app
   ```

2. **Dependencies**:
   - Node.js v18+ (for Node.js projects)
   - Deno v2.x (for Deno projects)
   - GitHub Actions environment
   - Deno Deploy account and API token

3. **Configuration Files**:
   - `.github/workflows/ci.yml` (project-specific entry point)
   - `.github/workflows/templates/` (reusable workflow templates)

## Deno Deploy Actions

### App Deployment Action
Located at `.github/actions/deno-deploy/`:
- Deploys applications directly to Deno Deploy
- Auto-generates project names or accepts custom names
- Supports organization deployment
- Required inputs:
  - `token`: Deno Deploy access token
  - `action`: 'deploy' or 'delete'
- Optional inputs:
  - `entrypoint`: Script entrypoint (default: "worker/main.ts")
  - `root`: Root directory (default: ".")
  - `project_name`: Custom project name (auto-generated if not provided)
  - `organization`: Target organization (defaults to personal account)
  - `env_file`: Path to .env file
  - `production`: Deploy to production (auto-detected from branch)

### Plugin Deployment Action
Located at `.github/actions/plugin-deploy/`:
- Deploys plugins with necessary transformations
- Combines plugin-adapter + deno-deploy actions
- Handles manifest.json updates
- Required inputs:
  - `token`: Deno Deploy access token
- Optional inputs:
  - `pluginEntry`: Path to plugin entry file (default: "./worker")
  - `organization`: Target organization

### Usage Examples

**App Deployment:**
```yaml
- uses: ./.github/actions/deno-deploy
  with:
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    action: deploy
    entrypoint: src/main.ts
```

**Plugin Deployment:**
```yaml
- uses: ./.github/actions/plugin-deploy
  with:
    token: ${{ secrets.DENO_DEPLOY_TOKEN }}
    pluginEntry: ./plugins/my-plugin/index.ts
```

## Technical Constraints
- GitHub repositories only
- Requires appropriate deployment tokens
- Deno Deploy requires organization ID for project creation
- Projects are created per deployment (consider cleanup strategy)

## Dependencies
- GitHub Actions
- Deno runtime
- Deno Deploy API
- curl and jq (for API interactions)
