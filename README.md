# pnpm-esbuild

This repository shows example of how PNPM + ESBuild does not work together

## References issues

- https://github.com/pnpm/pnpm/issues/6009

## `~/.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=true
use-lockfile-v6=true
```

## Installation & Running

- Clone repo
- Run `pnpm install` on each of subfolders
- Run `node ./scripts/build.mjs` at `frontend` folder

## Workaround

- Clone repo
- Run `npm install --legacy-peer-deps`
- Run `node ./scripts/build.mjs` at `frontend` folder
