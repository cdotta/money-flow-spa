import { Container, CssBaseline, Fab } from '@material-ui/core';
import {
  createMuiTheme,
  styled,
  ThemeProvider,
} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

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
