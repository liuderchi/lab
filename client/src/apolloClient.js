import apolloBoostClient from 'apollo-boost'; // ⚠️ use default import https://github.com/apollographql/apollo-client/issues/3639#issuecomment-401602915
import { ApolloClient } from 'apollo-client';
import {
  // ApolloLink,
  split,
} from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
// import { onError } from "apollo-link-error";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

/**
 * Simple Apollo Client setup (without ws)
 * @param {uri} option.uri api endpoint
 *   e.g. new ApolloClient({ uri: "https://48p1r2roz4.sse.codesandbox.io" });
 *   tutorial apollo client https://www.apollographql.com/docs/react/essentials/get-started.html#configuration
 */
export { default as apolloBoostClient } from 'apollo-boost';

/**
 * create an Apollo Client with WebSocket support
 * @param {string} option.apiURI api endpoint; e.g. `https://${API_DOMAIN}/`
 * @param {string} option.wsURI websocket endpoint; e.g. `wss://${API_DOMAIN}/graphql`
 * @returns apollo client instance
 *
 * migrate from apollo-boost example
 *   https://www.apollographql.com/docs/react/advanced/boost-migration.html
 */
const create = ({ apiURI, wsURI }) => {
  const wsLink = new WebSocketLink({
    uri: wsURI,
    options: { reconnect: true },
  });
  const httpLink = new HttpLink({
    uri: apiURI,
    credentials: 'same-origin',
  });

  return new ApolloClient({
    link: split(
      ({ query }) => {
        // split based on operation type
        const { kind, operation } = getMainDefinition(query);

        // if returns true goto first link
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    ),
    // link: ApolloLink.from([
    //   httpLink,
    //   onError(({ graphQLErrors, networkError }) => {
    //     if (graphQLErrors)
    //       graphQLErrors.map(({ message, locations, path }) =>
    //         console.error(
    //           `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //         )
    //       );
    //     if (networkError) console.error(`[Network error]: ${networkError}`);
    //   }),
    // ]),
    cache: new InMemoryCache(),
  });
};

export const apolloClientWithWS = { create };

export default apolloBoostClient;
