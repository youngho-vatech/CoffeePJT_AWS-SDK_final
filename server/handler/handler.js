const express = require ("express");
const serverless = require("serverless-http");
const graphiql = require("graphql-playground-middleware-express");
const { ApolloServer, gql }= require ("apollo-server-express");
const schema = require("../schema/schema")

const app = express();

const server = new ApolloServer({
  schema,
  path: "/graphql"
});

server.applyMiddleware({ app });



const queryhandler = serverless(app);

export { queryhandler };