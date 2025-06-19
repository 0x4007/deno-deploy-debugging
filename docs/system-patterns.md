# System Patterns: CI Template Architecture

## Architecture Overview
- Centralized reusable workflows
- Project-specific overrides
- Modular step definitions

## Key Technical Decisions
1. **Workflow Composition**: Use GitHub Actions' reusable workflows feature
2. **Configuration**: Environment variables and inputs for customization
3. **Caching**: Optimize speed with dependency caching
4. **Matrix Testing**: Support multiple Node.js versions

## Design Patterns
- **Template Method Pattern**: Base workflow defines structure, projects implement specific steps
- **Strategy Pattern**: Different linting/test strategies can be selected
- **Facade Pattern**: Simplified interface for complex CI operations

## Component Relationships
```mermaid
flowchart TD
    Main[Project Workflow] -->|Uses| Reusable[Reusable Templates]
    Reusable --> Lint[Linting Workflow]
    Reusable --> Test[Testing Workflow]
    Reusable --> Build[Build Workflow]
    Reusable --> Deploy[Deployment Workflow]

    Lint --> ESLint
    Lint --> Prettier

    Test --> Jest
    Test --> Coverage

    Build --> Webpack
    Build --> Vite