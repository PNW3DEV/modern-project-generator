import fs  from 'fs'

import { NodePlopAPI } from 'plop'

import { actionsHandler as contentfulActionsHandler } from './contentful'
import { generateWorkspaceConfig } from './workspaces'

type AnyObj = { [k: string]: any }

const getAppendAction = (file: string, templateDir: string, action: AnyObj) => {
  if (file.includes('append')) {
    const appendAction = { ...action }
    appendAction.type = 'modify'
    appendAction.pattern = /(-- APPEND ITEMS HERE --)/gi
    appendAction.template = fs.readFileSync(`${templateDir}/${file}`).toString()
    appendAction.path = appendAction.path.replace('.append', '')
    return appendAction
  }
  return action
}

const getPromptAction = (file: string, tmpDir: string, data: any, action: AnyObj) => {
  const promptAction = { ...action }
  const isPrompt = file.includes('.prompt')
  const dirExists = data[''][tmpDir]
  const isBoolean = typeof data[''][tmpDir] === 'boolean'
  const isMultiplePrompt = isPrompt && dirExists && !isBoolean && !data[''][tmpDir].find((f: string) => f === file)
  const isSinglePrompt = isPrompt && !data[''][tmpDir]
  if (isMultiplePrompt || isSinglePrompt) {
    promptAction.skip = () => `Skipped ${action.path}`
  }
  return promptAction
}

export default (plop: NodePlopAPI, data: AnyObj) => {
  let actions: AnyObj[] = []

  const cwd = process.cwd()
  const startingPath = `${cwd}/${data.name}`
  const startingTemplatePath = `${plop.getPlopfilePath()}/templates/${data.workspace}`

  /* RECURSIVE FILE MERGER BY WORKSPACE */
  const recursiveFiles = (path: string, templateDir: string) => {
    const tmpDir = templateDir.replace('.', '')
    const files = fs.readdirSync(templateDir)
    files.forEach(file => {
      if ((file.includes('.') || file.endsWith('file')) && !file.includes('.storybook')) {
        let action: any = {
          type: 'add',
          path: `${path}/${file}`.replace('.prompt', ''),
          templateFile: `${templateDir}/${file}`,
          skipIfExists: !file.includes('.modify') && !file.includes('.append'),
          abortOnFail: true,
          skip: () => false,
        }
        action = getAppendAction(file, templateDir, action)
        action = getPromptAction(file, tmpDir, data, action)
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
  if (data.includeE2E || data.workspace === 'cypress-e2e') {
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
  const directoriesToInstall = [`${cwd}/${data.name}`, cwd]
  directoriesToInstall.forEach(dir => {
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
