import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { FeatureSideBar } from "./../../src/components/featureSidebar";
import {
	GetProductDetails,
	GetProductDetailsVariables,
	GetProductDetails_getProductDetails_variations,
} from "../../src/graphql/generated/GetProductDetails";
import {
	GET_PRODUCT_CATEGORIES,
	GET_PRODUCT_DETAILS,
} from "../../src/graphql/queries/products.graphql";
import {
	GetProductCategories,
	GetProductCategories_getProductCategories,
} from "../../src/graphql/generated/GetProductCategories";
import { Divider } from "@material-ui/core";
import {
	FormattedPriceInterface,
	formatPriceValue,
	formatNumberWithCommas,
	roundToTwoPlaces,
} from "./../../src/utils";

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

function getLowestVariantCost(
	variants: GetProductDetails_getProductDetails_variations[]
): number | null {
	if (variants.length === 0) {
		return null;
	}

	let lowestPricePoint = variants[0].finalPrice;
	variants.forEach((variant) => {
		if (lowestPricePoint > variant.finalPrice) {
			lowestPricePoint = variant.finalPrice;
		}
	});
	return lowestPricePoint;
}

function getHighestVariantCost(
	variants: GetProductDetails_getProductDetails_variations[]
): number | null {
	if (variants.length === 0) {
		return null;
	}

	let highPricePoint = variants[0].finalPrice;
	variants.forEach((variant) => {
		if (highPricePoint < variant.finalPrice) {
			highPricePoint = variant.finalPrice;
		}
	});
	return highPricePoint;
}

const ProductDetailsTopicDetailDiv = ({ title, detail }) => (
	<div style={{ display: "flex", flexDirection: "row" }}>
		<Typography
			variant="body1"
			style={{ fontWeight: "bold" }}
			display="block"
		>
			{`${title}: `}
		</Typography>
		&nbsp;
		<Typography variant="body1" display="block">
			{` ${detail}`}
		</Typography>
	</div>
);

