/** @format */

import {
	Dimensions,
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter, useSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { Plan } from "../interface";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import { ThemeText, ThemeView } from "../components/Themed";
import icons from "../constants/icons";
import * as plans from "../lib/firebae/plan";

const addContent = () => {
	const params = useSearchParams();
	const router = useRouter();
	const { itemKey } = params;
	const isDarkMode = useColorScheme() === "dark";
	//const itemKey = 1;
	//const [first, setfirst] = useState<Plan>();
	const [selectedItem, setSelectedItem] = useState();
	const item = useSelector((state: any) => state.plans.draftPlans);
	const currentItem = item.filter((plan: any) => plan.key == itemKey);
	console.log("current item", currentItem);

	return (
		<View style={styles.main}>
			<Stack.Screen
				options={{
					title: `${currentItem[0]?.title}`,
					headerTitle: `${currentItem[0]?.title}`,
					headerTitleStyle: { color: isDarkMode ? "white" : "black", fontSize: 20 },
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {
								plans.createPlan(currentItem).catch((error) => {
									console.log("creating error", error);
								});
							}}
							disabled={currentItem[0]?.content.lenth < 1}
							style={{
								marginRight: 20,
								backgroundColor:
									currentItem[0]?.content.length! < 1 ? COLORS.transparentPrimray : COLORS.pink,
								height: 30,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
							}}>
							<ThemeText style={{ textTransform: "uppercase" }}>publish</ThemeText>
						</TouchableOpacity>
					),
				}}
			/>
			<View
				style={{
					backgroundColor: COLORS.purple,
					height: 130,
					width: SIZES.width * 0.8,
					maxWidth: 400,
					alignSelf: "center",
					borderRadius: SIZES.radius,
					alignItems: "center",
					justifyContent: "center",
				}}>
				{currentItem?.image == "" ? (
					<View
						style={{
							backgroundColor: COLORS.white2,
							width: 100,
							height: 100,
							borderRadius: 100,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Text
							style={{
								color: "black",
								alignSelf: "center",
								fontSize: 40,
								fontWeight: "bold",
							}}>
							{currentItem[0]?.title.charAt(0)}
						</Text>
					</View>
				) : (
					<View
						style={{
							backgroundColor: COLORS.white2,
							width: 100,
							height: 100,
							borderRadius: 100,
							alignItems: "center",
							justifyContent: "center",
						}}>
						<Image
							source={icons.My_Books}
							resizeMode="contain"
							style={{ width: 100, height: 100, borderRadius: 100 }}
						/>
					</View>
				)}
			</View>

			<View style={{ maxWidth: 400, alignSelf: "center", width: SIZES.width * 0.8 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Text style={[styles.text, { textDecorationLine: "underline" }]}>Desctiption</Text>
					<TouchableOpacity style={{ flexDirection: "row" }}>
						<Image
							source={icons.filter}
							style={{ height: 20, width: 20, tintColor: COLORS.primary1 }}
						/>
						<ThemeText>Edit</ThemeText>
					</TouchableOpacity>
				</View>
				<Text
					numberOfLines={4}
					style={[styles.text, { fontSize: 13 }]}>
					{currentItem[0]?.description}
				</Text>
			</View>

			{currentItem[0]?.content.length > 0 ? (
				<FlatList
					data={currentItem[0]?.content}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={{
								backgroundColor: "lightgray",
								marginTop: SIZES.base,
								flex: 1,
								alignItems: "center",
								alignSelf: "center",
								//justifyContent: "space-between",
								width: "90%",
								borderRadius: 10,
								flexDirection: "row",
								height: 50,
							}}>
							<Ionicons
								name="ios-radio-button-on-outline"
								size={28}
								style={{ marginLeft: 10 }}
								color={COLORS.primary}
							/>

							<Text
								numberOfLines={1}
								style={[styles.text, { marginLeft: 20 }]}>
								{item.title}
							</Text>

							<Ionicons
								name="play-circle"
								size={28}
								color={COLORS.primary}
								style={{ position: "absolute", right: 10 }}
							/>
						</TouchableOpacity>
					)}
				/>
			) : (
				<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
					<Text style={[styles.text, { textTransform: "capitalize" }]}>your plan has no content</Text>
				</View>
			)}
			<ThemeView
				style={{
					width: SIZES.width * 0.8,
					height: 50,
					alignItems: "center",
					maxWidth: 400,
					alignSelf: "center",
				}}>
				<TouchableOpacity
					onPress={() => {
						router.push({
							pathname: "/planEditor",
							params: { key: currentItem[0].key },
						});
					}}
					style={{
						width: "80%",
						position: "absolute",
						height: 40,
						bottom: 10,
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 10,
						flexDirection: "row",
						backgroundColor: COLORS.primary,
					}}>
					<Ionicons
						name="add"
						size={20}
						color={COLORS.white}
					/>
					<Text style={[styles.text, { textTransform: "uppercase" }]}>add content</Text>
				</TouchableOpacity>
			</ThemeView>
		</View>
	);
};

export default addContent;

const styles = StyleSheet.create({
	main: { flex: 1 },
	text: { fontSize: 16 },
});
