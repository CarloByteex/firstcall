import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink, DefaultOptions } from "@apollo/client";

import Users from "./components/UserList";

import "./App.css";

function App() {

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_SERVER_URI ? `${process.env.REACT_APP_SERVER_URI}/graphql` : "http://localhost:8000/graphql"
  })

  const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
  })

  return (
    <ApolloProvider client={client}>
      <Users />
    </ApolloProvider>
  );
}
export default App;
