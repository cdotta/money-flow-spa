import { Box, Divider, IconButton, useTheme } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

const PaymentRow = ({ payment }) => {
  const theme = useTheme();

  const { isOverdue, description, amount } = payment;

  return (
    <Box bgcolor={isOverdue ? theme.palette.error.light : null}>
      <Box display="flex">
        <Box flexGrow={1} padding={2}>
          {description}
        </Box>
        <Box width={100} padding={2}>
          {amount}
        </Box>
        <Box width={100}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit">
            <EditIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

PaymentRow.propTypes = {
  payment: PropTypes.shape().isRequired,
};

export default PaymentRow;
