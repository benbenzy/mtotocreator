import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
    Image,
    ImageProps
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { ThemeText } from "./Themed";

interface props {
	name: string;
	icon: ImageProps["source"];
	onpress: TouchableOpacityProps["onPress"];
    color:string;
	containerStyle?:TouchableOpacityProps['style'];
}
const SettingActionsButton = ({ name, icon,containerStyle, onpress,color }: props) => {
	return (
		<TouchableOpacity onPress={onpress} style={[styles.button,containerStyle]}>
			<Image source={icon} style={{width:30,height:30,tintColor:color}}  />
			<ThemeText style={styles.buttonText}>{name}</ThemeText>
		</TouchableOpacity>
	);
};

export default SettingActionsButton;

const styles = StyleSheet.create({
	buttonText: {
		fontSize: 20,
		fontWeight: "bold",
		marginLeft: 10,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 20,
        marginTop:10
	},
});
