/** @format */

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemeText, ThemeView } from "../components/Themed";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Notifications = () => {
	const router = useRouter();
	return (
		<ThemeView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<TouchableOpacity
				onPress={async () =>
					await AsyncStorage.removeItem("localUser")
					.then(() => {
						router.replace("/sign-in");
					})
				}>
				<ThemeText>logout</ThemeText>
			</TouchableOpacity>
		</ThemeView>
	);
};

export default Notifications;

const styles = StyleSheet.create({});
