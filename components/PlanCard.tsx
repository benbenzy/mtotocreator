/** @format */

import {
	StyleSheet,
	TouchableOpacity,
	View,
	Image,
	useColorScheme,
	ViewProps,
	TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Colors, SIZES } from "../constants";
import { COLORS, FONTS } from "../constants/theme";
import { ThemeText } from "./Themed";
import { Link, useRouter } from "expo-router";
import icons from "../constants/icons";
import { Plan } from "../interface";
import TextIconButton from "./TextIconButton";
import { FontAwesome } from "@expo/vector-icons";
import { usePlanActions } from "../lib/firebae/planActions";

interface props {
	item: Plan;
	containerStyle?: ViewProps["style"];
	onPress: TouchableOpacityProps["onPress"];
	pressdelete: TouchableOpacityProps["onPress"];
	publish: TouchableOpacityProps["onPress"];
	more: TouchableOpacityProps["onPress"];
}
function PlanCard({ item, containerStyle, onPress, pressdelete, publish, more }: props) {
	const router = useRouter();
	const colorScheme = useColorScheme();

	return (
		<View
			style={[styles.container, containerStyle, { borderColor: Colors[colorScheme ?? "dark"].text }]}>
			<TouchableOpacity
				style={{ alignSelf: "center", alignItems: "center", top: 5 }}
				onPress={onPress}>
				{item.thumbnail != "" ? (
					<Image
						style={{ width: SIZES.width - 30, height: 150, maxWidth: 500, borderRadius: SIZES.radius }}
						source={{ uri: item?.thumbnail }}
					/>
				) : (
					<TouchableOpacity disabled>
						<ThemeText>no thumbnail</ThemeText>
						<FontAwesome
							name="image"
							size={100}
							color={Colors[colorScheme ?? "dark"].text}
						/>
					</TouchableOpacity>
				)}

				<ThemeText
					style={{
						alignSelf: "flex-start",
						...FONTS.h3,
						fontWeight: "normal",
						textTransform: "capitalize",
						textDecorationLine: "underline",
					}}>
					{item.title}
				</ThemeText>
				<ThemeText
					numberOfLines={2}
					style={{ ...FONTS.body5 }}>
					{item.description}
				</ThemeText>
			</TouchableOpacity>

			<View
				style={{
					flexDirection: "row",
					marginVertical: SIZES.padding,
					justifyContent: "space-between",
					width: "90%",
				}}>
				<TextIconButton
					icon={"pencil"}
					label="edit"
					containerStyle={undefined}
					labelStyle={undefined}
					iconStyle={{ tintColor: Colors[colorScheme ?? "dark"].tabIconDefault }}
					onPress={undefined}
				/>
				<TextIconButton
					icon={"newspaper-o"}
					label="publish"
					containerStyle={undefined}
					labelStyle={undefined}
					iconStyle={{ tintColor: Colors[colorScheme ?? "dark"].tabIconDefault }}
					onPress={publish}
				/>
				<TextIconButton
					icon={"trash-o"}
					label="delete"
					containerStyle={undefined}
					labelStyle={undefined}
					iconStyle={{ tintColor: Colors[colorScheme ?? "dark"].tabIconDefault }}
					onPress={pressdelete}
				/>
				<TextIconButton
					icon={"dot-circle-o"}
					label="more"
					containerStyle={undefined}
					labelStyle={undefined}
					iconStyle={{ tintColor: Colors[colorScheme ?? "dark"].tabIconDefault }}
					onPress={undefined}
				/>
			</View>
		</View>
	);
}

export default PlanCard;

const styles = StyleSheet.create({
	container: {
		//height: SIZES.height > 750 ? 250 : 200,
		width: SIZES.width - 20,
		maxWidth: 700,
		marginVertical: 10,
		borderWidth: 1,

		alignItems: "center",
		borderRadius: SIZES.radius,
		justifyContent: "center",
		alignSelf: "center",
	},
	main: { alignItems: "center", justifyContent: "center" },
	touchableOPacity: {
		backgroundColor: COLORS.purple,
		height: 120,
		width: SIZES.width * 0.75,
		borderRadius: SIZES.radius,
		//marginLeft: index == 0 ? SIZES.padding : 18,
		//marginRight: index == draftPlans.length - 1 ? SIZES.padding : 0,
		alignItems: "center",
		justifyContent: "center",
		paddingRight: SIZES.radius,
	},
	titleContainer: { alignItems: "center", justifyContent: "center" },
	avatarContainer: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: COLORS.white,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});
