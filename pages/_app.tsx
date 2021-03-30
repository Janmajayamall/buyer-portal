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
import {
	BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
	BUYER_VERIFY_LOGIN_CODE,
} from "../src/graphql/mutations/buyer.graphql";
import CustomTheme from "./../src/theme";
import { IS_BUYER_AUTHENTICATED } from "../src/graphql/queries/buyer.graphql";
import { WSAEINVALIDPROCTABLE } from "constants";

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
	phoneNumber: "1234567899",
	verificationCode: "1202",
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
	const [
		loginProcessState,
		setLoginProcessState,
	] = useState<LoginProcessInterface>(loginProcessDefaultState);

	// state for resend code time left
	const [resendCodeTimeLeft, setResendCodeTimeLeft] = React.useState<number>(
		0
	);

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

	async function checkAuthState() {
		try {
			const authState = await client.query({
				query: IS_BUYER_AUTHENTICATED,
			});
			setAuthState(true);
		} catch (e) {
			setAuthState(false);
		}
	}

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
			checkAuthState();
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
	});

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

	// STUFF RELATED TO LOGIN MODAL

	function resetLoginProcessState() {
		setLoginProcessState(loginProcessDefaultState);

		// reset the time
		setResendCodeTimeLeft(0);
	}

	async function requestLoginVerificationCode() {
		// check whether phone number is valid
		if (loginProcessState.phoneNumber.length !== 10) {
			return;
		}

		// return if stage isn't 0
		if (loginProcessState.stage !== 0) {
			return;
		}

		// change login state to loading
		setLoginProcessState({
			...loginProcessState,
			stage: 1,
		});

		try {
			// send mutation request for verification code
			await client.mutate({
				mutation: BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
				variables: {
					phoneNumber: loginProcessState.phoneNumber,
				},
			});

			// change the state to 2
			setLoginProcessState({
				...loginProcessState,
				stage: 2,
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function verifyLoginCode() {
		// validation verification code
		if (
			loginProcessState.verificationCode.length !== 4 ||
			loginProcessState.phoneNumber.length !== 10
		) {
			return;
		}

		// return if stage isn't 2
		if (loginProcessState.stage !== 2) {
			return;
		}

		// change loadingProgress state to loading for verification (3)
		setLoginProcessState({
			...loginProcessState,
			stage: 3,
			authenticationFailed: false,
		});

		try {
			// send mutation request for verification
			const { data } = await client.mutate({
				mutation: BUYER_VERIFY_LOGIN_CODE,
				variables: {
					phoneNumber: loginProcessState.phoneNumber,
					verificationCode: loginProcessState.verificationCode,
				},
			});

			// set auth token in local storage
			setAuthToken(data.buyerVerifyLoginCode.token);

			// set auth state to true
			setAuthState(true);

			// set login modal visibility to false
			setLoginModalVisible(false);

			// reset login progress state
			resetLoginProcessState();

			// reload current path page
			Router.reload();
		} catch (e) {
			console.log(e);
			// authorization failed
			setLoginProcessState({
				...loginProcessState,
				authenticationFailed: true,
				stage: 2,
			});
		}
	}

	async function resendVerificationCode() {
		// check whether resend time is equal to zero
		if (resendCodeTimeLeft > 0) {
			return;
		}

		// check whether phone number is valid
		if (loginProcessState.phoneNumber.length !== 10) {
			return;
		}

		// return if stage isn't 4 or 2
		if (loginProcessState.stage !== 4 && loginProcessState.stage !== 2) {
			return;
		}

		try {
			// send mutation request for verification code
			await client.mutate({
				mutation: BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
				variables: {
					phoneNumber: loginProcessState.phoneNumber,
				},
			});

			// set resend code time to 120 s
			setResendCodeTimeLeft(120);
		} catch (e) {
			console.log(e);
		}
	}

	function editPhoneNumberAtVerification() {
		// return if stage isn't 2
		if (loginProcessState.stage !== 2) {
			return;
		}

		setLoginProcessState({
			...loginProcessState,
			stage: 0,
			verificationCode: "",
			authenticationFailed: false,
		});
	}

	const loginModalBody = (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFFFFF",
				padding: 20,
				width: 400,
			}}
		>
			{loginProcessState.stage === 0 || loginProcessState.stage === 1 ? (
				<div
					style={{
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography
						variant={"subtitle1"}
						style={{ alignSelf: "center", marginBottom: 20 }}
					>
						Enter your 10-digit mobile number to Login
					</Typography>
					<TextField
						fullWidth
						id="phoneNumber"
						name="phoneNumber"
						label="Phone Number"
						value={loginProcessState.phoneNumber}
						onKeyDown={(e) => {
							e.preventDefault();
							handleNumberInputOnKeyPress(
								String(loginProcessState.phoneNumber),
								e.key,
								(value: string) => {
									setLoginProcessState({
										...loginProcessState,
										phoneNumber: value,
									});
								},
								false
							);
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									+91 -{" "}
								</InputAdornment>
							),
						}}
					/>
					<Button
						color="secondary"
						variant="contained"
						onClick={() => {
							requestLoginVerificationCode();
						}}
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
							color: "#ffffff",
						}}
					>
						{loginProcessState.stage === 1 ? (
							<CircularProgress size={24} color={"secondary"} />
						) : (
							"Get Code"
						)}
					</Button>
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column" }}>
					<TextField
						fullWidth
						id="verificationCode"
						name="verificationCode"
						label="Enter Verification Code"
						value={loginProcessState.verificationCode}
						onKeyDown={(e) => {
							e.preventDefault();
							handleNumberInputOnKeyPress(
								String(loginProcessState.verificationCode),
								e.key,
								(value: string) => {
									setLoginProcessState({
										...loginProcessState,
										verificationCode: value,
									});
								},
								false
							);
						}}
					/>

					{loginProcessState.authenticationFailed === true ? (
						<div>
							<Typography
								variant="subtitle2"
								style={{
									color: "#FF0000",
									marginTop: 5,
								}}
							>
								Invalid Verification Code. Please try again!
							</Typography>
						</div>
					) : undefined}

					<div onClick={editPhoneNumberAtVerification}>
						<Typography
							variant="subtitle2"
							style={{
								color: "#A9A9A9",
								marginTop: 5,
							}}
						>
							Change Phone Number?
						</Typography>
					</div>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-around",
						}}
					>
						<Button
							color="secondary"
							variant="contained"
							onClick={verifyLoginCode}
							style={{
								marginTop: 20,
								justifySelf: "center",
								alignSelf: "center",
							}}
						>
							{loginProcessState.stage === 3 ? (
								<CircularProgress
									size={24}
									color={"secondary"}
								/>
							) : (
								"Submit"
							)}
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={resendVerificationCode}
							style={{
								marginTop: 20,
								justifySelf: "center",
								alignSelf: "center",
							}}
							disabled={resendCodeTimeLeft > 0}
						>
							{resendCodeTimeLeft > 0
								? `Resend ${resendCodeTimeLeft}(s)`
								: "Resend Code"}
						</Button>
					</div>
				</div>
			)}
		</div>
	);

	// STUFF RELATED TO MENU OPTIONS

	const menu = (
		<div>
			<Button
				onClick={() => {
					router.push("/");
				}}
			>
				Home
			</Button>
			<Button
				onClick={() => {
					router.push("/order");
				}}
			>
				My Orders
			</Button>
			<Button
				onClick={() => {
					router.push("/payments");
				}}
			>
				My Invoices
			</Button>
			<Button
				onClick={() => {
					router.push("/profile");
				}}
			>
				My Profile
			</Button>
			<Button
				onClick={() => {
					resetAuthToken();
					client.resetStore();
					router.reload();
				}}
			>
				Logout
			</Button>
		</div>
	);

	// STUFF RELATED TO LOGIN MODAL ENDS

	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={CustomTheme}>
				<AppBar
					style={{ backgroundColor: "#ffffff" }}
					position="static"
				>
					<Toolbar>
						<div
							style={{
								position: "absolute",
								right: 50,
								minWidth: 500,
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							{authState ? (
								<div>{menu}</div>
							) : (
								<Button onClick={requestLogin} variant="text">
									Login
								</Button>
							)}
						</div>
					</Toolbar>
				</AppBar>
				<div
					style={{
						width: "100%",
						// display: "flex",
						// justifyContent: "center",
						// alignItems: "center",
						minHeight: windowDimensions.height,
					}}
				>
					<Component
						{...pageProps}
						// onAuthStatusChange={(authState: boolean) => {
						// 	setAuthState(authState);
						// }}
						authState={authState}
						requestLogin={requestLogin}
						windowDimensions={windowDimensions}
					/>
				</div>
				<div
					style={{
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
						flexDirection: "column",
						backgroundColor: "#DBDEF7",
					}}
				>
					<div
						style={{
							width: "100%",
							display: "flex",
							flexDirection: "row",
							padding: 20,
							justifyContent: "space-around",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Typography
								variant="h6"
								style={{ color: "#23106F" }}
							>
								Contact Us
							</Typography>
							<Typography
								variant="subtitle2"
								style={{ color: "#23106F" }}
							>
								Email: janmajaya.choithram@gmail.com
							</Typography>
							<Typography
								variant="subtitle2"
								style={{ color: "#23106F" }}
							>
								Whatsapp: +85254906535
							</Typography>
						</div>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
							}}
						>
							<Typography
								variant="h6"
								style={{ color: "#23106F" }}
							>
								Manufacturers
							</Typography>
							<Typography
								variant="subtitle2"
								style={{ color: "#23106F" }}
							>
								To become our manufacturing partner, contact us
								with your business details.
							</Typography>
						</div>
					</div>
				</div>
				<Modal
					open={loginModalVisible}
					onClose={() => {
						resetLoginProcessState();
						setLoginModalVisible(false);
					}}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					style={{
						justifyContent: "center",
						alignItems: "center",
						display: "flex",
					}}
				>
					{loginModalBody}
				</Modal>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default MyApp;

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
