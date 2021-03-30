import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";

export const LoadingComponent: FunctionComponent = () => {
	return (
		<div
			style={{
				width: "100%",
				marginTop: 200,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</div>
	);
};

export const ErrorComponent: FunctionComponent = () => {
	return (
		<div
			style={{
				width: "100%",
				marginTop: 200,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography variant="subtitle1">
				Sorry something went wrong! Please try again a bit later.
			</Typography>
		</div>
	);
};
