import type { RequestHandler } from "express-serve-static-core"
import { NextFunction, Request, Response } from "express"
import firebase from '../util/firebase'
import log from '../util/logger'

const auth = firebase.auth()

export const decodeToken: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.authorization) {
    log.error('Missing Auth Headers', req.headers)
    return res.status(400).json({
      error: {
        message: "You did not specify any jwt for this request",
      },
    })
  }

  try {
    // Use firebase-admin auth to verify the token passed in from the client header.
    // This is token is generated from the firebase client
    // Decoding this token returns the userpayload and all the other token claims you added while creating the custom token
    req.token = req.headers.authorization.replace('Bearer ', '')
    req.user = await auth.verifyIdToken(req.token)
    log.info('verified user token', req.token, req.user)
    next()
  } catch (error) {
    log.error(error, `bad token sent: ${req.token}`)
    return res.status(401).json({ error })
  }
}

// Checks if a user is authenticated from firebase admin
export const isAuthorized: RequestHandler = async (
  req: Request | any,
  res: Response,
  next: NextFunction,
) => {
  if (req.user) {
    next()
  } else {
    log.error('Unauthorized')
    return res.status(401).json({
      error: {
        message:
          'You are not authorized to perform this action.',
      },
    })
  }
}

// Checks if a user has the required permission from token claims stored for the user - you would use this for the admin/backend api's
export const hasAdminRole: RequestHandler = async (
  req: Request|any,
  res: Response,
  next: NextFunction,
) => {
  if (!!req.user.admin) {
    next()
  } else {
    return res.status(403).json({
      error: {
        message: 'You are not permitted to access this resource'
      }
    })
  }
}
