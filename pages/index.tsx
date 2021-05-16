import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
	CommonPageProps,
	getAdjustedImageDims,
	getLowestVariantCost,
} from "../src/utils";
import NextImage from "next/image";
import Button from "@material-ui/core/Button";
import { CustomProductForm } from "../src/components/customProductForm";
import { Divider, Typography } from "@material-ui/core";
import {
	AddRequest,
	AddRequestVariables,
} from "../src/graphql/generated/AddRequest";
import { ADD_REQUEST } from "../src/graphql/mutations/request.graphql";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";

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

// details for populating request form sections
const productFormInfoArr = [
	{
		title: "Cotton Fabrics",
		subtitle:
			"We have enabled our clients to source Cotton Drill fabric, Cotton Poplin Fabric, Cotton Muslin Fabric, Cotton Satin Fabric, Cotton Oxford Fabric, Cotton Slub Fabric, Cotton Dobby Fabric, Cotton Terry Fabric, Cotton Velvet Fabric, Cotton Jerseys, Cotton Gingham fabric, Cotton Lawn Fabric, Cotton Swiss Fabric!",
		subtitle2:
			"If you require cotton based fabric, gives us a try by filling up the request form.",
		cloudinaryURL:
			"https://res.cloudinary.com/jayeet/image/upload/v1621160194/cotton.jpg",
		tag: "cotton",
	},
	{
		title: "Polyester Fabrics",
		subtitle:
			"We have enabled our clients to source Polyester Chiffon Fabric, Polyester Satin Fabric, Polyester Organza Fabric, Polyester Charmeuse Fabric, Polyester Georgette Fabric, Polyester Oxford Fabric!",
		subtitle2:
			"If you require polyester based fabric, gives us a try by filling up the request form.",
		cloudinaryURL:
			"https://res.cloudinary.com/jayeet/image/upload/v1621160194/polyester_e0vluv",
		tag: "polyester",
	},
	{
		title: "Rayon/Viscose Fabrics",
		subtitle:
			"We have enabled our clients to source Plain Rayon Fabric, Rayon Modal Fabric, Rayon Tencell Fabric!",
		subtitle2:
			"If you require rayon based fabric, gives us a try by filling up the request form.",
		cloudinaryURL:
			"https://res.cloudinary.com/jayeet/image/upload/v1617396905/rayon_zgkpii.jpg",
		tag: "rayon",
	},
	{
		title: "Any other fabric?",
		subtitle:
			"Even if you require some other type of fabric, do let us know. Our team will definitely work search for your requirement among our trusted manufacturing partners",
		subtitle2: "Feel free to fill up the form!",
		cloudinaryURL:
			"https://res.cloudinary.com/jayeet/image/upload/v1617396905/any_fabric_ynxc5g.jpg",
		tag: "any",
	},
];

const Page: React.FC<CommonPageProps> = ({ windowDimensions }) => {
	const classes = useStyles();
	const router = useRouter();

	const categoryDivRef = useRef(null);

	// DECLARING LOCAL STATE
	const [modalVisible, setModalVisible] = useState(false);

	// DECLARING APOLLO HOOKS
	const [addRequest] =
		useMutation<AddRequest, AddRequestVariables>(ADD_REQUEST);

	// DECLARING APOLLO HOOKS END

	// functions
	function submitForm(requestDetails, phoneNumber) {
		addRequest({
			variables: {
				requestInput: {
					details: requestDetails,
					phoneNumber: phoneNumber,
				},
			},
		});

		setModalVisible(true);
	}

	// modals
	const confirmationModal = () => {
		return (
			<Modal
				// aria-labelledby="transition-modal-title"
				// aria-describedby="transition-modal-description"
				// className={classes.modal}
				open={modalVisible}
				onClose={() => {
					setModalVisible(false);
				}}
				// closeAfterTransition
				// BackdropComponent={Backdrop}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				// BackdropProps={{
				// 	timeout: 500,
				// }}
			>
				<Fade in={modalVisible}>
					<div style={{ backgroundColor: "#FFFFFF", padding: 20 }}>
						<Typography
							variant={"h6"}
							style={{ fontWeight: "bold", margin: 10 }}
						>
							Thank you!
						</Typography>
						<Typography
							variant={"subtitle1"}
							style={{ margin: 10 }}
						>
							Our team will contact you shortly!
						</Typography>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							onClick={() => {
								setModalVisible(false);
							}}
						>
							Ok
						</Button>
					</div>
					{/* <div className={classes.paper}>
					<h2 id="transition-modal-title">Transition modal</h2>
					<p id="transition-modal-description">
						react-transition-group animates me.
					</p>
				</div> */}
				</Fade>
			</Modal>
		);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
			}}
		>
			<NextImage
				src="/main_banner.png"
				alt="me"
				onClick={() => {
					categoryDivRef.current.scrollIntoView({
						behavior: "smooth",
					});
				}}
				width={(() => {
					const temp = getAdjustedImageDims(
						{ width: 1200, height: 497 },
						windowDimensions
					);
					return temp.width.toString();
				})()}
				height={(() => {
					const temp = getAdjustedImageDims(
						{ width: 1200, height: 497 },
						windowDimensions
					);
					return temp.height.toString();
				})()}
			/>
			<NextImage
				src="/features.png"
				alt="me"
				width={(() => {
					const temp = getAdjustedImageDims(
						{ width: 1200, height: 240 },
						windowDimensions
					);
					return temp.width.toString();
				})()}
				height={(() => {
					const temp = getAdjustedImageDims(
						{ width: 1200, height: 240 },
						windowDimensions
					);
					return temp.height.toString();
				})()}
			/>
			<div ref={categoryDivRef}>
				{productFormInfoArr.map((productFormInfo) => (
					<div>
						<CustomProductForm
							title={productFormInfo.title}
							subtitle={productFormInfo.subtitle}
							subtitle2={productFormInfo.subtitle2}
							onSubmit={submitForm}
							cloudinaryURL={productFormInfo.cloudinaryURL}
							tag={productFormInfo.tag}
						/>
						<Divider
							style={{
								marginTop: 30,
								marginBottom: 30,
								marginRight: 20,
								marginLeft: 20,
								backgroundColor: "#000000",
							}}
						/>
					</div>
				))}
			</div>

			{confirmationModal()}
		</div>
	);
};

export default Page;

// <Paper
// 	elevation={3}
// 	style={{
// 		backgroundColor: "#FFFFFF",
// 		marginTop: 20,
// 		// display: "inline-block",
// 		padding: 10,
// 	}}
// >
// 	<div
// 		style={{
// 			display: "flex",
// 			flexDirection: "row",
// 			justifyContent: "space-around",
// 		}}
// 	>
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 	</div>
// 	<div
// 		style={{
// 			display: "flex",
// 			flexDirection: "row",
// 			justifyContent: "space-around",
// 			marginTop: 10,
// 		}}
// 	>
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 		<CategoryRep />
// 	</div>
// </Paper>;
