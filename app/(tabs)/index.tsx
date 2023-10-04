/** @format */

import {
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	View,
	useColorScheme,
	TouchableOpacity,
} from "react-native";
import * as React from "react";

import { ThemeText, ThemeView } from "../../components/Themed";
import { Stack, useRouter } from "expo-router";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { Colors } from "../../constants";
import { FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
	const router = useRouter();
	const title = () => {
		return (
			<View>
				<ThemeText style={{ fontSize: 20, fontWeight: "bold" }}>
					Mtoto<Text style={{ color: COLORS.red }}>Sharp</Text>
				</ThemeText>
			</View>
		);
	};
	const colorScheme = useColorScheme();
	const homeData = [
		{
			id: 1,
			name: "create",
			data: [
				{ name: "newPlan", icons: "rocketchat" },
				{ name: "newBook", icons: "deskpro" },
				{ name: "newArticle ", icons: "plus-circle" },
				{ name: "groupProjects ", icons: "plus-circle" },
			],
		},
		{
			id: 2,
			name: "content",
			data: [
				{ name: "plans", icons: "laptop-house" },
				{ name: "articles", icons: "stream" },
				{ name: "books", icons: "book" },
			],
		},

		{
			id: 3,
			name: "connect",
			data: [
				{ name: "comments", icons: "rocketchat" },
				{ name: "appointments", icons: "deskpro" },
			],
		},

		{
			id: 4,
			name: "manage",
			data: [
				{ name: "social", icons: "share-alt" },
				{ name: "wallet", icons: "wallet" },
			],
		},
	];
	return (
		<ThemeView style={styles.container}>
			<Stack.Screen options={{ headerTitle: title }} />
			{/* <SearchBar /> */}

			<FlatList
				data={homeData}
				keyExtractor={(item) => `homeData${item.id}`}
				renderItem={({ item, index }) => (
					<View style={{ width: SIZES.width * 0.8, marginHorizontal: 20, marginVertical: 10 }}>
						<ThemeText
							style={{
								textDecorationStyle: "solid",
								textTransform: "capitalize",
								...FONTS.h3,
								fontWeight: "normal",
								color: COLORS.primary,
							}}>
							{item.name}
						</ThemeText>

						<FlatList
							data={item.data}
							keyExtractor={(dt, index) => `home_data_content${index}`}
							renderItem={({ item, index }) => (
								<TouchableOpacity
									onPress={() => {
										router.push(`${item.name}`);
									}}
									style={{ flexDirection: "row", paddingVertical: SIZES.base }}>
									<FontAwesome5
										name={item.icons}
										size={18}
										color={Colors[colorScheme ?? "dark"].text}
									/>
									<ThemeText style={{ ...FONTS.h3, paddingLeft: SIZES.padding, fontWeight: "normal" }}>
										{item.name}
									</ThemeText>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			/>
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		//width:"100%"
		//backgroundColor: Colors.dark.background,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	card: {
		height: Dimensions.get("window").height / 2,
		backgroundColor: "#fff",
		width: Dimensions.get("window").width - 20,
		borderRadius: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
