# Active Context: Plugin Template Deployment Debugging

## Current Focus
- Implementing Deno's native Node.js compatibility for plugin deployment
- Using npm: specifiers and node: specifiers for module resolution
- Leveraging Deno's built-in features instead of complex bundling

## Recent Changes
- Removed complex esbuild bundling approach
- Implemented direct npm: imports in Deno entry point
- Added deno.json configuration for better compatibility
- Simplified deployment process using Deno's native features
- Added support for sloppy imports and node globals

## Key Solutions Implemented
1. **Direct npm: imports**: Using `npm:@package-name` syntax for npm packages
2. **Node.js compatibility**: Leveraging Deno's built-in node: specifiers
3. **Configuration**: Added deno.json with proper compiler options
4. **Simplified wrapper**: Direct import of plugin worker without bundling

## Deployment Architecture
```
Plugin Source (Node.js/TypeScript)
    ↓
CI: npm install (for type checking)
    ↓
Deno wrapper with npm: imports
    ↓
Deno Deploy (with native Node.js support)
```

## Deno Configuration
```json
{
  "compilerOptions": {
    "allowJs": true,
    "lib": ["deno.window"],
    "strict": false
  },
  "nodeModulesDir": true,
  "unstable": ["sloppy-imports", "node-globals"]
}
```

## Important Decisions
1. Use Deno's native Node.js compatibility features
2. Avoid complex bundling when possible
3. Leverage npm: specifiers for direct imports
4. Use deno.json for configuration
5. Keep plugin source code unchanged
6. Handle all compatibility in CI/deployment layer

## Next Steps
1. Test the deployment with the new approach
2. Monitor for any runtime issues
3. Optimize if needed
4. Document the final working solution

## Key Learnings
- Deno's npm: specifiers eliminate most compatibility issues
- The `nodeModulesDir: true` option helps with module resolution
- Unstable features like sloppy-imports provide flexibility
- Direct imports are simpler than bundling for Deno Deploy
- Native Node.js compatibility in Deno v2 is robust
