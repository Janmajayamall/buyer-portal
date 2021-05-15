import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import { getLowestVariantCost } from "../utils";
import { GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers } from "../graphql/generated/GetProductsBySearchPhraseForBuyers";
import TextField from "@material-ui/core/TextField";
import { Divider } from "@material-ui/core";
import {
	makeStyles,
	createStyles,
	useTheme,
	Theme,
} from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

interface CustomProductFormProps {
	title: string;
	subtitle: string;
	subtitle2: string;
	onSubmit: () => void;
	cloudinaryURL: string;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formInputField: {
			marginTop: 10,
			marginBottom: 10,
		},
	})
);
const validationSchema = yup.object({
	phoneNumber: yup
		.string()
		.required("Phone Number is required")
		.trim()
		.matches(/^[6-9]\d{9}$/, "Please enter a valid 10 digit phone number"),
});

export const CustomProductForm: FunctionComponent<CustomProductFormProps> = (
	props
) => {
	const classes = useStyles();

	// formik hooks
	const formik = useFormik({
		initialValues: {
			fabricType: "",
			construction: "",
			count: "",
			gsm: "",
			useCase: "",
			description: "",
			phoneNumber: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {},
	});

	return (
		<Grid
			container
			justify="center"
			style={{
				marginTop: 30,
				marginBottom: 30,
			}}
		>
			<Grid item xs={11}>
				<Typography
					variant="h5"
					style={{
						fontWeight: "bolder",
					}}
				>
					{props.title}
				</Typography>
			</Grid>
			<Grid item xs={11}>
				<Typography
					variant="subtitle1"
					// style={{
					// 	fontWeight: "bolder",
					// 	marginLeft: 20,
					// 	marginTop: 10,
					// }}
				>
					{props.subtitle}
				</Typography>
			</Grid>
			<Grid item xs={11}>
				<Typography variant="subtitle1">{props.subtitle2}</Typography>
			</Grid>
			<Grid
				container
				xs={11}
				// style={{
				// 	display: "flex",
				// 	flexDirection: "row",
				// 	justifyContent: "space-around",
				// 	alignItems: "center",
				// 	width: "100%",
				// }}
			>
				<Grid
					item
					xs={12}
					md={5}
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Image
						width={"50%"}
						cloudName={"jayeet"}
						publicId={props.cloudinaryURL}
						style={{
							borderRadius: 10,
							margin: 5,
						}}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={7}
					style={{
						justifyContent: "flex-start",
					}}
				>
					<form>
						<TextField
							fullWidth
							id="fabricType"
							label="Fabric Type"
							className={classes.formInputField}
							value={formik.values.fabricType}
							error={
								formik.touched.fabricType &&
								Boolean(formik.errors.fabricType)
							}
							helperText={
								formik.touched.fabricType &&
								formik.errors.fabricType
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="construction"
							label="Construction"
							className={classes.formInputField}
							value={formik.values.construction}
							error={
								formik.touched.construction &&
								Boolean(formik.errors.construction)
							}
							helperText={
								formik.touched.construction &&
								formik.errors.construction
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="count"
							label="Count"
							className={classes.formInputField}
							value={formik.values.count}
							error={
								formik.touched.count &&
								Boolean(formik.errors.count)
							}
							helperText={
								formik.touched.count && formik.errors.count
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="gsm"
							label="GSM"
							className={classes.formInputField}
							value={formik.values.gsm}
							error={
								formik.touched.gsm && Boolean(formik.errors.gsm)
							}
							helperText={formik.touched.gsm && formik.errors.gsm}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="useCase"
							label="Use Case"
							className={classes.formInputField}
							value={formik.values.useCase}
							error={
								formik.touched.useCase &&
								Boolean(formik.errors.useCase)
							}
							helperText={
								formik.touched.useCase && formik.errors.useCase
							}
							onChange={formik.handleChange}
						/>

						<TextField
							multiline
							rows={5}
							fullWidth
							id="description"
							label="More details"
							className={classes.formInputField}
							value={formik.values.description}
							error={
								formik.touched.description &&
								Boolean(formik.errors.description)
							}
							helperText={
								formik.touched.description &&
								formik.errors.description
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="phoneNumber"
							label="Phone Number"
							className={classes.formInputField}
							value={formik.values.phoneNumber}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										+91
									</InputAdornment>
								),
							}}
							error={
								formik.touched.phoneNumber &&
								Boolean(formik.errors.phoneNumber)
							}
							helperText={
								formik.touched.phoneNumber &&
								formik.errors.phoneNumber
							}
							onChange={formik.handleChange}
						/>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							type="submit"
						>
							Place Request
						</Button>
					</form>
				</Grid>
			</Grid>
		</Grid>
	);
};
