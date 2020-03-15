import { Container, Fab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

import theme from '../theme';

const MainFab = styled(Fab)({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

const PaymentsPage = () => (
  <Container>
    <MainFab color="primary" aria-label="add">
      <AddIcon />
    </MainFab>
  </Container>
);

export default PaymentsPage;
