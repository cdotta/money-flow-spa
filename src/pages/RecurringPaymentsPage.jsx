import { Container, Drawer } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { memo } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import MainFab from '../components/MainFab';
import RecurringPaymentForm from '../containers/RecurringPaymentForm';
import RecurringPaymentsTable from '../containers/RecurringPaymentsTable';

const PaymentsPage = () => {
  const history = useHistory();
  const match = useRouteMatch('/recurring-payments/new');

  return (
    <Container>
      <Drawer anchor="right" open={!!match} onClose={() => history.push('/recurring-payments')}>
        <RecurringPaymentForm />
      </Drawer>
      <RecurringPaymentsTable />
      <Link to="/recurring-payments/new">
        <MainFab color="primary" aria-label="add">
          <AddIcon />
        </MainFab>
      </Link>
    </Container>
  );
};

export default memo(PaymentsPage);
