/** @format */

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
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addPlan } from "../store/plans/planSlice";
import { Plan } from "../interface";
import { ThemeText, ThemeView } from "../components/Themed";
import { SIZES, icons } from "../constants";
import * as ImagePicker from "expo-image-picker";
import UploadImage from "../components/uploadImage";
import { createPlan } from "../lib/firebae/plan";

const WIDTH = Dimensions.get("window").width;

export default function CreatePlan() {
	const plans = useSelector((state: any) => state.plans.draftPlans);
	const dispatch = useDispatch();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [imageLink, setImageLink] = useState("");
	const [category, setCategory] = useState("uncategorized");
	const [content, setContent] = useState([]);
	const [uploadImage, setUploadImage] = useState(false);
	const [categoryData, setCategoryData] = useState([
		{ id: 1, name: "parenting" },
		{ id: 2, name: "child development" },
		{ id: 3, name: "technology" },
		{ id: 4, name: "business pychology" },
	]);

	interface input {
		title: string;
		placeholder: TextInputProps["placeholder"];
		onChangeText: TextInputProps["onChangeText"];

		value: TextInputProps["value"];
		multiline: TextInputProps["multiline"];
	}

	const plan: Plan = {
		title,
		description,
		image,
		price,
		category,
		content,
	};
	function submitPlan() {
		// dispatch(addPlan(plan));
		createPlan(plan);
	}
	const disabled = !title || !description || !price;
	const selectImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			setUploadImage(true);
		}
	};
	return (
		<ThemeView style={styles.main}>
			{uploadImage && (
				<UploadImage
					setImageLink={setImageLink}
					image={image}
					isVisible={uploadImage}
					setUploadImage={setUploadImage}
					onClose={() => setUploadImage(false)}
				/>
			)}

			<ScrollView>
				<ThemeView>
					<ThemeText style={styles.title}>plan title:</ThemeText>
					<TextInput
						style={styles.input}
						placeholder="Enter Plan Title"
						//onChange={(e)=>{e.preventDefault}}
						value={title}
						onChangeText={(text) => {
							setTitle(text);
						}}
					/>
				</ThemeView>
				<ThemeView>
					<ThemeText style={styles.title}>Description:</ThemeText>
					<TextInput
						style={styles.input}
						placeholder="Describe your plan "
						onChangeText={(text: string) => {
							setDescription(text);
						}}
						value={description}
						multiline={true}
					/>
				</ThemeView>
				<ThemeView>
					<ThemeText style={styles.title}>price:</ThemeText>
					<TextInput
						style={styles.input}
						placeholder="Enter the cost of the plan"
						onChangeText={(text: string) => {
							setPrice(text);
						}}
						value={price}
					/>
				</ThemeView>

				<ThemeView style={{ marginTop: 30 }}>
					<ThemeText style={styles.title}>category:</ThemeText>
					<Picker
						style={{
							backgroundColor: "white",
							width: WIDTH - 20,
							borderRadius: 10,
						}}
						mode="dropdown"
						selectedValue={category}
						onValueChange={(itemValue, itemIndex) => {
							setCategory(itemValue);
						}}>
						{categoryData.map((item, itemIndex) => (
							<Picker.Item
								label={item.name}
								key={itemIndex}
								value={item.name}
							/>
						))}
					</Picker>
				</ThemeView>
			</ScrollView>

			<TouchableOpacity
				disabled={disabled}
				onPress={submitPlan}
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
