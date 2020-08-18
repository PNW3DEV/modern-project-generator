import { Request } from 'express'

export type Logger = (...msg: any[]) => void

export interface RequestContext extends Request {
  log: {
    info: Logger
    warn: Logger
    error: Logger
  }
}

export default RequestSchema
