"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatsbyActionHandler = void 0;
exports.gatsbyActionHandler = (workspace, actions, recursiveFiles, startingPath, plop) => {
    const whitelistedWorkspaces = ['gatsby', 'gatsby-contentful'];
    if (!whitelistedWorkspaces.includes(workspace))
        return actions;
    actions = recursiveFiles(`${process.cwd()}/shared-lib/`, `${plop.getPlopfilePath()}/templates/shared-lib`);
    actions = recursiveFiles(`${startingPath}-components/`, `${plop.getPlopfilePath()}/templates/component-lib`);
    actions.push(...[
        {
            type: 'npmInstall',
            path: `${process.cwd()}/shared-lib/`,
            verbose: true
        },
        {
            type: 'npmInstall',
            path: `${startingPath}-components/`,
            verbose: true
        }
    ]);
    return actions;
};
//# sourceMappingURL=gatsby.js.map