require('plop')
const fs = require('fs')
const editJSONFile = require('edit-json-file')

module.exports = (plop) => {
  const cwd = process.cwd()
  let prompts = []
  plop.load('plop-pack-npm-install', null, null)

  /* GENERATE PROMPTS RECURSIVELY */
  const recursivePrompts = (templateDir) => {
    const dir = fs.readdirSync(templateDir)
    dir.forEach((file, idx) => {
      const path = `${templateDir}/${file}`
      if (!file.includes('.') && !file.endsWith('file')) {
        return recursivePrompts(path)
      } else if (idx === dir.length - 1) {
        const choices = fs.readdirSync(templateDir)
          .filter(filename => filename.includes('.prompt'))
          .map(filename => ({ description: `${templateDir}/${filename}`, value: filename, checked: false }))

        if (choices.length) {
          prompts.push({
            type: 'checkbox',
            name: templateDir,
            message: `What ${templateDir} additional files do you want`,
            choices,
            when: (answers) => answers.workspace === templateDir
              .replace('./templates/', '')
              .split('/')[0]
          })
        }
      }
    })
    return prompts
  }

  prompts = recursivePrompts(`./templates`)

  plop.setGenerator('project', {
    description: 'Web Project Files',
    /* CUSTOM PROMPTS */
    prompts: [
      {
        type: 'list',
        name: 'workspace',
        default: 'create-react-app',
        choices: fs.readdirSync('./templates').map(dir => ({ name: dir, value: dir }))
      },
      {
        type: 'input',
        name: 'organization',
        message: 'organization name',
        when: (somethting) => {
          console.log(somethting);
          return true

        }
      },
      {
        type: 'input',
        name: 'name',
        message: 'workspace name'
      },
      ...prompts
    ],
    actions: (data) => {
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
              path: `${path}/${file}`,
              templateFile: `${templateDir}/${file}`,
              skipIfExists: true,
              abortOnFail: false
            }
            if (data[''][tmpDir] && !data[''][tmpDir].find(f => f === file)) {
              action.skip = 'Skipped'
            }
            actions.push(action)
          } else if (!file.includes('.prompt')) {
            return recursiveFiles(`${path}/${file}`, `${templateDir}/${file}`, 'actions')
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
  })
}
