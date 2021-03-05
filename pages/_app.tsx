import { AppProps } from "next/app";
import React, { useState } from "react";

import "../styles/globals.css";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "../src/graphql/apollo-client";
import { useRouter } from "next/router";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const classes = useStyles();

	return (
		<ApolloProvider client={client}>
			<AppBar position="static">
				<Toolbar>
					<Button
						style={{ position: "absolute", right: 10 }}
						color="inherit"
					>
						Login
					</Button>
				</Toolbar>
			</AppBar>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
