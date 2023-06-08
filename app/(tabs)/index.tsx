import {
	Alert,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { ThemeText, ThemeView } from "../../components/Themed";
//import  selectPlans  from "../../store/plans/planSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	AntDesign,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { clearAll, deletePlan } from "../../store/plans/planSlice";
import { Plan } from "../../interface";
import Colors from "../../constants/Colors";
import HomeCard from "../../components/HomeCard";
import { SIZES } from "../../constants";
import { COLORS } from "../../constants/theme";
import PlanCard from "../../components/HomeComponents/PlanCard";
import BookCard from "../../components/HomeComponents/BookCard";

export default function HomeScreen() {
	const dispatch = useDispatch();
	const router = useRouter();
	const title = () => {
		return (
			<ThemeText style={{ fontSize: 20, fontWeight: "bold" }}>
				Mtoto<Text style={{ color: COLORS.red }}>Sharp</Text>
			</ThemeText>
		);
	};
	return (
		<ThemeView style={styles.container}>
			<Stack.Screen options={{ headerTitle: title }} />
			<ThemeView
				style={{
					flexDirection: "row",
					width: "90%",
					//backgroundColor: ,
					height: 50,
					justifyContent: "space-between",
					alignItems: "center",
					borderRadius: 10,
				}}
			>
				<TextInput
					placeholder="Search your books/plans"
					inlineImageLeft="search"
					style={{
						backgroundColor: "lightgray",
						width: "85%",
						borderRadius: 10,
						height: 40,
					}}
				/>
				<ThemeView
					style={{ borderRadius: 10, backgroundColor: "#FF7754", height: 40 }}
				>
					<Ionicons name="search" size={40} color="#F0DB4F" />
				</ThemeView>
			</ThemeView>
			<PlanCard />
			<BookCard/>
			<TouchableOpacity style={{ position: "absolute", right: 10, bottom: 10 }}>
				<MaterialIcons name="post-add" size={50} color={COLORS.darkBlue}/>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					Alert.alert("clear all", "do you want to clear all plans", [
						{
							text: "cancel",
							onPress: () => {
								return;
							},
						},
						{
							text: "ok",
							onPress: () => {
								dispatch(clearAll());
							},
						},
					]);
				}}
				style={{ position: "absolute", left: 10, bottom: 10 }}
			>
				<ThemeText>clear all</ThemeText>
			</TouchableOpacity>
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
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
