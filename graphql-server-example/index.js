const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
    price: 100.1,
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    price: 150,
  },
];

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  """
  Description for the Book
  A book has as a title, author and a price.
  [Reference](https://www.apollographql.com/docs/apollo-server/essentials/schema.html#comments)
  """
  type Book {
    "title is a string."
    title: String
    "author is a string temporarily."
    author: String
    "price is a float number."
    price: Float
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen(3999).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
