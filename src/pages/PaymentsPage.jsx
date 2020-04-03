import { Container, Drawer, Fab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { memo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import PaymentForm from '../containers/PaymentForm';
import PaymentsTable from '../containers/PaymentsTable';
import theme from '../theme';

const MainFab = styled(Fab)({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

const PaymentsPage = () => {
  const history = useHistory();
  const match = useRouteMatch('/payments/new');

  return (
    <Container>
      <Drawer anchor="right" open={!!match} onClose={() => history.push('/payments')}>
        <PaymentForm />
      </Drawer>
      <PaymentsTable />
      <Link to="/payments/new">
        <MainFab color="primary" aria-label="add">
          <AddIcon />
        </MainFab>
      </Link>
    </Container>
  );
};

export default memo(PaymentsPage);
