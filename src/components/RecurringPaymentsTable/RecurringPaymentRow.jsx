import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

const RecurringPaymentRow = ({ recurringPayment }) => {
  const { description, defaultAmount } = recurringPayment;

  return (
    <Box>
      <Box display="flex">
        <Box flexGrow={1} padding={2}>
          <Typography>{description}</Typography>
        </Box>
        <Box width={100} padding={2}>
          <Typography>{`$ ${defaultAmount}`}</Typography>
        </Box>
        <Box width={100}>
          <IconButton aria-label="delete" disabled>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" disabled>
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

RecurringPaymentRow.propTypes = {
  recurringPayment: PropTypes.shape().isRequired,
};

export default RecurringPaymentRow;
