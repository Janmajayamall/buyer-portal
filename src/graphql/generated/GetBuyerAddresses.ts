/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBuyerAddresses
// ====================================================

export interface GetBuyerAddresses_getBuyerAddresses {
  __typename: "BuyerAddressType";
  id: number;
  line1: string;
  pincode: string;
  city: string;
  state: string;
  buyerId: number;
  timestamp: string;
}

export interface GetBuyerAddresses {
  getBuyerAddresses: GetBuyerAddresses_getBuyerAddresses[];
}
