import { gql } from 'apollo-boost';

import { PAYMENT_FIELDS } from './fragments';

export const PAYMENTS = gql`
  query MonthlyPayments(
    $paidFilter: PaymentFilterInput
    $pendingFilter: PaymentFilterInput
  ) {
    paidPayments: payments(filter: $paidFilter) {
      ...PaymentFields
    }

    pendingPayments: payments(filter: $pendingFilter) {
      ...PaymentFields
    }
  }
  ${PAYMENT_FIELDS}
`;
