import fs from 'fs'

import bunyan, { LogLevel } from 'bunyan'
import colors from 'colors'

const myRawStream: any = (color: any)  => {
  const write = (rec: any) => {
    if (color === 'error') {
      console.error(colors.red(rec))
    }
    if (color === 'info') {
      console.info(colors.blue(rec))
    }
  }
  return {
    write
  }
}

const filePath =  process.env.NODE_ENV === 'production'
  ? '/var/log/OregonState-PUA-Batch-Service.log'
  : `${__dirname}/../../logs/OregonState-PUA-Batch-Service.log`

const logDir = `${__dirname}/../../logs/`

// create directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const log = bunyan.createLogger({
  name: 'OregonState-PUA-Batch-Service:App',
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  streams: [
    {
      // stream: process.stdout,
      level: 'info',
      stream: myRawStream('info')
    },
    {
      // stream: process.stdout,
      level: 'error',
      stream: myRawStream('error')
    },
    {
      type: 'rotating-file',
      path: filePath,
      period: '1d', // daily rotation
      count: 3, // keep 3 back copies
    },
  ],
})

export default log
