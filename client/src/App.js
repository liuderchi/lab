import React from 'react';
import { ApolloProvider, ApolloConsumer } from 'react-apollo';
import apolloClient, { apolloClientWithWS } from './apolloClient';
import { API_DOMAIN } from './config';

// Enhanced Components
import AddTodo from './AddTodo';
import TodoList from './TodoList';
// import SubscribeTodo from './SubscribeTodo';

import './styles.css';

/**
 * 1. init client
 */
const CLIENT = new apolloClient({
  uri: `http://${API_DOMAIN}/`,
});
// const CLIENT = apolloClientWithWS.create({
//   apiURI: `http://${API_DOMAIN}/`,
//   wsURI: `ws://${API_DOMAIN}/graphql`,
// });

/**
 * 2. query string for <Query>, <Mutation>, <Subscription> Component: ./queries
 *   Apollo subscribe the query result via Apollo Client Cache
 *   if cache fails, it sends request to server
 * 2.2 test client connect with server
 *   CLIENT.query({ query: GET_TODOS }).then(({ data, loading }) =>
 *     console.log({ data, loading })
 *   );
 */

/**
 * 3. ApolloProvider with client
 */
export const App = () => (
  <ApolloProvider // like react context
    client={CLIENT}
  >
    <ApolloConsumer>
      {client => (
        <div className="App">
          <h1>ToDo List using React Apollo</h1>
          <AddTodo />
          <TodoList />
        </div>
      )}
    </ApolloConsumer>
  </ApolloProvider>
);

export default App;
