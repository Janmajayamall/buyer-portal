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

const Page: React.FC<CommonPageProps> = ({
	authState,
	windowDimensions,
	checkAuthState,
}) => {
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

	// DECLARING EFFECTS

	// on first render
	useEffect(() => {
		checkAuthState();
	}, []);

	// DECLARING EFFECTS END

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

	const CategoryRep = ({ categoryName }) => {
		// return (
		// 	<NextImage
		// 		src="/categories/Cotton.png"
		// 		alt="me"
		// 		width="100"
		// 		height="100"
		// 	/>
		// );

		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
				onClick={() => {
					window.open(
						`${process.env.DOMAIN}/${categoryName.toLowerCase()}`
					);
				}}
			>
				<NextImage
					className="categoryImage"
					src={`/categories/${categoryName}.jpeg`}
					alt="me"
					layout="intrinsic"
					width={100}
					height={100}
				/>
				<style jsx global>{`
					.categoryImage {
						border-radius: 50px;
					}
				`}</style>

				<Typography variant="subtitle1" style={{ marginTop: 5 }}>
					{categoryName}
				</Typography>
			</div>
		);
	};

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

			<div
				style={{
					display: "inline-block",
					paddingRight: 50,
					paddingLeft: 50,
				}}
			>
				<div
					ref={categoryDivRef}
					style={{
						alignSelf: "center",
						marginTop: 40,
						// padding: 20,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
						}}
					>
						<CategoryRep categoryName="Cotton" />
						<CategoryRep categoryName="Denim" />
						<CategoryRep categoryName="Poplin" />
						<CategoryRep categoryName="Silk" />
						<CategoryRep categoryName="Viscose" />
					</div>
				</div>
				<div
					style={{
						padding: 10,
						display: "flex",
						flexDirection: "row",
						justifyContent: "flex-start",
						marginLeft: 10,
						marginTop: 20,
						marginBottom: 20,
						marginRight: 10,
					}}
				>
					<TextField
						variant="standard"
						id="SearchPhrase"
						label="Search Fabric Product"
						value={searchPhrase}
						onChange={(e) => {
							setSearchPhrase(e.target.value);
						}}
						style={{ width: "90%", marginRight: 5 }}
					/>
					<Button
						style={{ justifySelf: "center" }}
						color="secondary"
						variant="contained"
						onClick={() => {
							if (searchPhrase.trim() === "") {
								router.push(`/any`);
							} else {
								router.push(`/${searchPhrase}`);
							}
						}}
					>
						<SearchIcon />
						{"Search"}
					</Button>
				</div>
				<Typography
					variant="h5"
					style={{
						fontWeight: "bolder",
						marginLeft: 20,
						marginTop: 10,
					}}
				>
					Trending Now
				</Typography>
				{/* <div
					style={{
						display: "flex",
					}}
				> */}
				{products.map((product) => {
					if (product.variations.length === 0) {
						return undefined;
					}

					return (
						<ProductGridListing
							productDetails={product}
							onClick={() => {
								window.open(
									`${process.env.DOMAIN}/productDetails/${product.id}`
								);
							}}
						/>
					);
				})}
				{/* </div> */}
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
