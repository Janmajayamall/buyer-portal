import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
});
