/** @format */

import {
	StyleSheet,
	Text,
	TouchableOpacity,
	Image,
	View,
	ViewProps,
	TouchableOpacityProps,
	ImageProps,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
import { Plan } from "../interface";
import { COLORS, FONTS, SIZES, icons } from "../constants";

interface props {
	containerStyle: ViewProps["style"];
	item: Plan;
	onPress: TouchableOpacityProps["onPress"];
	imageStyle: ImageProps["style"];
	favouritePress: TouchableOpacityProps["onPress"];
}

const HorizantalPlanCard = ({
	containerStyle,
	item,
	onPress,
	imageStyle,
	favouritePress,
}: props) => {
	return (
		<View
			key={item.id}
			style={[
				{
					flexDirection: "row",
					backgroundColor: COLORS.lightGray2,
					borderRadius: SIZES.radius,
					//alignItems: "center",
				},
				containerStyle,
			]}>
			<View>
				<Text>{item.description}</Text>
			</View>
			<Text>{item.author}</Text>
			<TouchableOpacity
				onPress={favouritePress}
				style={{
					position: "absolute",
					right: SIZES.radius,
					width: 50,
					height: 30,
					borderRadius: 5,
					bottom: 5,
					backgroundColor: COLORS.black,
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Text style={{ color: COLORS.white, alignSelf: "center", textTransform: "uppercase" }}>
					edit
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default HorizantalPlanCard;

const styles = StyleSheet.create({});
