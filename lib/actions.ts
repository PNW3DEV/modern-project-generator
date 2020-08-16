import fs  from 'fs'

import { actionsHandler as contentfulActionsHandler } from './contentful'
import { generateWorkspaceConfig } from './workspaces'

type AnyObj = { [k: string]: any }

export default (data: AnyObj) => {
  let actions: AnyObj[] = []

  const cwd = process.cwd()
  const startingPath = `${cwd}/${data.name}`
  const startingTemplatePath = `./templates/${data.workspace}`

  /* RECURSIVE FILE MERGER BY WORKSPACE */
  const recursiveFiles = (path: string, templateDir: string) => {
    const tmpDir = templateDir.replace('.', '')
    const files = fs.readdirSync(templateDir)
    files.forEach(file => {
      if ((file.includes('.') || file.endsWith('file')) && !file.includes('.storybook')) {
        const action = {
          type: 'add',
          path: `${path}/${file}`.replace('.prompt', ''),
          templateFile: `${templateDir}/${file}`,
          skipIfExists: true,
          abortOnFail: false,
          skip: () => false as any
        }
        const isPrompt = file.includes('.prompt')
        const dirExists = data[''][tmpDir]
        const isBoolean = typeof data[''][tmpDir] === 'boolean'
        const isMultiplePrompt = isPrompt && dirExists && !isBoolean && !data[''][tmpDir].find((f: string) => f === file)
        const isSinglePrompt = isPrompt && !data[''][tmpDir]
        if (isMultiplePrompt || isSinglePrompt) {
          action.skip = () => `Skipped ${action.path}`
        }
        actions.push(action)
      } else if (!file.includes('.prompt')) {
        return recursiveFiles(`${path}/${file}`, `${templateDir}/${file}`)
      }
    })
    return actions
  }

  /* GENERATE SELECTED WORKSPACE FILES */
  actions = recursiveFiles(startingPath, startingTemplatePath)

  /* CYPRESS/E2E FILES */
  if (['gatsby', 'gatsby-contentful', 'create-react-app', 'next'].includes(data.workspace)) {
    // add cypress e2e workspace && install cypress deps
    actions = recursiveFiles(`${startingPath}-e2e/`, './templates/cypress-e2e')
    actions.push({
      type: 'npmInstall',
      path: `${startingPath}-e2e/`,
      verbose: true
    })
  }

  /* CONTENTFUL SUPPORT */
  contentfulActionsHandler(data)

  /* Add to Lerna/Workspaces */
  generateWorkspaceConfig(data)

  /* Install Dependencies */
  console.info('Install Dependencies', actions)
  const directoriesToInsall = [`${cwd}/${data.name}`, cwd]
  directoriesToInsall.forEach(dir => {
    actions.push({
      type: 'npmInstall',
      path: dir,
      verbose: true
    })
  })

  /* DEDUPE ACTIONS */
  const uniqueActions: AnyObj = actions.reduce((acc: AnyObj, curr: AnyObj) => {
    acc[curr.path] = curr
    return acc
  }, {})
  actions = Object.values(uniqueActions)
  return actions.filter(action => !!action)
}
