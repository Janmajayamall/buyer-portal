import React, { useState } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/react-hooks";
import {
	GetBuyerPayments,
	GetBuyerPayments_getBuyerPayments,
} from "../../src/graphql/generated/GetBuyerPayments";
import { GET_BUYER_PAYMENTS } from "../../src/graphql/queries/buyer.graphql";
import { Divider, Typography } from "@material-ui/core";
import { formatPriceValue } from "../../src/utils";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

const PaymentsTable = ({ payments }) => {
	if (payments.length === 0) {
		return (
			<Paper
				style={{
					display: "flex",
					justifyContent: "center",
					alignContent: "center",
					backgroundColor: "#ededed",
					padding: 20,
				}}
			>
				<Typography variant="body1">No Record Available</Typography>
			</Paper>
		);
	}

	return (
		<TableContainer
			style={{ backgroundColor: "#ededed" }}
			component={Paper}
		>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center">Order ID</TableCell>
						<TableCell align="center">Order Total</TableCell>
						<TableCell align="center">GST</TableCell>
						<TableCell align="center">Grand Total</TableCell>
						<TableCell align="center">
							Due date (DD-MM-YYYY)
						</TableCell>
						<TableCell align="center">Status</TableCell>
						{/* <TableCell align="center"></TableCell> */}
					</TableRow>
				</TableHead>
				<TableBody>
					{payments.map((row) => (
						<TableRow key={row.name}>
							<TableCell align="center">{row.orderId}</TableCell>
							<TableCell align="center">
								{
									formatPriceValue(row.orderTotalPrice)
										.formattedPriceCurrency
								}
							</TableCell>
							<TableCell align="center">
								{
									formatPriceValue(row.totalTax)
										.formattedPriceCurrency
								}
							</TableCell>
							<TableCell align="center">
								{
									formatPriceValue(row.grandTotalPrice)
										.formattedPriceCurrency
								}
							</TableCell>
							<TableCell align="center">{row.dueDate}</TableCell>
							<TableCell align="center">
								{row.paidStatus ? "Paid" : "Not Paid"}
							</TableCell>
							{/* <TableCell>
							<Button
								color="primary"
								onClick={() => {
									router.push(`/products/${row.orderId}`);
								}}
							>
								View Order 
							</Button>
						</TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();

	// LOCAL HOOKS

	const [duePaymentsList, setDuePaymentsList] = useState<
		GetBuyerPayments_getBuyerPayments[]
	>([]);
	const [paidPaymentsList, setPaidPaymentsList] = useState<
		GetBuyerPayments_getBuyerPayments[]
	>([]);

	// LOCAL HOOKS END

	// APOLLO HOOKS

	const { loading, error, data } = useQuery<GetBuyerPayments>(
		GET_BUYER_PAYMENTS,
		{
			onCompleted({ getBuyerPayments }) {
				const dues = [];
				const paid = [];

				getBuyerPayments.forEach((payment) => {
					if (payment.paidStatus === true) {
						paid.push(payment);
					} else {
						dues.push(payment);
					}
				});

				setDuePaymentsList(dues);
				setPaidPaymentsList(paid);
			},
		}
	);

	// APOLLO HOOKS END

	if (loading && !data) {
		return <div></div>;
	}

	return (
		<div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 30 }}>
			<Typography variant="h4"> Invoices</Typography>
			<div style={{ marginTop: 30 }}>
				<Typography variant="h6" style={{ marginBottom: 10 }}>
					{" "}
					Invoices Due{" "}
				</Typography>
				<PaymentsTable payments={duePaymentsList} />
			</div>

			<div style={{ marginTop: 30 }}>
				<Typography variant="h6" style={{ marginBottom: 10 }}>
					{" "}
					Invoices Paid{" "}
				</Typography>
				<PaymentsTable payments={paidPaymentsList} />
			</div>
		</div>
	);
};

export default Page;
