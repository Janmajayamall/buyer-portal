import { gql } from "@apollo/client";

export const GET_ORDER_LIST_FOR_BUYER = gql`
	query GetOrderListForBuyer {
		getOrderListForBuyer {
			id

			orderQuantity
			orderStage
			orderTotalPrice
			totalTax
			grandTotalPrice
			deliveryCharges
			buyerId
			manufacturerId
			timestamp

			productId
			productName
			productDescription
			productClothComposition
			productWidth
			productGsm
			productPattern
			productMinOrderSize
			productReferenceId
			productHsnCode
			productTaxPercentage
			productImages {
				id
				productId
				publicId
				timestamp
			}

			productVariationId
			productVariationPrice
			productVariationInStock
			productVariationColourHexCode
			productVariationRChannel
			productVariationRChannel
			productVariationBChannel
		}
	}
`;
