import { gql } from "@apollo/client";

export const ADD_REQUEST = gql`
	mutation AddRequest($requestInput: RequestInputType!) {
		addRequest(requestInput: $requestInput)
	}
`;
