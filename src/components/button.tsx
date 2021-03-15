import React, { FunctionComponent } from "react";
import Typography from "@material-ui/core/Typography";
import { Image } from "cloudinary-react";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { GetProductCategories_getProductCategories } from "../graphql/generated/GetProductCategories";
import { useRouter } from "next/router";
import { Button } from "@material-ui/core";

interface CustomButtonProps {
	variant: "text" | "outlined" | "contained";
	title: string;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = (props) => {
	return <Button variant={props.variant}> {props.title} </Button>;
};
