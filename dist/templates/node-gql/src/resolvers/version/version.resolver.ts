const queryVersion = async (_: any, { payload }: any, context: any): Promise<any> => {
  context.log.info('getting package version', payload)
  return context?.datasources?.versionAPI?.getVersion(payload, context)
}

const mutateVersion = async (_: any, { payload }: any, context: any): Promise<any> => {
  context.log.info('simulating package version mutation', payload)
  return { response: 'OK' }
}

export default {
  Query: {
    queryVersion,
  },
  Mutation: {
    mutateVersion,
  }
}
