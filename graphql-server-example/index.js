const { ApolloServer, gql } = require('apollo-server-express');
const app = require('./app');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: 3999 }, () =>
  console.log(`🚀 Server ready at http://localhost:3999${server.graphqlPath}`),
);

// server.listen(3999).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });

// const { typeDefs, resolvers } = require('./schema');
