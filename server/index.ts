import { ApolloServer } from "apollo-server-express"
import schema from "./graphql/newSchema"
const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const server: ApolloServer = new ApolloServer({
  schema
})
server.applyMiddleware({app})


const port = process.env.PORT || 4000
app.listen({ port }, () =>{
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}
 
)