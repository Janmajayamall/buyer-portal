// function searchComponentOnEntryPage() {
// 	return (
// 		<div
// 			style={{
// 				padding: 10,
// 				display: "flex",
// 				flexDirection: "row",
// 				justifyContent: "flex-start",
// 				marginLeft: 10,
// 				marginTop: 20,
// 				marginBottom: 20,
// 				marginRight: 10,
// 			}}
// 		>
// 			<TextField
// 				variant="standard"
// 				id="SearchPhrase"
// 				label="Search Fabric Product"
// 				value={searchPhrase}
// 				onChange={(e) => {
// 					setSearchPhrase(e.target.value);
// 				}}
// 				style={{ width: "90%", marginRight: 5 }}
// 			/>
// 			<Button
// 				style={{ justifySelf: "center" }}
// 				color="secondary"
// 				variant="contained"
// 				onClick={() => {
// 					if (searchPhrase.trim() === "") {
// 						router.push(`/any`);
// 					} else {
// 						router.push(`/${searchPhrase}`);
// 					}
// 				}}
// 			>
// 				<SearchIcon />
// 				{"Search"}
// 			</Button>
// 		</div>
// 	);
// }

// function categoriesOnEntryPage() {
// 	return (
// 		<div
// 			ref={categoryDivRef}
// 			style={{
// 				alignSelf: "center",
// 				marginTop: 40,
// 				// padding: 20,
// 			}}
// 		>
// 			<div
// 				style={{
// 					display: "flex",
// 					flexDirection: "row",
// 					justifyContent: "space-around",
// 				}}
// 			>
// 				<CategoryRep categoryName="Cotton" />
// 				<CategoryRep categoryName="Denim" />
// 				<CategoryRep categoryName="Poplin" />
// 				<CategoryRep categoryName="Silk" />
// 				<CategoryRep categoryName="Viscose" />
// 			</div>
// 		</div>
// 	);
// }

// function singleCategoryPatchOnEntryPage() {
// 	const CategoryRep = ({ categoryName }) => {
// 		// return (
// 		// 	<NextImage
// 		// 		src="/categories/Cotton.png"
// 		// 		alt="me"
// 		// 		width="100"
// 		// 		height="100"
// 		// 	/>
// 		// );

// 		return (
// 			<div
// 				style={{
// 					display: "flex",
// 					flexDirection: "column",
// 					justifyContent: "center",
// 					alignItems: "center",
// 				}}
// 				onClick={() => {
// 					window.open(
// 						`${process.env.DOMAIN}/${categoryName.toLowerCase()}`
// 					);
// 				}}
// 			>
// 				<NextImage
// 					className="categoryImage"
// 					src={`/categories/${categoryName}.jpeg`}
// 					alt="me"
// 					layout="intrinsic"
// 					width={100}
// 					height={100}
// 				/>
// 				<style jsx global>{`
// 					.categoryImage {
// 						border-radius: 50px;
// 					}
// 				`}</style>

// 				<Typography variant="subtitle1" style={{ marginTop: 5 }}>
// 					{categoryName}
// 				</Typography>
// 			</div>
// 		);
// 	};
// }

