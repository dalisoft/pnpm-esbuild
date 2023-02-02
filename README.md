# pnpm-esbuild

This repository shows example of how PNPM + ESBuild does not work together

## References issues

- https://github.com/pnpm/pnpm/issues/6009
- https://github.com/yarnpkg/berry/issues/5241

## `~/.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=true
use-lockfile-v6=true
```

## Installation & Running

### pnpm

- Clone repo
- Run `pnpm install` on each of subfolders
- Run `npm run build` at `frontend` folder
- YOU WILL SEE ERROR

> You can try `pnpm install --shamefully-hoist` at `frontend` folder, but does not help

<details>

<summary><code>.pnpmfile.cjs</code> did not help</summary>


```js
function afterAllResolved(lockfile, context) {
  const { importers, packages, specifiers } = lockfile;
  const { dependencies } = importers['.'];

  for (const name in dependencies) {
    const version = dependencies[name];
    const package = packages[version] || packages[`/${name}/${version}`];

    if (package) {
      if (package.dependencies) {
        Object.assign(dependencies, package.dependencies)
      }
    }
  }

  return lockfile
}

module.exports = {
  hooks: {
    afterAllResolved
  }
}
```

</details>

### yarn v3

- Clone repo
- Run `yarn set version stable`
- Run `pnpm install` on each of subfolders
- Run `node -r ./.pnp.cjs ./scripts/build.mjs` or `yarn node scripts/build.mjs` at `frontend` folder
- YOU WILL SEE ERROR

## Workaround

- Clone repo
- Run `npm install`
- Run `npm run build` at `frontend` folder
- YOU WILL SEE BUILD FOLDERS


## Alternative package managers

- `npm` -- works
- `yarn` v1 -- works
- `bun install` -- even depedendency exists at `frontend/node_modules` after installation exists, same bug
