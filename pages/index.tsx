import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { getLowestVariantCost } from "../src/utils";
import {
	GetCategoryProductsForBuyers,
	GetCategoryProductsForBuyersVariables,
	GetCategoryProductsForBuyers_getCategoryProductsForBuyers,
} from "../src/graphql/generated/GetCategoryProductsForBuyers";
import { GET_CATEGORY_PRODUCTS_FOR_BUYERS } from "../src/graphql/queries/products.graphql";
import { ProductGridListing } from "../src/components/productGridListing";
import Divider from "@material-ui/core/Divider";

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
		GetCategoryProductsForBuyers_getCategoryProductsForBuyers[]
	>([]);

	// DECLARING LOCAL STATE ENDS

	// DECLARING APOLLO HOOKS

	const {
		error: getCategoryProductsForBuyersError,
		loading: getCategoryProductsForBuyersLoading,
	} = useQuery<
		GetCategoryProductsForBuyers,
		GetCategoryProductsForBuyersVariables
	>(GET_CATEGORY_PRODUCTS_FOR_BUYERS, {
		variables: {
			categoryName: "",
		},
		onCompleted({ getCategoryProductsForBuyers }) {
			console.log(getCategoryProductsForBuyers);
			setProducts(getCategoryProductsForBuyers);
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
			{products.map((product) => (
				<ProductGridListing
					productDetails={product}
					onClick={() => {
						window.open(
							`http://localhost:5000/productDetails/${product.id}`
						);
						// router.push(`/productDetails/${product.id}`);
					}}
				/>
			))}
		</div>
	);
};

export default Page;
