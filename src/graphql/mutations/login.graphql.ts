import { gql } from "@apollo/client";

export const LOGIN_MANUFACTURER = gql`
	mutation LoginManufacturer($phoneNumber: String!, $password: String!) {
		loginManufacturer(phoneNumber: $phoneNumber, password: $password) {
			token
		}
	}
`;
