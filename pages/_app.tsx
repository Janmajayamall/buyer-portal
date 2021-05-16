import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";

import "../styles/globals.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../src/graphql/apollo-client";
import Router, { useRouter } from "next/router";
import {
	createStyles,
	makeStyles,
	Theme,
	ThemeProvider,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import {
	Dimensions,
	handleNumberInputOnKeyPress,
	LoginProcessInterface,
	resetAuthToken,
	setAuthToken,
} from "../src/utils";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import CustomTheme from "./../src/theme";
import NextImage from "next/image";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			justifySelf: "flex-end",
		},
	})
);

const loginProcessDefaultState: LoginProcessInterface = {
	stage: 0,
	phoneNumber: "54906535",
	verificationCode: "123456",
	authenticationFailed: false,
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const classes = useStyles();

	// DECLARING LOCAL STATES

	// state for tracking whether in browser window or not
	const [isBrowser, setIsBrowser] = useState<boolean>(false);

	// state for tracking auth state
	const [authState, setAuthState] = useState<boolean>(false);

	// state for login modal
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);

	// state for login process
	const [loginProcessState, setLoginProcessState] =
		useState<LoginProcessInterface>(loginProcessDefaultState);

	// state for resend code time left
	const [resendCodeTimeLeft, setResendCodeTimeLeft] =
		React.useState<number>(0);

	// state for window dimensions
	const [windowDimensions, setWindowDimensions] = useState<Dimensions>(
		isBrowser === true
			? {
					width: window.innerWidth,
					height: window.innerHeight,
			  }
			: {
					width: 0,
					height: 0,
			  }
	);

	// DECLARING LOCAL STATES END

	// DECLARING FUNCTIONS

	function requestLogin() {
		if (authState === true) {
			return;
		}

		setLoginModalVisible(true);
	}

	// DECLARING FUNCTIONS END

	// DECLARING EFFECTS

	// to set state of isBrowser to true
	useEffect(() => {
		if (!isBrowser) {
			setIsBrowser(true);
			// checkAuthState();
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
	}, []);

	useEffect(() => {
		// if time reaches zero then return
		if (resendCodeTimeLeft <= 0) {
			return;
		}

		const setTimeoutId = setTimeout(() => {
			setResendCodeTimeLeft(resendCodeTimeLeft - 1);
		}, 1000);

		return () => clearTimeout(setTimeoutId);
	}, [resendCodeTimeLeft]);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	// DECLARING EFFECTS END

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={CustomTheme}>
				<AppBar
					style={{ backgroundColor: "#ffffff" }}
					position="static"
				>
					<Toolbar>
						<NextImage
							onClick={() => {
								router.push("/");
							}}
							src={`/logo.png`}
							alt="logo"
							width={110}
							height={24.2}
						/>
						<div
							style={{
								position: "absolute",
								right: 50,
								minWidth: 500,
								display: "flex",
								justifyContent: "flex-end",
							}}
						></div>
					</Toolbar>
				</AppBar>

				<Component {...pageProps} windowDimensions={windowDimensions} />

				<Grid
					container
					style={{
						// width: "100%",
						// display: "flex",
						// flexDirection: "row",
						// justifyContent: "space-around",
						marginTop: 50,
						backgroundColor: "#DBDEF7",
					}}
				>
					<Grid
						item
						md={5}
						xs={11}
						style={{
							display: "flex",
							flexDirection: "column",
							margin: 50,
						}}
					>
						<Typography variant="h5" style={{ color: "#23106F" }}>
							Contact Us
						</Typography>
						<Typography
							variant="subtitle1"
							style={{ color: "#23106F" }}
						>
							Email: theonestop.trade@gmail.com{" "}
						</Typography>
						<Typography
							variant="subtitle1"
							style={{ color: "#23106F" }}
						>
							WhatsApp: +917428039460
						</Typography>
					</Grid>

					<Grid
						item
						md={5}
						xs={11}
						style={{
							display: "flex",
							flexDirection: "column",
							margin: 50,
						}}
					>
						<Typography variant="h5" style={{ color: "#23106F" }}>
							Manufacturers
						</Typography>
						<Typography
							variant="subtitle1"
							style={{ color: "#23106F" }}
						>
							To become our manufacturing partner, contact us with
							your product catalogue and business details
						</Typography>
					</Grid>
				</Grid>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;

// <Modal
// 	onClose={() => {
// 		resetLoginProcessState();
// 		setLoginModalVisible(false);
// 	}}
// 	aria-labelledby="simple-modal-title"
// 	aria-describedby="simple-modal-description"
// 	style={{
// 		justifyContent: "center",
// 		alignItems: "center",
// 		display: "flex",
// 	}}
// >
// 	{loginModalBody}
// </Modal>;

// enum MenuNavOptions {
// 	myProfile,
// 	myOrders,
// 	myInvoices,
// 	home,
// 	logout,
// }

// // menu anchor ref
// const menuAnchorRef = React.useRef<HTMLButtonElement>(null);

// import MenuItem from "@material-ui/core/MenuItem";
// import MenuList from "@material-ui/core/MenuList";
// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Popper from "@material-ui/core/Popper";
// import Paper from "@material-ui/core/Paper";
// import { CustomButton } from "../src/components/button";

// 	const prevMenuOpen = React.useRef(isMenuOpen);
// 	useEffect(() => {
// 		if (prevMenuOpen.current === true && isMenuOpen === false) {
// 			menuAnchorRef.current!.focus();
// 		}

// 		prevMenuOpen.current = isMenuOpen;
// 	});

// // state for menu open
// const [isMenuOpen, setMenuOpen] = React.useState(false);

// 	function handleMenuClose(
// 		event: React.MouseEvent<EventTarget>,
// 		chosenOption: MenuNavOptions
// 	) {
// 		// navigate to the option
// 		switch (chosenOption) {
// 			case MenuNavOptions.home:
// 				router.push("/");
// 				break;
// 			case MenuNavOptions.profile:
// 				router.push("/profile");
// 				break;
// 			case MenuNavOptions.yourOrders:
// 				router.push("/order");
// 				break;
// 			case MenuNavOptions.payemnts:
// 				router.push("/payments");
// 				break;
// 			case MenuNavOptions.logout:
// 				// logout
// 				console.log("user requested to log out");
// 		}

// 		if (
// 			menuAnchorRef.current &&
// 			menuAnchorRef.current.contains(event.target as HTMLElement)
// 		) {
// 			return;
// 		}

// 		setMenuOpen(false);
// 	}

// 	function handleMenuToggle() {
// 		setMenuOpen((prevOpen) => !prevOpen);
// 	}

// 	function handleMenuListKeyDown(event: React.KeyboardEvent) {
// 		if (event.key === "Tab") {
// 			event.preventDefault();
// 			setMenuOpen(false);
// 		}
// 	}

// <Popper
// 	open={isMenuOpen}
// 	anchorEl={menuAnchorRef.current}
// 	role={undefined}
// 	transition
// 	disablePortal
// >
// 	{({ TransitionProps, placement }) => (
// 		<Grow
// 			{...TransitionProps}
// 			style={{
// 				transformOrigin:
// 					placement === "bottom"
// 						? "center top"
// 						: "center bottom",
// 			}}
// 		>
// 			<Paper>
// 				<ClickAwayListener
// 					onClickAway={(event) => {
// 						handleMenuClose(
// 							event,
// 							MenuNavOptions.profile
// 						);
// 					}}
// 				>
// 					<MenuList
// 						autoFocusItem={isMenuOpen}
// 						id="menu-list-grow"
// 						onKeyDown={handleMenuListKeyDown}
// 						style={{
// 							backgroundColor: "#FFFFFF",
// 							zIndex: 1,
// 						}}
// 					>
// 						<MenuItem
// 							onClick={(event) => {
// 								handleMenuClose(
// 									event,
// 									MenuNavOptions.home
// 								);
// 							}}
// 						>
// 							Home
// 						</MenuItem>
// 						<MenuItem
// 							onClick={(event) => {
// 								handleMenuClose(
// 									event,
// 									MenuNavOptions.myProfile
// 								);
// 							}}
// 						>
// 							My Profile
// 						</MenuItem>
// 						<MenuItem
// 							onClick={(event) => {
// 								handleMenuClose(
// 									event,
// 									MenuNavOptions.myOrders
// 								);
// 							}}
// 						>
// 							My Orders
// 						</MenuItem>
// 						<MenuItem
// 							onClick={(event) => {
// 								handleMenuClose(
// 									event,
// 									MenuNavOptions.myInvoices
// 								);
// 							}}
// 						>
// 							My Invoices
// 						</MenuItem>
// 						<MenuItem
// 							onClick={(event) => {
// 								handleMenuClose(
// 									event,
// 									MenuNavOptions.logout
// 								);
// 							}}
// 						>
// 							Logout
// 						</MenuItem>
// 						{/* <MenuItem onClick={handleMenuClose}>
// 							My account
// 						</MenuItem>
// 						<MenuItem onClick={handleMenuClose}>
// 							Logout
// 						</MenuItem> */}
// 					</MenuList>
// 				</ClickAwayListener>
// 			</Paper>
// 		</Grow>
// 	)}
// </Popper>;
