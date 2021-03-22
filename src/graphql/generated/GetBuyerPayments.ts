/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBuyerPayments
// ====================================================

export interface GetBuyerPayments_getBuyerPayments {
  __typename: "BuyerPaymentType";
  orderId: number;
  buyerId: number;
  orderTotalPrice: number;
  totalTax: number;
  grandTotalPrice: number;
  dueDate: string;
  paidStatus: boolean;
  timestamp: string;
  lastModifiedTimestamp: string;
}

export interface GetBuyerPayments {
  getBuyerPayments: GetBuyerPayments_getBuyerPayments[];
}
