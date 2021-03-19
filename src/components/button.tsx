import React, { FunctionComponent } from "react";
import { Button } from "@material-ui/core";

interface CustomButtonProps {
	variant: "text" | "outlined" | "contained";
	title: string;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = (props) => {
	return <Button variant={props.variant}> {props.title} </Button>;
};
