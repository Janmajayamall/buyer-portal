import { gql } from "@apollo/client";

export const IS_BUYER_AUTHENTICATED = gql`
	query IsBuyerAuthenticated {
		isBuyerAuthenticated
	}
`;

export const GET_BUYER_PROFILE = gql`
	query GetBuyerProfile {
		getBuyerProfile {
			buyerId
			firstNamePOC
			lastNamePOC
			address
			city
			state
			pincode
			gstin
			gstVerified
			timestamp
			lastModifiedTimestamp
		}
	}
`;
