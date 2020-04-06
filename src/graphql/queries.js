import { gql } from 'apollo-boost';

import { PAYMENT_FIELDS } from './fragments';

export const PAYMENTS = gql`
  query MonthlyPayments(
    $paymentFilter: PaymentFilterInput
    $virtualPaymentFilter: VirtualPaymentFilterInput!
  ) {
    payments(filter: $paymentFilter) {
      ...PaymentFields
    }

    virtualPayments(filter: $virtualPaymentFilter) {
      id
      description
      amount
      pending
      recurringPaymentId
      dueMonth
      dueYear
    }
  }
  ${PAYMENT_FIELDS}
`;
