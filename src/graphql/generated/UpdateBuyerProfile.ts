/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BuyerProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBuyerProfile
// ====================================================

export interface UpdateBuyerProfile_updateBuyerProfile {
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

export interface UpdateBuyerProfile {
  updateBuyerProfile: UpdateBuyerProfile_updateBuyerProfile;
}

export interface UpdateBuyerProfileVariables {
  buyerProfileInput: BuyerProfileInput;
}
