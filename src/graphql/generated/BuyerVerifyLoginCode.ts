/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: BuyerVerifyLoginCode
// ====================================================

export interface BuyerVerifyLoginCode_buyerVerifyLoginCode {
  __typename: "LoginResponseType";
  token: string;
}

export interface BuyerVerifyLoginCode {
  buyerVerifyLoginCode: BuyerVerifyLoginCode_buyerVerifyLoginCode;
}

export interface BuyerVerifyLoginCodeVariables {
  phoneNumber: string;
  verificationCode: string;
}
