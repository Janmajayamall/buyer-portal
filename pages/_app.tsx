import { AppProps } from "next/app";
import React, { useState } from "react";

import "../styles/globals.css";
import { ApolloProvider, useMutation, useQuery } from "@apollo/react-hooks";
import { client } from "../src/graphql/apollo-client";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Image } from "cloudinary-react";
import Modal from "@material-ui/core/Modal";
import {
	handleNumberInputOnKeyPress,
	LoginProcessInterface,
} from "../src/utils";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
	BuyerRequestLoginVerificationCode,
	BuyerRequestLoginVerificationCodeVariables,
} from "../src/graphql/generated/BuyerRequestLoginVerificationCode";
import {
	BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
	BUYER_VERIFY_LOGIN_CODE,
} from "../src/graphql/mutations/buyer.graphql";
import {
	BuyerVerifyLoginCode,
	BuyerVerifyLoginCodeVariables,
} from "../src/graphql/generated/BuyerVerifyLoginCode";
import { GET_CATEGORY_PRODUCTS_FOR_BUYERS } from "../src/graphql/queries/products.graphql";

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

const drawerWidth = 240;

const loginProcessDefaultState: LoginProcessInterface = {
	stage: 0,
	phoneNumber: "",
	verificationCode: "",
	authenticationFailed: false,
};

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const classes = useStyles();

	// DECLARING LOCAL STATES

	// state for tracking auth state
	const [authState, setAuthState] = useState<boolean>(false);

	// state for login modal
	const [loginModalVisible, setLoginModalVisible] = useState<boolean>(false);

	// state for login process
	const [
		loginProcessState,
		setLoginProcessState,
	] = useState<LoginProcessInterface>(loginProcessDefaultState);

	// DECLARING LOCAL STATES END

	// DECLARING FUNCTIONS

	function requestLogin() {
		if (authState === true) {
			return;
		}

		setLoginModalVisible(true);
	}

	// DECLARING FUNCTIONS END

	// STUFF RELATED TO LOGIN MODAL

	function resetLoginProcessState() {
		setLoginProcessState(loginProcessDefaultState);
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
			await client.mutate({
				mutation: BUYER_VERIFY_LOGIN_CODE,
				variables: {
					phoneNumber: loginProcessState.phoneNumber,
					verificationCode: loginProcessState.verificationCode,
				},
			});

			// set auth state to true
			setAuthState(true);

			// set login modal visibility to false
			setLoginModalVisible(false);

			// reset login progress state
			resetLoginProcessState();
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

			//TODO handle the timer
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
				<div>
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
						fullWidth
						color="primary"
						variant="contained"
						onClick={() => {
							requestLoginVerificationCode();
						}}
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
						}}
					>
						{loginProcessState.stage === 1 ? (
							<CircularProgress size={24} color={"secondary"} />
						) : (
							"Get Verification Code"
						)}
					</Button>
				</div>
			) : (
				<div>
					<TextField
						fullWidth
						id="verificationCode"
						name="verificationCode"
						label="Verification Code"
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
					<div onClick={editPhoneNumberAtVerification}>
						<Typography variant="subtitle2">
							Change Phone Number
						</Typography>
					</div>

					{loginProcessState.authenticationFailed ? (
						<Typography variant="subtitle2">
							Authentication Failed
						</Typography>
					) : undefined}

					<Button
						fullWidth
						color="primary"
						variant="contained"
						onClick={verifyLoginCode}
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
						}}
					>
						{loginProcessState.stage === 3 ? (
							<CircularProgress size={24} color={"secondary"} />
						) : (
							"Submit"
						)}
					</Button>
					<Button
						fullWidth
						color="primary"
						variant="contained"
						onClick={resendVerificationCode}
						style={{
							marginTop: 20,
							justifySelf: "center",
							alignSelf: "center",
						}}
					>
						Resend Code
					</Button>
				</div>
			)}
		</div>
	);

	// STUFF RELATED TO LOGIN MODAL END

	return (
		<ApolloProvider client={client}>
			<AppBar position="static">
				<Toolbar>
					<Button
						style={{ position: "absolute", right: 10 }}
						color="inherit"
						onClick={() => {
							requestLogin();
						}}
					>
						{authState ? "WELCOME" : "LOGIN"}
					</Button>
				</Toolbar>
			</AppBar>
			<Component
				{...pageProps}
				onAuthStatusChange={(authState: boolean) => {
					setAuthState(authState);
				}}
			/>
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
		</ApolloProvider>
	);
}

export default MyApp;
