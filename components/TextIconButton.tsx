/** @format */

import {
	ImageProps,
	StyleSheet,
	Text,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	ViewProps,
	Image,
	useColorScheme,
} from "react-native";
import React from "react";
import { COLORS, Colors, FONTS, SIZES } from "../constants";
import { ThemeText } from "./Themed";
import { FontAwesome } from "@expo/vector-icons";

interface props {
	containerStyle: ViewProps["style"];
	label: string;
	labelStyle: TextProps["style"];
	icon: any;
	iconStyle: ImageProps["style"];
	onPress: TouchableOpacityProps["onPress"];
}

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconStyle, onPress }: props) => {
	const colorScheme = useColorScheme();
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				},
				containerStyle,
			]}>
			<FontAwesome
				name={icon}
				size={20}
				color={Colors[colorScheme ?? "dark"].tabIconDefault}
			/>
			<ThemeText style={[{ marginLeft: SIZES.base, ...FONTS.body4 }, labelStyle]}>{label}</ThemeText>
		</TouchableOpacity>
	);
};

export default TextIconButton;

const styles = StyleSheet.create({});
