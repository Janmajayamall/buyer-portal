import React from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { Image } from "cloudinary-react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import { getLowestVariantCost } from "../src/utils";

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

	// DECLARING APOLLO HOOKS

	// const {} = useQuery

	// DECLARING APOLLO HOOKS END

	return (
		<div style={{ flexDirection: "row", display: "flex" }}>
			<div style={{ width: window.screen.availWidth * 0.7 }}>
				{[].map((val) => {
					if (val.variations.length === 0) {
						return undefined;
					}
					return (
						<Paper
							elevation={3}
							style={{
								padding: 10,
								display: "inline-block",
								maxWidth: 200,
								justifyContent: "center",
								alignItems: "center",
								margin: 10,
							}}
							onClick={() => {
								router.push(`/productDetails/${val.id}`);
							}}
						>
							<Image
								width="150"
								height="200"
								cloudName={"jayeet"}
								publicId={
									"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
								}
							/>
							<Typography variant="subtitle2" gutterBottom>
								{val.description}
							</Typography>
							<Typography variant="subtitle2" gutterBottom>
								{getLowestVariantCost(val.variations)}
								<span>&#x20B9;</span>
								<span>{" /M"}</span>
							</Typography>
							<Typography variant="subtitle2" gutterBottom>
								{val.clothComposition}
							</Typography>
							<Typography variant="subtitle2" gutterBottom>
								{`Available in ${val.variations.length} colours`}
							</Typography>
						</Paper>
					);
				})}
			</div>
		</div>
	);
};

export default Page;
