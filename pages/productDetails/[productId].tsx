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
import { GET_PRODUCT_DETAILS } from "../../src/graphql/queries/products.graphql";
import { Divider } from "@material-ui/core";
import {
	FormattedPriceInterface,
	formatPriceValue,
	formatNumberWithCommas,
	roundToTwoPlaces,
	handleNumberInputOnKeyPress,
	getLowestVariantCost,
	getHighestVariantCost,
	convertToInt,
	CommonPageProps,
} from "./../../src/utils";
import {
	PlaceNewOrder,
	PlaceNewOrderVariables,
} from "../../src/graphql/generated/PlaceNewOrder";
import { PLACE_NEW_ORDER } from "../../src/graphql/mutations/order.graphl";
import { IsBuyerAuthenticated } from "../../src/graphql/generated/IsBuyerAuthenticated";
import { IS_BUYER_AUTHENTICATED } from "../../src/graphql/queries/buyer.graphql";

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

// const TopicDetailDiv = ({ title, detail }) => (
// 	<div style={{ display: "flex", flexDirection: "row" }}>
// 		<Typography
// 			variant="body2"
// 			style={{ fontWeight: "bold" }}
// 			display="block"
// 		>
// 			{`${title}: `}
// 		</Typography>
// 		&nbsp;
// 		<Typography variant="body2" display="block">
// 			{` ${detail}`}
// 		</Typography>
// 	</div>
// );

const TopicDetailDiv = ({ title, detail }) => (
	<div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
		<Typography
			style={{ fontWeight: "bolder", fontSize: 12 }}
			display="block"
		>
			{`${title}: `}
		</Typography>
		&nbsp;
		<Typography
			style={{ fontWeight: "normal", fontSize: 12 }}
			display="block"
		>
			{` ${detail}`}
		</Typography>
	</div>
);

enum MutationRequestState {
	loading,
	error,
	done,
	notInitiated,
}

