import { useQuery } from '@apollo/react-hooks';
import React from 'react';

import RecurringPaymentsTable from '../components/RecurringPaymentsTable';
import Spinner from '../components/Spinner';
import { RECURRING_PAYMENTS } from '../graphql/queries';

const RecurringPaymentsTableContainer = () => {
  const { data, loading, error } = useQuery(RECURRING_PAYMENTS);
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  return <RecurringPaymentsTable recurringPayments={data.recurringPayments} />;
};

export default RecurringPaymentsTableContainer;
