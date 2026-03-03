# Reactory Core -- Agent Context

## What Is This Project

Reactory Core (`@reactorynet/reactory-core`) is the foundational shared library for the Reactory platform. It provides TypeScript type definitions, constants, enums, and shared utilities consumed by all other Reactory projects: the Express server (`reactory-express-server`), PWA client (`reactory-pwa-client`), native client (`reactory-native`), and client plugins (`reactory-data/plugins`).

This package **must be built and deployed first** before any other Reactory project can build or run.

## Technology Stack

- **Language**: TypeScript 5.5.3
- **Runtime**: Node.js 20.15.1 (see `.nvmrc`)
- **Package manager**: Yarn
- **Build tool**: Rollup 4.18.1
- **Test framework**: Jest 29.7.0 with ts-jest preset
- **Linting**: ESLint 9.7.0 + @typescript-eslint + Prettier 3.3.2
- **Documentation**: JSDoc with better-docs template
- **Module format**: CommonJS (`"type": "commonjs"`)
- **Output formats**: UMD (`dist/reactory.core.js`) and ESM (`dist/reactory.core.esm.js`)

## Project Structure

```
reactory-core/
  src/
    constants.ts          # VERSION constant, SERVER_ENVIRONMENT config
    Reactory.ts           # Main entry: ReactoryClass, enums, abstract ReactoryService
    types/
      index.d.ts          # Primary type definitions (~13,125 lines) - Reactory namespace
      global.d.ts         # NodeJS global augmentation
      client/             # Client-side types (web + native)
      components/         # Component types
      core/               # Core types
      data/               # Data types
      excel/              # Excel integration types
      forms/              # Form system types (~1,556 lines)
      git/                # Git integration types
      graph/              # GraphQL types
      i18n/               # Internationalization types
      models/             # Domain model types (~1,687 lines)
      mongo/              # MongoDB types
      native/             # Native-specific types
      pdf/                # PDF types
      platform/           # Platform types
      react-native/       # React Native types
      reflection/         # Reflection/decorator types
      routing/            # Routing types
      schema/             # Schema types (~1,067 lines)
      server/             # Server types (~1,176 lines)
      service/            # Service interface types (~1,767 lines)
      ux/                 # UX/UI types
      web/                # Web-specific types
      workflow/           # Workflow types
  scripts/
    deploy.js             # Deploys built .tgz to server, client, and plugins dirs
    package.mjs           # Creates .tgz package via yarn pack
    version.mjs           # Version bumping with git-change detection
  rollup/
    copy.js               # Custom rollup plugin for copying .d.ts files to dist
  test/
    version.spec.ts       # Version verification test
  dist/                   # Build output (gitignored)
  docs/                   # Generated JSDoc documentation
  branding/               # Logo assets
```

## Build and Development Commands

```bash
# Full build pipeline (clean, version bump, rollup, docs, package, deploy to sibling projects)
yarn build:install

# Full pipeline WITHOUT version bump
yarn build:install:no-bump

# Individual build steps
yarn build:clean              # Remove dist/, docs/, .tgz files
yarn build:rollup             # Run rollup bundler
yarn build:package            # Create .tgz via yarn pack
yarn deploy:local             # Deploy .tgz to $REACTORY_CLIENT, $REACTORY_SERVER, $REACTORY_PLUGINS/artifacts/

# Quality
yarn test                     # Run Jest tests
yarn build:lint               # ESLint with auto-fix
yarn build:docs               # Generate JSDoc documentation

# Publishing
yarn publish:npm              # Publish to npm registry
yarn publish:patch            # Full pipeline + npm publish
```

## Deployment Model

1. Rollup bundles source into UMD + ESM outputs in `dist/`
2. Type definitions (`.d.ts`) are copied to `dist/types/`
3. `yarn pack` creates a `.tgz` tarball
4. The deploy script copies the tarball to:
   - `$REACTORY_CLIENT` (PWA client)
   - `$REACTORY_SERVER` (Express server)
   - `$REACTORY_PLUGINS/artifacts/` (plugins directory)
5. Consuming projects reference the `.tgz` via `file:` dependencies in `package.json`

## TypeScript Namespace Structure

Types use the global `Reactory` namespace. Consumers reference types as:
- `Reactory.Server.*` -- Server environment, context, configuration
- `Reactory.Forms.*` -- Form schema system types
- `Reactory.Models.*` -- Domain model types
- `Reactory.Service.*` -- Service interface definitions
- `Reactory.Client.*` -- Client models, web and native
- `Reactory.Schema.*` -- Schema and reflection types
- `Reactory.Graph.*` -- GraphQL types
- `Reactory.I18n.*` -- Internationalization
- `Reactory.UX.*` -- UX/UI types
- `Reactory.Routing.*` -- Routing types
- `Reactory.Platform.*` -- Platform types
- `Reactory.Workflow.*` -- Workflow types

## Version Management

The `scripts/version.mjs` script uses a `.version` template file (`1.1.${buildNumber}`):
- Auto-increments the build number when uncommitted or unpushed git changes are detected
- `--no-bump` flag skips version increment
- `--read` flag prints current version without changes

## Coding Conventions

- TypeScript strict mode with experimentalDecorators and emitDecoratorMetadata enabled
- ESLint config: 2-space indent, double quotes, semicolons required, trailing commas, max line length 100
- `@typescript-eslint/no-explicit-any` is a warning (not error) -- legacy code uses `any` in places
- Unused variables with `^_` prefix are allowed (ignore pattern)
- Add new types in a backward-compatible way
- Document all exported types and utilities with JSDoc
- Keep types generic and reusable across server, web client, and native client

## Runtime Code

The runtime code is minimal:
- `ReactoryClass` -- Static container for core feature registration
- `FeatureType` enum -- Classifies features (Component, Service, Form, etc.)
- `ComponentDomain` enum -- Classifies component domains
- Abstract `ReactoryService` base class for service implementations
- Environment constants (`VERSION`, `SERVER_ENVIRONMENT`)

## Environment Variables

```bash
REACTORY_HOME      # Root workspace directory
REACTORY_DATA      # Path to reactory-data
REACTORY_SERVER    # Path to reactory-express-server
REACTORY_CLIENT    # Path to reactory-pwa-client
REACTORY_NATIVE    # Path to reactory-native
REACTORY_PLUGINS   # Path to reactory-data/plugins
```

## Dependencies

- **Runtime** (3 packages): `reflect-annotations`, `reflect-args`, `reflect-metadata`
- **Peer**: `react` 17.0.2
- **Dev** (70+ packages): Extensive type references for declaration files -- includes types for React, MUI, Apollo, D3, MongoDB, Three.js, and more. These are dev-only because they provide type context for the `.d.ts` files, not runtime functionality.
