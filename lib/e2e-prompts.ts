export const prompts = [
  {
    name: "includeE2E",
    when: (answers: { workspace: string }) => {
      const clientList = ['gatsby', 'gatsby-contentful', 'next', 'component-lib', 'create-react-app']
      if (clientList.includes(answers.workspace)) return true
      return false
    },
    message: "Do you want to include a cypress e2e suite?",
    type: 'confirm'
  }
]
