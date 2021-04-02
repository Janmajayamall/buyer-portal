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
  orderTotalPrice: number;
  totalTax: number;
  grandTotalPrice: number;
  deliveryCharges: number | null;
  buyerId: number;
  manufacturerId: number;
  timestamp: string;
  productId: number;
  productName: string;
  productDescription: string;
  productClothComposition: string;
  productWidth: string;
  productGsm: string;
  productPattern: string;
  productMinOrderSize: number;
  productReferenceId: string;
  productHsnCode: string;
  productTaxPercentage: number;
  productImages: GetOrderListForBuyer_getOrderListForBuyer_productImages[];
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
