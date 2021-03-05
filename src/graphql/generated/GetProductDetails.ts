/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProductDetails
// ====================================================

export interface GetProductDetails_getProductDetails_variations_colour {
  __typename: "ColourType";
  id: number;
  name: string;
  hexValue: string;
}

export interface GetProductDetails_getProductDetails_variations {
  __typename: "ProductVariationType";
  id: string;
  price: number;
  inStock: boolean;
  colourId: number;
  colour: GetProductDetails_getProductDetails_variations_colour;
  finalPrice: number;
}

export interface GetProductDetails_getProductDetails_productCategoryRelations_productCategory {
  __typename: "ProductCategoryType";
  name: string;
  id: number;
}

export interface GetProductDetails_getProductDetails_productCategoryRelations {
  __typename: "ProductProductCategoryRelationType";
  productId: string;
  productCategoryId: number;
  productCategory: GetProductDetails_getProductDetails_productCategoryRelations_productCategory | null;
}

export interface GetProductDetails_getProductDetails_productImages {
  __typename: "ProductImageType";
  id: string;
  productId: string;
  publicId: string;
}

export interface GetProductDetails_getProductDetails {
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
  referenceId: string | null;
  variations: GetProductDetails_getProductDetails_variations[];
  productCategoryRelations: GetProductDetails_getProductDetails_productCategoryRelations[] | null;
  productImages: GetProductDetails_getProductDetails_productImages[];
}

export interface GetProductDetails {
  getProductDetails: GetProductDetails_getProductDetails;
}

export interface GetProductDetailsVariables {
  productId: string;
}
