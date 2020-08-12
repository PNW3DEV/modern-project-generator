require('dotenv').config({
  path: `${__dirname}/../.env`
})

import { ApolloError, ApolloServer } from 'apollo-server-express'
import express, { Response } from 'express'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'
import typeDefs from './schema'
import { context } from './util/context'

// import { GraphQLError } from 'graphql'

const schema = makeExecutableSchema({ typeDefs, resolvers })
const dataSources = () => ({
  // custPrefAPI: new preferencesAPI()
})
const server: ApolloServer = new ApolloServer({
  schema: schema,
  dataSources,
  context,
  // formatError: (error: ApolloError) => {
  //   console.error('boom!', error.message)
  //   return {
  //     message: error.message.replace('GraphQL error:', '')
  //   }
  // },
  playground: process.env.NODE_ENV !== 'production',
  introspection: process.env.NODE_ENV !== 'production',
})

// Initialize the app
export const app = express()

// GraphQL endpoint
server.applyMiddleware({ app, path: '/graphql' })

app.get('/', (_: undefined, res: Response) => {
  res.json({
    healthy: true,
    // dont expose secret env values
    // env: Object.keys(process.env)
    //   .map(key => key.indexOf('SECRET') > -1
    //     ? { [key]: '***SECRET***' }
    //     : { [key]: process.env[key] }
    //   ),
    mocked: process.env.USE_MOCK_DATA,
  })
  res.end()
})

export default app
