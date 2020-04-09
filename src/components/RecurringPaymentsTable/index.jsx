import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import RecurringPaymentRow from './RecurringPaymentRow';

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

const RecurringPaymentsTable = ({ recurringPayments }) => {
  const [activeTab, setActiveTab] = useState('active');
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
        <Tab value="active" label="Active" />
        <Tab value="paused" label="Paused" disabled />
      </Tabs>
      <Headers />
      {recurringPayments.map(recurringPayment => (
        <RecurringPaymentRow recurringPayment={recurringPayment} key={recurringPayment.id} />
      ))}
    </Box>
  );
};

RecurringPaymentsTable.propTypes = {
  recurringPayments: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default RecurringPaymentsTable;
