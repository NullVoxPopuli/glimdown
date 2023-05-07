import path from "node:path";

import { packageJson, project } from "ember-apply";
import fse from "fs-extra";

let root = await project.gitRoot();

for await (let workspace of await project.getWorkspaces()) {
  if (workspace === root) continue;

  await packageJson.removeDevDependencies(["eslint-plugin-prettier"]);

  await packageJson.addDevDependencies(
    {
      "@nullvoxpopuli/eslint-configs": "latest",
      "@typescript-eslint/eslint-plugin": "latest",
      "@typescript-eslint/parser": "latest",
      eslint: "latest",
      prettier: "latest",
      typescript: "latest",
    },
    workspace
  );

  await packageJson.addScripts(
    {
      "lint:prettier:fix": "pnpm -w exec lint prettier:fix",
      "lint:prettier": "pnpm -w exec lint prettier",
      "lint:fix": "pnpm -w exec lint fix",
      lint: "pnpm -w exec lint",
      "lint:js": "pnpm -w exec lint js",
      "lint:js:fix": "pnpm -w exec lint js:fix",
    },
    workspace
  );

  let configPath = path.join(workspace, ".eslintrc.cjs");
  let hasConfig = await fse.pathExists(configPath);

  if (!hasConfig) {
    await fse.writeFile(
      configPath,
      `'use strict';\n\n` +
        `const { configs } = require('@nullvoxpopuli/eslint-configs');\n\n` +
        `module.exports = configs.crossPlatform();\n`
    );
  }
}
