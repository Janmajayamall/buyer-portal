import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import Typography from "@material-ui/core/Typography";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS } from "../src/graphql/queries/products.graphql";
import { FeatureSideBar } from "../src/components/featureSidebar";
import { getLowestVariantCost } from "../src/utils";
import { IsBuyerAuthenticated } from "../src/graphql/generated/IsBuyerAuthenticated";
import { IS_BUYER_AUTHENTICATED } from "../src/graphql/queries/buyer.graphql";
import {
	GetProductsBySearchPhraseForBuyers,
	GetProductsBySearchPhraseForBuyersVariables,
} from "../src/graphql/generated/GetProductsBySearchPhraseForBuyers";
import { ProductGridListing } from "../src/components/productGridListing";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexWrap: "wrap",
			"& > *": {
				margin: theme.spacing(1),
				width: theme.spacing(16),
				height: theme.spacing(16),
			},
		},
	})
);

const Page: React.FC = (props) => {
	const classes = useStyles();
	const router = useRouter();

	let searchPhrase = router.query.searchPhrase;
	if (searchPhrase && typeof searchPhrase !== "string") {
		searchPhrase = searchPhrase[0];
	}

	// declaring local states
	// local states end

	// apollo hooks
	const {
		data: getProductsBySearchPhraseData,
		loading: getProductsBySearchPhraseLoading,
		error: getProductsBySearchPhraseError,
	} = useQuery<
		GetProductsBySearchPhraseForBuyers,
		GetProductsBySearchPhraseForBuyersVariables
	>(GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS, {
		variables: {
			searchPhrase: searchPhrase as string,
		},
		onCompleted({ getProductsBySearchPhraseForBuyers }) {
			console.log(getProductsBySearchPhraseForBuyers);
		},
		onError(error) {
			console.log(error);
		},
	});

	const {} = useQuery<IsBuyerAuthenticated>(IS_BUYER_AUTHENTICATED, {
		onCompleted() {
			// @ts-ignore
			props.onAuthStatusChange(true);
		},
		onError(error) {
			// @ts-ignore
			props.onAuthStatusChange(false);
		},
	});
	// apollo hooks end

	if (getProductsBySearchPhraseLoading && !getProductsBySearchPhraseData) {
		return <div>Loading!!!</div>;
	}

	// trial
	const d = [
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
		...getProductsBySearchPhraseData.getProductsBySearchPhraseForBuyers,
	];

	return (
		<div style={{ flexDirection: "row", display: "flex" }}>
			<FeatureSideBar />
			<div>
				{d.map((product) => {
					if (product.variations.length === 0) {
						return undefined;
					}

					return (
						<ProductGridListing
							productDetails={product}
							onClick={() => {
								window.open(
									`http://localhost:5000/productDetails/${product.id}`
								);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Page;