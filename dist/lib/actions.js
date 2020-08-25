"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const contentful_1 = require("./contentful");
const pipelines_1 = require("./pipelines");
const workspaces_1 = require("./workspaces");
const getAppendAction = (file, templateDir, action) => {
    if (file.includes('append')) {
        const appendAction = { ...action };
        appendAction.type = 'modify';
        appendAction.pattern = /(-- APPEND ITEMS HERE --)/gi;
        appendAction.template = fs_1.default.readFileSync(`${templateDir}/${file}`).toString();
        appendAction.path = appendAction.path.replace('.append', '');
        return appendAction;
    }
    return action;
};
const getPromptAction = (file, tmpDir, data, action) => {
    var _a;
    const isPrompt = file.includes('.prompt');
    const promptAction = { ...action };
    const dirExists = data[tmpDir];
    const isMultiplePrompt = isPrompt
        && dirExists
        && Array.isArray(dirExists)
        && !((_a = data === null || data === void 0 ? void 0 : data[tmpDir]) === null || _a === void 0 ? void 0 : _a.find((f) => f === file));
    const notFound = isPrompt && !(data === null || data === void 0 ? void 0 : data[tmpDir]);
    if (isMultiplePrompt || notFound) {
        promptAction.skip = () => `Skipped ${action.path}`;
    }
    return promptAction;
};
exports.default = (plop, data) => {
    let actions = [];
    const cwd = process.cwd();
    const startingPath = `${cwd}/${data.name}`;
    const startingTemplatePath = path_1.default.resolve(`${plop.getPlopfilePath()}/templates/${data.workspace}/`);
    const recursiveFiles = (path, templateDir) => {
        const tmpDir = templateDir.replace('.', '');
        const files = fs_1.default.readdirSync(templateDir);
        files.forEach(file => {
            const isFile = file.includes('.') || file.endsWith('file');
            const doSkip = !file.includes('.storybook') && !file.includes('.custom');
            if (isFile && doSkip) {
                let action = {
                    type: 'add',
                    path: `${path}/${file}`.replace('.prompt', ''),
                    templateFile: `${templateDir}/${file}`,
                    skipIfExists: !file.includes('.modify') && !file.includes('.append'),
                    abortOnFail: true,
                    skip: () => false,
                };
                action = getAppendAction(file, templateDir, action);
                action = getPromptAction(file, tmpDir, data, action);
                actions.push(action);
            }
            else if (!file.includes('.prompt') && !file.includes('.custom')) {
                return recursiveFiles(`${path}/${file}`, `${templateDir}/${file}`);
            }
        });
        return actions;
    };
    actions = recursiveFiles(startingPath, startingTemplatePath);
    if (data.includeE2E || data.workspace === 'cypress-e2e') {
        actions = recursiveFiles(`${startingPath}-e2e/`, `${plop.getPlopfilePath()}/templates/cypress-e2e`);
        actions.push({
            type: 'npmInstall',
            path: `${startingPath}-e2e/`,
            verbose: true
        });
    }
    pipelines_1.pipelinesActionHandler(data.CICD, actions, startingPath, startingTemplatePath);
    contentful_1.actionsHandler(data);
    workspaces_1.generateWorkspaceConfig(data);
    console.info('Install Dependencies');
    const directoriesToInstall = [`${cwd}/${data.name}`, cwd];
    directoriesToInstall.forEach(dir => {
        actions.push({
            type: 'npmInstall',
            path: dir,
            verbose: true
        });
    });
    const uniqueActions = actions.reduce((acc, curr) => {
        acc[curr.path] = curr;
        return acc;
    }, {});
    actions = Object.values(uniqueActions);
    return actions.filter(action => !!action);
};
//# sourceMappingURL=actions.js.map