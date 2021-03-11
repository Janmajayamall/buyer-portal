/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategoryProductsForBuyers
// ====================================================

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_variations {
  __typename: "ProductVariationType";
  id: string;
  price: number;
  inStock: boolean;
  colourHexCode: string;
  finalPrice: number;
}

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_productImages {
  __typename: "ProductImageType";
  id: string;
  productId: string;
  publicId: string;
}

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers {
  __typename: "ProductType";
  id: string;
  name: string;
  description: string;
  clothComposition: string;
  width: number;
  gsm: number;
  pattern: string;
  maxOrderSize: number;
  minOrderSize: number;
  variations: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_variations[];
  productImages: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_productImages[];
}

export interface GetCategoryProductsForBuyers {
  getCategoryProductsForBuyers: GetCategoryProductsForBuyers_getCategoryProductsForBuyers[];
}

export interface GetCategoryProductsForBuyersVariables {
  categoryId: number;
}
