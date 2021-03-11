import { gql } from "@apollo/client";
import { GRAPHQL_WS } from "subscriptions-transport-ws";

export const UPDATE_BUYER_ADDRESS = gql`
	mutation UpdateBuyerAddress($buyerAddressInput: BuyerAddressInput!) {
		updateBuyerAddress(buyerAddressInput: $buyerAddressInput)
	}
`;

export const BUYER_REQUEST_LOGIN_VERIFICATION_CODE = gql`
	mutation BuyerRequestLoginVerificationCode($phoneNumber: String!) {
		buyerRequestLoginVerificationCode(phoneNumber: $phoneNumber)
	}
`;

export const BUYER_VERIFY_LOGIN_CODE = gql`
	mutation BuyerVerifyLoginCode(
		$phoneNumber: String!
		$verificationCode: String!
	) {
		buyerVerifyLoginCode(
			phoneNumber: $phoneNumber
			verificationCode: $verificationCode
		) {
			token
		}
	}
`;
