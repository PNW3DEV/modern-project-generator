import fs from 'fs'

import { prompts as contentfulPrompts } from './contentful'
import { prompts as e2ePrompts } from './e2e-prompts'

export default () => {
  let prompts = []
  prompts.push(...contentfulPrompts, ...e2ePrompts)

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
            type: choices.length > 1 ? 'checkbox' : 'confirm',
            name: templateDir,
            message: choices.length > 1 ?
              `What additional ${templateDir} files do you want` :
              `Do you want to include ${choices[0].description.replace('.prompt', '')}?`,
            choices,
            when: (answers: {[k:string]: any}) => answers.workspace === templateDir
              .replace('./templates/', '')
              .split('/')[0]
          })
        }
      }
    })
    return prompts
  }
  return recursivePrompts(`./templates`)
}
