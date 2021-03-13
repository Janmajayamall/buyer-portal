/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCategoryProductsForBuyers
// ====================================================

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_variations {
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

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_categories_category {
  __typename: "ProductCategoryType";
  id: number;
  name: string;
  timestamp: string;
}

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_categories {
  __typename: "ProductCategorySpecifierFixType";
  category: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_categories_category;
}

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers_images {
  __typename: "ProductImageType";
  id: number;
  productId: number;
  publicId: string;
  timestamp: string;
}

export interface GetCategoryProductsForBuyers_getCategoryProductsForBuyers {
  __typename: "ProductType";
  id: number;
  name: string;
  description: string;
  clothComposition: string;
  width: number;
  gsm: number;
  pattern: string;
  minOrderSize: number;
  referenceId: string | null;
  hsnCode: string;
  taxPercentage: number;
  variations: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_variations[];
  categories: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_categories[];
  images: GetCategoryProductsForBuyers_getCategoryProductsForBuyers_images[];
  timestamp: string;
}

export interface GetCategoryProductsForBuyers {
  getCategoryProductsForBuyers: GetCategoryProductsForBuyers_getCategoryProductsForBuyers[];
}

export interface GetCategoryProductsForBuyersVariables {
  categoryName: string;
}
