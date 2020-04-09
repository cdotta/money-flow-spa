import { useMutation } from '@apollo/react-hooks';
import { getMonth, getYear, parseISO } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PaymentForm from '../components/PaymentForm';
import { CREATE_PAYMENT } from '../graphql/mutations';
import { PAYMENTS } from '../graphql/queries';

const PaymentFormContainer = () => {
  const currentDate = parseISO(useSelector(state => state.currentDate));
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);
  const history = useHistory();

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
  const [createPayment] = useMutation(CREATE_PAYMENT);

  function handleCreatePayment(payment) {
    const paymentInput = {
      description: payment.description,
      amount: parseInt(payment.amount, 10),
      dueMonth: getMonth(payment.dueDate) + 1,
      dueYear: getYear(payment.dueDate),
    };
    createPayment({
      variables: { paymentInput },
      refetchQueries: [{ query: PAYMENTS, variables: { pendingFilter, paidFilter } }],
    }).then(() => history.push('/payments'));
  }

  return <PaymentForm onSubmit={handleCreatePayment} />;
};

export default PaymentFormContainer;
