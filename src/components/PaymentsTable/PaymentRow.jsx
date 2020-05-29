import {
  Box,
  Button,
  Divider,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  amountButton: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    marginRight: theme.spacing(1),
  },
}));

const PaymentRow = ({ payment, virtual, onUpdate }) => {
  const { description, amount, recurringPaymentId, pending } = payment;
  const [isEditing, setIsEditing] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [newAmount, setNewAmount] = useState(amount);
  const classes = useStyles();

  const handleAmountClick = () => {
    setIsEditing(!isEditing);
  };

  const handleAmountChange = ({ target: { value } }) => {
    setNewAmount(value);
  };

  const handleConfirmClick = () => {
    onUpdate({ amount: Number(newAmount) });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewAmount(amount);
  };

  return (
    <Box>
      <Box display="flex">
        <Box flexGrow={1} padding={2} display="flex" alignItems="center">
          <Box>
            <IconButton
              onClick={() => setCurrency(currency === '$' ? 'USD' : '$')}
              aria-label="delete"
              size="small"
              className={classes.amountButton}
            >
              {currency}
            </IconButton>
          </Box>
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Typography>{`${description} ${virtual ? '(virtual)' : ''}`}</Typography>
            </Box>
            <Box display="flex" alignItems="center" minHeight={32}>
              {!isEditing && <Typography onClick={handleAmountClick}>{amount}</Typography>}
              {isEditing && (
                <TextField
                  type="number"
                  value={newAmount}
                  onChange={handleAmountChange}
                  autoFocus
                />
              )}
              {isEditing && (
                <Box>
                  <IconButton aria-label="delete" onClick={handleConfirmClick} size="small">
                    <CheckIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleCancelClick} size="small">
                    <CloseIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
          {recurringPaymentId && <LoopIcon />}
        </Box>
        <Box width={100} display="flex" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            color={pending ? 'primary' : 'secondary'}
            onClick={() => onUpdate({ pending: !pending })}
          >
            {pending ? 'Pay' : 'Stash'}
          </Button>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

PaymentRow.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  payment: PropTypes.shape().isRequired,
  virtual: PropTypes.bool,
};

PaymentRow.defaultProps = {
  virtual: false,
};

export default PaymentRow;
