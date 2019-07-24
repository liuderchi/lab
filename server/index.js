const { ApolloServer, gql, PubSub } = require('apollo-server');
const seedrandom = require('seedrandom');
const { todos } = require('./data');

const TODO_EVENT = 'TODO_EVENT';
const TODO_ADDED = 'TODO_ADDED';
const TODO_UPDATED = 'TODO_UPDATED';
const TODO_DELETED = 'TODO_DELETED';
const pubsub = new PubSub();
const rnd = seedrandom();

// https://www.apollographql.com/docs/guides/schema-design.html#mutations
const typeDefs = gql`
  type Todo {
    id: Int
    done: Boolean
    title: String
  }
  type Query {
    version: String # node version
    todos: [Todo]! # Do not accept null. (non-nullable); if not found return []
  }
  type Mutation {
    addTodo(title: String!): Todo
    deleteTodo(id: Int!): Todo
    updateTodo(id: Int!, done: Boolean, title: String): Todo
  }
  type Subscription {
    todoChanged: TodoEvent
  }
  type TodoEvent {
    name: String
    payload: Todo
  }
`;
// https://www.apollographql.com/docs/apollo-server/features/subscriptions.html#Subscriptions-Example

const resolvers = {
  Query: {
    version: () => process.version,
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_, { title }) => {
      const newTodo = {
        id: Math.round(1000000 * rnd()),
        done: false,
        title,
      };
      todos.unshift(newTodo);
      pubsub.publish(TODO_EVENT, {
        todoChanged: { name: TODO_ADDED, payload: newTodo },
      });
      return newTodo;
    },
    deleteTodo: (_, { id }) => {
      const index = todos.findIndex(todo => todo.id === id);
      if (index === -1) {
        return { id: null };
      } else {
        todos.splice(index, 1);
        pubsub.publish(TODO_EVENT, {
          todoChanged: { name: TODO_DELETED, payload: { id } },
        });
        return { id };
      }
    },
    updateTodo: (_, { id, ...otherProps }) => {
      const matchedTodo = todos.find(todo => todo.id === id);
      if (!matchedTodo) {
        return { id: null };
      } else {
        Object.entries(otherProps).forEach(([k, v]) => {
          if (v != null) matchedTodo[k] = v;
        });
        pubsub.publish(TODO_EVENT, {
          todoChanged: {
            name: TODO_UPDATED,
            payload: matchedTodo,
          },
        });
        return matchedTodo;
      }
    },
  },
  Subscription: {
    todoChanged: {
      subscribe: () => pubsub.asyncIterator([TODO_EVENT]),
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
