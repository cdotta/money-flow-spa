import { Box, Divider, IconButton, makeStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles(theme => ({
  overdue: {
    color: theme.palette.error.dark,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const PaymentRow = ({ payment, isSelected, onSelect }) => {
  const classes = useStyles();

  const { isOverdue, description, amount } = payment;

  return (
    <Box>
      <Box display="flex">
        <Checkbox color="primary" checked={isSelected} onChange={onSelect} />
        <Box
          flexGrow={1}
          padding={2}
          className={isOverdue ? classes.overdue : ''}
        >
          {description}
        </Box>
        <Box width={100} padding={2}>
          {`$ ${amount}`}
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
  isSelected: PropTypes.bool,
};

PaymentRow.defaultProps = {
  isSelected: false,
};

export default PaymentRow;
