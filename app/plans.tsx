/** @format */

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { ThemeText, ThemeView } from "../components/Themed";
import PlanCard from "../components/HomeComponents/PlanCard";
import HorizantalPlanCard from "../components/HorizontalPlanCard";
import { COLORS, SIZES } from "../constants";
import { FONTS, isDarkMode } from "../constants/theme";

const DraftPlans = () => {
	const draftPlans = useSelector((state: any) => state.plans.draftPlans);
	return (
		<ThemeView style={styles.container}>
			<FlatList
				data={draftPlans}
				keyExtractor={(item) => `draftPlans${item.key}`}
				ItemSeparatorComponent={() => <ThemeView style={{ height: 2, width: SIZES.width }} />}
				renderItem={({ item, index }) => {
					return (
						<View style={styles.planContainer}>
							<View
								style={{
									width: "30%",
									height: "100%",
									alignItems: "center",
									justifyContent: "center",
									backgroundColor: COLORS.purple,
									borderRadius: SIZES.radius,
								}}>
								<View
									style={{
										width: 100,
										height: 100,
										borderRadius: 50,
										backgroundColor: "white",
										alignItems: "center",
										justifyContent: "center",
									}}>
									<Text>{item.title.charAt(0).toUpperCase()}</Text>
								</View>
							</View>
							<View style={{ width: "100%" }}>
								<ThemeText>{item.title}</ThemeText>
								<TouchableOpacity
									style={{
										position: "absolute",
										backgroundColor: "black",
										alignItems: "center",
										justifyContent: "center",
										height: 50,
										width: 100,
										bottom: 10,
										right: 10,
										borderRadius: SIZES.radius,
									}}>
									<Text style={{ textTransform: "uppercase", color: "white" }}>edit</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				}}
			/>
		</ThemeView>
	);
};

export default DraftPlans;

const styles = StyleSheet.create({
	container: { flex: 1 },
	planContainer: {
		height: 200,
		width: SIZES.width,
		flexDirection: "row",
	},
});
