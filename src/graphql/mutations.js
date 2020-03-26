import { gql } from 'apollo-boost';

import { PAYMENT_FIELDS } from './fragments';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($paymentInput: PaymentInput!) {
    createPayment(payment: $paymentInput) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;
