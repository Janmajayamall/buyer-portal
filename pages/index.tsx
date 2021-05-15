import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
	CommonPageProps,
	getAdjustedImageDims,
	getLowestVariantCost,
} from "../src/utils";
import { GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS } from "../src/graphql/queries/products.graphql";
import { ProductGridListing } from "../src/components/productGridListing";
import {
	GetProductsBySearchPhraseForBuyers,
	GetProductsBySearchPhraseForBuyersVariables,
	GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers,
} from "../src/graphql/generated/GetProductsBySearchPhraseForBuyers";
import NextImage from "next/image";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import { CustomProductForm } from "../src/components/customProductForm";
import { Divider } from "@material-ui/core";

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

const Page: React.FC<CommonPageProps> = ({ windowDimensions }) => {
	const classes = useStyles();
	const router = useRouter();

	const categoryDivRef = useRef(null);

	// DECLARING LOCAL STATE

	const [products, setProducts] = useState<
		GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers[]
	>([]);

	// hook for tracking search phrase
	const [searchPhrase, setSearchPhrase] = useState<string>("");

	// DECLARING LOCAL STATE ENDS

	// DECLARING APOLLO HOOKS

	const {} = useQuery<
		GetProductsBySearchPhraseForBuyers,
		GetProductsBySearchPhraseForBuyersVariables
	>(GET_PRODUCTS_BY_SEARCH_PHRASE_FOR_BUYERS, {
		variables: {
			searchPhrase: "",
		},
		onCompleted({ getProductsBySearchPhraseForBuyers }) {
			setProducts(getProductsBySearchPhraseForBuyers);
		},
		onError(error) {
			console.log(error);
		},
	});

	// DECLARING APOLLO HOOKS END

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				// width: "100%",
				justifyContent: "center",
				// width: 1200,
				// padding: 50,
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
				<CustomProductForm
					title={"Cotton Fabrics"}
					subtitle={
						"We have enabled our clients to source Cotton Drill fabric, Cotton Poplin Fabric, Cotton Muslin Fabric, Cotton Satin Fabric, Cotton Oxford Fabric, Cotton Slub Fabric, Cotton Dobby Fabric, Cotton Terry Fabric, Cotton Velvet Fabric, Cotton Jerseys, Cotton Gingham fabric, Cotton Lawn Fabric, Cotton Swiss Fabric!"
					}
					subtitle2={
						"If you require cotton based fabric, gives us a try by filling up the request form."
					}
					onSubmit={() => {
						console.log("submitted");
					}}
					cloudinaryURL={
						"https://res.cloudinary.com/jayeet/image/upload/v1617396905/bkvhuc6r2c31kwrh0fzg.jpg"
					}
				/>
				<Divider
					style={{
						// marginTop: 30,
						// marginBottom: 30,
						marginRight: 20,
						marginLeft: 20,
						backgroundColor: "#000000",
					}}
				/>
				<CustomProductForm
					title={"Polyester Fabrics"}
					subtitle={
						"We have enabled our clients to source Polyester Chiffon Fabric, Polyester Satin Fabric, Polyester Organza Fabric, Polyester Charmeuse Fabric, Polyester Georgette Fabric, Polyester Oxford Fabric!"
					}
					subtitle2={
						"If you require polyester based fabric, gives us a try by filling up the request form."
					}
					onSubmit={() => {
						console.log("submitted");
					}}
					cloudinaryURL={
						"https://res.cloudinary.com/jayeet/image/upload/v1617396905/bkvhuc6r2c31kwrh0fzg.jpg"
					}
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
				<CustomProductForm
					title={"Rayon/Viscose Fabrics"}
					subtitle={
						"We have enabled our clients to source Plain Rayon Fabric, Rayon Modal Fabric, Rayon Tencell Fabric!"
					}
					subtitle2={
						"If you require rayon based fabric, gives us a try by filling up the request form."
					}
					onSubmit={() => {
						console.log("submitted");
					}}
					cloudinaryURL={
						"https://res.cloudinary.com/jayeet/image/upload/v1617396905/bkvhuc6r2c31kwrh0fzg.jpg"
					}
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
				<CustomProductForm
					title={"Any other fabric?"}
					subtitle={
						"Even if you require some other type of fabric, do let us know. Our team will definitely work search for your requirement among our trusted manufacturing partners"
					}
					subtitle2={"Please fill up the form!"}
					onSubmit={() => {
						console.log("submitted");
					}}
					cloudinaryURL={
						"https://res.cloudinary.com/jayeet/image/upload/v1617396905/bkvhuc6r2c31kwrh0fzg.jpg"
					}
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
