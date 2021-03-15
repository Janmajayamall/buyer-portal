/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetOrderListForBuyer
// ====================================================

export interface GetOrderListForBuyer_getOrderListForBuyer_productImages {
  __typename: "ProductImageType";
  id: number;
  productId: number;
  publicId: string;
  timestamp: string;
}

export interface GetOrderListForBuyer_getOrderListForBuyer {
  __typename: "OrderType";
  id: number;
  orderQuantity: number;
  orderStage: string;
  totalPrice: number;
  totalTax: number;
  buyerId: number;
  manufacturerId: number;
  timestamp: string;
  productId: number;
  productName: string;
  productDescription: string;
  productClothComposition: string;
  productWidth: number;
  productGsm: number;
  productPattern: string;
  productMinOrderSize: number;
  productReferenceId: string;
  productHsnCode: string;
  productTaxPercentage: number;
  productImages: GetOrderListForBuyer_getOrderListForBuyer_productImages[] | null;
  productVariationId: number;
  productVariationPrice: number;
  productVariationInStock: boolean;
  productVariationColourHexCode: string;
  productVariationRChannel: number;
  productVariationBChannel: number;
}

export interface GetOrderListForBuyer {
  getOrderListForBuyer: GetOrderListForBuyer_getOrderListForBuyer[];
}