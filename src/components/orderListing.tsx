import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { GetOrderListForBuyer_getOrderListForBuyer } from "../graphql/generated/GetOrderListForBuyer";
import { formatNumberWithCommas, formatPriceValue } from "../utils";
import Button from "@material-ui/core/Button";

interface OrderListingProps {
	orderDetails: any;
}

const TopicDetailDiv = ({ title, detail }) => (
	<div
		style={{
			display: "flex",
			flexDirection: "column",
			padding: 10,
			maxWidth: 175,
		}}
	>
		<Typography style={{ fontWeight: "bolder", fontSize: 12 }}>
			{`${title} `}
		</Typography>
		<Typography
			style={{
				fontWeight: "normal",
				fontSize: 12,
				wordWrap: "break-word",
			}}
			variant="body2"
			display="block"
		>
			{` ${detail}`}
		</Typography>
	</div>
);

export const OrderListing: FunctionComponent<OrderListingProps> = (props) => (
	<Paper
		variant="elevation"
		elevation={0}
		style={{
			display: "flex",
			flexDirection: "row",
			padding: 10,
			marginTop: 20,
			justifyContent: "space-between",
			backgroundColor: "#ededed",
		}}
	>
		<div style={{ display: "flex", flexDirection: "row" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					padding: 10,
				}}
			>
				<Image
					width="100"
					height="100"
					cloudName={"jayeet"}
					publicId={
						"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
					}
				/>
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<TopicDetailDiv
						title={"Name"}
						detail={props.orderDetails.productName}
					/>
					<TopicDetailDiv title={"Color"} detail={"% diawda"} />
					<TopicDetailDiv
						title={"Cloth Composition"}
						detail={props.orderDetails.productClothComposition}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<TopicDetailDiv
						title={"Width"}
						detail={`${formatNumberWithCommas(
							props.orderDetails.productWidth
						)} inches`}
					/>
					<TopicDetailDiv
						title={"GSM"}
						detail={formatNumberWithCommas(
							props.orderDetails.productGsm
						)}
					/>
					<TopicDetailDiv
						title={"Pattern"}
						detail={props.orderDetails.productPattern}
					/>
				</div>
				{/* <Divider orientation="vertical" flexItem /> */}
			</div>
		</div>
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<TopicDetailDiv
					title={"Order Number"}
					detail={props.orderDetails.id}
				/>
				<TopicDetailDiv
					title={"Order Quantity"}
					detail={`${formatNumberWithCommas(
						props.orderDetails.orderQuantity
					)} meters`}
				/>
				<TopicDetailDiv
					title={"Price per meter"}
					detail={`${
						formatPriceValue(
							props.orderDetails.productVariationPrice
						).formattedPriceCurrency
					} / meter`}
				/>
			</div>
			{/* <Divider /> */}
			<div style={{ display: "flex", flexDirection: "row" }}>
				<TopicDetailDiv
					title={"Order Total"}
					detail={`${
						formatPriceValue(props.orderDetails.orderTotalPrice)
							.formattedPriceCurrency
					}`}
				/>
				<TopicDetailDiv
					title={"GST (8%)"}
					detail={`${
						formatPriceValue(props.orderDetails.totalTax)
							.formattedPriceCurrency
					}`}
				/>
				<TopicDetailDiv
					title={"Grand Total"}
					detail={`${
						formatPriceValue(props.orderDetails.grandTotalPrice)
							.formattedPriceCurrency
					}`}
				/>
				<TopicDetailDiv title={"Delivery Charges"} detail={"100"} />
			</div>
		</div>
		{/* <Divider orientation="vertical" flexItem /> */}
		<div
			style={{
				justifyContent: "center",
				display: "flex",
				flexDirection: "column",
				width: 150,
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<TopicDetailDiv
					title={"Order Status"}
					detail={String(
						props.orderDetails.filterStatus
					).toUpperCase()}
				/>
				<Button
					onClick={() => {
						window.open(
							`http://localhost:5000/productDetails/${props.orderDetails.productId}`
						);
					}}
					variant="outlined"
				>
					View Product
				</Button>
			</div>
		</div>
	</Paper>
);
