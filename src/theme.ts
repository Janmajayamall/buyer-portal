import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

function pxToRem(value) {
	return `${value / 16}rem`;
}

const breakpoints = createBreakpoints({});
export default createMuiTheme({
	typography: {
		fontFamily: ["Montserrat", "Roboto"].join(","),
	},
	palette: {
		primary: {
			main: "#000000",
		},
		secondary: {
			main: "#23106F",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#ffffff",
		},
	},

	// @ref for making typography responsive https://codesandbox.io/s/219o182lwj?file=/index.js:0-1555
	// @ref to default typography size https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createTypography.js
	overrides: {
		MuiTypography: {
			h5: {
				fontSize: pxToRem(24),
				[breakpoints.down("md")]: {
					fontSize: pxToRem(18),
				},
			},
			subtitle1: {
				fontSize: pxToRem(16),
				[breakpoints.down("md")]: {
					fontSize: pxToRem(12),
				},
			},
			button: {
				fontSize: pxToRem(14),
				[breakpoints.down("md")]: {
					fontSize: pxToRem(9),
				},
			},
			h6: {
				fontSize: pxToRem(20),
				[breakpoints.down("md")]: {
					fontSize: pxToRem(15),
				},
			},
		},

		MuiInputBase: {
			input: {
				fontSize: pxToRem(16),
				[breakpoints.down("md")]: {
					fontSize: pxToRem(12),
				},
			},
		},
	},
});
