/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBuyerProfile
// ====================================================

export interface GetBuyerProfile_getBuyerProfile {
  __typename: "BuyerProfileType";
  buyerId: number;
  firstNamePOC: string;
  lastNamePOC: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstin: string;
  gstVerified: boolean;
  timestamp: string;
  lastModifiedTimestamp: string;
}

export interface GetBuyerProfile {
  getBuyerProfile: GetBuyerProfile_getBuyerProfile | null;
}
