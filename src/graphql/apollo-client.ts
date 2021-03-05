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
// import Router from "next/router";

const httpLink = new HttpLink({
	fetch,
	uri: "http://localhost:3000/graphql",
});

const authLink = setContext((request, previousContext) => ({
	credentials: "include",
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (!graphQLErrors) {
		return;
	}

	graphQLErrors.forEach((error) => {
		if (error.message === "Unauthorized") {
			// window.location.href = "/login";
		}
	});
});

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: authLink.concat(errorLink).concat(httpLink),
	cache: new InMemoryCache(),
});
