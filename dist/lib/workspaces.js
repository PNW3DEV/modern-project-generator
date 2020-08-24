"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWorkspaceConfig = void 0;
const edit_json_file_1 = __importDefault(require("edit-json-file"));
exports.generateWorkspaceConfig = (data, skipScripts = false) => {
    const cwd = process.cwd();
    const lernaFile = edit_json_file_1.default(`${cwd}/lerna.json`);
    const rootPackageFile = edit_json_file_1.default(`${cwd}/package.json`);
    const currentPackages = lernaFile.get('packages') || rootPackageFile.get('workspaces') || [];
    const scripts = rootPackageFile.get('scripts');
    lernaFile.set('packages', [...currentPackages, data.name]);
    rootPackageFile.set('workspaces', [...currentPackages, data.name]);
    lernaFile.set('version', 'independent');
    if (!skipScripts) {
        scripts.bootstrap = scripts.bootstrap || 'lerna exec npm install';
        scripts[`build:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm run build`;
        scripts[`start:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm start`;
        scripts[`test:${data.name}`] = `lerna exec --scope @${data.organization}/${data.name} npm test`;
        rootPackageFile.set('scripts', scripts);
    }
    lernaFile.save();
    rootPackageFile.save();
};
//# sourceMappingURL=workspaces.js.map