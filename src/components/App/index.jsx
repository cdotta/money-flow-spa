import React from 'react';
import { Container, Fab, CssBaseline } from '@material-ui/core';
import { styled, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const theme = createMuiTheme({});

const MainFab = styled(Fab)({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <MainFab color="primary" aria-label="add">
          <AddIcon />
        </MainFab>
      </Container>
    </ThemeProvider>
  );
}

export default App;
