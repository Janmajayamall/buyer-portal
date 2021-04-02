/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductDetails
// ====================================================

export interface GetProductDetails_getProductDetails_variations {
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

export interface GetProductDetails_getProductDetails_images {
  __typename: "ProductImageType";
  id: number;
  productId: number;
  publicId: string;
  timestamp: string;
}

export interface GetProductDetails_getProductDetails {
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
  variations: GetProductDetails_getProductDetails_variations[];
  images: GetProductDetails_getProductDetails_images[];
  tags: string[];
  timestamp: string;
  usage: string;
}

export interface GetProductDetails {
  getProductDetails: GetProductDetails_getProductDetails;
}

export interface GetProductDetailsVariables {
  productId: number;
}
