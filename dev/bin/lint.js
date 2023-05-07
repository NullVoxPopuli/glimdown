import path from "node:path";

import { execaCommand } from "execa";
import { packageJson, project } from "ember-apply";

const [, , command] = process.argv;
// process.cwd() is whatever pnpm decides to do
// 
// Other options:
//  PNPM_SCRIPT_SRC_DIR
//  OLDPWD
const cwd = process.env['INIT_CWD'];

const root = await project.gitRoot();
const manifest = await packageJson.read(cwd);
const relative = path.relative(root, cwd);

console.debug(`${manifest.name} :: within ${relative}`);

async function run() {
  switch (command) {
    case "prettier:fix":
      return execaCommand(
        `pnpm prettier -w . --cache --cache-strategy content`,
        { cwd }
      );
    case "prettier":
      return execaCommand(`pnpm prettier -c .`, { cwd });
    case "js:fix":
      return execaCommand(`pnpm eslint --fix . --cache --cache-strategy content`, { cwd });
    case "js":
      return execaCommand(`pnpm eslint .`, { cwd });
    case "fix":
      return execaCommand(`pnpm turbo lint:fix`)
    default:
      return execaCommand(`pnpm turbo lint`)
  }
}

await run();
