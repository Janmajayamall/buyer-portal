import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GetBuyerProfile } from "../src/graphql/generated/GetBuyerProfile";
import { GET_BUYER_PROFILE } from "../src/graphql/queries/buyer.graphql";
import {
	UpdateBuyerProfile,
	UpdateBuyerProfileVariables,
} from "../src/graphql/generated/UpdateBuyerProfile";
import { UPDATE_BUYER_PROFILE } from "../src/graphql/mutations/buyer.graphql";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { FormatQuote } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		productDetailField: {
			marginTop: 10,
			marginBottom: 10,
			marginRight: 5,
		},
	})
);

const defaultBuyerProfile = {
	firstNamePOC: "",
	lastNamePOC: "",
	address: "",
	city: "",
	state: "",
	pincode: "",
	gstin: "",
};

const validationSchema = yup.object({
	firstNamePOC: yup.string().required("Your first name is required"),
	lastNamePOC: yup.string().required("Your last name is required"),
	address: yup.string().required("Your address line is required"),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	pincode: yup
		.string()
		.required("Pincode is required")
		.length(7, "Invalid Pincode"),
	gstin: yup.string().required("GSTIN is required"),
});

const Page: React.FC = (props) => {
	const classes = useStyles();
	const router = useRouter();

	// DECLARING LOCAL STATES

	const [formikInitialValues, setFormikInitialValues] = useState<any>({
		...defaultBuyerProfile,
	});

	const [
		readonlyProductDetails,
		setReadonlyProductDetails,
	] = useState<boolean>(true);

	// DECLARING LOCAL STATE END

	// DECLARING FORMIK HOOKS

	const formik = useFormik({
		initialValues: formikInitialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			updateBuyerProfileLocal(values);
			setReadonlyProductDetails(true);
		},
		enableReinitialize: true,
	});

	// DECLARING FORMIK HOOKS END

	// DECLARING APOLLO HOOKS

	const {} = useQuery<GetBuyerProfile>(GET_BUYER_PROFILE, {
		onCompleted({ getBuyerProfile }) {
			if (getBuyerProfile) {
				setFormikInitialValues(getBuyerProfile);
			}
		},
		onError(error) {
			console.log(error);
		},
	});

	const [updateBuyerProfile] = useMutation<
		UpdateBuyerProfile,
		UpdateBuyerProfileVariables
	>(UPDATE_BUYER_PROFILE, {
		onCompleted({ updateBuyerProfile }) {
			setFormikInitialValues(updateBuyerProfile);
		},
		onError(error) {
			console.log(JSON.stringify(error));
		},
	});

	// DECLARING APOLLO HOOKS ENDS

	// DECLARING FUNCTIONS

	function updateBuyerProfileLocal(values) {
		updateBuyerProfile({
			variables: {
				buyerProfileInput: {
					firstNamePOC: values.firstNamePOC,
					lastNamePOC: values.lastNamePOC,
					address: values.address,
					city: values.city,
					state: values.state,
					pincode: values.pincode,
					gstin: values.gstin,
				},
			},
		});
	}

	// DECLARING FUNCTIONS END

	return (
		<div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 30 }}>
			<Paper variant="outlined" style={{ padding: 20 }}>
				<Typography variant="h4" component="h2">
					Profile
				</Typography>
				<form onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id="firstNamePOC"
						name="firstNamePOC"
						label="First Name"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.firstNamePOC}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.firstNamePOC &&
							Boolean(formik.errors.firstNamePOC)
						}
						helperText={
							formik.touched.firstNamePOC &&
							formik.errors.firstNamePOC
						}
					/>
					<TextField
						fullWidth
						id="lastNamePOC"
						name="lastNamePOC"
						label="Last Name"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.lastNamePOC}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.lastNamePOC &&
							Boolean(formik.errors.lastNamePOC)
						}
						helperText={
							formik.touched.lastNamePOC &&
							formik.errors.lastNamePOC
						}
					/>
					<TextField
						fullWidth
						id="address"
						name="address"
						label="Address"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.address}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.address &&
							Boolean(formik.errors.address)
						}
						helperText={
							formik.touched.address && formik.errors.address
						}
					/>
					<TextField
						fullWidth
						id="city"
						name="city"
						label="City"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.city}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.city && Boolean(formik.errors.city)
						}
						helperText={formik.touched.city && formik.errors.city}
					/>
					<TextField
						fullWidth
						id="state"
						name="state"
						label="State"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.state}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.state && Boolean(formik.errors.state)
						}
						helperText={formik.touched.state && formik.errors.state}
					/>
					<TextField
						fullWidth
						id="pincode"
						name="pincode"
						label="Pincode"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.pincode}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.pincode &&
							Boolean(formik.errors.pincode)
						}
						helperText={
							formik.touched.pincode && formik.errors.pincode
						}
					/>
					<TextField
						fullWidth
						id="gstin"
						name="gstin"
						label="GSTIN"
						InputProps={{ readOnly: readonlyProductDetails }}
						value={formik.values.gstin}
						onChange={formik.handleChange}
						className={classes.productDetailField}
						error={
							formik.touched.gstin && Boolean(formik.errors.gstin)
						}
						helperText={formik.touched.gstin && formik.errors.gstin}
					/>
					{readonlyProductDetails === true ? (
						<Button
							color="secondary"
							variant="contained"
							type="button"
							style={{ marginTop: 2 }}
							onClick={() => {
								setReadonlyProductDetails(false);
							}}
						>
							Edit Profile
						</Button>
					) : undefined}
					{readonlyProductDetails === false ? (
						<Button
							color="secondary"
							variant="contained"
							type="submit"
						>
							Save Profile
						</Button>
					) : undefined}
				</form>
			</Paper>
		</div>
	);
};

export default Page;
