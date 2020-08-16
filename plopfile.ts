import 'plop'

import fs from 'fs'

import actions from './lib/actions'
import prompts from './lib/prompts'
import { validatePackageName } from './lib/validations'

interface Plop {
  load: (arg0: string, arg1: any, arg2: any) => void;
  setGenerator: (arg0: string, arg1: {
    description: string;
    prompts: any[];
    actions: (data: { [ k: string ]: any }) => any[];
  }) => void
}

export default (plop: Plop) => {
  plop.load('plop-pack-npm-install', null, null)
  plop.setGenerator('project', {
    description: 'Web Project Files',
    /* CUSTOM PROMPTS */
    prompts: [
      {
        type: 'list',
        name: 'workspace',
        default: 'create-react-app',
        choices: fs.readdirSync('./templates')
          .map(dir => ({ name: dir, value: dir }))
      },
      {
        type: 'input',
        name: 'organization',
        message: 'organization name',
        validate: validatePackageName,
      },
      {
        type: 'input',
        name: 'name',
        message: 'workspace name',
        validate: validatePackageName,
      },
      /* RECURSIVE/DYNAMIC PROMPTS */
      ...prompts(),
    ],
    actions
  })
}
