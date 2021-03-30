import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import NextImage from "next/image";

const CategoryRep = ({ categoryName }) => {
	const router = useRouter();
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
				router.push(`/${categoryName.toLowerCase()}`);
			}}
		>
			<NextImage
				className="categoryImage"
				src={`/categories/${categoryName}.jpeg`}
				alt="me"
				layout="intrinsic"
				width={50}
				height={50}
			/>
			<style jsx global>{`
				.categoryImage {
					border-radius: 50px;
				}
			`}</style>

			<Typography variant="subtitle2" style={{ marginTop: 5 }}>
				{categoryName}
			</Typography>
		</div>
	);
};

export const FeatureSideBar: FunctionComponent = () => {
	const router = useRouter();
	return (
		<div
			style={{
				width: 600,
				flexGrow: 1,
				borderRightWidth: 1,
				borderRightColor: "#DCDCDC",
				borderRightStyle: "solid",
				margin: 10,
			}}
		>
			<Typography style={{ margin: 10 }} variant="h6">
				More categories
			</Typography>
			<div style={{ display: "inline-block" }}>
				{["cotton", "cotton", "cotton"].map((val) => {
					return (
						<div style={{ display: "inline-block", margin: 10 }}>
							{/* <Paper
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
							</Paper> */}
							<CategoryRep categoryName={val} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
