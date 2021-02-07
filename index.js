const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const gql = require('graphql-tag')
const { buildASTSchema } = require('graphql')

var SerpWow = require('google-search-results-serpwow')

// create the serpwow object, passing in our API key
let serpwow = new SerpWow('7D411AADEB3B49DA8EE8F96E2D074697')

async function getResult() {

    let result = await serpwow.json({
      q: 'pizza'
    }).catch(e =>console.error(e));
    
    // pretty-print the result
    console.log(JSON.stringify(result, 0, 2));
  
  }
 getResult();

const app = express()
app.use(cors())

const schema = buildASTSchema(gql`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => 'Hello, world'
}

app.use('/graphql', graphqlHTTP({ schema, rootValue }))

const port = process.env.PORT || 4000
app.listen(port)
console.log(`Running a GraphQL API server at localhost:${port}/graphql`)