import { Container, Drawer } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { memo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import MainFab from '../components/MainFab';
import PaymentForm from '../containers/PaymentForm';
import PaymentsTable from '../containers/PaymentsTable';

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