const Page: React.FC<CommonPageProps> = ({ authState, requestLogin }) => {
	const classes = useStyles();
	const router = useRouter();

	let routerQuery: string | string[] = router.query.productId;
	if (routerQuery && typeof routerQuery !== "string") {
		routerQuery = routerQuery[0];
	}
	const productId = Number(routerQuery);

	// DECLARING LOCAL STATES

	// state for storing all queried available product categories
	const [
		selectedPricingTableMapKey,
		setSelectedPricingTableMapKey,
	] = useState<number>(-1);

	// state for pricing table map
	const [pricingTableMap, setPricingTableMap] = useState<
		Map<number, GetProductDetails_getProductDetails_variations[]>
	>(new Map<number, GetProductDetails_getProductDetails_variations[]>());

	// state for maintaining selected product variation
	const [
		selectedProductVariation,
		setSelectedProductVariation,
	] = useState<GetProductDetails_getProductDetails_variations | null>(null);
	const [
		selectedProductQuantity,
		setSelectedProductQuantity,
	] = useState<string>("");

	// state for keeping a track of user input error for order quantity
	const [
		orderQuantityInputError,
		setOrderQuantityInputError,
	] = useState<boolean>(false);

	// DECLARING LOCAL STATES END

	// DECLARING FUNCTIONS

	// sets pricing table map from product variations array
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

			if (pricingTableMapLocal.has(variation.price)) {
				const temp = pricingTableMapLocal.get(variation.price);
				temp.push(variation);
				pricingTableMapLocal.set(variation.price, temp);
			} else {
				const temp = [variation];
				pricingTableMapLocal.set(variation.price, temp);
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

	// returns totalPrice (i.e. selectedOrderQuantity * pricePerUnit)
	function getOrderTotal(): FormattedPriceInterface | null {
		// if no product variation is selected or selected product quantity is zero then return null
		if (
			selectedProductQuantity === "" ||
			selectedProductVariation === null
		) {
			return null;
		}
		return formatPriceValue(
			selectedProductVariation.price *
				convertToInt(Number(selectedProductQuantity))
		);
	}

	// returns tax on product orders (i.e. tax % * getTotalPrice())
	function getTotalTax(): FormattedPriceInterface | null {
		// if no product variation is selected or selected product quantity is zero then return null
		if (
			selectedProductQuantity === "" ||
			selectedProductVariation === null
		) {
			return null;
		}

		const orderTotal = roundToTwoPlaces(
			selectedProductVariation.price *
				convertToInt(Number(selectedProductQuantity))
		);
		return formatPriceValue(
			convertToInt(orderTotal * (productDetails.taxPercentage / 100))
		);
	}

	// returns grand total for the order
	function getGrandTotal(): FormattedPriceInterface | null {
		if (
			selectedProductQuantity === "" ||
			selectedProductVariation === null
		) {
			return null;
		}

		const orderTotal = roundToTwoPlaces(
			selectedProductVariation.price *
				convertToInt(Number(selectedProductQuantity))
		);

		const totalTax = convertToInt(
			orderTotal * (productDetails.taxPercentage / 100)
		);

		return formatPriceValue(orderTotal + totalTax);
	}

	// returns true if order details are right
	function checkOrderDetails(): boolean {
		// check for selected product variation
		if (!selectedProductVariation) {
			return false;
		}

		// check for selected product quantity
		if (selectedProductQuantity === "") {
			return false;
		}

		// check if order quantity size is smaller than MOQ.
		// If yes, then display MOQ error
		if (Number(selectedProductQuantity) < productDetails.minOrderSize) {
			setOrderQuantityInputError(true);
			return false;
		}

		// check if product details are present
		if (!productDetails) {
			return false;
		}

		return true;
	}

	// place new order location function
	function placeNewOrderLocal() {
		// check order details validity
		if (!checkOrderDetails()) {
			return;
		}

		// mutation request for placing the order
		placeNewOrder({
			variables: {
				productId: productDetails.id,
				productVariationId: selectedProductVariation.id,
				orderQuantity: convertToInt(Number(selectedProductQuantity)),
			},
		});
	}

	// changes pricing key for pricing table & resets currently selected variation
	function setSelectedPricingTableMapKeyLocal(key: number) {
		// change selected pricing table key
		setSelectedPricingTableMapKey(key);

		// empty selected variation if any from last key && reset order input field touched value
		setSelectedProductVariation(null);
		setOrderQuantityInputError(false);
	}

	// DECLARING FUNCTIONS END

	// DECLARING APOLLO HOOKS
	const {
		data: getProductDetailsData,
		loading: getProductDetailsLoading,
		error: getProductDetailsError,
	} = useQuery<GetProductDetails, GetProductDetailsVariables>(
		GET_PRODUCT_DETAILS,

		{
			variables: {
				productId: productId,
			},
			onCompleted({ getProductDetails }) {
				generatePricingTableMap(getProductDetails.variations);
			},
			onError(error) {
				console.log(error, " this is the error");
			},
		}
	);

	const [placeNewOrder] = useMutation<PlaceNewOrder, PlaceNewOrderVariables>(
		PLACE_NEW_ORDER,
		{
			onCompleted({ placeNewOrder }) {},
			onError(error) {
				console.log(error);
			},
		}
	);

	// DECLARING APOLLO HOOKS END

	if (getProductDetailsLoading && !getProductDetailsData) {
		return <div>Loading!!!</div>;
	}

	if (getProductDetailsError) {
		return <div>Error</div>;
	}

	const productDetails = getProductDetailsData.getProductDetails;
	return (
		<div
			style={{
				// flexDirection: "row",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					marginLeft: 40,
					padding: 20,
					margin: 5,
					// width: 800,
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
							<Typography variant="h6" display="block">
								{productDetails.name}
							</Typography>
							<Typography
								variant="subtitle1"
								// style={{ fontWeight: "bold" }}
								display="block"
							>
								{`${
									formatPriceValue(
										getLowestVariantCost(
											productDetails.variations
										)
									).formattedPriceCurrency
								} /meter - ${
									formatPriceValue(
										getHighestVariantCost(
											productDetails.variations
										)
									).formattedPriceCurrency
								} /meter`}
							</Typography>
						</div>
						<Typography
							display="block"
							style={{ marginTop: 10, fontSize: 12 }}
						>
							{productDetails.description}
						</Typography>
						<TopicDetailDiv
							title={"Pattern"}
							detail={productDetails.pattern}
						/>
						<TopicDetailDiv
							title={"Cloth composition"}
							detail={productDetails.clothComposition}
						/>
						<TopicDetailDiv
							title={"GSM"}
							detail={`${productDetails.gsm} g/m2`}
						/>
						<TopicDetailDiv
							title={"Width"}
							detail={`${productDetails.width} inches`}
						/>
						<TopicDetailDiv
							title={"Minimum order quantity"}
							detail={`${productDetails.minOrderSize} meters`}
						/>
					</div>
				</div>

				<div
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						marginTop: 20,
					}}
				>
					{Array.from(pricingTableMap.keys()).length !== 0 ? (
						<Paper
							style={{
								width: 400,
								padding: 10,
								backgroundColor: "#ededed",
							}}
							elevation={0}
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
									.sort((a, b) => a - b)
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
														fontSize: 12,
													}}
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
													padding: 5,
													margin: 10,
													backgroundColor: "#FFFFFF",
													borderWidth: 1,
													borderColor:
														selectedProductVariation &&
														selectedProductVariation.id ===
															variation.id
															? "#000000"
															: "#FFFFFF",
													borderStyle: "solid",
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
														elevation={0}
														style={{
															width: 25,
															height: 25,
															backgroundColor:
																variation.colourHexCode,
														}}
													/>
												</div>
											</Paper>
										))}
								</div>
							) : undefined}
						</Paper>
					) : (
						<div>No product available</div>
					)}
					<div style={{ marginLeft: 20 }}>
						<Typography variant="h6">Order Details</Typography>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								marginTop: 5,
							}}
						>
							<div
							// style={{
							// 	width: 400,
							// }}
							>
								<TextField
									id="order-quantity-size"
									label="Order Quantity Size"
									value={selectedProductQuantity}
									onKeyDown={(e) => {
										e.preventDefault();
										handleNumberInputOnKeyPress(
											String(selectedProductQuantity),
											e.key,
											(value: string) => {
												setSelectedProductQuantity(
													value
												);
											},
											false
										);
									}}
									helperText={
										Number(selectedProductQuantity) <
											productDetails.minOrderSize &&
										orderQuantityInputError
											? `Quantity size should be more than ${productDetails.minOrderSize} Meters`
											: ""
									}
									InputProps={{
										style: { fontSize: 12 },
									}}
									error={
										Number(selectedProductQuantity) <
											productDetails.minOrderSize &&
										orderQuantityInputError
									}
								/>

								<TopicDetailDiv
									title={"Order quantity size"}
									detail={(() => {
										if (selectedProductQuantity === "") {
											return "N/A";
										}
										return `${formatNumberWithCommas(
											Number(selectedProductQuantity)
										)} meters`;
									})()}
								/>
								<TopicDetailDiv
									title={"Price per unit"}
									detail={(() => {
										if (selectedProductVariation === null) {
											return "N/A";
										}
										return formatPriceValue(
											selectedProductVariation.price
										).formattedPriceCurrency;
									})()}
								/>
								<div
									style={{
										marginTop: 15,
										display: "flex",
										flexDirection: "row",
									}}
								></div>
							</div>
							<div>
								<TopicDetailDiv
									title={"Order Total"}
									detail={(() => {
										const orderTotal = getOrderTotal();
										if (orderTotal === null) {
											return "N/A";
										}

										return orderTotal.formattedPriceCurrency;
									})()}
								/>
								<TopicDetailDiv
									title={`Tax (GST - ${productDetails.taxPercentage}%)`}
									detail={(() => {
										const tax = getTotalTax();
										if (tax === null) {
											return "N/A";
										}

										return tax.formattedPriceCurrency;
									})()}
								/>
								<TopicDetailDiv
									title={"Grand Total"}
									detail={(() => {
										const grandTotal = getGrandTotal();
										if (grandTotal === null) {
											return "N/A";
										}

										return grandTotal.formattedPriceCurrency;
									})()}
								/>
								<div style={{ marginTop: 20 }}>
									{authState === true ? (
										<Button
											onClick={placeNewOrderLocal}
											variant="contained"
											color="secondary"
										>
											Place Order
										</Button>
									) : (
										<Button
											// @ts-ignore
											onClick={requestLogin}
											variant="contained"
											color="secondary"
										>
											Login to place order
										</Button>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
