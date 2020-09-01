"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipelinesActionHandler = exports.prompts = void 0;
exports.prompts = [
    {
        name: "CICD",
        when: (answers) => {
            const blacklist = ['shared-lib', 'cypress-e2e'];
            if (blacklist.includes(answers.workspace))
                return false;
            return true;
        },
        choices: [
            { name: 'Google Cloud Build', value: 'cloudbuild' },
            { name: 'GitHub Actions', value: 'github' },
            { name: 'GitLab CI', value: 'gitlab' },
            { name: 'Azure DevOps', value: 'azure' },
            { name: 'None', value: false }
        ],
        message: "Do you want to include a CICD pipeline?",
        type: 'list'
    }
];
var templates;
(function (templates) {
    templates[templates["cloudbuild"] = 0] = "cloudbuild";
    templates[templates["github"] = 1] = "github";
    templates[templates["gitlab"] = 2] = "gitlab";
    templates[templates["azure"] = 3] = "azure";
})(templates || (templates = {}));
exports.pipelinesActionHandler = (type, actions, destination, templatePath) => {
    if (!type)
        return actions;
    const templateFiles = {
        cloudbuild: [`${templatePath}/pipelines/cloud*`],
        github: [],
        gitlab: [],
        azure: [],
    };
    actions.push({
        type: "addMany",
        destination,
        base: templatePath,
        templateFiles: templateFiles[type],
        stripExtensions: '.custom'
    });
    return actions;
};
//# sourceMappingURL=pipelines.js.map