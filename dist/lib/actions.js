"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const contentful_1 = require("./contentful");
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
    var _a, _b, _c, _d;
    const isPrompt = file.includes('.prompt');
    const isBoolean = typeof ((_a = data['']) === null || _a === void 0 ? void 0 : _a[tmpDir]) === 'boolean';
    if (!isPrompt || isBoolean)
        return action;
    const promptAction = { ...action };
    const dirExists = (_b = data['']) === null || _b === void 0 ? void 0 : _b[tmpDir];
    const isMultiplePrompt = dirExists && !((_d = (_c = data['']) === null || _c === void 0 ? void 0 : _c[tmpDir]) === null || _d === void 0 ? void 0 : _d.some((f) => f === file));
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (isMultiplePrompt) {
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
            if ((file.includes('.') || file.endsWith('file')) && !file.includes('.storybook')) {
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
            else if (!file.includes('.prompt')) {
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