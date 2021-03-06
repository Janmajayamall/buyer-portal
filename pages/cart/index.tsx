import React from "react";
import { useRouter } from "next/router";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		itemInfoRow: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-around",
		},
	})
);

const TopicDetailDiv = ({
	title,
	detail = "",
	color = false,
	colorValue = null,
}) => (
	<div style={{ display: "flex", flexDirection: "column", margin: 8 }}>
		<Typography
			variant="body1"
			style={{ fontWeight: "bold" }}
			display="block"
		>
			{`${title}`}
		</Typography>

		{color === false ? (
			<Typography variant="body1" display="block">
				{` ${detail}`}
			</Typography>
		) : (
			<Paper
				elevation={2}
				style={{
					padding: 5,
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						backgroundColor: colorValue.hexValue,
						width: 10,
						height: 10,
						marginRight: 5,
					}}
				/>
				<div>
					<Typography variant="body1" display="block">
						{` #${colorValue.id}`}
					</Typography>
				</div>
			</Paper>
		)}
	</div>
);

const Page: React.FC = () => {
	const router = useRouter();
	const classes = useStyles();
	return (
		<div>
			<div style={{ width: 800, padding: 10 }}>
				{[1, 2, 3, 4, 5].map((val) => {
					return (
						<Paper
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "row",
								margin: 20,
							}}
							elevation={3}
						>
							<div
								style={{
									width: "95%",
									display: "flex",
									flexDirection: "row",
								}}
							>
								<div>
									<Image
										width="150"
										height="200"
										cloudName={"jayeet"}
										publicId={
											"https://res.cloudinary.com/jayeet/image/upload/v1614622206/PIM-1583496423927-afea11e0-1270-41e3-8f6b-389a83687b45_v1-small_rfx3ca.jpg"
										}
									/>
								</div>
								<div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Product Name"}
											detail={"THis namedaw "}
										/>
										<TopicDetailDiv
											title={"Quantity"}
											detail={"1,000 Meters"}
										/>
										<TopicDetailDiv
											title={"Color"}
											color={true}
											colorValue={{
												hexValue: "#000000",
												id: 1,
											}}
										/>
									</div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Cloth composition"}
											detail={"djiwoqaijaoidaoda"}
										/>
										<TopicDetailDiv
											title={"GSM"}
											detail={"1 g/m2"}
										/>
										<TopicDetailDiv
											title={"Width"}
											detail={"42 Inch"}
										/>
										<TopicDetailDiv
											title={"Pattern"}
											detail={"JDIOwjdoaij"}
										/>
									</div>
									<div className={classes.itemInfoRow}>
										<TopicDetailDiv
											title={"Price per unit"}
											detail={"129121.12"}
										/>
										<TopicDetailDiv
											title={"Total Price"}
											detail={"1291023131"}
										/>
									</div>
								</div>
							</div>
							<div style={{ width: "5%" }}>Remove</div>
						</Paper>
					);
				})}
			</div>
			<div></div>
		</div>
	);
};

export default Page;
