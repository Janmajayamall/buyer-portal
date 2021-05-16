// async function resendVerificationCode() {
// 	// check whether resend time is equal to zero
// 	if (resendCodeTimeLeft > 0) {
// 		return;
// 	}

// 	// check whether phone number is valid
// 	if (loginProcessState.phoneNumber.length !== 8) {
// 		return;
// 	}

// 	// return if stage isn't 4 or 2
// 	if (loginProcessState.stage !== 4 && loginProcessState.stage !== 2) {
// 		return;
// 	}

// 	try {
// 		// send mutation request for verification code
// 		await client.mutate({
// 			mutation: BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
// 			variables: {
// 				phoneNumber: loginProcessState.phoneNumber,
// 			},
// 		});

// 		// set resend code time to 120 s
// 		setResendCodeTimeLeft(210);
// 	} catch (e) {
// 		console.log(e);
// 	}
// }

// function editPhoneNumberAtVerification() {
// 	// return if stage isn't 2
// 	if (loginProcessState.stage !== 2) {
// 		return;
// 	}

// 	setLoginProcessState({
// 		...loginProcessState,
// 		stage: 0,
// 		verificationCode: "",
// 		authenticationFailed: false,
// 	});
// }

// async function verifyLoginCode() {
// 	// validation verification code
// 	if (
// 		loginProcessState.verificationCode.length !== 6 ||
// 		loginProcessState.phoneNumber.length !== 8
// 	) {
// 		return;
// 	}

// 	// return if stage isn't 2
// 	if (loginProcessState.stage !== 2) {
// 		return;
// 	}

// 	// change loadingProgress state to loading for verification (3)
// 	setLoginProcessState({
// 		...loginProcessState,
// 		stage: 3,
// 		authenticationFailed: false,
// 	});

// 	try {
// 		// send mutation request for verification
// 		const { data } = await client.mutate({
// 			mutation: BUYER_VERIFY_LOGIN_CODE,
// 			variables: {
// 				phoneNumber: loginProcessState.phoneNumber.trim(),
// 				verificationCode: loginProcessState.verificationCode.trim(),
// 			},
// 		});

// 		// set auth token in local storage
// 		setAuthToken(data.buyerVerifyLoginCode.token);

// 		// set auth state to true
// 		setAuthState(true);

// 		// set login modal visibility to false
// 		setLoginModalVisible(false);

// 		// reset login progress state
// 		resetLoginProcessState();

// 		// reload current path page
// 		Router.reload();
// 	} catch (e) {
// 		console.log(e);
// 		// authorization failed
// 		setLoginProcessState({
// 			...loginProcessState,
// 			authenticationFailed: true,
// 			stage: 2,
// 		});
// 	}
// }

// function resetLoginProcessState() {
// 	setLoginProcessState(loginProcessDefaultState);

// 	// reset the time
// 	setResendCodeTimeLeft(0);
// }

// async function requestLoginVerificationCode() {
// 	// check whether phone number is valid
// 	if (loginProcessState.phoneNumber.length !== 8) {
// 		return;
// 	}

// 	// return if stage isn't 0
// 	if (loginProcessState.stage !== 0) {
// 		return;
// 	}

// 	// change login state to loading
// 	setLoginProcessState({
// 		...loginProcessState,
// 		stage: 1,
// 	});

// 	try {
// 		// send mutation request for verification code
// 		await client.mutate({
// 			mutation: BUYER_REQUEST_LOGIN_VERIFICATION_CODE,
// 			variables: {
// 				phoneNumber: loginProcessState.phoneNumber.trim(),
// 			},
// 		});

// 		// change the state to 2
// 		setLoginProcessState({
// 			...loginProcessState,
// 			stage: 2,
// 		});
// 	} catch (e) {
// 		console.log(e);
// 		setLoginProcessState({
// 			...loginProcessState,
// 			stage: 0,
// 		});
// 	}
// }

// 	async function checkAuthState() {
// 		try {
// 			const authState = await client.query({
// 				query: IS_BUYER_AUTHENTICATED,
// 			});
// 			setAuthState(true);
// 		} catch (e) {
// 			setAuthState(false);
// 		}
// 	}
