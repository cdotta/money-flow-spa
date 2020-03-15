import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import createApolloClient from '../../graphql/createApolloClient';
import PaymentsPage from '../../pages/PaymentsPage';
import theme from '../../theme';

const client = createApolloClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route path="/payments">
              <PaymentsPage />
            </Route>
            <Route exact path="/" render={() => <Redirect to="/payments" />} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
