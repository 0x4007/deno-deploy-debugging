# Active Context: Plugin Template Deployment Debugging

## Current Focus
- Implementing Deno's native Node.js compatibility for plugin deployment
- Dynamically generating import maps from plugin's package.json
- Creating a truly reusable deployment template for any plugin

## Recent Changes
- Updated deployctl to use JSR version (jsr:@deno/deployctl)
- Dynamic import map generation from package.json dependencies
- Copy plugin source files to deployment root
- Auto-detect and map all npm dependencies
- Special handling for common subpath imports

## Key Solutions Implemented
1. **Dynamic Import Maps**: Generate from package.json dependencies automatically
2. **File Structure**: Copy plugin files to root to maintain import paths
3. **JSR deployctl**: Using the latest deployctl from Deno's package registry
4. **Universal Template**: Works with any plugin without hardcoded dependencies

## Deployment Architecture
```
Plugin Source (Node.js/TypeScript)
    ↓
CI: npm install (for type checking)
    ↓
Copy plugin files to root
    ↓
Create deno.json with import maps
    ↓
Deno Deploy (with import resolution)
```

## Deno Configuration (Dynamically Generated)
The deno.json is generated dynamically based on the plugin's package.json:

```javascript
// Reads dependencies from package.json
const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

// Generates import map entries like:
// "package-name": "npm:package-name@version"
// "package-name/": "npm:package-name@version/"

// Plus local path mappings:
// "../manifest.json": "./manifest.json"
// "./index": "./src/index.ts"
// "./types": "./src/types/index.ts"
```

This ensures the deployment works with any plugin without hardcoding specific dependencies.

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
- Dynamic import map generation makes the template truly reusable
- JSR deployctl (jsr:@deno/deployctl) is more reliable than the old version
- Reading package.json dependencies eliminates hardcoding
- Special subpath imports (like /manifest) need explicit mapping
- The `nodeModulesDir: true` option helps with module resolution
- Deno Deploy requires all imports to be properly mapped
- A reusable template must discover dependencies, not hardcode them
