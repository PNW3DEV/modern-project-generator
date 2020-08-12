import { Request, Response } from 'express'
// import {...} from './services/some-service'

export const get = (_: Request, res: Response) => {
  // make async call to service
  res.status(200).send({ response: 'success' })
}

export const post = (_: Request, res: Response) => {
  // make async call to service
  res.status(204).send()
}
