import app from './app'
import log from './util/logger'

const port = process.env.PORT || 4000

const server = app.listen(port as number, () => {
  log.info(`'App started on port: ${port} NODE_ENV=${process.env.NODE_ENV} ${process.env.CLIENT_URL}`)
})

process.on('uncaughtException', (err) => {
  log.error('App Crashed')
  log.error(err)
})

export default server
