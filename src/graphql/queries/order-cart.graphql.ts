import { gql } from "@apollo/client";

export const GET_BUYER_ORDER_CART_ITEMS = gql`
	query GetBuyerOrderCartItems {
		getBuyerOrderCartItems {
			id

			orderQuantitySize
			orderTotalPrice

			buyerId

			productVariationPrice
			productVariationFinalPrice
			productVariationInStock
			productVariationColourId
			productVariationColourHex
			productVariationColourName
			productVariationId

			productName
			productDescription
			productClothComposition
			productWidth
			productGsm
			productPattern
			productReferenceImageURL
			productMaxOrderSize
			productMinOrderSize
			productReferenceId
			productId

			manufacturerId

			timestamp
		}
	}
`;
