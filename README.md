# Commitlint Composer Scopes

Shareable `commitlint` config enforcing Composer package and workspace names as
scopes. Use with [@commitlint/cli](../cli) and
[@commitlint/prompt-cli](../prompt-cli).

## Getting started

```
npm install --save-dev @itcig/config-composer-scopes @commitlint/cli
echo "module.exports = {extends: ['@itcig/config-composer-scopes']};" > commitlint.config.js
```

Add custom `composer-workspaces` property to root _**package.json**_

```json
{
  "composer-workspaces": {
    "packages": ["path-to-composer-packages/*", "or-add-specific-packages"]
  }
}
```

## Examples

```
❯ cat commitlint.config.js
{
  extends: ['@itcig/config-composer-scopes']
}

❯ tree packages

packages
├── api
├── app
└── web

❯ echo "build(api): change something in api's build" | commitlint
⧗   input: build(api): change something in api's build
✔   found 0 problems, 0 warnings

❯ echo "test(foo): this won't pass" | commitlint
⧗   input: test(foo): this won't pass
✖   scope must be one of [api, app, web] [scope-enum]
✖   found 1 problems, 0 warnings

❯ echo "ci: do some general maintenance" | commitlint
⧗   input: ci: do some general maintenance
✔   found 0 problems, 0 warnings
```
