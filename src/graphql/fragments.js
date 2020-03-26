import { gql } from 'apollo-boost';

export const PAYMENT_FIELDS = gql`
  fragment PaymentFields on Payment {
    id
    description
    amount
    pending
    dueMonth
    dueYear
  }
`;
