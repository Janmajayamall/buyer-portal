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
import NextImage from "next/image";

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

	const CategoryRep = () => {
		return (
			<NextImage
				src="/../public/categories/Cotton.png"
				alt="me"
				width="150"
				height="100"
			/>
		);

		return (
			<Paper
				style={{
					display: "inline-block",
					padding: 10,
				}}
				elevation={0}
				// variant="outlined"
			>
				<div
					style={{
						height: 50,
						width: 50,
						background: "green",
						borderRadius: 25,
						marginBottom: 2,
					}}
				/>
				<Typography variant="body2" style={{}}>
					Shirting
				</Typography>
			</Paper>
		);
	};

	// DECLARING APOLLO HOOKS END

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				// width: "100%",
				justifyContent: "center",
				// width: 1200,
				// padding: 50,
			}}
		>
			<NextImage
				src="/../public/main_banner.png"
				alt="me"
				width="1200"
				height="497"
			/>
			<NextImage
				src="/../public/features.png"
				alt="me"
				width="1200"
				height="120"
			/>
			<Paper
				style={{
					width: "90%",
					alignSelf: "center",
					marginTop: 30,
					padding: 20,
				}}
				elevation={3}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
						marginTop: 20,
					}}
				>
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
					<CategoryRep />
				</div>
			</Paper>

			<div
				style={{
					display: "inline-block",
				}}
			>
				<Typography
					variant="h5"
					style={{
						fontWeight: "initial",
						marginLeft: 20,
						marginTop: 20,
					}}
				>
					Trending Now
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
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Page;

// <Paper
// 	elevation={3}
// 	style={{
// 		backgroundColor: "#FFFFFF",
// 		marginTop: 20,
// 		// display: "inline-block",
// 		padding: 10,
// 	}}
// >
// 	<div
// 		style={{
// 			display: "flex",
// 			flexDirection: "row",
// 			justifyContent: "space-around",
// 		}}
// 	>
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 	</div>
// 	<div
// 		style={{
// 			display: "flex",
// 			flexDirection: "row",
// 			justifyContent: "space-around",
// 			marginTop: 10,
// 		}}
// 	>
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 	</div>
// </Paper>;
