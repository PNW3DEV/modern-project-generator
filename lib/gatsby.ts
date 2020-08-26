import { NodePlopAPI } from 'plop'

export const gatsbyActionHandler = (
  workspace: string,
  actions: any[],
  recursiveFiles: (s: string, s2: string) => any[],
  startingPath: string,
  plop: NodePlopAPI
) => {
  const whitelistedWorkspaces = ['gatsby', 'gatsby-contentful']
  if (!whitelistedWorkspaces.includes(workspace)) return actions
  // TODO: come back to. This works but I don't exactly like it since it's opinionated and dependent on each other
  actions = recursiveFiles(`${process.cwd()}/shared-lib/`, `${plop.getPlopfilePath()}/templates/shared-lib`)
  actions = recursiveFiles(`${startingPath}-components/`, `${plop.getPlopfilePath()}/templates/component-lib`)
  // edit component lib package json name to append -components
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
  ])
  return actions
}
