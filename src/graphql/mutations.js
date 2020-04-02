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

export const UPDATE_PAYMENTS = gql`
  mutation UpdatePayments($ids: [ID!]!, $data: PaymentUpdateInput!) {
    updatePayments(ids: $ids, data: $data) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;
