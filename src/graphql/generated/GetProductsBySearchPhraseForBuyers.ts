/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductsBySearchPhraseForBuyers
// ====================================================

export interface GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers_variations {
  __typename: "ProductVariationType";
  id: number;
  price: number;
  inStock: boolean;
  colourHexCode: string;
  rChannel: number;
  gChannel: number;
  bChannel: number;
  timestamp: string;
}

export interface GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers_images {
  __typename: "ProductImageType";
  id: number;
  productId: number;
  publicId: string;
  timestamp: string;
}

export interface GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers {
  __typename: "ProductType";
  id: number;
  name: string;
  description: string;
  clothComposition: string;
  width: string;
  gsm: string;
  pattern: string;
  minOrderSize: number;
  referenceId: string | null;
  hsnCode: string;
  taxPercentage: number;
  variations: GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers_variations[];
  images: GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers_images[];
  tags: string[];
  timestamp: string;
  usage: string;
}

export interface GetProductsBySearchPhraseForBuyers {
  getProductsBySearchPhraseForBuyers: GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers[];
}

export interface GetProductsBySearchPhraseForBuyersVariables {
  searchPhrase: string;
}
