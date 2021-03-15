import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

interface OrderListingProps {
    orderDetails: any,
}

const TopicDetailDiv = ({ title, detail }) => (
	<div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
		<Typography variant="subtitle2" style={{ fontWeight: "bold" }}>
			{`${title} `}
		</Typography>
		<Typography variant="body2" display="block">
			{` ${detail}`}
		</Typography>
	</div>
);

export const OrderListing: FunctionComponent<OrderListingProps = (props) => (
	<Paper variant="outlined">
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				padding: 10,
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
						detail={"Produc name"}
					/>
					<TopicDetailDiv
						title={"Color"}
						detail={"% diawda"}
					/>
					<TopicDetailDiv
						title={"Cloth Composition"}
						detail={"cotton 80% diawda"}
					/>
				</div>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<TopicDetailDiv
						title={"Width"}
						detail={"Produc name"}
					/>
					<TopicDetailDiv
						title={"GSM"}
						detail={"Product name"}
					/>
					<TopicDetailDiv
						title={"Pattern"}
						detail={"Produc name"}
					/>
				</div>
			</div>
			<Divider orientation="vertical" flexItem />
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<TopicDetailDiv
						title={"Order Number"}
						detail={"2"}
					/>
					<TopicDetailDiv
						title={"Order Quantity"}
						detail={"10,000"}
					/>
					<TopicDetailDiv
						title={"Price per meter"}
						detail={"10"}
					/>
				</div>
				<Divider />
				<div style={{ display: "flex", flexDirection: "row" }}>
					<TopicDetailDiv
						title={"Order Price"}
						detail={"100,000"}
					/>
					<TopicDetailDiv
						title={"GST (8%)"}
						detail={"8,000"}
					/>
					<TopicDetailDiv
						title={"Delivery Charge"}
						detail={"100"}
					/>
					<TopicDetailDiv
						title={"Grand Total"}
						detail={"108,100"}
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
		</div>
	</Paper>
);