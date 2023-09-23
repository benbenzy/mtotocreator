/** @format */

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	useColorScheme,
	Image,
	Platform,
} from "react-native";
import React from "react";
import { ThemeText, ThemeView } from "../../components/Themed";
import { auth } from "../../firebaseConfig";
import {
	GoogleAuthProvider,
	UserCredential,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { COLORS, SIZES, icons } from "../../constants";
import { useRouter } from "expo-router";
import { useAuthSession } from "../../context/AuthContext";
import { FirebaseError } from "firebase/app";

const SignIn = () => {
	const { user } = useAuthSession() ?? { user: null };
	const router = useRouter();
	React.useEffect(() => {
		const unsub = () => {
			if (user) {
				router.replace("/");
			}
		};
		return () => unsub();
	}, [user]);

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [error, setError] = React.useState("");
	const provider = new GoogleAuthProvider();
	const isDarkMode = useColorScheme() === "dark";

	return (
		<ThemeView style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
			<ThemeText style={{ color: COLORS.red }}>{user?.email}</ThemeText>
			{error != "" && <ThemeText style={{ color: COLORS.red }}>{error}</ThemeText>}
			<View style={{}}>
				<ThemeText style={{ textTransform: "capitalize" }}>email:</ThemeText>
				<TextInput
					placeholder="enter Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					style={{
						height: 60,
						width: SIZES.width * 0.85,
						maxWidth: 300,
						borderWidth: 1,
						backgroundColor: COLORS.gray,
						borderRadius: SIZES.radius,
					}}
				/>
			</View>
			<View>
				<ThemeText style={{ textTransform: "capitalize" }}>Password:</ThemeText>
				<TextInput
					placeholder="enter password"
					value={password}
					onChangeText={(text) => setPassword(text)}
					style={{
						height: 60,
						width: SIZES.width * 0.85,
						maxWidth: 300,
						borderWidth: 1,
						backgroundColor: COLORS.gray,
						borderRadius: SIZES.radius,
					}}
				/>
			</View>
			<TouchableOpacity
				style={{
					height: 60,
					width: SIZES.width * 0.8,
					marginVertical: SIZES.radius,
					backgroundColor: "green",
					borderRadius: SIZES.radius,
					maxWidth: 300,
					alignItems: "center",
					justifyContent: "center",
				}}
				onPress={() => {
					signInWithEmailAndPassword(auth, email, password).catch((error) => {
						const errorCode = error.code;
						setError(errorCode);
					});
				}}>
				<Text>Continue</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{
					height: 60,
					width: SIZES.width * 0.8,
					maxWidth: 300,
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: isDarkMode ? COLORS.gray : COLORS.lightGray2,
					borderRadius: SIZES.radius,
				}}
				onPress={() => {
					if (Platform.OS === "web") {
						signInWithPopup(auth, provider)
							.then((result: UserCredential) => {
								// This gives you a Google Access Token. You can use it to access the Google API.
								const credential = GoogleAuthProvider.credentialFromResult(result);
								const token = credential?.accessToken;
								// The signed-in user info.
								const user = result.user;
								// IdP data available using getAdditionalUserInfo(result)
								// ...
							})
							.catch((error: FirebaseError) => {
								// Handle Errors here.
								const errorCode = error.code;
								console.log("error code", errorCode);
								const errorMessage = error.message;
								console.log("error message", errorMessage);
								// The email of the user's account used.
								const email = error.customData?.email;
								console.log("used email", email);
								// The AuthCredential type that was used.
								const credential = GoogleAuthProvider.credentialFromError(error);
								// ...
							});
					} else {
						return;
					}
				}}>
				<Image
					source={icons.google}
					style={{ width: 30, height: 30 }}
				/>
				<ThemeText style={{ paddingLeft: SIZES.padding }}>continue with Google</ThemeText>
			</TouchableOpacity>
		</ThemeView>
	);
};

export default SignIn;

const styles = StyleSheet.create({});
