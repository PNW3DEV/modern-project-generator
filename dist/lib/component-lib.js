"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prompts = void 0;
exports.prompts = [
    {
        name: "includeBootstrappedComponentLib",
        when: (answers) => {
            const clientList = ['gatsby', 'gatsby-contentful', 'next', 'component-lib', 'create-react-app'];
            if (clientList.includes(answers.workspace))
                return true;
            return false;
        },
        message: "Do you want to include a bootstrapped component library?",
        type: 'confirm'
    }
];
//# sourceMappingURL=component-lib.js.map