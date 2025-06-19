# Tech Context: CI Template Technologies

## Technologies Used
- **CI Platform**: GitHub Actions
- **Languages**: JavaScript, TypeScript
- **Package Manager**: npm, Yarn, pnpm
- **Testing Frameworks**: Jest, Mocha, Jasmine
- **Linting Tools**: ESLint, Prettier
- **Build Tools**: Webpack, Vite, Rollup

## Development Setup
1. **Repository Structure**:
   ```
   .github/
     workflows/
       templates/
         lint.yml
         test.yml
         build.yml
         deploy.yml
   docs/
     ... documentation files ...
   ```

2. **Dependencies**:
   - Node.js v18+
   - GitHub Actions environment

3. **Configuration Files**:
   - `.github/workflows/ci.yml` (project-specific entry point)
   - `.github/config/ci-settings.json` (shared configuration)

## Technical Constraints
- Only supports GitHub repositories
- Requires Node.js projects
- Limited to JavaScript/TypeScript ecosystems initially

## Dependencies
- GitHub Actions
- Node.js runtime
- npm/Yarn/pnpm package managers