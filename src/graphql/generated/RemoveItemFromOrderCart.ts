/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveItemFromOrderCart
// ====================================================

export interface RemoveItemFromOrderCart_removeItemFromOrderCart {
  __typename: "OrderCartType";
  id: string;
  orderQuantitySize: number;
  orderTotalPrice: number;
  buyerId: string;
  productVariationPrice: number;
  productVariationFinalPrice: number;
  productVariationInStock: boolean;
  productVariationColourHexCode: string;
  productVariationId: string;
  productName: string;
  productDescription: string;
  productClothComposition: string;
  productWidth: number;
  productGsm: number;
  productPattern: string;
  productReferenceImageURL: string;
  productMaxOrderSize: number;
  productMinOrderSize: number;
  productReferenceId: string | null;
  productId: string;
  manufacturerId: string;
  timestamp: string;
}

export interface RemoveItemFromOrderCart {
  removeItemFromOrderCart: RemoveItemFromOrderCart_removeItemFromOrderCart[];
}

export interface RemoveItemFromOrderCartVariables {
  orderCartItemId: string;
}
