import { gql } from 'apollo-boost';

import { PAYMENT_FIELDS, RECURRING_PAYMENT_FIELDS } from './fragments';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($paymentInput: PaymentInput!) {
    createPayment(payment: $paymentInput) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;

export const CREATE_RECURRING_PAYMENT = gql`
  mutation CreateRecurringPayment($recurringPaymentInput: RecurringPaymentInput!) {
    createRecurringPayment(recurringPayment: $recurringPaymentInput) {
      ...RecurringPaymentFields
    }
  }
  ${RECURRING_PAYMENT_FIELDS}
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment($id: ID!, $data: PaymentUpdateInput!) {
    updatePayment(id: $id, data: $data) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;

export const MATERIALIZE_PAYMENT = gql`
  mutation MaterializePayment($recurringPaymentId: ID!, $data: MaterializePaymentInput!) {
    materializePayment(recurringPaymentId: $recurringPaymentId, data: $data) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;
