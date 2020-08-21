import fs from 'fs'
// import exportFile from "../contentful/export.json"
import { writeFileSync } from "fs"
import path from "path"

import chalk from "chalk"

// import spaceImport from "contentful-import"
// import spaceExport from "contentful-export"

const argv = require("yargs-parser")(process.argv.slice(2));

export const initMessage = (message: string) => {
  console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens. Please use an empty space for this.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red("->")} Space Settings ${chalk.red(
      "->"
    )} API keys`
  )}

  ${message}

  The ${chalk.green("Content Management API Token")}
    will be used to import and write data to your space.

  The ${chalk.green("Content Delivery API Token")}
    will be used to ship published production-ready content in your Gatsby app.

  The ${chalk.green("Content Preview API Token")}
    will be used to show not published data in your development environment.

  Ready? Let's do ittt! 🎉
`);
}

const when = (message: string, answers: { workspace: string }) => {
  const isWorkspace = answers.workspace === 'gatsby-contentful'
  if (isWorkspace) {
    console.log(message)
    return true
  }
  return false
}

export const prompts = [
  {
    name: "spaceId",
    message: "Enter Your Contentful Space ID",
    // when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID && ,
    when: when.bind(null, `To set up this project you need to provide your Space ID
      and the belonging API access tokens. Please use an empty space for this.

      You can find all the needed information in your Contentful space under:

      ${chalk.yellow(
        `app.contentful.com ${chalk.red("->")} Space Settings ${chalk.red(
          "->"
        )} API keys`
      )}
    `),
    validate: (input: string) =>
      /^[a-z0-9]{12}$/.test(input) ||
      "Space ID must be 12 lowercase characters",
  },
  {
    name: "managementToken",
    when: when.bind(null, `The ${chalk.green("Content Management API Token")}
      will be used to import and write data to your space.`),
    message: "Enter Your Content Management API access token",
  },
  {
    name: "accessToken",
    when: when.bind(null, `The ${chalk.green("Content Delivery API Token")}
      will be used to ship published production-ready content in your Gatsby app.`),
    message: "Enter Your Content Delivery API access token",
  },
  {
    name: "previewAccessToken",
    when: when.bind(null, `The ${chalk.green("Content Preview API Token")}
      will be used to show not published data in your development environment.
      Ready? Let's do ittt! 🎉`),
    message: "Enter Your Content Preview API access token",
  }
]

export const actionsHandler = ({
  spaceId,
  managementToken,
  accessToken,
  previewAccessToken,
  name: appName,
  workspace }: { [key: string]: string
}) => {
  if (workspace !== 'gatsby-contentful') return
  const cwd = process.cwd()
  const startingPath = `${cwd}/${appName}`
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
  // env vars are given precedence followed by args provided to the setup
  // followed by input given to prompts displayed by the setup script
  spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId;
  managementToken = argv.managementToken || managementToken;
  accessToken = CONTENTFUL_ACCESS_TOKEN || argv.accessToken || accessToken;

  console.log("Writing config file...");
  const configFiles = [`.env.local`, `.env.development`, `.env.test`, `.env.production`].map(file =>
    path.join(startingPath, file)
  );

  if (!fs.existsSync(startingPath)) fs.mkdirSync(startingPath)

  configFiles.forEach((file) => {
    const fileContents =
    [
      `# All environment variables will be sourced`,
      `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
      `# Do NOT commit this file to source control`,
      `# -- APPEND ITEMS HERE --`,
      `CONTENTFUL_SPACE_ID="${spaceId}"`,
      `CONTENTFUL_ACCESS_TOKEN="${file.includes('development') ? previewAccessToken : accessToken}"`,
      `ENABLE_GATSBY_REFRESH_ENDPOINT=${file.includes('development') || file.includes('local')}`,
    ].join("\n") + "\n";

    writeFileSync(file, fileContents, "utf8");
    console.log(`Config file ${chalk.yellow(file)} written`);
  });
  // spaceImport({ spaceId, managementToken, content: exportFile })
  console.log(`All set! You can now run ${chalk.yellow("npm run dev")}`)
}
