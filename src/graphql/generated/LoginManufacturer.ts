/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginManufacturer
// ====================================================

export interface LoginManufacturer_loginManufacturer {
  __typename: "LoginResponseType";
  token: string;
}

export interface LoginManufacturer {
  loginManufacturer: LoginManufacturer_loginManufacturer;
}

export interface LoginManufacturerVariables {
  phoneNumber: string;
  password: string;
}
