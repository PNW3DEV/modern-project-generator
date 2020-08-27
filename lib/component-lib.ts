import { PromptQuestion } from 'node-plop'

export const prompts: PromptQuestion[] = [
  {
    name: "includeBootstrappedComponentLib",
    when: (answers: { workspace: string }) => {
      const clientList = ['gatsby', 'gatsby-contentful', 'next', 'component-lib', 'create-react-app']
      if (clientList.includes(answers.workspace)) return true
      return false
    },
    message: "Do you want to include a bootstrapped component library?",
    type: 'confirm'
  }
]
