import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { GetOrderListForBuyer_getOrderListForBuyer } from "../graphql/generated/GetOrderListForBuyer";
import { formatNumberWithCommas, formatPriceValue } from "../utils";

interface OrderListingProps {
	orderDetails: GetOrderListForBuyer_getOrderListForBuyer;
}

const TopicDetailDiv = ({ title, detail }) => (
	<div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
		<Typography
			variant="subtitle2"
			style={{ fontWeight: "bold", maxWidth: 150 }}
		>
			{`${title} `}
		</Typography>
		<Typography
			style={{ wordWrap: "break-word", maxWidth: 150 }}
			variant="body2"
			display="block"
		>
			{` ${detail}`}
		</Typography>
	</div>
);

export const OrderListing: FunctionComponent<OrderListingProps> = (props) => (
	<Paper
		variant="outlined"
		style={{
			display: "flex",
			flexDirection: "row",
			padding: 10,
			margin: 20,
		}}
	>
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
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
		</div>
		<Divider orientation="vertical" flexItem />
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
			<Divider />
			<div style={{ display: "flex", flexDirection: "row" }}>
				<TopicDetailDiv
					title={"Order Total"}
					detail={`${
						formatPriceValue(props.orderDetails.totalPrice)
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
				<TopicDetailDiv title={"Delivery Charge"} detail={"100"} />
				<TopicDetailDiv
					title={"Grand Total"}
					detail={`${
						formatPriceValue(
							props.orderDetails.totalPrice +
								props.orderDetails.totalTax
						).formattedPriceCurrency
					}`}
				/>
			</div>
		</div>
		<Divider orientation="vertical" flexItem />
		<div
			style={{
				justifyContent: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Typography>Order status</Typography>
			<Typography>Under Processing</Typography>
		</div>
	</Paper>
);
