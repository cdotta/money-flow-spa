import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import createApolloClient from '../../graphql/createApolloClient';
import PaymentsPage from '../../pages/PaymentsPage';
import store from '../../store';
import theme from '../../theme';

const client = createApolloClient();

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/payments">
          <PaymentsPage />
        </Route>
        <Route exact path="/" render={() => <Redirect to="/payments" />} />
      </Switch>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <CssBaseline />
          <Router />
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
