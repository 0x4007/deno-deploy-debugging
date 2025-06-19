# Product Context: Reusable CI Workflows

## Why This Exists
Standardizing CI pipelines across projects reduces setup time and ensures consistent quality checks.

## Problems Solved
- Inconsistent CI configurations across projects
- Repetitive setup for similar projects
- Lack of standardized quality gates

## How It Should Work
1. Project references template workflows
2. CI runs on push/pull request events
3. Standard steps execute:
   - Dependency installation
   - Linting
   - Testing
   - Build
   - Deployment (if configured)

## User Experience Goals
- Minimal configuration required
- Clear error messages for failed checks
- Fast feedback loop for developers