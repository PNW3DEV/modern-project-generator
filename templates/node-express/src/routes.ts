import { Request, Response, Router } from 'express'

import * as testController from './controllers/test-controller'
import { decodeToken, isAuthorized } from './middleware/token.middleware'

export const routes = (router: Router) => {
  /* service discovery/healthcheck */
  router.route('/').get((_: Request, res: Response) => {
    return res.status(200).json({
      message: 'Api Service Routes!',
      statusCode: 200,
    })
  })

  /* sample test routes */
  router
    .route('/test')
    .post(decodeToken, isAuthorized, testController.post)
  router
    .route('/test')
    .get(testController.get)
}

export default routes
