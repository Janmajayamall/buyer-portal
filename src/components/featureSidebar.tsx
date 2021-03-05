import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { GetProductCategories_getProductCategories } from "../graphql/generated/GetProductCategories";
import { useRouter } from "next/router";

type FeatureSideBarProps = {
	windowSize: number;
	categories: Array<GetProductCategories_getProductCategories> | null;
	chosenCategoryId: number;
};

export const FeatureSideBar: FunctionComponent<FeatureSideBarProps> = (
	props
) => {
	const router = useRouter();
	return (
		<div
			style={{
				width: props.windowSize * 0.25,
				maxWidth: props.windowSize * 0.25,
				flexGrow: 1,
				borderRightWidth: 1,
				borderRightColor: "#DCDCDC",
				borderRightStyle: "solid",
				padding: 5,
			}}
		>
			<Typography variant="h6">Other categories</Typography>
			<div style={{ display: "inline-block" }}>
				{props.categories.map((val) => {
					if (
						props.chosenCategoryId &&
						val.id === props.chosenCategoryId
					) {
						return undefined;
					}

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
								onClick={() => router.push(`/${val.id}`)}
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
									{val.name}
								</Typography>
							</Paper>
						</div>
					);
				})}
			</div>
			<Divider />
			<Typography variant="h6">Filters</Typography>
			{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((val) => {
				return (
					<div style={{ padding: 10, display: "inline-block" }}>
						<Image
							width="10"
							height="10"
							cloudName={"jayeet"}
							publicId={
								"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
							}
						/>
					</div>
				);
			})}
		</div>
	);
};
