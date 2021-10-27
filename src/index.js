/* eslint global-require: "off" */

const Path = require('path');
const Globby = require('globby');

module.exports = {
  utils: { getPackages },
  rules: {
    'scope-enum': (ctx) => getPackages(ctx).then((packages) => [2, 'always', packages]),
  },
};

function getPackages(context) {
  return Promise.resolve()
    .then(() => {
      const ctx = context || {};
      const cwd = ctx.cwd || process.cwd();

      const { 'composer-workspaces': composerWorkspaces } = require(Path.join(cwd, 'package.json')) || {};
      const { packages: composerPackages } = composerWorkspaces || {};

      if (Array.isArray(composerPackages) && composerPackages.length) {
        // use custom package.json property `composer-workspaces`
        return Globby(
          composerPackages.map((ws) => Path.posix.join(ws, 'composer.json')),
          { cwd },
        ).then((pJsons = []) => pJsons.map((pJson) => require(Path.join(cwd, pJson))));
      }

      return [];
    })
    .then((packages) =>
      packages
        .map((pkg) => pkg.name)
        .filter(Boolean)
        .map((name) => (name.indexOf('/') !== -1 ? name.split('/')[1] : name)),
    );
}
