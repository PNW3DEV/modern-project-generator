require('dotenv').config({
  path: `${__dirname}/../.env}`,
})

import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import xssFilter from 'x-xss-protection'

import { HealthCheck } from './interfaces/health-check.interface'
import loggerMiddleware from './middleware/logger.middleware'
import routes from './routes'

const app = express()
const router = express.Router()

const headers1 = 'Origin, X-Requested-With, Content-Type, Accept'
const headers2 = 'Authorization, Access-Control-Allow-Credentials, x-access-token'

const clientHeaderOrigin = process.env.CLIENT_URL || ''
const whitelist = [clientHeaderOrigin]
const corsOptions = (req: Request|any, callback: (...args: any) => any): void => {
  const originIsWhitelisted = process.env.JEST_TEST || process.env.CI_TEST || whitelist.indexOf(req.headers.origin) !== -1
  callback(originIsWhitelisted ? null : `The CORS policy for this site does not allow access from the specified Origin: ${req.headers.origin}`, originIsWhitelisted)
}

// For security reasons - don't tell users details about this web app in the headers
app.disable('x-powered-by')

// setup body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// enable cors
app.use(cors(corsOptions))

// Sets "X-XSS-Protection: 1; mode=block".
app.use(xssFilter({ reportUri: '/report-xss-violation' }))
app.use(helmet())

// Add Logging Middleware
app.use(loggerMiddleware)

// Add cors headers
app.use((_: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', process.env.CI_TEST ? 'http://localhost:8000' : whitelist[0])
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS, PUT'
  )
  res.header('Access-Control-Allow-Headers', `${headers1},${headers2}`)
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.get('/', (_: Request, res: Response): void => {
  const response: HealthCheck = {
    status: 200,
    message: 'healthy'
  }
  res.status(200).json(response)
})

// Add API Routes
app.use('/api', router)
routes(router)

app.get('*', (_: Request, res: Response): void => {
  res.status(404).json({
    status: 404,
    message: 'Not Found',
  })
})

export default app
