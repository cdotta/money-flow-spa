import { gql } from 'apollo-boost';

export const PAYMENTS = gql`
  query MonthlyPayments(
    $paidFilter: PaymentFilterInput
    $pendingFilter: PaymentFilterInput
  ) {
    paidPayments: payments(filter: $paidFilter) {
      id
      description
      amount
      pending
      dueMonth
      dueYear
    }

    pendingPayments: payments(filter: $pendingFilter) {
      id
      description
      amount
      pending
      dueMonth
      dueYear
    }
  }
`;
