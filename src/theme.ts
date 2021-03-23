import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export default createMuiTheme({
	palette: {
		primary: {
			main: "#000000",
		},
		secondary: {
			main: "#FF976B",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#ffffff",
		},
	},
});
