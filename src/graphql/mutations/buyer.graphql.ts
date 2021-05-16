import { gql } from "@apollo/client";

// export const BUYER_REQUEST_LOGIN_VERIFICATION_CODE = gql`
// 	mutation BuyerRequestLoginVerificationCode($phoneNumber: String!) {
// 		buyerRequestLoginVerificationCode(phoneNumber: $phoneNumber)
// 	}
// `;

// export const BUYER_VERIFY_LOGIN_CODE = gql`
// 	mutation BuyerVerifyLoginCode(
// 		$phoneNumber: String!
// 		$verificationCode: String!
// 	) {
// 		buyerVerifyLoginCode(
// 			phoneNumber: $phoneNumber
// 			verificationCode: $verificationCode
// 		) {
// 			token
// 		}
// 	}
// `;

// export const UPDATE_BUYER_PROFILE = gql`
// 	mutation UpdateBuyerProfile($buyerProfileInput: BuyerProfileInput!) {
// 		updateBuyerProfile(buyerProfileInput: $buyerProfileInput) {
// 			buyerId
// 			firstNamePOC
// 			lastNamePOC
// 			address
// 			city
// 			state
// 			pincode
// 			gstin
// 			gstVerified
// 			timestamp
// 			lastModifiedTimestamp
// 		}
// 	}
// `;
