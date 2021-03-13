import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Image } from "cloudinary-react";
import {
	GetBuyerOrderCartItems,
	GetBuyerOrderCartItems_getBuyerOrderCartItems,
} from "../../src/graphql/generated/GetBuyerOrderCartItems";
import { GET_BUYER_ORDER_CART_ITEMS } from "../../src/graphql/queries/order-cart.graphql";
import {
	constants,
	formatNumberWithCommas,
	formatPriceValue,
} from "../../src/utils";
import { GetBuyerAddresses } from "../../src/graphql/generated/GetBuyerAddresses";
import {
	GET_BUYER_ADDRESSES,
	IS_BUYER_AUTHENTICATED,
} from "../../src/graphql/queries/buyer.graphql";
import { UpdateBuyerAddress } from "../../src/graphql/generated/UpdateBuyerAddress";
import { UPDATE_BUYER_ADDRESS } from "../../src/graphql/mutations/buyer.graphql";
import Modal from "@material-ui/core/Modal";
import {
	RemoveItemFromOrderCart,
	RemoveItemFromOrderCartVariables,
} from "../../src/graphql/generated/RemoveItemFromOrderCart";
import { REMOVE_ITEM_FROM_ORDER_CART } from "../../src/graphql/mutations/order-cart.graphql";
import { IsBuyerAuthenticated } from "../../src/graphql/generated/IsBuyerAuthenticated";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemInfoRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
		},
	})
);

const TopicDetailDiv = ({
	title,
	detail = "",
	color = false,
	colorValue = null,
}) => (
	<div style={{ display: "flex", flexDirection: "column", margin: 8 }}>
		<Typography
			variant="body1"
			style={{ fontWeight: "bold" }}
			display="block"
		>
			{`${title}`}
		</Typography>

		{color === false ? (
			<Typography variant="body1" display="block">
				{` ${detail}`}
			</Typography>
		) : (
			<Paper
				elevation={2}
				style={{
					padding: 5,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						backgroundColor: colorValue.hexValue,
						width: 10,
						height: 10,
						marginRight: 5,
					}}
				/>
				<div>
					<Typography variant="body1" display="block">
						{` #${colorValue.id}`}
					</Typography>
				</div>
			</Paper>
		)}
	</div>
);

const TopicDetailsDivRow = ({ title, detail }) => (
	<div style={{ width: "100%" }}>
		<div style={{ float: "left" }}>
			<Typography
				variant="body1"
				style={{ fontWeight: "bold" }}
				display="block"
			>
				{`${title}`}
			</Typography>
		</div>
		<div style={{ float: "right" }}>
			<Typography variant="body1" style={{}} display="block">
				{`${detail}`}
			</Typography>
		</div>
	</div>
);

interface BuyerAddressInterface {
	line1: string;
	pincode: string;
	state: string;
	city: string;
}

