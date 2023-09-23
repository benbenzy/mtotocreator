/** @format */

import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { ThemeText } from "../../components/Themed";
import { COLORS, Colors, FONTS, SIZES, icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import HorizantalPlanCard from "../../components/HorizontalPlanCard";

const Analytics = () => {
	const [data, setData] = React.useState<any>([]);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => {
					return (
						<HorizantalPlanCard
							containerStyle={{ height: 100, width: SIZES.width * 0.8 }}
							item={item}
							onPress={undefined}
							imageStyle={undefined}
							favouritePress={undefined}
						/>
					);
				}}
			/>
		</View>
	);
};

export default Analytics;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	middleContainer: {
		padding: 10,
	},
	textContainer: {
		flexDirection: "row",
	},
	title: { ...FONTS.body5, textTransform: "uppercase" },
});
