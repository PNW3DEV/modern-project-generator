import fs  from 'fs'

import editJSONFile  from 'edit-json-file'

export default (data) => {
  const cwd = process.cwd()
  let actions = []
  const startingPath = `${cwd}/${data.name}`
  const startingTemplatePath = `./templates/${data.workspace}`

  /* RECURSIVE FILE MERGER BY WORKSPACE */
  const recursiveFiles = (path, templateDir) => {
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
        const isMultiplePrompt = isPrompt && dirExists && !isBoolean && !data[''][tmpDir].find(f => f === file)
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

  /* Add to Lerna/Workspaces */
  const lernaFile = editJSONFile(`${cwd}/lerna.json`)
  const rootPackageFile = editJSONFile(`${cwd}/package.json`)
  const currentPackages = lernaFile.get('packages') || rootPackageFile.get('workspaces') || []
  lernaFile.set('packages', [...currentPackages, data.name])
  lernaFile.set('version', 'independent')
  rootPackageFile.set('workspaces', [...currentPackages, data.name])
  lernaFile.save()
  rootPackageFile.save()

  /* Install Dependencies */
  console.info('Install Dependencies', actions)
  actions.push({
    type: 'npmInstall',
    path: `${cwd}/${data.name}`,
    verbose: true
  })

  /* DEDUPE ACTIONS */
  const uniqueActions = actions.reduce((acc, curr) => {
    acc[curr.path] = curr
    return acc
  }, {})
  actions = Object.values(uniqueActions)
  return actions.filter(action => !!action)
}
