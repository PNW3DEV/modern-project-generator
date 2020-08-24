"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionsHandler = exports.prompts = exports.initMessage = void 0;
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const argv = require("yargs-parser")(process.argv.slice(2));
exports.initMessage = (message) => {
    console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens. Please use an empty space for this.

  You can find all the needed information in your Contentful space under:

  ${chalk_1.default.yellow(`app.contentful.com ${chalk_1.default.red("->")} Space Settings ${chalk_1.default.red("->")} API keys`)}

  ${message}

  The ${chalk_1.default.green("Content Management API Token")}
    will be used to import and write data to your space.

  The ${chalk_1.default.green("Content Delivery API Token")}
    will be used to ship published production-ready content in your Gatsby app.

  The ${chalk_1.default.green("Content Preview API Token")}
    will be used to show not published data in your development environment.

  Ready? Let's do ittt! 🎉
`);
};
const when = (message, answers) => {
    const isWorkspace = answers.workspace === 'gatsby-contentful';
    if (isWorkspace) {
        console.log(message);
        return true;
    }
    return false;
};
exports.prompts = [
    {
        name: "spaceId",
        message: "Enter Your Contentful Space ID",
        when: when.bind(null, `To set up this project you need to provide your Space ID
      and the belonging API access tokens. Please use an empty space for this.

      You can find all the needed information in your Contentful space under:

      ${chalk_1.default.yellow(`app.contentful.com ${chalk_1.default.red("->")} Space Settings ${chalk_1.default.red("->")} API keys`)}
    `),
        validate: (input) => /^[a-z0-9]{12}$/.test(input) ||
            "Space ID must be 12 lowercase characters",
    },
    {
        name: "managementToken",
        when: when.bind(null, `The ${chalk_1.default.green("Content Management API Token")}
      will be used to import and write data to your space.`),
        message: "Enter Your Content Management API access token",
    },
    {
        name: "accessToken",
        when: when.bind(null, `The ${chalk_1.default.green("Content Delivery API Token")}
      will be used to ship published production-ready content in your Gatsby app.`),
        message: "Enter Your Content Delivery API access token",
    },
    {
        name: "previewAccessToken",
        when: when.bind(null, `The ${chalk_1.default.green("Content Preview API Token")}
      will be used to show not published data in your development environment.
      Ready? Let's do ittt! 🎉`),
        message: "Enter Your Content Preview API access token",
    }
];
exports.actionsHandler = ({ spaceId, managementToken, accessToken, previewAccessToken, name: appName, workspace }) => {
    if (workspace !== 'gatsby-contentful')
        return;
    const cwd = process.cwd();
    const startingPath = `${cwd}/${appName}`;
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env;
    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId;
    managementToken = argv.managementToken || managementToken;
    accessToken = CONTENTFUL_ACCESS_TOKEN || argv.accessToken || accessToken;
    console.log("Writing config file...");
    const configFiles = [`.env.local`, `.env.development`, `.env.test`, `.env.production`].map(file => path_1.default.join(startingPath, file));
    if (!fs_1.default.existsSync(startingPath))
        fs_1.default.mkdirSync(startingPath);
    configFiles.forEach((file) => {
        const fileContents = [
            `# All environment variables will be sourced`,
            `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
            `# Do NOT commit this file to source control`,
            `# -- APPEND ITEMS HERE --`,
            `CONTENTFUL_SPACE_ID="${spaceId}"`,
            `CONTENTFUL_ACCESS_TOKEN="${(file.includes('.development') || file.includes('.local')) ? previewAccessToken : accessToken}"`,
            `ENABLE_GATSBY_REFRESH_ENDPOINT=${file.includes('.development') || file.includes('.local')}`,
        ].join("\n") + "\n";
        fs_2.writeFileSync(file, fileContents, "utf8");
        console.log(`Config file ${chalk_1.default.yellow(file)} written`);
    });
    console.log(`All set! You can now run ${chalk_1.default.yellow("npm run dev")}`);
};
//# sourceMappingURL=contentful.js.map