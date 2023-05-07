import path from "node:path"; 
import fse from 'fs-extra';
import { project, packageJson } from "ember-apply";

let root = await project.gitRoot();

for await (let workspace of await project.getWorkspaces()) {
  if (workspace === root) continue;

  let relative = path.join(path.relative(workspace, root), 'package.json'); 

  await packageJson.removeDevDependencies(['eslint-plugin-prettier']);

  await packageJson.addDevDependencies({
    '@nullvoxpopuli/eslint-configs': 'latest',
    '@typescript-eslint/eslint-plugin': 'latest',
    '@typescript-eslint/parser': 'latest',
    'eslint': 'latest',
    'prettier': 'latest',
    'typescript': 'latest',
  }, workspace);

  let configPath = path.join(workspace, '.eslintrc.cjs');
  let hasConfig = await fse.pathExists(configPath);

  if (!hasConfig) {
    await fse.writeFile(configPath, 
      `'use strict';\n\n` 
      + `const { configs } = require('@nullvoxpopuli/eslint-configs');\n\n` 
      + `module.exports = configs.crossPlatform();\n`);
  }
}
