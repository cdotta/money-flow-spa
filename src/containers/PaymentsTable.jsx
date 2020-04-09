import { useMutation, useQuery } from '@apollo/react-hooks';
import { getMonth, getYear, parseISO } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PaymentsTable from '../components/PaymentsTable';
import Spinner from '../components/Spinner';
import { UPDATE_PAYMENTS } from '../graphql/mutations';
import { PAYMENTS } from '../graphql/queries';
import { RESET_SELECTION, TOGGLE_SELECTION } from '../store/ducks/selectedPayments';

const PaymentsTableContainer = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const selectedPayments = useSelector(state => state.selectedPayments);
  const dispatch = useDispatch();
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);

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

  const [updatePayments] = useMutation(UPDATE_PAYMENTS);
  const { loading, data, error } = useQuery(PAYMENTS, {
    variables: {
      paymentFilter,
      virtualPaymentFilter,
    },
    fetchPolicy: 'no-cache',
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  const handleSelect = id => {
    dispatch({ type: TOGGLE_SELECTION, payload: id });
  };

  const handleSelectedReset = () => {
    dispatch({ type: RESET_SELECTION });
  };

  const handleUpdatePayments = (ids, updateData) => {
    updatePayments({
      variables: { ids, data: updateData },
      refetchQueries: [{ query: PAYMENTS, variables: { paymentFilter, virtualPaymentFilter } }],
    }).then(handleSelectedReset);
  };

  return (
    <PaymentsTable
      selectedPayments={selectedPayments}
      onSelect={handleSelect}
      onSelectedReset={handleSelectedReset}
      onUpdatePayments={handleUpdatePayments}
      payments={data.payments}
      virtualPayments={data.virtualPayments}
    />
  );
};

export default PaymentsTableContainer;
