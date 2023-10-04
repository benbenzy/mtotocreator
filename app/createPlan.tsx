/** @format */ /** @format */

import {
	Dimensions,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	View,
	Image,
	Alert,
	useColorScheme,
	ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addPlan } from "../store/plans/planSlice";
import { Plan } from "../interface";
import { ThemeText, ThemeView } from "../components/Themed";
import { COLORS, Colors, FONTS, SIZES, icons } from "../constants";

import UploadImage from "../components/uploadImage";
import InputComponent from "../components/InputComponent";
import { FontAwesome } from "@expo/vector-icons";
import { usePlanActions } from "../lib/firebae/planActions";
import { useRouter } from "expo-router";

const WIDTH = Dimensions.get("window").width;

export default function CreatePlan() {
	const colorScheme = useColorScheme();
	const plans = useSelector((state: any) => state.plans.draftPlans);
	const dispatch = useDispatch();
	const [planId, setPlanId] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("0");
	const [image, setImage] = useState("");
	const [progress, setProgress] = useState(false);
	const [category, setCategory] = useState("uncategorized");
	const [content, setContent] = useState([]);
	const [error, setError] = useState("");

	const [chooseCategory, setChooseCategory] = useState(false);
	const [categoryData, setCategoryData] = useState([
		{ id: 1, name: "parenting" },
		{ id: 2, name: "child development" },
		{ id: 3, name: "technology" },
		{ id: 4, name: "business pychology" },
	]);

	const { createPlan, selectImage, uploadImage } = usePlanActions();
	const plan: Plan = {
		title,
		description,
		image,
		price,
		category,
		content,
	};
	const router = useRouter();
	function submitPlan() {
		// dispatch(addPlan(plan));
		setProgress(true);
		createPlan(plan)
			.then((res: React.SetStateAction<string>) => {
				setPlanId(res);
				setProgress(false);
				console.log(planId);
			})
			.then(() => {
				router.replace({ pathname: "/addContent", params: { id: planId } });
			})

			.catch((err: any) => {
				Alert.alert("error publishing post", err);
				setProgress(false);
			});
	}
	const disabled = !title || !description || !price;

	return (
		<ThemeView style={styles.main}>
			{progress && (
				<ActivityIndicator
					size={"large"}
					color={COLORS.primary}
					animating={progress}
				/>
			)}

			<ThemeText style={{ color: "red" }}>{error}</ThemeText>
			<ScrollView>
				<InputComponent
					title={"title"}
					placeholder={"plan Title"}
					value={title}
					setValue={setTitle}
				/>
				<InputComponent
					title={"description"}
					placeholder={"plan description"}
					value={description}
					setValue={setDescription}
				/>
				<InputComponent
					title={"price"}
					placeholder={"price"}
					value={price}
					setValue={setPrice}
					textInputProps={{ keyboardType: "numeric" }}
				/>
				<View>
					<ThemeText style={{ textTransform: "uppercase", ...FONTS.h3, fontWeight: "normal" }}>
						Category :
					</ThemeText>
					<TouchableOpacity
						style={{
							backgroundColor: Colors[colorScheme ?? "dark"].tabIconDefault,
							height: 60,
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
						onPress={() => {
							setChooseCategory(!chooseCategory);
						}}>
						<ThemeText style={{}}>{category}</ThemeText>
						<FontAwesome
							name="sort-down"
							size={24}
							color={Colors[colorScheme ?? "dark"].text}
						/>
					</TouchableOpacity>
					{chooseCategory && (
						<View style={{ position: "relative" }}>
							{categoryData.map((item, index) => {
								return (
									<TouchableOpacity
										key={`drop_item${item.id}`}
										onPress={() => {
											setCategory(item.name), setChooseCategory(false);
										}}
										style={{ marginVertical: 5 }}>
										<ThemeText>{item.name}</ThemeText>
									</TouchableOpacity>
								);
							})}
						</View>
					)}
				</View>
				<View style={{ height: 200 }} />
			</ScrollView>
			<TouchableOpacity
				disabled={disabled}
				onPress={
					() => {
						dispatch(addPlan(plan));
					}
					//submitPlan
				}
				style={[styles.button, { backgroundColor: disabled ? "lightgray" : "white" }]}>
				<ThemeText style={[styles.title, { color: disabled ? "white" : "black" }]}>continue</ThemeText>
			</TouchableOpacity>
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		alignItems: "center",
		//justifyContent: "center",
	},
	title: {
		fontSize: 15,
		fontWeight: "bold",
		textTransform: "uppercase",
		color: "white",
	},
	input: {
		backgroundColor: "#fff",
		width: Dimensions.get("window").width - 20,
		height: 50,
		borderRadius: 10,
	},
	button: {
		position: "absolute",
		bottom: 5,
		backgroundColor: "lightgrey",
		borderRadius: 10,
		width: WIDTH - 20,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},

	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
