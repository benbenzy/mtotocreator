import {
	StyleSheet,
	Text,
	View,
	ButtonProps,
	TouchableOpacity,
	ViewProps,
	FlatList,
	FlatListProps,
} from "react-native";
import React from "react";
import { ContainerView, ThemeText } from "./Themed";
import { COLORS, FONTS, SIZES } from "../constants/theme";

type props = {
	title: string;
	onpress: ButtonProps["onPress"];
	containerStyles: ViewProps["style"];
	children: React.ReactNode;
};

const HomeCard = ({ title, onpress, containerStyles, children }: props) => {
	return (
		<View style={[containerStyles, styles.container]}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginHorizontal: SIZES.radius,
					width: "90%",
					alignSelf: "center",
					marginVertical: 5,
				}}
			>
				<ThemeText style={[styles.text, { textTransform: "uppercase" }]}>
					{title}
				</ThemeText>
				<TouchableOpacity onPress={onpress}>
					<Text style={[styles.text, { color: COLORS.primary }]}>show all</Text>
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
		alignSelf: "center",
		borderRadius: SIZES.radius,
		margin: 10,
	},
	text: {
		//color: COLORS.primary,
		fontSize: 18,
		fontWeight: "bold",
	},
});
