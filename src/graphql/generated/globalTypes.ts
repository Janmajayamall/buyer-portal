/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface BuyerAddressInput {
  city: string;
  line1: string;
  pincode: string;
  state: string;
}

export interface ProductInput {
  clothComposition: string;
  description: string;
  gsm: number;
  maxOrderSize: number;
  minOrderSize: number;
  name: string;
  pattern: string;
  productCategoryIds: number[];
  referenceId?: string | null;
  referenceImageURL: string;
  width: number;
}

export interface ProductVariationInput {
  colourHexCode: string;
  inStock: boolean;
  price: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
