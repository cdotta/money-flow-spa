import {
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2, 0),
  },
}));

const PaymentForm = ({ onSubmit }) => {
  const classes = useStyles();

  const [payment, handlePaymentChange] = useState({
    description: '',
    amount: '',
    dueDate: new Date(),
  });

  const handleChange = ({ target }) => {
    handlePaymentChange({ ...payment, [target.name]: target.value });
  };

  const handleDateChange = dueDate =>
    handlePaymentChange({ ...payment, dueDate });

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(payment);
  };

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel htmlFor="description" required shrink>
            Description
          </InputLabel>
          <Input
            id="description"
            name="description"
            required
            value={payment.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="amount" required>
            Amount
          </InputLabel>
          <Input
            id="amount"
            name="amount"
            required
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={payment.amount}
            onChange={handleChange}
          />
        </FormControl>
        <DatePicker
          views={['month', 'year']}
          required
          fullWidth
          label="Due Date"
          value={payment.dueDate}
          onChange={handleDateChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PaymentForm;
