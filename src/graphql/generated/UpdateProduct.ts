/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProduct
// ====================================================

export interface UpdateProduct {
  updateProduct: boolean;
}

export interface UpdateProductVariables {
  productId: string;
  productInput: ProductInput;
}
