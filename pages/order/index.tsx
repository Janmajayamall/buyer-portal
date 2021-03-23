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
	DatabaseOrderStage,
	formatNumberWithCommas,
	formatPriceValue,
	handleNumberInputOnKeyPress,
	OrderFilterTypes,
	OrderStatusSelectFilter,
} from "../../src/utils";
import { OrderListing } from "../../src/components/orderListing";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

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

	// state for buyer order list
	const [orderList, setOrderList] = useState<
		GetOrderListForBuyer_getOrderListForBuyer[]
	>([]);

	// state for filtered order list
	const [filteredOrderList, setFilteredOrderedList] = useState<
		GetOrderListForBuyer_getOrderListForBuyer[]
	>([]);

	// state for tracking active filter type
	const [activeFilterType, setActiveFilterType] = useState<OrderFilterTypes>(
		OrderFilterTypes.STATUS
	);

	// state for tracking filter of order status
	const [
		orderStatusFilter,
		setOrderStatusFilter,
	] = useState<OrderStatusSelectFilter>(OrderStatusSelectFilter.PROCESSING);

	// state for tracking search order by id
	const [orderIdSearchPhrase, setOrderIdSearchPhrase] = useState<string>("");

	// DECLARING LOCAL STATE END

	// DECLARING LOCAL EFFECTS

	// effect for filtering orders on the basis of filters
	useEffect(() => {
		const filteredOrders = orderList.filter((order) => {
			if (activeFilterType === OrderFilterTypes.STATUS) {
				return (
					orderStatusFilter === OrderStatusSelectFilter.ALL ||
					//@ts-ignore
					order.filterStatus === orderStatusFilter
				);
			} else if (activeFilterType === OrderFilterTypes.ID) {
				return orderIdSearchPhrase !== ""
					? order.id === Number(orderIdSearchPhrase)
					: true;
			}
			return false;
		});

		setFilteredOrderedList(filteredOrders);
		return;
	}, [orderStatusFilter, orderList, orderIdSearchPhrase]);

	// DECLARING LOCAL EFFECTS END

	// DECLARING APOLLO HOOKS

	const {} = useQuery<GetOrderListForBuyer>(GET_ORDER_LIST_FOR_BUYER, {
		onCompleted({ getOrderListForBuyer }) {
			const modOrders = addOrderStatusToOrders(getOrderListForBuyer);
			setOrderList(modOrders);
			setOrderStatusFilter(OrderStatusSelectFilter.PROCESSING);
		},
		onError(error) {
			console.log(error);
		},
	});

	// DECLARING APOLLO HOOKS ENDS

	// DECLARING FUNCTIONS

	function addOrderStatusToOrders(
		orders: GetOrderListForBuyer_getOrderListForBuyer[]
	): GetOrderListForBuyer_getOrderListForBuyer[] {
		const modOrders: GetOrderListForBuyer_getOrderListForBuyer[] = orders.map(
			(order) => {
				if (order.orderStage === DatabaseOrderStage.CANCELLED) {
					return {
						...order,
						filterStatus: OrderStatusSelectFilter.CANCELLED,
					};
				} else if (order.orderStage === DatabaseOrderStage.DELIVERED) {
					return {
						...order,
						filterStatus: OrderStatusSelectFilter.DELIVERED,
					};
				}
				return {
					...order,
					filterStatus: OrderStatusSelectFilter.PROCESSING,
				};
			}
		);
		return modOrders;
	}

	function resetFilterOfType(type: OrderFilterTypes) {
		if (type === OrderFilterTypes.ID) {
			setOrderIdSearchPhrase("");
			setActiveFilterType(OrderFilterTypes.STATUS);
		} else if (type === OrderFilterTypes.STATUS) {
			setOrderStatusFilter(OrderStatusSelectFilter.ALL);
			setActiveFilterType(OrderFilterTypes.ID);
		}
	}
	// DECLARING FUNCTIONS END
	// @ts-ignore
	if (props.authState === false) {
		// @ts-ignore
		return <div onClick={props.requestLogin}>Please login to continue</div>;
	}

	return (
		<div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 30 }}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "row",
				}}
			>
				<Typography variant="h4" style={{ marginLeft: 10 }}>
					Your Orders
				</Typography>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<div style={{ marginRight: 30 }}>
						<Typography
							variant="subtitle1"
							style={{ fontWeight: "bold" }}
						>
							Search by Order Number
						</Typography>
						<TextField
							value={orderIdSearchPhrase}
							onKeyDown={(e) => {
								e.preventDefault();
								handleNumberInputOnKeyPress(
									orderIdSearchPhrase,
									e.key,
									(value: string) => {
										resetFilterOfType(
											OrderFilterTypes.STATUS
										);
										setOrderIdSearchPhrase(value), false;
									}
								);
							}}
						/>
					</div>
					<div>
						<Typography
							variant="subtitle1"
							style={{ fontWeight: "bold" }}
						>
							Filter by Order status
						</Typography>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={orderStatusFilter}
							style={{ width: 200 }}
							onChange={(e) => {
								resetFilterOfType(OrderFilterTypes.ID);
								// @ts-ignore
								setOrderStatusFilter(String(e.target.value));
							}}
						>
							<MenuItem
								value={OrderStatusSelectFilter.PROCESSING}
							>
								Processing
							</MenuItem>
							<MenuItem value={OrderStatusSelectFilter.ALL}>
								All
							</MenuItem>
							<MenuItem value={OrderStatusSelectFilter.DELIVERED}>
								Delivered
							</MenuItem>
							<MenuItem value={OrderStatusSelectFilter.CANCELLED}>
								Cancelled
							</MenuItem>
						</Select>
					</div>
				</div>
			</div>
			<div style={{}}>
				{filteredOrderList.map((order) => (
					<OrderListing orderDetails={order} />
				))}
			</div>
		</div>
	);
};

export default Page;
