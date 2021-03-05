import React from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { LOGIN_MANUFACTURER } from "../../src/graphql/mutations/login.graphql";
import {
	LoginManufacturer,
	LoginManufacturerVariables,
} from "../../src/graphql/generated/loginManufacturer";

const useStyles = makeStyles({});

const validationSchema = yup.object({
	phoneNumber: yup
		.string()
		.length(10, "Enter a valid number")
		.required("Phone number is required"),
	password: yup.string().required("Password is required"),
});

const Page: React.FC = () => {
	const classes = useStyles();
	const router = useRouter();

	const [loginManufacturer] = useMutation<
		LoginManufacturer,
		LoginManufacturerVariables
	>(LOGIN_MANUFACTURER, {
		onCompleted({ loginManufacturer }) {
			router.push("/products");
		},
		onError(error) {
			console.log(error);
		},
	});

	const formik = useFormik({
		initialValues: {
			phoneNumber: "9669018868",
			password: "admin",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			loginManufacturer({
				variables: {
					password: values.password,
					phoneNumber: values.phoneNumber,
				},
			});
		},
	});

	return (
		<div>
			<Typography variant="h4" component="h2">
				Welcome
			</Typography>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					fullWidth
					id="phoneNumber"
					name="phoneNumber"
					label="Phone Number"
					value={formik.values.phoneNumber}
					onChange={formik.handleChange}
					error={
						formik.touched.phoneNumber &&
						Boolean(formik.errors.phoneNumber)
					}
					helperText={
						formik.touched.phoneNumber && formik.errors.phoneNumber
					}
				/>
				<TextField
					fullWidth
					id="password"
					name="password"
					label="Password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={
						formik.touched.password &&
						Boolean(formik.errors.password)
					}
					helperText={
						formik.touched.password && formik.errors.password
					}
				/>
				<div>
					<Button color="primary" variant="contained" type="submit">
						Login
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Page;
