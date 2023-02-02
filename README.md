# pnpm-yarn-pnp-esbuild

This repository shows example of how PNPM/Yarn/PnP + ESBuild does not work together

## References issues

- https://github.com/pnpm/pnpm/issues/6009
- <strike>https://github.com/yarnpkg/berry/issues/5241</strike> (see `frontend/.yarnrc.yml`)
- https://github.com/yarnpkg/berry/issues/5242

## `~/.npmrc`

```
auto-install-peers=true
strict-peer-dependencies=true
use-lockfile-v6=true
```

## What's the problem

<details>

<summary>See the problem</summary>

```
✘ [ERROR] Could not resolve "uuid"

    src/App.js:2:29:
      2 │ import { v4 as uuidv4 } from "uuid";
        ╵                              ~~~~~~

  The Yarn Plug'n'Play manifest forbids importing "uuid" here because it's not listed as a
  dependency of this package:

    .pnp.cjs:281:33:
      281 │           "packageDependencies": [\
          ╵                                  ~~

  You can mark the path "uuid" as external to exclude it from the bundle, which will remove this
  error.

/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:1636
  let error = new Error(`${text}${summary}`);
              ^

Error: Build failed with 1 error:
src/App.js:2:29: ERROR: Could not resolve "uuid"
    at failureErrorWithLog (/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:1636:15)
    at /Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:1048:25
    at /Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:993:52
    at buildResponseToResult (/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:1046:7)
    at /Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:1075:16
    at responseCallbacks.<computed> (/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:697:9)
    at handleIncomingPacket (/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:752:9)
    at Socket.readFromStdout (/Users/dalisoft/Desktop/bug/pnpm-esbuild/frontend/.yarn/unplugged/esbuild-npm-0.17.5-ba581df653/node_modules/esbuild/lib/main.js:673:7)
    at Socket.emit (node:events:512:28)
    at addChunk (node:internal/streams/readable:324:12) {
  errors: [
    {
      detail: undefined,
      id: '',
      location: {
        column: 29,
        file: 'src/App.js',
        length: 6,
        line: 2,
        lineText: 'import { v4 as uuidv4 } from "uuid";',
        namespace: '',
        suggestion: ''
      },
      notes: [
        {
          location: {
            column: 33,
            file: '.pnp.cjs',
            length: 421,
            line: 281,
            lineText: '          "packageDependencies": [\\',
            namespace: '',
            suggestion: ''
          },
          text: `The Yarn Plug'n'Play manifest forbids importing "uuid" here because it's not listed as a dependency of this package:`
        },
        {
          location: null,
          text: 'You can mark the path "uuid" as external to exclude it from the bundle, which will remove this error.'
        }
      ],
      pluginName: '',
      text: 'Could not resolve "uuid"'
    }
  ],
  warnings: []
}
```

</details>

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
  const { dependencies } = importers["."];

  for (const name in dependencies) {
    const version = dependencies[name];
    const package = packages[version] || packages[`/${name}/${version}`];

    if (package) {
      if (package.dependencies) {
        Object.assign(dependencies, package.dependencies);
      }
    }
  }

  return lockfile;
}

module.exports = {
  hooks: {
    afterAllResolved,
  },
};
```

</details>

### yarn v3

- Clone repo
- Run `yarn set version stable`
- Run `yarn install` on each of subfolders
- Run `npm run yarn-build` at `frontend` folder
- YOU WILL SEE ERROR

## Workaround

- Clone repo
- Run `npm install`
- Run `npm run build` at `frontend` folder
- YOU WILL SEE BUILD FOLDERS

## Test case

| Package Manager   | Build | Local-link |
| ----------------- | ----- | ---------- |
| `npm`             | ✅    | ❌         |
| `yarn` v1         | ✅    | ✅         |
| `yarn` v3/PnP     | ❌    | ❓         |
| `bun install` [1] | ❌    | ❓         |

`[1]` even depedendency exists at `frontend/node_modules` after installation exists, same bug
