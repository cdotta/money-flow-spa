import ApolloClient from 'apollo-boost';

export default () =>
  new ApolloClient({
    uri: 'http://localhost:3001/graphql',
  });
