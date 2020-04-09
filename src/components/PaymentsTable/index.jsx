import { Box, Button, Tab, Tabs, Typography } from '@material-ui/core';
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
        <Box width={100} padding={1}>
          <strong>Amount</strong>
        </Box>
        <Box width={100} padding={1}>
          <strong>Actions</strong>
        </Box>
      </Box>
    </Typography>
  );
};

const PaymentsTable = ({
  payments,
  virtualPayments,
  selectedPayments,
  onSelect,
  onSelectedReset,
  onUpdatePayments,
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const isPendingSelected = activeTab === 'pending';
  const selectedPaymentIds = Object.keys(selectedPayments).filter(id => selectedPayments[id]);
  const handleTabChange = value => {
    onSelectedReset();
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
      <Box display="flex" justifyContent="flex-end" marginTop={1}>
        <Button
          variant="contained"
          color={isPendingSelected ? 'primary' : 'secondary'}
          disabled={selectedPaymentIds.length === 0}
          onClick={() => {
            onUpdatePayments(selectedPaymentIds, {
              pending: !isPendingSelected,
            });
          }}
        >
          {isPendingSelected ? 'Pay' : 'Stash'}
        </Button>
      </Box>
      <Headers />
      {isPendingSelected &&
        virtualPayments.map(virtualPayment => (
          <PaymentRow
            virtual
            payment={virtualPayment}
            key={virtualPayment.id}
            selected={selectedPayments[virtualPayment.id]}
            onSelect={() => onSelect(virtualPayment.id)}
          />
        ))}
      {payments
        .filter(({ pending }) => pending === isPendingSelected)
        .map(payment => (
          <PaymentRow
            payment={payment}
            key={payment.id}
            selected={selectedPayments[payment.id]}
            onSelect={() => onSelect(payment.id)}
          />
        ))}
    </Box>
  );
};

PaymentsTable.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  virtualPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedPayments: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectedReset: PropTypes.func.isRequired,
  onUpdatePayments: PropTypes.func.isRequired,
};

export default PaymentsTable;
