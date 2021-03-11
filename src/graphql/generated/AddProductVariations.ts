/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariationInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: AddProductVariations
// ====================================================

export interface AddProductVariations_addProductVariations {
  __typename: "ProductVariationType";
  id: string;
  inStock: boolean;
  price: number;
  colourHexCode: string;
}

export interface AddProductVariations {
  addProductVariations: AddProductVariations_addProductVariations[];
}

export interface AddProductVariationsVariables {
  productVariations: ProductVariationInput[];
  productId: string;
}