const OrderDetailsTopicDetailDiv = ({ title, detail }) => (
	<div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
		<Typography
			variant="body2"
			style={{ fontWeight: "bold" }}
			display="block"
		>
			{`${title}: `}
		</Typography>
		&nbsp;
		<Typography variant="body2" display="block">
			{` ${detail}`}
		</Typography>
	</div>
);

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();
	let productId: string | string[] = router.query.productId;

	// correcting the type
	if (productId && typeof productId !== "string") {
		productId = productId[0];
	}

	// declaring local states
	const [allProductCategories, setAllProductCategories] = useState<
		GetProductCategories_getProductCategories[]
	>([]);
	const [
		selectedPricingTableMapKey,
		setSelectedPricingTableMapKey,
	] = useState<number>(-1);
	const [pricingTableMap, setPricingTableMap] = useState<
		Map<number, GetProductDetails_getProductDetails_variations[]>
	>(new Map<number, GetProductDetails_getProductDetails_variations[]>());
	const [
		selectedProductVariation,
		setSelectedProductVariation,
	] = useState<GetProductDetails_getProductDetails_variations | null>(null);
	const [selectedProductQuantity, setSelectedProductQuantity] = useState<
		number | null
	>(null);
	const [
		didUserEditOrderQuantity,
		setDidUserEditOrderQuantity,
	] = useState<boolean>(false);
	// local states end

	// functions
	function generatePricingTableMap(
		variations: Array<GetProductDetails_getProductDetails_variations>
	) {
		let pricingTableMapLocal = new Map<
			number,
			GetProductDetails_getProductDetails_variations[]
		>();
		variations.forEach((variation) => {
			if (!variation.inStock) {
				return;
			}

			if (pricingTableMapLocal.has(variation.finalPrice)) {
				const temp = pricingTableMapLocal.get(variation.finalPrice);
				temp.push(variation);
				pricingTableMapLocal.set(variation.finalPrice, temp);
			} else {
				const temp = [variation];
				pricingTableMapLocal.set(variation.finalPrice, temp);
			}
		});

		// set pricing table map
		setPricingTableMap(pricingTableMapLocal);

		// set selected pricing
		if (Array.from(pricingTableMapLocal.keys()).length !== 0) {
			setSelectedPricingTableMapKey(
				Array.from(pricingTableMapLocal.keys()).sort()[0]
			);
			setSelectedProductVariation(null);
		}
	}

	function getTotalPrice(): FormattedPriceInterface | null {
		// if selected quantity is zero them return null
		if (selectedProductQuantity === null) {
			return null;
		}
		return formatPriceValue(
			selectedProductVariation.finalPrice * selectedProductQuantity
		);
	}

	function checkOrderDetails(): boolean {
		// check if order quantity size is smaller than MOQ.
		// If yes, then display MOQ error
		if (selectedProductQuantity < productDetails.minOrderSize) {
			setDidUserEditOrderQuantity(true);
			return false;
		}

		return true;
	}

	function setSelectedPricingTableMapKeyLocal(key: number) {
		// change selected pricing table key
		setSelectedPricingTableMapKey(key);

		// empty selected variation if any from last key && reset order input field touched value
		setSelectedProductVariation(null);
		setDidUserEditOrderQuantity(false);
	}

	function addToCart() {
		checkOrderDetails();
	}

	function buyNow() {
		checkOrderDetails();
	}
	// functions end

	// apollo hooks
	const {
		data: getProductDetailsData,
		loading: getProductDetailsLoading,
		error: getProductDetailsError,
	} = useQuery<GetProductDetails, GetProductDetailsVariables>(
		GET_PRODUCT_DETAILS,

		{
			variables: {
				productId: productId as string,
			},
			onCompleted({ getProductDetails }) {
				generatePricingTableMap(getProductDetails.variations);
			},
			onError(error) {
				console.log(error, " this is the error");
			},
		}
	);
	const {} = useQuery<GetProductCategories>(GET_PRODUCT_CATEGORIES, {
		onCompleted({ getProductCategories }) {
			setAllProductCategories(getProductCategories);
		},
		onError(error) {
			console.log(error);
		},
	});
	// apollo hooks end

	if (getProductDetailsLoading && !getProductDetailsData) {
		return <div>Loading!!!</div>;
	}

	if (getProductDetailsError) {
		return <div>Error</div>;
	}

	const productDetails = getProductDetailsData.getProductDetails;
	return (
		<div style={{ flexDirection: "row", display: "flex" }}>
			<FeatureSideBar
				windowSize={window.screen.availWidth}
				categories={allProductCategories}
				chosenCategoryId={null}
			/>
			<div
				style={{
					width: window.screen.availWidth * 0.7,
					padding: 20,
					margin: 5,
				}}
			>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<Image
						width="225"
						height="300"
						cloudName={"jayeet"}
						publicId={
							"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
						}
					/>
					<div style={{ marginLeft: 20, paddingLeft: 20, flex: 1 }}>
						<div style={{ marginBottom: 10 }}>
							<Typography variant="h4" display="block">
								{productDetails.name}
							</Typography>
							<Typography
								variant="h5"
								style={{ fontWeight: "bold" }}
								display="block"
							>
								{`${getLowestVariantCost(
									productDetails.variations
								)} /meter - ${getHighestVariantCost(
									productDetails.variations
								)} /meter`}
							</Typography>
						</div>

						<ProductDetailsTopicDetailDiv
							title={"Minimum order quantity"}
							detail={productDetails.minOrderSize}
						/>

						<ProductDetailsTopicDetailDiv
							title={"Pattern"}
							detail={productDetails.pattern}
						/>
						<ProductDetailsTopicDetailDiv
							title={"Cloth composition"}
							detail={productDetails.clothComposition}
						/>
						<ProductDetailsTopicDetailDiv
							title={"GSM"}
							detail={productDetails.gsm}
						/>
						<ProductDetailsTopicDetailDiv
							title={"Width"}
							detail={productDetails.width}
						/>
						<Typography variant="body2" display="block">
							{productDetails.description}
						</Typography>
					</div>
				</div>

				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						marginTop: 10,
					}}
				>
					{Array.from(pricingTableMap.keys()).length !== 0 ? (
						<Paper
							style={{
								width: 400,
								padding: 10,
								backgroundColor: "#d3d3d3",
							}}
						>
							<div
								style={{
									width: "100%",
									height: 40,
									overflowX: "scroll",
									overflowY: "hidden",
									whiteSpace: "nowrap",
								}}
							>
								{Array.from(pricingTableMap.keys())
									.sort()
									.map((key) => {
										return (
											<div
												style={{
													display: "inline-block",
													// padding: 15,
													paddingRight: 15,
													paddingLeft: 15,
													height: 60,
												}}
												onClick={() => {
													setSelectedPricingTableMapKeyLocal(
														key
													);
												}}
											>
												<Typography
													style={{
														color:
															key ===
															selectedPricingTableMapKey
																? "red"
																: "black",
													}}
													variant="body2"
												>
													{`\u20B9 ${formatNumberWithCommas(
														key
													)}`}{" "}
													<span>{" /M"}</span>
												</Typography>
											</div>
										);
									})}
							</div>
							<Divider
								style={{ marginTop: 5, marginBottom: 15 }}
							/>
							{selectedPricingTableMapKey !== -1 ? (
								<div
									style={{
										display: "inline-block",
										width: "100%",
									}}
								>
									{pricingTableMap
										.get(selectedPricingTableMapKey)
										.map((variation) => (
											<Paper
												elevation={0}
												style={{
													display: "inline-block",
													padding: 10,
													margin: 10,
													backgroundColor:
														selectedProductVariation &&
														selectedProductVariation.id ===
															variation.id
															? "#A9A9A9"
															: "#FFFFFF",
												}}
												onClick={() => {
													setSelectedProductVariation(
														variation
													);
												}}
											>
												<div
													style={{
														display: "flex",
														flexDirection: "row",
													}}
												>
													<Paper
														elevation={3}
														style={{
															width: 15,
															height: 15,
															backgroundColor:
																variation.colour
																	.hexValue,
														}}
													/>
													<Typography
														variant="body2"
														style={{
															marginLeft: 5,
														}}
													>
														{`#${variation.colour.id}`}
													</Typography>
												</div>
											</Paper>
										))}
								</div>
							) : undefined}
						</Paper>
					) : (
						<div>No product available</div>
					)}

					{selectedProductVariation !== null ? (
						<div
							style={{
								width: 250,
								marginLeft: 20,
								// display: "flex",
								// justifyContent: "center",
								// alignItems: "center",
							}}
						>
							<Typography variant="h6">Order Details</Typography>
							<TextField
								id="standard-number"
								label="Order Quantity Size"
								type="number"
								value={selectedProductQuantity}
								onChange={(e) => {
									setDidUserEditOrderQuantity(false);

									if (!e.target.value) {
										setSelectedProductQuantity(null);
										return;
									}

									const value = roundToTwoPlaces(
										Number(e.target.value)
									);
									if (value > -1) {
										setSelectedProductQuantity(value);
									} else {
										setSelectedProductQuantity(0);
									}
								}}
								InputProps={{ inputProps: { min: 0 } }}
								InputLabelProps={{
									shrink: true,
								}}
								helperText={
									selectedProductQuantity <
										productDetails.minOrderSize &&
									didUserEditOrderQuantity
										? `Quantity size should be more than ${productDetails.maxOrderSize} Meters`
										: ""
								}
								error={
									selectedProductQuantity <
										productDetails.minOrderSize &&
									didUserEditOrderQuantity
								}
							/>
							<div>
								<OrderDetailsTopicDetailDiv
									title={"Order quantity size"}
									detail={(() => {
										if (selectedProductQuantity === null) {
											return "N/A";
										}
										return `${formatNumberWithCommas(
											selectedProductQuantity
										)} meters`;
									})()}
								/>
								<OrderDetailsTopicDetailDiv
									title={"Price per unit"}
									detail={(() => {
										if (selectedProductQuantity === null) {
											return "N/A";
										}
										return formatPriceValue(
											selectedProductVariation.finalPrice
										).formattedPriceCurrency;
									})()}
								/>
								<OrderDetailsTopicDetailDiv
									title={"Total Price"}
									detail={(() => {
										const totalPrice = getTotalPrice();
										if (totalPrice === null) {
											return "N/A";
										}

										return totalPrice.formattedPriceCurrency;
									})()}
								/>
								<div
									style={{
										marginTop: 15,
										display: "flex",
										flexDirection: "row",
									}}
								>
									<Button
										onClick={() => {
											addToCart();
										}}
										variant="contained"
										color="primary"
									>
										Add To Cart
									</Button>
									<Button
										style={{ marginLeft: 10 }}
										variant="contained"
										color="primary"
									>
										Buy Now
									</Button>
								</div>
							</div>
						</div>
					) : undefined}
				</div>
			</div>
		</div>
	);
};

export default Page;
