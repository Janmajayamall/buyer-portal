import React, { useState, FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import { getLowestVariantCost } from "../utils";
import { GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers } from "../graphql/generated/GetProductsBySearchPhraseForBuyers";

interface ProductGridListingProps {
	productDetails: GetProductsBySearchPhraseForBuyers_getProductsBySearchPhraseForBuyers;
	onClick: () => void;
}

export const ProductGridListing: FunctionComponent<ProductGridListingProps> = (
	props
) => (
	<div
		style={{
			display: "inline-block",
			justifyContent: "center",
			alignItems: "center",
			textOverflow: "ellipsis",
			width: 200,
			margin: 20,
		}}
		onClick={props.onClick}
	>
		<Image
			width="200"
			height="200"
			cloudName={"jayeet"}
			publicId={
				props.productDetails.images.length !== 0
					? `https://res.cloudinary.com/jayeet/image/upload/v1614622206/${props.productDetails.images[0].publicId}.jpg`
					: "https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
			}
		/>
		<Typography
			noWrap
			variant="subtitle2"
			style={{
				textOverflow: "ellipsis",
				width: 200,
				fontWeight: "initial",
			}}
		>
			{props.productDetails.name}
		</Typography>
		<Typography
			variant="subtitle2"
			style={{
				textOverflow: "ellipsis",
				width: 200,
				fontWeight: "bold",
			}}
		>
			<span>&#x20B9;</span>
			{getLowestVariantCost(props.productDetails.variations)}
			<span>{" /metre"}</span>
		</Typography>
		<Typography variant="subtitle2" gutterBottom>
			{`Available in ${props.productDetails.variations.length} colours`}
		</Typography>
	</div>
);
