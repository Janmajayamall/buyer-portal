import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import Typography from "@material-ui/core/Typography";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
	GetCategoryProductsForBuyers,
	GetCategoryProductsForBuyersVariables,
	GetCategoryProductsForBuyers_getCategoryProductsForBuyers_variations,
} from "../src/graphql/generated/GetCategoryProductsForBuyers";
import {
	GET_CATEGORY_PRODUCTS_FOR_BUYERS,
	GET_PRODUCT_CATEGORIES,
} from "../src/graphql/queries/products.graphql";
import { FeatureSideBar } from "./../src/components/featureSidebar";
import {
	GetProductCategories,
	GetProductCategories_getProductCategories,
} from "../src/graphql/generated/GetProductCategories";
import { getLowestVariantCost } from "../src/utils";

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

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();
	const chosenCategoryId: string = router.query.categoryId;

	// declaring local states
	const [allProductCategories, setAllProductCategories] = useState<
		GetProductCategories_getProductCategories[]
	>([]);
	// local states end

	// apollo hooks
	const {
		data: getCategoryProductsData,
		loading: categoryProductsLoading,
		error: categoryProductsError,
	} = useQuery<
		GetCategoryProductsForBuyers,
		GetCategoryProductsForBuyersVariables
	>(GET_CATEGORY_PRODUCTS_FOR_BUYERS, {
		variables: {
			categoryId: Number(chosenCategoryId),
		},
		onCompleted({ getCategoryProductsForBuyers }) {
			console.log(getCategoryProductsForBuyers);
		},
		onError(error) {
			console.log(error);
		},
	});

	const {} = useQuery<GetProductCategories>(GET_PRODUCT_CATEGORIES, {
		onCompleted({ getProductCategories }) {
			setAllProductCategories(getProductCategories);
		},
		onError(error) {
			console.log(error);
		},
	});
	// apollo hooks end

	if (categoryProductsLoading && !getCategoryProductsData) {
		return <div>Loading!!!</div>;
	}

	// trial
	const d = [
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
		...getCategoryProductsData.getCategoryProductsForBuyers,
	];

	return (
		<div style={{ flexDirection: "row", display: "flex" }}>
			<FeatureSideBar
				windowSize={window.screen.availWidth}
				categories={allProductCategories}
				chosenCategoryId={Number(chosenCategoryId)}
			/>
			<div style={{ width: window.screen.availWidth * 0.7 }}>
				<Typography variant="h4" gutterBottom>
					{allProductCategories.map((val) => {
						if (val.id === Number(chosenCategoryId)) {
							return `${val.name} products`;
						}
						return undefined;
					})}
				</Typography>

				{d.map((val) => {
					if (val.variations.length === 0) {
						return undefined;
					}

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
		</div>
	);
};

export default Page;
