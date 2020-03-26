import { Box, Tab, Tabs } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PaymentRow from './PaymentRow';

const Headers = () => {
  return (
    <Box display="flex">
      <Box flexGrow={1} padding={1}>
        <strong>Description</strong>
      </Box>
      <Box width={100} padding={1}>
        <strong>Amount</strong>
      </Box>
      <Box width={100} padding={1}>
        <strong>Actions</strong>
      </Box>
    </Box>
  );
};

const PaymentsTable = ({ pendingPayments, paidPayments }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const isPendingSelected = activeTab === 'pending';

  const payments = isPendingSelected ? pendingPayments : paidPayments;

  return (
    <Box padding={1}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab value="pending" label="Pending" />
        <Tab value="paid" label="Paid" />
      </Tabs>
      <Headers />
      {payments.map(payment => (
        <PaymentRow payment={payment} key={payment.id} />
      ))}
    </Box>
  );
};

PaymentsTable.propTypes = {
  paidPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pendingPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PaymentsTable;
