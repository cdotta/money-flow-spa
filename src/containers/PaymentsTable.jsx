import { useMutation, useQuery } from '@apollo/react-hooks';
import { getMonth, getYear, parseISO } from 'date-fns';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PaymentsTable from '../components/PaymentsTable';
import Spinner from '../components/Spinner';
import { UPDATE_PAYMENTS } from '../graphql/mutations';
import { PAYMENTS } from '../graphql/queries';
import {
  RESET_SELECTION,
  TOGGLE_SELECTION,
} from '../store/ducks/selectedPayments';

function enrichPayments({ payments, currentYear, currentMonth }) {
  return payments.map(payment => ({
    ...payment,
    isOverdue:
      payment.dueMonth < currentMonth && payment.dueYear <= currentYear,
  }));
}

const PaymentsTableContainer = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const selectedPayments = useSelector(state => state.selectedPayments);
  const dispatch = useDispatch();
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

  const [updatePayments] = useMutation(UPDATE_PAYMENTS);
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

  const handleSelect = id => {
    dispatch({ type: TOGGLE_SELECTION, payload: id });
  };

  const handleSelectedReset = () => {
    dispatch({ type: RESET_SELECTION });
  };

  const handleUpdatePayments = (ids, updateData) => {
    updatePayments({
      variables: { ids, data: updateData },
      refetchQueries: [
        { query: PAYMENTS, variables: { pendingFilter, paidFilter } },
      ],
    }).then(handleSelectedReset);
  };

  return (
    <PaymentsTable
      selectedPayments={selectedPayments}
      onSelect={handleSelect}
      onSelectedReset={handleSelectedReset}
      onUpdatePayments={handleUpdatePayments}
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
