import { gql } from "@apollo/client";

export const ADD_ITEM_TO_ORDER_CART = gql`
	mutation AddItemToOrderCart(
		$productId: String!
		$productVariationId: String!
		$orderQuantitySize: Float!
	) {
		addItemToOrderCart(
			productId: $productId
			productVariationId: $productVariationId
			orderQuantitySize: $orderQuantitySize
		)
	}
`;
