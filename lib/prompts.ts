import fs from 'fs'

import { Prompts } from 'node-plop'
import { NodePlopAPI } from 'plop'

import { prompts as contentfulPrompts } from './contentful'
import { prompts as e2ePrompts } from './e2e-prompts'
import { prompts as cicdPrompts } from './pipelines'

export default (plop: NodePlopAPI) => {
  const prompts: Prompts&any[] = [
    /* APPEND CUSTOM PROMPTS HERE */
    ...contentfulPrompts,
    ...e2ePrompts,
    ...cicdPrompts,
  ]

  /* GENERATE PROMPTS RECURSIVELY */
  const recursivePrompts = (templateDir: string) => {
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
              .replace(`${plop.getPlopfilePath()}/templates/`, '')
              .split('/')[0]
          })
        }
      }
    })
    return prompts
  }
  return recursivePrompts(`${plop.getPlopfilePath()}/templates`)
}
