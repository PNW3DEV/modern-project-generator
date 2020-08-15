import 'plop'

import fs from 'fs'

import actions from './lib/actions'
import prompts from './lib/prompts'

export default (plop: any) => {
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
        message: 'organization name',
      },
      {
        type: 'input',
        name: 'name',
        message: 'workspace name'
      },
      /* RECURSIVE/DYNAMIC PROMPTS */
      ...prompts()
    ],
    actions
  })
}
