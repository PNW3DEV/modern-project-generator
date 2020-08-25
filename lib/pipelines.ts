export const prompts = [
  {
    name: "CICD",
    when: (answers: { workspace: string }) => {
      const blacklist = ['shared-lib', 'cypress-e2e']
      if (blacklist.includes(answers.workspace)) return false
      return true
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
]

enum templates {
  'cloudbuild',
  'github',
  'gitlab',
  'azure'
}

export const pipelinesActionHandler = (
  type: keyof templates,
  actions: any[],
  destination: string,
  templatePath: string
) => {
  if (!type) return actions

  const templateFiles = {
    cloudbuild: [`${templatePath}/pipelines/cloud*`],
    github: [],
    gitlab: [],
    azure: [],
  }

  actions.push({
    type: "addMany",
    destination,
    base: `${templatePath}`,
    templateFiles: templateFiles[type],
    stripExtensions: '.custom'
  })
  return actions
}
