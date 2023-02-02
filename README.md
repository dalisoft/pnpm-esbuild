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

## Workaround

- Clone repo
- Run `npm install`
- Run `npm run build` at `frontend` folder
- YOU WILL SEE BUILD FOLDERS
