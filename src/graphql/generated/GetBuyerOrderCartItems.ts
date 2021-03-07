/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBuyerOrderCartItems
// ====================================================

export interface GetBuyerOrderCartItems_getBuyerOrderCartItems {
  __typename: "OrderCartType";
  id: string;
  orderQuantitySize: number;
  orderTotalPrice: number;
  buyerId: string;
  productVariationPrice: number;
  productVariationFinalPrice: number;
  productVariationInStock: boolean;
  productVariationColourId: number;
  productVariationColourHex: string;
  productVariationColourName: string;
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

export interface GetBuyerOrderCartItems {
  getBuyerOrderCartItems: GetBuyerOrderCartItems_getBuyerOrderCartItems[];
}
