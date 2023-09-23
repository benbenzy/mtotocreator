/** @format */

import {
	StyleSheet,
	Text,
	View,
	ButtonProps,
	TouchableOpacity,
	ViewProps,
	TextProps,
	FlatList,
	FlatListProps,
} from "react-native";
import React from "react";
import { ContainerView, ThemeText } from "./Themed";
import { COLORS, FONTS, SIZES } from "../constants/theme";

type props = {
	title: string;
	onpress: ButtonProps["onPress"];
	containerStyles?: ViewProps["style"];
	children: React.ReactNode;
	subheader: string;
	subheaderStyles?: TextProps["style"];
	titleStyles?: TextProps["style"];
};

const HomeCard = ({
	title,
	onpress,
	containerStyles,
	children,
	subheader,
	titleStyles,
	subheaderStyles,
}: props) => {
	return (
		<View style={[containerStyles, styles.container]}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginHorizontal: SIZES.radius,
					width: SIZES.width * 0.8,

					marginVertical: 5,
				}}>
				<ThemeText style={[styles.text, titleStyles, { textTransform: "uppercase" }]}>
					{title}
				</ThemeText>
				<TouchableOpacity onPress={onpress}>
					<Text style={[styles.text, subheaderStyles, { color: COLORS.primary }]}>{subheader}</Text>
				</TouchableOpacity>
			</View>
			{children}
		</View>
	);
};

export default HomeCard;

const styles = StyleSheet.create({
	container: {
		//backgroundColor: COLORS.gray,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		//color: COLORS.primary,
		fontSize: SIZES.h4,
		fontWeight: "bold",
	},
});
