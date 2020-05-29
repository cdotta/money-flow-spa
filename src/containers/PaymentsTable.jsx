import { useMutation, useQuery } from '@apollo/react-hooks';
import { getMonth, getYear, parseISO } from 'date-fns';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import PaymentsTable from '../components/PaymentsTable';
import Spinner from '../components/Spinner';
import { MATERIALIZE_PAYMENT, UPDATE_PAYMENT } from '../graphql/mutations';
import { PAYMENTS } from '../graphql/queries';

const PaymentsTableContainer = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);
  const location = useLocation();

  const paymentFilter = {
    fromDueMonth: currentMonth,
    fromDueYear: currentYear,
    toDueMonth: currentMonth,
    toDueYear: currentYear,
  };

  const virtualPaymentFilter = {
    dueMonth: currentMonth,
    dueYear: currentYear,
  };

  const [updatePayment] = useMutation(UPDATE_PAYMENT);
  const [materializePayment] = useMutation(MATERIALIZE_PAYMENT);
  const variables = {
    paymentFilter,
    virtualPaymentFilter,
  };
  const { loading, data: paymentsData, error, refetch } = useQuery(PAYMENTS, {
    variables,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const handleUpdatePayment = ({ payment: { id }, data }) => {
    updatePayment({ variables: { id, data } }).then(() => refetch());
  };

  const handleMaterializePayments = ({ virtualPayment: { recurringPaymentId }, data }) => {
    materializePayment({
      variables: {
        recurringPaymentId,
        data: { ...data, dueMonth: currentMonth, dueYear: currentYear },
      },
    }).then(() => refetch());
  };

  return (
    <PaymentsTable
      onUpdatePayment={handleUpdatePayment}
      onMaterializePayment={handleMaterializePayments}
      payments={paymentsData.payments}
      virtualPayments={paymentsData.virtualPayments}
    />
  );
};

export default PaymentsTableContainer;
