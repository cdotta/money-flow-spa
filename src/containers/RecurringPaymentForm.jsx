import { useMutation } from '@apollo/react-hooks';
import React from 'react';
import { useHistory } from 'react-router-dom';

import RecurringPaymentForm from '../components/RecurringPaymentForm';
import { CREATE_RECURRING_PAYMENT } from '../graphql/mutations';
import { RECURRING_PAYMENTS } from '../graphql/queries';

const RecurringPaymentFormContainer = () => {
  const history = useHistory();

  const [createRecurringPayment] = useMutation(CREATE_RECURRING_PAYMENT);

  function handleCreateRecurringPayment(recurringPayment) {
    const recurringPaymentInput = {
      description: recurringPayment.description,
      defaultAmount: parseInt(recurringPayment.defaultAmount, 10),
    };
    createRecurringPayment({
      variables: { recurringPaymentInput },
      refetchQueries: [{ query: RECURRING_PAYMENTS }],
    }).then(() => history.push('/recurring-payments'));
  }

  return <RecurringPaymentForm onSubmit={handleCreateRecurringPayment} />;
};

export default RecurringPaymentFormContainer;
