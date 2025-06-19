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
     workflows/
       templates/
         deno-deploy.yml    # Reusable Deno Deploy workflow
         lint.yml          # (planned)
         test.yml          # (planned)
         build.yml         # (planned)
       hello-plugin-deploy.yml  # Example using reusable workflow
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

## Deno Deploy Workflow

### Reusable Workflow Template
The `deno-deploy.yml` template provides a standardized way to deploy Deno applications:

**Inputs:**
- `project_prefix`: Prefix for the Deno Deploy project name
- `file_path`: Path to the file to deploy
- `entrypoint`: Entrypoint file name
- `organization_id`: Deno Deploy organization ID
- `working_directory`: Optional working directory (default: '.')

**Secrets:**
- `DENO_DEPLOY_TOKEN`: Deno Deploy API token

**Outputs:**
- `deployment_url`: The deployed application URL
- `deployment_id`: The deployment ID
- `project_id`: The project ID

### Usage Example
```yaml
jobs:
  deploy:
    uses: ./.github/workflows/templates/deno-deploy.yml
    with:
      project_prefix: my-app
      file_path: src/main.ts
      entrypoint: main.ts
      organization_id: your-org-id
    secrets:
      DENO_DEPLOY_TOKEN: ${{ secrets.DENO_DEPLOY_TOKEN }}
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
