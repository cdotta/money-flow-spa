import { useQuery } from '@apollo/react-hooks';
import { getMonth, getYear, parseISO } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import PaymentsTable from '../components/PaymentsTable';
import Spinner from '../components/Spinner';
import { PAYMENTS } from '../graphql/queries';

function enrichPayments({ payments, currentYear, currentMonth }) {
  return payments.map(payment => ({
    ...payment,
    isOverdue:
      payment.dueMonth < currentMonth && payment.dueYear <= currentYear,
  }));
}

const PaymentsTableContainer = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);

  const pendingFilter = {
    toDueMonth: currentMonth,
    toDueYear: currentYear,
    pending: true,
  };

  const paidFilter = {
    fromDueMonth: currentMonth,
    fromDueYear: currentYear,
    toDueMonth: currentMonth,
    toDueYear: currentYear,
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
    <PaymentsTable
      paidPayments={enrichPayments({
        payments: data.paidPayments,
        currentMonth,
        currentYear,
      })}
      pendingPayments={enrichPayments({
        payments: data.pendingPayments,
        currentMonth,
        currentYear,
      })}
    />
  );
};

export default PaymentsTableContainer;