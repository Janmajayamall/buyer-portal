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

const httpLink = new HttpLink({
	fetch,
	uri: process.env.API_URL,
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
	defaultOptions: {
		query: {
			fetchPolicy: "no-cache",
		},
	},
});
