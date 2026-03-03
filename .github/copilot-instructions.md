# Copilot Instructions for Reactory Core

## Project Overview

Reactory Core (`@reactorynet/reactory-core`) is the foundational shared library for the Reactory platform. It provides TypeScript type definitions, constants, enums, and shared utilities consumed by all other Reactory projects: the Express server, PWA client, native client, and client plugins.

This is a **type-definition-heavy** library. The vast majority of the codebase (~24,000 lines) is TypeScript type declarations organized under the `Reactory` namespace. The actual runtime code is minimal: one class (`ReactoryClass`), a few enums, an abstract `ReactoryService` base class, and environment constants.

## Technology Stack

- **TypeScript** 5.5.3
- **Node.js** 20.15.1 (see `.nvmrc`)
- **Package manager**: Yarn
- **Build tool**: Rollup 4.18.1
- **Test framework**: Jest 29.7.0 (ts-jest preset)
- **Linting**: ESLint 9.7.0 + @typescript-eslint + Prettier 3.3.2
- **Documentation**: JSDoc with better-docs template

## Project Structure

```
src/
  constants.ts        # VERSION constant, SERVER_ENVIRONMENT config
  Reactory.ts         # Main entry: ReactoryClass, enums (FeatureType, ComponentDomain), service types
  types/
    index.d.ts        # Primary type definitions (~13,125 lines) - Reactory namespace
    global.d.ts       # NodeJS global augmentation
    client/           # Client-side types
    components/       # Component types
    core/             # Core types
    data/             # Data types
    forms/            # Form system types
    graph/            # GraphQL types
    i18n/             # Internationalization types
    models/           # Domain model types
    schema/           # Schema and reflection types
    server/           # Server types
    service/          # Service interface types
    ux/               # UX/UI types
    workflow/         # Workflow types
    ... (25+ type subdirectories)
scripts/
  deploy.js           # Deploys built .tgz to server, client, and plugins dirs
  package.mjs         # Creates .tgz package via yarn pack
  version.mjs         # Version bumping with git-change detection
rollup/
  copy.js             # Custom rollup plugin for copying .d.ts files to dist
test/
  version.spec.ts     # Version verification test
```

## Key Build Commands

```bash
# Full build pipeline: clean, version, rollup, docs, package, deploy to sibling projects
yarn build:install

# Same pipeline without version bump
yarn build:install:no-bump

# Individual steps
yarn build:clean          # Remove dist/, docs/, .tgz files
yarn build:rollup         # Run rollup bundler
yarn build:package        # Create .tgz via yarn pack
yarn deploy:local         # Deploy .tgz to server, client, plugins

# Testing and linting
yarn test                 # Run Jest tests
yarn build:lint           # Run ESLint with auto-fix
yarn build:docs           # Generate JSDoc documentation

# Publishing
yarn publish:npm          # Publish to npm registry
```

## Deployment Model

1. Rollup produces UMD (`dist/reactory.core.js`) and ESM (`dist/reactory.core.esm.js`) bundles
2. Type definitions are copied to `dist/types/`
3. `yarn pack` creates a `.tgz` artifact
4. The deploy script copies the `.tgz` to `$REACTORY_CLIENT`, `$REACTORY_SERVER`, and `$REACTORY_PLUGINS/artifacts/`
5. Each consuming project references the `.tgz` via a `file:` dependency in its `package.json`

## Version Management

The `scripts/version.mjs` script uses a `.version` template file (`1.1.${buildNumber}`):
- Auto-increments the build number when uncommitted or unpushed git changes are detected
- Use `--no-bump` flag to skip increment
- Use `--read` flag to print the current version

## Coding Guidelines

- Use TypeScript for all source files
- Keep types and constants generic and reusable across server, web client, and native client
- Add new types in a backward-compatible way
- Document all exported types and utilities with JSDoc
- Types use the `Reactory` namespace pattern: consumers reference types as `Reactory.Server.X`, `Reactory.Forms.Y`, etc.
- Follow the ESLint configuration: 2-space indent, double quotes, semicolons, trailing commas, max line length 100
- Decorator metadata is enabled (experimentalDecorators + emitDecoratorMetadata) for IoC/DI patterns

## Environment Variables

```bash
REACTORY_HOME      # Root of the workspace
REACTORY_DATA      # Path to reactory-data
REACTORY_SERVER    # Path to reactory-express-server
REACTORY_CLIENT    # Path to reactory-pwa-client
REACTORY_NATIVE    # Path to reactory-native
REACTORY_PLUGINS   # Path to reactory-data/plugins
```

## Testing

- Run tests with `yarn test`
- Test environment: Node (not jsdom)
- Build and test must pass before publishing (`prepublishOnly` runs the full pipeline)

## Important Notes

- This package **must be built and deployed first** before any other Reactory project can build or run
- The `Reactory` TypeScript namespace is the primary API surface
- Runtime dependencies are minimal (only reflect-metadata and related packages)
- Dev dependencies are extensive because they provide type references for the declaration files
