import { gql } from "@apollo/client";

export const UPDATE_BUYER_ADDRESS = gql`
	mutation UpdateBuyerAddress($buyerAddressInput: BuyerAddressInput!) {
		updateBuyerAddress(buyerAddressInput: $buyerAddressInput)
	}
`;