const Page: React.FC = (props) => {
	const router = useRouter();
	const classes = useStyles();

	// DECLARING APOLLO HOOKS

	const {
		data: getBuyerOrderCartItemsData,
		loading: getBuyerOrderCartItemsLoading,
		error: getBuyerOrderCartItemsError,
	} = useQuery<GetBuyerOrderCartItems>(GET_BUYER_ORDER_CART_ITEMS, {
		onCompleted({ getBuyerOrderCartItems }) {
			setOrderCartItems(getBuyerOrderCartItems);
		},
		onError(error) {
			console.log(error);
		},
	});

	const {
		data: getBuyerAddressesData,
		loading: getBuyerAddressesLoading,
		error: getBuyerAddressesError,
	} = useQuery<GetBuyerAddresses>(GET_BUYER_ADDRESSES, {
		onCompleted({ getBuyerAddresses }) {
			if (getBuyerAddresses[0]) {
				const currentAdd = getBuyerAddresses[0];
				setAddressMutationFormikInitialValues({
					line1: currentAdd.line1,
					pincode: currentAdd.pincode,
					city: currentAdd.city,
					state: currentAdd.state,
				});
			}
		},
		onError(error) {
			console.log(error);
		},
	});

	const [updateBuyerAddress] = useMutation<UpdateBuyerAddress>(
		UPDATE_BUYER_ADDRESS,
		{
			onCompleted({ updateBuyerAddress }) {
				router.reload();
			},
		}
	);

	const [removeItemFromOrderCart] = useMutation<
		RemoveItemFromOrderCart,
		RemoveItemFromOrderCartVariables
	>(REMOVE_ITEM_FROM_ORDER_CART, {
		onCompleted({ removeItemFromOrderCart }) {
			const orderCartItems: GetBuyerOrderCartItems_getBuyerOrderCartItems[] = removeItemFromOrderCart.map(
				(item) => {
					return {
						...item,
					};
				}
			);
			setOrderCartItems(orderCartItems);
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

	// DECLARING APOLLO HOOKS END

	// DECLARING LOCAL STATES

	// state for keeping track of edit address modal
	const [addressModalVisible, setAddressModalVisible] = useState<boolean>(
		false
	);

	// state for order cart items
	const [orderCartItems, setOrderCartItems] = useState<
		GetBuyerOrderCartItems_getBuyerOrderCartItems[]
	>([]);

	// state for pre-existing address provided by user, if any
	const [
		addressMutationFormikInitialValues,
		setAddressMutationFormikInitialValues,
	] = useState<BuyerAddressInterface>({
		line1: "",
		pincode: "",
		city: "",
		state: "",
	});

	// DECLARING LOCAL STATES END

	// DECLARING FUNCTIONS

	function removeItemFromOrderCartLocal(orderCartItemId: string) {
		// handling optimistic ui
		const updatedOrderCart = orderCartItems.filter((item) => {
			return item.id !== orderCartItemId;
		});
		setOrderCartItems(updatedOrderCart);

		// initiating mutation request for removing item from order cart DB
		removeItemFromOrderCart({
			variables: {
				orderCartItemId: orderCartItemId,
			},
		});
	}

	// DECLARING FUNCTIONS END

	// STUFF RELATED TO ADDRESS MODAL

	const addressMutationValidationSchema = yup.object({
		line1: yup
			.string()
			.required("Address line is required")
			.test("length", "Enter a shorter address", (val) =>
				val
					? val.toString().length <=
					  constants.ADDRESS_LINE_1_MAX_LENGTH
					: false
			),
		pincode: yup
			.number()
			.required("Pincode is required")
			.test("length", "Enter a valid pincode", (val) =>
				val
					? val.toString().length === constants.PINCODE_MAX_LENGTH
					: false
			),
		city: yup
			.string()
			.required("City is required")
			.test("length", "Enter a valid city", (val) =>
				val
					? val.toString().length <= constants.CITY_NAME_MAX_LENGTH
					: false
			),
		state: yup
			.string()
			.required("State is required")
			.test("length", "Enter a valid state ", (val) =>
				val
					? val.toString().length <= constants.STATE_NAME_MAX_LENGTH
					: false
			),
	});

	const addressMutationFormik = useFormik({
		initialValues: addressMutationFormikInitialValues,
		validationSchema: addressMutationValidationSchema,
		onSubmit: (values) => {
			updateBuyerAddress({
				variables: {
					buyerAddressInput: {
						...values,
						pincode: values.pincode.toString(),
					},
				},
			});
		},
		enableReinitialize: true,
	});

	const addressModalBody = (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFFFFF",
				width: 1000,
				padding: 20,
			}}
		>
			<form onSubmit={addressMutationFormik.handleSubmit}>
				<TextField
					fullWidth
					id="line1"
					name="line1"
					label="Address line"
					value={addressMutationFormik.values.line1}
					onChange={addressMutationFormik.handleChange}
					error={
						addressMutationFormik.touched.line1 &&
						Boolean(addressMutationFormik.errors.line1)
					}
					helperText={
						addressMutationFormik.touched.line1 &&
						addressMutationFormik.errors.line1
					}
				/>
				<TextField
					fullWidth
					id="pincode"
					name="pincode"
					label="Pincode"
					value={addressMutationFormik.values.pincode}
					onChange={addressMutationFormik.handleChange}
					error={
						addressMutationFormik.touched.pincode &&
						Boolean(addressMutationFormik.errors.pincode)
					}
					helperText={
						addressMutationFormik.touched.pincode &&
						addressMutationFormik.errors.pincode
					}
				/>
				<TextField
					fullWidth
					id="city"
					name="city"
					label="City"
					value={addressMutationFormik.values.city}
					onChange={addressMutationFormik.handleChange}
					error={
						addressMutationFormik.touched.city &&
						Boolean(addressMutationFormik.errors.city)
					}
					helperText={
						addressMutationFormik.touched.city &&
						addressMutationFormik.errors.city
					}
				/>
				<TextField
					fullWidth
					id="state"
					name="state"
					label="State"
					value={addressMutationFormik.values.state}
					onChange={addressMutationFormik.handleChange}
					error={
						addressMutationFormik.touched.state &&
						Boolean(addressMutationFormik.errors.state)
					}
					helperText={
						addressMutationFormik.touched.state &&
						addressMutationFormik.errors.state
					}
				/>
				<div>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
						}}
					>
						Change Address
					</Button>
					<Button
						color="secondary"
						variant="contained"
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
							marginLeft: 10,
						}}
						onClick={() => {
							setAddressModalVisible(false);
						}}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);

	// STUFF RELATED TO ADDRESS MODAL END

	const temp: GetBuyerOrderCartItems_getBuyerOrderCartItems = {
		id: "d911075d-4775-4a90-a9b4-a50f49ec7cc2",
		orderQuantitySize: 11212,
		orderTotalPrice: 150689.28,
		buyerId: "821b3d27-dc45-4941-808f-e262b8cb36ea",
		productVariationPrice: 12.22,
		productVariationFinalPrice: 13.44,
		productVariationInStock: true,
		productVariationColourId: 3,
		productVariationColourHex: "#FF0000",
		productVariationColourName: "red",
		productVariationId: "376b4fa4-90fa-4b2e-800b-8a501c740659",
		productName: "product name",
		productDescription: "product description",
		productClothComposition: "cotton-80 polyester-20",
		productWidth: 2,
		productGsm: 2,
		productPattern: "straight",
		productReferenceImageURL: "dwdaw",
		productMaxOrderSize: 22222,
		productMinOrderSize: 2,
		productReferenceId: "dwadawoid",
		productId: "878e73ea-2c8d-4417-a8d7-b836e3bf84c7",
		manufacturerId: "ae2ed1dc-5e85-4604-b1f7-b4c0bf94a761",
		timestamp: "03:24:04.149624",
	};
	const d = [temp, temp, temp, temp, temp, temp];

	return (
		<div style={{ width: 1300, display: "flex", flexDirection: "row" }}>
			<div style={{ width: 800 }}>
				{d.map((item) => {
					return (
						<Paper
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								margin: 20,
							}}
							elevation={3}
						>
							<div
								style={{
									width: "95%",
									display: "flex",
									flexDirection: "row",
								}}
							>
								<div>
									<Image
										width="150"
										height="200"
										cloudName={"jayeet"}
										publicId={
											"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
										}
									/>
								</div>
								<div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Product Name"}
											detail={item.productName}
										/>
										<TopicDetailDiv
											title={"Quantity"}
											detail={`${formatNumberWithCommas(
												item.orderQuantitySize
											)} meters`}
										/>
										<TopicDetailDiv
											title={"Color"}
											color={true}
											colorValue={{
												hexValue:
													item.productVariationColourHex,
												id:
													item.productVariationColourId,
											}}
										/>
									</div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Cloth composition"}
											detail={
												item.productClothComposition
											}
										/>
										<TopicDetailDiv
											title={"GSM"}
											detail={`${item.productGsm} g/m^2`}
										/>
										<TopicDetailDiv
											title={"Width"}
											detail={`${item.productWidth} inch`}
										/>
										<TopicDetailDiv
											title={"Pattern"}
											detail={item.productPattern}
										/>
									</div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Price per unit"}
											detail={`${
												formatPriceValue(
													item.productVariationFinalPrice
												).formattedPriceCurrency
											} /m`}
										/>
										<TopicDetailDiv
											title={"Total Price"}
											detail={`${
												formatPriceValue(
													item.orderTotalPrice
												).formattedPriceCurrency
											}`}
										/>
									</div>
								</div>
							</div>
							<div
								style={{ width: "5%" }}
								onClick={() => {
									removeItemFromOrderCartLocal(item.id);
								}}
							>
								Remove
							</div>
						</Paper>
					);
				})}
			</div>
			<div style={{ width: 400, marginLeft: 50 }}>
				<Paper
					style={{
						width: "100%",
						margin: 20,
						display: "flex",
						flexDirection: "column",
						padding: 20,
					}}
					elevation={3}
				>
					<Typography variant="h6" style={{ marginBottom: 10 }}>
						Order Summary
					</Typography>
					<TopicDetailsDivRow
						title={"dwadawdadadaw"}
						detail={"dwadawda"}
					/>
					<TopicDetailsDivRow
						title={"dwadawdadadaw"}
						detail={"dwadawda"}
					/>
				</Paper>
				<Paper
					elevation={3}
					style={{
						width: "100%",
						margin: 20,
						padding: 20,
						display: "flex",
						flexDirection: "column",
					}}
				>
					{getBuyerAddressesData &&
					getBuyerAddressesData.getBuyerAddresses[0] ? (
						<React.Fragment>
							<Typography
								variant="h6"
								style={{ marginBottom: 10 }}
							>
								Your shipping address
							</Typography>
							<Typography variant="body1">
								{
									getBuyerAddressesData.getBuyerAddresses[0]
										.line1
								}
							</Typography>
							<TopicDetailsDivRow
								title={"City"}
								detail={
									getBuyerAddressesData.getBuyerAddresses[0]
										.city
								}
							/>
							<TopicDetailsDivRow
								title={"Pincode"}
								detail={
									getBuyerAddressesData.getBuyerAddresses[0]
										.pincode
								}
							/>
							<TopicDetailsDivRow
								title={"State"}
								detail={
									addressMutationFormikInitialValues.state
								}
							/>
						</React.Fragment>
					) : (
						<div>No address</div>
					)}

					<div>
						<Button
							onClick={() => {
								// open address change modal
								setAddressModalVisible(true);
							}}
							variant="contained"
							color="primary"
						>
							{getBuyerAddressesData &&
							getBuyerAddressesData.getBuyerAddresses[0]
								? "Edit Address"
								: "Add Address"}
						</Button>
					</div>
				</Paper>
			</div>
			<div>
				{addressMutationFormikInitialValues ? <div /> : undefined}
			</div>
			<Modal
				open={addressModalVisible}
				onClose={() => {
					setAddressModalVisible(false);
				}}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
				}}
			>
				{addressModalBody}
			</Modal>
		</div>
	);
};

export default Page;
