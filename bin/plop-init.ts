import chalk from 'chalk'

import { version } from '../package.json'

export const initMessage = () => {
  console.info(
    `${chalk.green(
      'Welcome to the Modern Project Generator version',
      version + '!',
    )} Please start by selecting a project generator below:`,
  )
}
