import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URI || 'http://localhost:4000/graphql';

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_URI }),
  cache: new InMemoryCache(),
});

export default client;
