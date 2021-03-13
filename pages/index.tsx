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

	const testData = [...products, ...products, ...products, ...products];

	return (
		<div style={{ display: "inline-block" }}>
			<Typography>Trending Products</Typography>
			{testData.map((val) => {
				// if (val.variations.length === 0) {
				// 	return undefined;
				// }
				return (
					<Paper
						elevation={3}
						style={{
							padding: 10,
							display: "inline-block",
							maxWidth: 200,
							justifyContent: "center",
							alignItems: "center",
							margin: 10,
						}}
						onClick={() => {
							router.push(`/productDetails/${val.id}`);
						}}
					>
						<Image
							width="150"
							height="200"
							cloudName={"jayeet"}
							publicId={
								"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
							}
						/>
						<Typography variant="subtitle2" gutterBottom>
							{val.description}
						</Typography>
						<Typography variant="subtitle2" gutterBottom>
							{getLowestVariantCost(val.variations)}
							<span>&#x20B9;</span>
							<span>{" /M"}</span>
						</Typography>
						<Typography variant="subtitle2" gutterBottom>
							{val.clothComposition}
						</Typography>
						<Typography variant="subtitle2" gutterBottom>
							{`Available in ${val.variations.length} colours`}
						</Typography>
					</Paper>
				);
			})}
		</div>
	);
};

export default Page;
