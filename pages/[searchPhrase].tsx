import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS } from "../src/graphql/queries/products.graphql";
import { FeatureSideBar } from "../src/components/featureSidebar";
import {
	GetProductsBySearchPhraseForBuyers,
	GetProductsBySearchPhraseForBuyersVariables,
} from "../src/graphql/generated/GetProductsBySearchPhraseForBuyers";
import { ProductGridListing } from "../src/components/productGridListing";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { LoadingComponent } from "../src/components/LoadingComponent";

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

	let searchPhraseRouted = router.query.searchPhrase;
	if (searchPhraseRouted && typeof searchPhraseRouted !== "string") {
		searchPhraseRouted = searchPhraseRouted[0];
	}

	// declaring local states

	// hook for tracking search phrase
	const [searchPhrase, setSearchPhrase] = useState<string | null>(
		searchPhraseRouted
	);
	console.log(searchPhraseRouted, searchPhrase);
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
			searchPhrase: String(searchPhraseRouted),
		},
		onCompleted({ getProductsBySearchPhraseForBuyers }) {
			console.log(getProductsBySearchPhraseForBuyers);
		},
		onError(error) {
			console.log(error);
		},
	});

	// apollo hooks end

	if (getProductsBySearchPhraseLoading && !getProductsBySearchPhraseData) {
		return <LoadingComponent />;
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
		<div
			style={{
				width: "100%",
				height: "100%",
				// justifyContent: "flex-start",
			}}
		>
			<div
				style={{
					padding: 10,
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-start",
					marginLeft: 10,
					marginTop: 20,
					marginBottom: 20,
					marginRight: 10,
				}}
			>
				<TextField
					variant="standard"
					id="SearchPhrase"
					label="Search Fabric Product"
					value={searchPhrase}
					onChange={(e) => {
						setSearchPhrase(e.target.value);
					}}
					style={{ width: "90%", marginRight: 5 }}
				/>
				<Button
					style={{ justifySelf: "center" }}
					color="secondary"
					variant="contained"
					onClick={() => {
						router.push(`/${searchPhrase}`);
					}}
				>
					<SearchIcon />
					{"Search"}
				</Button>
			</div>
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
									`${process.env.DOMAIN}/productDetails/${product.id}`
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
