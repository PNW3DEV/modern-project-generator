import chalk from "chalk"

import pkg from "../package.json"

console.log(`
  ${chalk.green("Hey there! 👋")}

  Thanks for giving the ${pkg.name} a try. 🎉

  ## To get you going really quickly this project includes a setup step.
  // ${chalk.yellow.bold("package.json")}
  {
    "scripts": {
        "plop": "plop --plopfile ./node_modules/modern-project-generator/plopfile.ts"
    },
    ...
  }

  ${chalk.yellow.bold("npm run setup")} automates the following step for you:
    - add npm script to file ${chalk.yellow("./package.json")}

  When this is done run:

  ${chalk.yellow(
    "npm run plop"
  )} to use the monorepo project generator and follow the prompts.

  For further information check the readme of the project
  (https://github.com/PNW3DEV/modern-project-generator)
`);
