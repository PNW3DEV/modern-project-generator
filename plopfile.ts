require('plop')
const fs = require('fs')

module.exports = async (plop) => {
  const cwd = process.cwd()
  plop.load('plop-pack-npm-install', null, null)
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
        message: 'organization name'
      },
      {
        type: 'input',
        name: 'name',
        message: 'workspace name'
      },
      {
				type: 'checkbox',
				name: 'utils',
				message: 'What utils do you want?',
				choices: [
					{name: 'Bunyan Logger', value: 'logger', checked: false},
					{name: 'Firebase', value: 'firebase', checked: false},
				]
      },
      {
				type: 'checkbox',
				name: 'pipelines',
				message: 'What CI/CD pipelines do you want?',
				choices: [
          { description: 'Google Cloud Build Fast Deploy', value: 'cloudbuild-fast-deploy', checked: false },
          { description: 'Google Cloud Build Merge Checks', value: 'cloudbuild-merge-checks', checked: false },
          { description: 'Google Cloud Build Deployment', value: 'cloudbuild-deploy', checked: false },
          // TODO: add additional CI/CD templates
          // { name: 'Gitlab Merge Checks', value: '.gitlab-ci', checked: false },
          // { name: 'Azure Pipelines', value: 'azure', checked: false },
          // { name: 'GitHub Actions', value: 'github', checked: false },
				]
			}
    ],
    actions: (data) => {
      let actions = []
      const startingPath = `${cwd}/${data.name}`
      const startingTemplatePath = `./templates/${data.workspace}`

      /* RECURRSIVE FILE MERGER BY WORKSPACE */
      const recurrsiveFiles = (path, templateDir) => {
        const files = fs.readdirSync(templateDir)
        files.forEach(file => {
          if (!file.includes('.prompt') && !fs.existsSync(`${path}/${file.replace('.prompt', '')}`)) {
            if ((file.includes('.') || file.endsWith('file')) && !file.includes('.storybook')) {
              actions.push({
                type: 'add',
                path: `${path}/${file}`,
                templateFile: `${templateDir}/${file}`,
                skipIfExists: true,
                abortOnFail: false
              })
            } else {
              return recurrsiveFiles(`${path}/${file}`, `${templateDir}/${file}`)
            }
          }
        })
        return actions
      }

      /* GENERATE SELECTED WORKSPACE FILES */
      actions = recurrsiveFiles(startingPath, startingTemplatePath)

      /* UTIL FILES */
      data.utils.forEach(util => {
        if (data.workspace !== 'serverless-cloud-functions') {
          actions.push({
            type: 'add',
            path: `${startingPath}/src/util/${util}.ts`,
            templateFile: `${startingTemplatePath}/src/util/${util}.prompt.ts`,
            skipIfExists: true,
            abortOnFail: false
          })
        }
      })

      /* PIPELINE FILES */
      data.pipelines.forEach(pipeline => {
        if (data.workspace !== 'serverless-cloud-functions') {
          actions.push({
            type: 'add',
            path: `${startingPath}/pipelines/${pipeline}.yaml`,
            templateFile: `${startingTemplatePath}/pipelines/${pipeline}.prompt.yaml`,
            skipIfExists: true
          })
        }
      })

      /* CYPRESS/E2E FILES */
      if (['gatsby', 'create-react-app', 'next'].includes(data.workspace)) {
        // add cypress e2e workspace && install cypress deps
        actions = recurrsiveFiles(`${startingPath}-e2e/`, './templates/cypress-e2e')
        actions.push({
          type: 'npmInstall',
          path: `${startingPath}-e2e/`,
          verbose: true
        })
      }

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
