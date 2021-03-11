import { gql } from "@apollo/client";

export const GET_BUYER_ADDRESSES = gql`
	query GetBuyerAddresses {
		getBuyerAddresses {
			id
			line1
			pincode
			city
			state
			buyerId
			timestamp
		}
	}
`;

export const IS_BUYER_AUTHENTICATED = gql`
	query IsBuyerAuthenticated {
		isBuyerAuthenticated
	}
`;
