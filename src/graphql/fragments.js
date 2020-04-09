import { gql } from 'apollo-boost';

export const PAYMENT_FIELDS = gql`
  fragment PaymentFields on Payment {
    id
    description
    amount
    pending
    recurringPaymentId
    dueMonth
    dueYear
  }
`;

export const RECURRING_PAYMENT_FIELDS = gql`
  fragment RecurringPaymentFields on RecurringPayment {
    id
    description
    defaultAmount
  }
`;
