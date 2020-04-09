import {
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
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

const RecurringPaymentForm = ({ onSubmit }) => {
  const classes = useStyles();

  const [recurringPayment, handleRecurringPaymentChange] = useState({
    description: '',
    defaultAmount: '',
  });

  const handleChange = ({ target }) => {
    handleRecurringPaymentChange({ ...recurringPayment, [target.name]: target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(recurringPayment);
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
            value={recurringPayment.description}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="defaultAmount" required>
            Amount
          </InputLabel>
          <Input
            id="defaultAmount"
            name="defaultAmount"
            required
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            value={recurringPayment.defaultAmount}
            onChange={handleChange}
          />
        </FormControl>
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

RecurringPaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RecurringPaymentForm;
