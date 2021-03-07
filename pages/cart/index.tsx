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
import { formatNumberWithCommas, formatPriceValue } from "../../src/utils";
import { constants } from "buffer";
import { GetBuyerAddresses } from "../../src/graphql/generated/GetBuyerAddresses";
import { GET_BUYER_ADDRESSES } from "../../src/graphql/queries/buyer.graphql";
import { UpdateBuyerAddress } from "../../src/graphql/generated/UpdateBuyerAddress";
import { UPDATE_BUYER_ADDRESS } from "../../src/graphql/mutations/buyer.graphql";
import Modal from "@material-ui/core/Modal";

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

const Page: React.FC = () => {
	const router = useRouter();
	const classes = useStyles();

	// DECLARING APOLLO HOOKS

	const {
		data: getBuyerOrderCartItemsData,
		loading: getBuyerOrderCartItemsLoading,
		error: getBuyerOrderCartItemsError,
	} = useQuery<GetBuyerOrderCartItems>(GET_BUYER_ORDER_CART_ITEMS, {
		onError(error) {
			console.log(error);
		},
	});

	const {
		data: getBuyerAddressesData,
		loading: getBuyerAddressesLoading,
		error: getBuyerAddressesError,
	} = useQuery<GetBuyerAddresses>(GET_BUYER_ADDRESSES, {
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

	// DECLARING APOLLO HOOKS END

	// DECLARING LOCAL STATES

	const [addressModalVisible, setAddressModalVisible] = useState<boolean>(
		false
	);

	// DECLARING LOCAL STATES END

	// if (getBuyerOrderCartItemsLoading) {
	// 	return <div>Loading!!!</div>;
	// }

	// if (getBuyerOrderCartItemsError) {
	// 	return <div>Error!!!</div>;
	// }

	// STUFF RELATED TO ADDRESS MODAL

	const addressMutationValidationSchema = yup.object({
		line1: yup.string().required("Address line is required"),
		pincode: yup
			.number()
			.required("Pincode is required")
			.test("length", "Should be valid pincode", (val) =>
				val ? val.toString().length === 6 : false
			),
		city: yup.string().required("City is required"),
		state: yup.string().required("State is required"),
	});

	const addressMutationFormik = useFormik({
		initialValues: {
			line1: "",
			pincode: "",
			city: "",
			state: "",
		},
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
	});

	const addressModalBody = (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFFFFF",
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
				<Button
					color="primary"
					variant="contained"
					fullWidth
					type="submit"
				>
					Change Address
				</Button>
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
							<div style={{ width: "5%" }}>Remove</div>
						</Paper>
					);
				})}
			</div>
			<div style={{ width: 400, marginLeft: 50 }}>
				<Paper
					style={{
						width: "100%",
						margin: 20,
						display: "inline-block",
						padding: 20,
					}}
					elevation={3}
				>
					<Typography variant="subtitle1">Order Summary</Typography>
					<TopicDetailsDivRow
						title={"dwadawdadadaw"}
						detail={"dwadawda"}
					/>
				</Paper>
				<Paper
					elevation={3}
					style={{ width: "100%", marginTop: 20, padding: 20 }}
				>
					{getBuyerAddressesData &&
					getBuyerAddressesData.getBuyerAddresses[0] ? (
						<div>
							<Typography
								variant="body1"
								style={{ fontWeight: "bold" }}
							>
								Your address
							</Typography>
							<Typography variant="body1">
								{
									getBuyerAddressesData.getBuyerAddresses[0]
										.line1
								}
							</Typography>
							<Typography variant="body1">
								{
									getBuyerAddressesData.getBuyerAddresses[0]
										.city
								}
							</Typography>
							<Typography variant="body1">
								{
									getBuyerAddressesData.getBuyerAddresses[0]
										.state
								}
							</Typography>
							<Typography variant="body1">
								{
									getBuyerAddressesData.getBuyerAddresses[0]
										.pincode
								}
							</Typography>
						</div>
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
								? "Change Address"
								: "Add Address"}
						</Button>
					</div>
				</Paper>
			</div>
			<Modal
				open={addressModalVisible}
				onClose={() => {
					setAddressModalVisible(false);
				}}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{addressModalBody}
			</Modal>
		</div>
	);
};

export default Page;
