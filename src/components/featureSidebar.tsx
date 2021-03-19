import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";

export const FeatureSideBar: FunctionComponent = () => {
	const router = useRouter();
	return (
		<div
			style={{
				width: 200,
				maxWidth: 200,
				flexGrow: 1,
				borderRightWidth: 1,
				borderRightColor: "#DCDCDC",
				borderRightStyle: "solid",
				padding: 5,
			}}
		>
			<Typography variant="h6">Other categories</Typography>
			<div style={{ display: "inline-block" }}>
				{["cotton", "silk", "polyester"].map((val) => {
					return (
						<div style={{ display: "inline-block" }}>
							<Paper
								style={{
									padding: 10,
									margin: 10,
									justifyContent: "center",
									alignItems: "center",
									display: "flex",
									flexDirection: "column",
									width: 60,
									height: 60,
									borderRadius: 30,
								}}
								elevation={3}
								onClick={() => router.push(`/${val}`)}
							>
								<Image
									width="20"
									height="20"
									cloudName={"jayeet"}
									publicId={
										"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
									}
								/>
								<Typography variant="caption" display="block">
									{val}
								</Typography>
							</Paper>
						</div>
					);
				})}
			</div>
			<Divider />
		</div>
	);
};
