import { gql } from "@apollo/client";
import { GroupWorkOutlined } from "@material-ui/icons";

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

export const REMOVE_ITEM_FROM_ORDER_CART = gql`
	mutation RemoveItemFromOrderCart($orderCartItemId: String!) {
		removeItemFromOrderCart(orderCartItemId: $orderCartItemId) {
			id

			orderQuantitySize
			orderTotalPrice

			buyerId

			productVariationPrice
			productVariationFinalPrice
			productVariationInStock
			productVariationColourHexCode
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
