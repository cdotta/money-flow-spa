import { useQuery } from '@apollo/react-hooks';
import { Container, Fab } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { getMonth, getYear, parseISO } from 'date-fns';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import PaymentsTable from '../components/PaymentsTable';
import Spinner from '../components/Spinner';
import { PAYMENTS } from '../graphql/queries';
import theme from '../theme';

const MainFab = styled(Fab)({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
});

const PaymentsPage = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const dueMonth = getMonth(currentDate) + 1;
  const dueYear = getYear(currentDate);

  const pendingFilter = {
    pending: true,
  };

  const paidFilter = {
    fromDueMonth: dueMonth,
    fromDueYear: dueYear,
    toDueMonth: dueMonth,
    toDueYear: dueYear,
    pending: false,
  };

  const { loading, data, error } = useQuery(PAYMENTS, {
    variables: {
      pendingFilter,
      paidFilter,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return (
    <Container>
      <PaymentsTable
        paidPayments={data.paidPayments}
        pendingPayments={data.pendingPayments}
      />
      <MainFab color="primary" aria-label="add">
        <AddIcon />
      </MainFab>
    </Container>
  );
};

export default memo(PaymentsPage);
