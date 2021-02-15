import {
    mergeResolvers,
    loadSchemaSync,
    loadFilesSync,
    GraphQLFileLoader,
    addResolversToSchema,
  } from "graphql-tools"
  import { GraphQLSchema } from "graphql"
  
  const schema = loadSchemaSync(`${__dirname}/TypeDefs/schema.graphql`, {
    loaders: [new GraphQLFileLoader()],
  })
  
  const resolvers = loadFilesSync(`${__dirname}/Resolvers`)
  const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
    schema,
    resolvers: mergeResolvers(resolvers),
  })
  
  export default schemaWithResolvers