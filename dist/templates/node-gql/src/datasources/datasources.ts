import fs from 'fs'

const dao: any = {}
fs.readdirSync(`${__dirname}`).forEach(svc => {
  if (!['index.ts', 'datasources.ts'].includes(svc)) {
    dao[`${svc.split('.')[0].split('-')[0]}API`] = require(`./${svc}`)
  }
})

export default dao
