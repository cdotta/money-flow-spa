import { Box, Button, Tab, Tabs } from '@material-ui/core';
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

const PaymentsTable = ({
  pendingPayments,
  paidPayments,
  selectedPayments,
  onSelect,
  onSelectedReset,
  onUpdatePayments,
}) => {
  const [activeTab, setActiveTab] = useState('pending');
  const isPendingSelected = activeTab === 'pending';
  const payments = isPendingSelected ? pendingPayments : paidPayments;
  const selectedPaymentIds = Object.keys(selectedPayments).filter(
    id => selectedPayments[id],
  );
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
      {payments.map(payment => (
        <PaymentRow
          payment={payment}
          key={payment.id}
          isSelected={selectedPayments[payment.id]}
          onSelect={() => onSelect(payment.id)}
        />
      ))}
    </Box>
  );
};

PaymentsTable.propTypes = {
  paidPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  pendingPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedPayments: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectedReset: PropTypes.func.isRequired,
  onUpdatePayments: PropTypes.func.isRequired,
};

export default PaymentsTable;
