import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { getLowestVariantCost } from "../src/utils";
import { GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS } from "../src/graphql/queries/products.graphql";
import { ProductGridListing } from "../src/components/productGridListing";
import {
	GetProductsBySearchPhraseForBuyers,
	GetProductsBySearchPhraseForBuyersVariables,
	GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers,
} from "../src/graphql/generated/GetProductsBySearchPhraseForBuyers";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"& > * + *": {},
		},
	})
);

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();

	// DECLARING LOCAL STATE

	const [products, setProducts] = useState<
		GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers[]
	>([]);

	// DECLARING LOCAL STATE ENDS

	// DECLARING APOLLO HOOKS

	const {} = useQuery<
		GetProductsBySearchPhraseForBuyers,
		GetProductsBySearchPhraseForBuyersVariables
	>(GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS, {
		variables: {
			searchPhrase: "",
		},
		onCompleted({ getProductsBySearchPhraseForBuyers }) {
			console.log(getProductsBySearchPhraseForBuyers);
			setProducts(getProductsBySearchPhraseForBuyers);
		},
		onError(error) {
			console.log(error);
		},
	});

	// DECLARING APOLLO HOOKS END

	return (
		<div
			style={{
				display: "inline-block",
				paddingLeft: 50,
				paddingRight: 50,
			}}
		>
			<Typography
				variant="h5"
				style={{
					fontWeight: "initial",
					marginLeft: 20,
				}}
			>
				Now Trending
			</Typography>
			{products.map((product) => {
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
							// router.push(`/productDetails/${product.id}`);
						}}
					/>
				);
			})}
		</div>
	);
};

export default Page;
