import {
	NormalizedCacheObject,
	ApolloClient,
	ApolloLink,
	concat,
	InMemoryCache,
	HttpLink,
	ApolloProvider,
} from "@apollo/client";
import fetch from "isomorphic-unfetch";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { resetAuthToken } from "../utils";
// import Router from "next/router";

const httpLink = new HttpLink({
	fetch,
	// uri:"http://ec2-13-235-13-251.ap-south-1.compute.amazonaws.com:3000/graphql",
	uri: "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
	// get token
	const token = localStorage.getItem("token");

	return {
		headers: {
			...headers,
			authorization: token ? token : undefined,
		},
		credentials: "include",
	};
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (!graphQLErrors) {
		return;
	}

	graphQLErrors.forEach((error) => {
		if (error.message === "Unauthorized") {
			resetAuthToken();
		}
	});
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: authLink.concat(errorLink).concat(httpLink),
	cache: new InMemoryCache(),
	credentials: "include",
});
