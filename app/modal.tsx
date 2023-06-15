import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeText, ThemeView } from "../components/Themed";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, icons } from "../constants";
import SettingActionsButton from "../components/settingActionsButton";
import { constants } from "../constants";


export default function ModalScreen() {
	return (
		<ThemeView style={styles.container}>
			<FlatList
				data={constants.UserActions}
				renderItem={({ item, index }) => (
					<SettingActionsButton name={item.name} icon={item.icon} color={item.color} onpress={()=>{}} />
				)}
			/>
      <SettingActionsButton containerStyle={{position:'absolute',bottom:50}} onpress={()=>{}} name="logout" icon={icons.logout} color={COLORS.gray}/>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//alignItems: "center",
		//justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},

	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
