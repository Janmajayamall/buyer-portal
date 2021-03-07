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
