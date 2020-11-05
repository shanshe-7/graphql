const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { schema, resolvers } = require('./schema/schema');
const { dbURL } = require('./configuration/config');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to database');
  }
);

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  playground: true,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 4000 }, () => {
  console.log('inside now listening on port 4000');
});
