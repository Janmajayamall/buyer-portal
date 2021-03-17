import React, { useEffect, useState } from "react";
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
import {
	formatNumberWithCommas,
	formatPriceValue,
	OrderStatusSelectFilter,
} from "../../src/utils";
import { OrderListing } from "../../src/components/orderListing";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

	// DECLARING LOCAL STATES

	// state for tracking auth state
	const [authState, setAuthState] = useState<boolean>(false);

	// state for buyer order list
	const [orderList, setOrderList] = useState<
		GetOrderListForBuyer_getOrderListForBuyer[]
	>([]);

	// state for tracking filter of order status
	const [
		orderStatusFilter,
		setOrderStatusFilter,
	] = useState<OrderStatusSelectFilter>(OrderStatusSelectFilter.processing);

	// state for filtered order list
	const [filteredOrderList, setFilteredOrderedList] = useState<
		GetOrderListForBuyer_getOrderListForBuyer[]
	>([]);

	// DECLARING LOCAL STATE END

	// DECLARING LOCAL EFFECTS
	useEffect(() => {
		const filteredOrders = orderList.filter(() => {
			return true;
		});
		setFilteredOrderedList(filteredOrders);
		return;
	}, [orderStatusFilter, orderList]);

	// DECLARING LOCAL EFFECTS END

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
			addOrderStatusToOrders(getOrderListForBuyer);
		},
		onError(error) {
			console.log(error);
		},
	});

	// DECLARING APOLLO HOOKS ENDS

	// DECLARING FUNCTIONS

	function addOrderStatusToOrders(
		orders: GetOrderListForBuyer_getOrderListForBuyer[]
	) {
		const modOrders: GetOrderListForBuyer_getOrderListForBuyer[] = orders.map(
			(order) => {
				return {
					...order,
					status: OrderStatusSelectFilter.processing,
				};
			}
		);
		setOrderList(modOrders);
		setOrderStatusFilter(OrderStatusSelectFilter.processing);
	}

	// DECLARING FUNCTIONS END

	if (authState === false) {
		return <div onClick={props.requestLogin}>Please login to continue</div>;
	}

	return (
		<div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 30 }}>
			<div>
				<Typography variant="h4" style={{ marginLeft: 10 }}>
					Your Orders
				</Typography>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={"age"}
					// onChange={() => {}}
				>
					<MenuItem value={10}>Processing</MenuItem>
					<MenuItem value={20}>All</MenuItem>
					<MenuItem value={30}>Delivered</MenuItem>
					<MenuItem value={30}>Cancelled</MenuItem>
				</Select>
			</div>
			{filteredOrderList.map((order) => (
				<OrderListing orderDetails={order} />
			))}
		</div>
	);
};

export default Page;
