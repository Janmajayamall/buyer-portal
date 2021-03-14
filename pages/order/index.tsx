import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { IsBuyerAuthenticated } from "../../src/graphql/generated/IsBuyerAuthenticated";
import { IS_BUYER_AUTHENTICATED } from "../../src/graphql/queries/buyer.graphql";
import {
	GetOrderListForBuyer,
	GetOrderListForBuyer_getOrderListForBuyer,
} from "../../src/graphql/generated/GetOrderListForBuyer";
import { GET_ORDER_LIST_FOR_BUYER } from "../../src/graphql/queries/order.graphql";
import { formatNumberWithCommas, formatPriceValue } from "../../src/utils";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"& > * + *": {},
		},
		itemInfoRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
		},
	})
);

const Page: React.FC = (props) => {
	const classes = useStyles();
	const router = useRouter();

	// DECLARING LOCAL STATE

	// state for tracking auth state
	const [authState, setAuthState] = useState<boolean>(false);

	// state for buyer order list
	const [orderList, setOrderList] = useState<
		GetOrderListForBuyer_getOrderListForBuyer[]
	>([]);

	// DECLARING LOCAL STATE ENDS

	// DECLARING APOLLO HOOKS

	const {} = useQuery<IsBuyerAuthenticated>(IS_BUYER_AUTHENTICATED, {
		onCompleted() {
			setAuthState(true);
			// @ts-ignore
			props.onAuthStatusChange(true);
		},
		onError(error) {
			setAuthState(false);
			// @ts-ignore
			props.onAuthStatusChange(false);
		},
	});

	const {} = useQuery<GetOrderListForBuyer>(GET_ORDER_LIST_FOR_BUYER, {
		onCompleted({ getOrderListForBuyer }) {
			console.log(getOrderListForBuyer);
			setOrderList(getOrderListForBuyer);
		},
		onError(error) {
			console.log(error);
		},
	});

	// DECLARING APOLLO HOOKS ENDS

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

	if (authState === false) {
		return <div onClick={props.requestLogin}>Please login to continue</div>;
	}

	return (
		<div>
			<Typography variant="h4">Your Orders</Typography>
			{orderList.map((order) => (
				<Paper
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "row",
						margin: 20,
					}}
					elevation={3}
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
								title={"Order Id"}
								detail={String(order.id)}
							/>
							<TopicDetailDiv
								title={"Product Name"}
								detail={order.productName}
							/>

							<TopicDetailDiv
								title={"Cloth composition"}
								detail={order.productClothComposition}
							/>
							{/* <TopicDetailDiv
								title={"Color"}
								color={true}
								colorValue={{
									hexValue: item.productVariationColourHex,
									id: item.productVariationColourId,
								}}
							/> */}
						</div>
						<div className={classes.itemInfoRow}>
							<TopicDetailDiv
								title={"GSM"}
								detail={formatNumberWithCommas(
									order.productGsm
								)}
							/>
							<TopicDetailDiv
								title={"Width"}
								detail={formatNumberWithCommas(
									order.productWidth
								)}
							/>
							<TopicDetailDiv
								title={"Pattern"}
								detail={order.productPattern}
							/>
						</div>
						<div className={classes.itemInfoRow}>
							<TopicDetailDiv
								title={"Quantity"}
								detail={formatNumberWithCommas(
									order.orderQuantity
								)}
							/>
							<TopicDetailDiv
								title={"Price per unit"}
								detail={
									formatPriceValue(
										order.productVariationPrice
									).formattedPriceCurrency
								}
							/>
							<TopicDetailDiv
								title={"Total Price"}
								detail={
									formatPriceValue(order.totalPrice)
										.formattedPriceCurrency
								}
							/>
						</div>
					</div>
				</Paper>
			))}
		</div>
	);
};

export default Page;
