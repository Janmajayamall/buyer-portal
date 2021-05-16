import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
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
	onSubmit: (requestDetails: string, phoneNumber: string) => void;
	cloudinaryURL: string;
	tag: string;
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
			fabricMaterial: "",
			pattern: "",
			yarnCount: "",
			gsm: "",
			width: "",
			use: "",
			description: "",
			phoneNumber: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			let finalString = "";
			Object.keys(values).forEach((key) => {
				const s = `${key}: ${values[key]}\n`;
				finalString += s;
			});

			// adding tag
			finalString = `tag: ${props.tag}\n`;

			// submit the request
			props.onSubmit(finalString, values.phoneNumber);

			// reset
			formik.resetForm();
		},
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
					variant="h6"
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
					<form onSubmit={formik.handleSubmit}>
						<TextField
							fullWidth
							id="fabricMaterial"
							label="Fabric Material"
							className={classes.formInputField}
							value={formik.values.fabricMaterial}
							error={
								formik.touched.fabricMaterial &&
								Boolean(formik.errors.fabricMaterial)
							}
							helperText={
								formik.touched.fabricMaterial &&
								formik.errors.fabricMaterial
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="pattern"
							label="Pattern"
							className={classes.formInputField}
							value={formik.values.pattern}
							error={
								formik.touched.pattern &&
								Boolean(formik.errors.pattern)
							}
							helperText={
								formik.touched.pattern && formik.errors.pattern
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="yarnCount"
							label="Yarn count"
							className={classes.formInputField}
							value={formik.values.yarnCount}
							error={
								formik.touched.yarnCount &&
								Boolean(formik.errors.yarnCount)
							}
							helperText={
								formik.touched.yarnCount &&
								formik.errors.yarnCount
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
							id="width"
							label="Width"
							className={classes.formInputField}
							value={formik.values.width}
							error={
								formik.touched.width &&
								Boolean(formik.errors.width)
							}
							helperText={
								formik.touched.width && formik.errors.width
							}
							onChange={formik.handleChange}
						/>

						<TextField
							fullWidth
							id="use"
							label="Use"
							className={classes.formInputField}
							value={formik.values.use}
							error={
								formik.touched.use && Boolean(formik.errors.use)
							}
							helperText={formik.touched.use && formik.errors.use}
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