// function mainLoginModal() {
// 	const loginModalBody = (
// 		<div
// 			style={{
// 				alignItems: "center",
// 				justifyContent: "center",
// 				backgroundColor: "#FFFFFF",
// 				padding: 20,
// 				width: 400,
// 			}}
// 		>
// 			{loginProcessState.stage === 0 || loginProcessState.stage === 1 ? (
// 				<div
// 					style={{
// 						display: "flex",
// 						flexDirection: "column",
// 					}}
// 				>
// 					<Typography
// 						variant={"subtitle1"}
// 						style={{ alignSelf: "center", marginBottom: 20 }}
// 					>
// 						Enter your 10-digit mobile number to Login
// 					</Typography>
// 					<TextField
// 						fullWidth
// 						id="phoneNumber"
// 						name="phoneNumber"
// 						label="Phone Number"
// 						value={loginProcessState.phoneNumber}
// 						onKeyDown={(e) => {
// 							e.preventDefault();
// 							handleNumberInputOnKeyPress(
// 								String(loginProcessState.phoneNumber),
// 								e.key,
// 								(value: string) => {
// 									setLoginProcessState({
// 										...loginProcessState,
// 										phoneNumber: value,
// 									});
// 								},
// 								false
// 							);
// 						}}
// 						InputProps={{
// 							startAdornment: (
// 								<InputAdornment position="start">
// 									+91 -{" "}
// 								</InputAdornment>
// 							),
// 						}}
// 					/>
// 					<Button
// 						color="secondary"
// 						variant="contained"
// 						onClick={() => {
// 							requestLoginVerificationCode();
// 						}}
// 						style={{
// 							marginTop: 20,
// 							justifySelf: "center",
// 							alignSelf: "center",
// 							color: "#ffffff",
// 						}}
// 					>
// 						{loginProcessState.stage === 1 ? (
// 							<CircularProgress size={24} color={"secondary"} />
// 						) : (
// 							"Get Code"
// 						)}
// 					</Button>
// 				</div>
// 			) : (
// 				<div style={{ display: "flex", flexDirection: "column" }}>
// 					<TextField
// 						fullWidth
// 						id="verificationCode"
// 						name="verificationCode"
// 						label="Enter Verification Code"
// 						value={loginProcessState.verificationCode}
// 						onKeyDown={(e) => {
// 							e.preventDefault();
// 							handleNumberInputOnKeyPress(
// 								String(loginProcessState.verificationCode),
// 								e.key,
// 								(value: string) => {
// 									setLoginProcessState({
// 										...loginProcessState,
// 										verificationCode: value,
// 									});
// 								},
// 								false
// 							);
// 						}}
// 					/>

// 					{loginProcessState.authenticationFailed === true ? (
// 						<div>
// 							<Typography
// 								variant="subtitle2"
// 								style={{
// 									color: "#FF0000",
// 									marginTop: 5,
// 								}}
// 							>
// 								Invalid Verification Code. Please try again!
// 							</Typography>
// 						</div>
// 					) : undefined}

// 					<div onClick={editPhoneNumberAtVerification}>
// 						<Typography
// 							variant="subtitle2"
// 							style={{
// 								color: "#A9A9A9",
// 								marginTop: 5,
// 							}}
// 						>
// 							Change Phone Number?
// 						</Typography>
// 					</div>

// 					<div
// 						style={{
// 							display: "flex",
// 							flexDirection: "row",
// 							justifyContent: "space-around",
// 						}}
// 					>
// 						<Button
// 							color="secondary"
// 							variant="contained"
// 							onClick={verifyLoginCode}
// 							style={{
// 								marginTop: 20,
// 								justifySelf: "center",
// 								alignSelf: "center",
// 							}}
// 						>
// 							{loginProcessState.stage === 3 ? (
// 								<CircularProgress
// 									size={24}
// 									color={"secondary"}
// 								/>
// 							) : (
// 								"Submit"
// 							)}
// 						</Button>
// 						<Button
// 							color="secondary"
// 							variant="contained"
// 							onClick={resendVerificationCode}
// 							style={{
// 								marginTop: 20,
// 								justifySelf: "center",
// 								alignSelf: "center",
// 							}}
// 							disabled={resendCodeTimeLeft > 0}
// 						>
// 							{resendCodeTimeLeft > 0
// 								? `Resend ${resendCodeTimeLeft}(s)`
// 								: "Resend Code"}
// 						</Button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// }

// function mainMenu() {
// 	const menu =
// 		authState && false ? (
// 			<div>
// 				<Button
// 					onClick={() => {
// 						router.push("/");
// 					}}
// 				>
// 					Home
// 				</Button>
// 				<Button
// 					onClick={() => {
// 						router.push("/order");
// 					}}
// 				>
// 					My Orders
// 				</Button>
// 				<Button
// 					onClick={() => {
// 						router.push("/payments");
// 					}}
// 				>
// 					My Invoices
// 				</Button>
// 				<Button
// 					onClick={() => {
// 						router.push("/profile");
// 					}}
// 				>
// 					My Profile
// 				</Button>
// 				<Button
// 					onClick={() => {
// 						resetAuthToken();
// 						client.resetStore();
// 						if (router.pathname === "/") {
// 							router.reload();
// 						} else {
// 							router.push("/");
// 						}
// 					}}
// 				>
// 					Logout
// 				</Button>
// 			</div>
// 		) : (
// 			<div>
// 				<Button
// 					onClick={() => {
// 						router.push("/");
// 					}}
// 				>
// 					Home
// 				</Button>
// 				{/* <Button onClick={requestLogin}>Login</Button> */}
// 			</div>
// 		);
// }
