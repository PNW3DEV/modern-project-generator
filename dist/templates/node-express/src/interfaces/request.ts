/* This file does not include .interface to bypass JSON Schema Generation */

import { Request } from "express"
import admin from "firebase-admin"

import { DAO } from "../middleware/dao.middleware"

export interface ExtendedRequest extends Request {
  body: Request.Body
  dao: DAO | { [k: string]: { [k: string]: any } }
  user: admin.auth.DecodedIdToken
  log: any
  token?: string
  headers: Request.Headers
  ip: Request.Ip
}

export default interface RequestSchema extends ExtendedRequest {}
