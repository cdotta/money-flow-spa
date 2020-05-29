import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PaymentRow from './PaymentRow';

const Headers = () => {
  return (
    <Typography component="div">
      <Box display="flex">
        <Box flexGrow={1} padding={1}>
          <strong>Description</strong>
        </Box>
        <Box width={100} padding={1} textAlign="center">
          <strong>Actions</strong>
        </Box>
      </Box>
    </Typography>
  );
};

const PaymentsTable = ({ payments, virtualPayments, onUpdatePayment, onMaterializePayment }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const isPendingSelected = activeTab === 'pending';
  const handleTabChange = value => {
    setActiveTab(value);
  };

  return (
    <Box padding={1}>
      <Tabs
        value={activeTab}
        onChange={(_, value) => handleTabChange(value)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab value="pending" label="Pending" />
        <Tab value="paid" label="Paid" />
      </Tabs>
      <Headers />
      {isPendingSelected &&
        virtualPayments.map(virtualPayment => (
          <PaymentRow
            virtual
            payment={virtualPayment}
            key={virtualPayment.recurringPaymentId}
            onUpdate={data => onMaterializePayment({ virtualPayment, data })}
          />
        ))}
      {payments
        .filter(({ pending }) => pending === isPendingSelected)
        .map(payment => (
          <PaymentRow
            payment={payment}
            key={payment.id}
            onUpdate={data => onUpdatePayment({ payment, data })}
          />
        ))}
    </Box>
  );
};

PaymentsTable.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  virtualPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onUpdatePayment: PropTypes.func.isRequired,
  onMaterializePayment: PropTypes.func.isRequired,
};

export default PaymentsTable;
