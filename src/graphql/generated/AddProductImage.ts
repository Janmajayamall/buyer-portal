/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProductImage
// ====================================================

export interface AddProductImage_addProductImage {
  __typename: "ProductImageType";
  id: string;
  productId: string;
  publicId: string;
}

export interface AddProductImage {
  addProductImage: AddProductImage_addProductImage;
}

export interface AddProductImageVariables {
  productId: string;
  imagePublicId: string;
}
