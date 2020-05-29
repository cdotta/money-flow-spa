import { useMutation } from '@apollo/react-hooks';
import { getMonth, getYear } from 'date-fns';
import React from 'react';
import { useHistory } from 'react-router-dom';

import PaymentForm from '../components/PaymentForm';
import { CREATE_PAYMENT } from '../graphql/mutations';

const PaymentFormContainer = () => {
  const history = useHistory();

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
    }).then(() => history.push('/payments'));
  }

  return <PaymentForm onSubmit={handleCreatePayment} />;
};

export default PaymentFormContainer;
