import React from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			"& > * + *": {},
		},
	})
);

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default Page;

// <React.Fragment>
// 	<TableContainer component={Paper}>
// 		<Table className={classes.table} aria-label="simple table">
// 			<TableHead>
// 				<TableRow>
// 					<TableCell>Dessert (100g serving)</TableCell>
// 					<TableCell align="right">Calories</TableCell>
// 					<TableCell align="right">Fat&nbsp;(g)</TableCell>
// 					<TableCell align="right">Carbs&nbsp;(g)</TableCell>
// 					<TableCell align="right">Protein&nbsp;(g)</TableCell>
// 				</TableRow>
// 			</TableHead>
// 			<TableBody>
// 				{rows.map((row) => (
// 					<TableRow key={row.name}>
// 						<TableCell component="th" scope="row">
// 							{row.name}
// 						</TableCell>
// 						<TableCell align="right">{row.calories}</TableCell>
// 						<TableCell align="right">{row.fat}</TableCell>
// 						<TableCell align="right">{row.carbs}</TableCell>
// 						<TableCell align="right">{row.protein}</TableCell>
// 					</TableRow>
// 				))}
// 			</TableBody>
// 		</Table>
// 	</TableContainer>
// 	<Button
// 		style={{ marginTop: 10 }}
// 		variant="contained"
// 		color="primary"
// 		onClick={() => {
// 			router.push("/products/addNewProduct");
// 		}}
// 	>
// 		New Product
// 	</Button>
// </React.Fragment>;
