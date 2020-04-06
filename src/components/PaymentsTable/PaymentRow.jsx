import { Box, Divider, IconButton, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import LoopIcon from '@material-ui/icons/Loop';
import PropTypes from 'prop-types';
import React from 'react';

const PaymentRow = ({ payment, selected, onSelect, virtual }) => {
  const { description, amount, recurringPaymentId } = payment;

  return (
    <Box>
      <Box display="flex">
        <Checkbox color="primary" checked={selected} onChange={onSelect} />
        <Box flexGrow={1} padding={2} display="flex" justifyContent="space-between">
          <Typography>{`${description} ${virtual ? '(virtual)' : ''}`}</Typography>
          {recurringPaymentId && <LoopIcon />}
        </Box>
        <Box width={100} padding={2}>
          <Typography>{`$ ${amount}`}</Typography>
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

PaymentRow.propTypes = {
  payment: PropTypes.shape().isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  virtual: PropTypes.bool,
};

PaymentRow.defaultProps = {
  selected: false,
  virtual: false,
};

export default PaymentRow;
