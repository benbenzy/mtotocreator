/** @format */

import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Image,
	useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ThemeText, ThemeView } from "../components/Themed";
import icons from "../constants/icons";
import { useSelectedItem } from "../context/SelectedItemContext";
import UploadImage from "../components/uploadImage";
import { usePlanActions } from "../lib/firebae/planActions";
import { useSelector } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Plan } from "../interface";

const addContent = () => {
	const params = useSearchParams();
	const { id, draft } = params;
	console.log("id", id, draft);
	const router = useRouter();
	//const { selectedItem } = useSelectedItem();
	const { selectImage } = usePlanActions();

	const [image, setImage] = React.useState("");
	const [uploadImage, setUploadImage] = React.useState(false);
	const isDarkMode = useColorScheme() === "dark";
	const colorScheme = useColorScheme();
	const [selectedItem, setSelectedItem] = useState<Plan | undefined | any>(undefined);

	const [title, setTitle] = React.useState(selectedItem?.title);
	const [titleEditable, setTitleEditable] = React.useState(false);
	const [desctiption, setDesctiption] = React.useState(selectedItem?.description);
	const [desctiptionEditable, setDesctiptionEditable] = React.useState(false);

	const draftPlans = useSelector((state: any) => state.plans.draftPlans);
	//console.log("draftplans", draftPlans);

	React.useEffect(() => {
		const unsub = () => {
			if (draft) {
				const select = draftPlans.find((item: Plan) => item.key === id);
				console.log("selected ite", select);
				setSelectedItem(select);
				console.log("selected item", selectedItem);
			} else {
				onSnapshot(doc(db, "plans", `${id}`), (snapshot) => {
					if (snapshot.exists()) {
						setSelectedItem(snapshot.data());
					}
				});
			}
		};
		return unsub();
	}, [id, draftPlans]);

	return (
		<ThemeView style={styles.main}>
			{/* <Stack.Screen
				options={{
					title: `${selectedItem?.title}`,
					headerTitle: `${selectedItem?.title}`,
					headerTitleStyle: { color: isDarkMode ? "white" : "black", fontSize: 20 },
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {}}
							disabled={selectedItem?.content?.length < 1}
							style={{
								marginRight: 20,
								backgroundColor:
									selectedItem?.content.length! < 1 ? COLORS.transparentPrimray : COLORS.pink,
								height: 30,
								alignItems: "center",
								justifyContent: "center",
								borderRadius: 10,
							}}>
							<ThemeText style={{ textTransform: "uppercase" }}>publish</ThemeText>
						</TouchableOpacity>
					),
				}}
			/> */}
			<TouchableOpacity
				style={{ alignSelf: "center", alignItems: "center" }}
				onPress={() => {
					setUploadImage(true);
				}}>
				<ThemeText>select thumbnail</ThemeText>
				{selectedItem?.thumbnail != "" ? (
					<Image
						resizeMode="contain"
						style={{ height: 150, width: SIZES.width * 0.8, maxWidth: 400 }}
						source={{ uri: selectedItem?.thumbnail }}
					/>
				) : (
					<FontAwesome
						name="image"
						size={150}
						color={Colors[colorScheme ?? "dark"].text}
					/>
				)}
			</TouchableOpacity>

			<View style={{ maxWidth: 500, alignSelf: "center", width: SIZES.width * 0.8 }}>
				<View style={{}}>
					<View>
						<ThemeText style={{ ...FONTS.h3, fontWeight: "bold" }}>title</ThemeText>

						{!titleEditable && (
							<TouchableOpacity onPress={() => setTitleEditable(true)}>
								<ThemeText style={{ ...FONTS.h3, fontWeight: "bold" }}>{title}</ThemeText>
							</TouchableOpacity>
						)}
						{titleEditable && (
							<TextInput
								editable={titleEditable}
								placeholderTextColor={"black"}
								onChangeText={(text) => {
									setTitle(text);
								}}
								value={title}
								style={{ backgroundColor: Colors[colorScheme ?? "dark"].tabIconDefault, height: 60 }}
							/>
						)}
					</View>
					<View>
						<ThemeText style={{ ...FONTS.body5, fontWeight: "normal" }}>description</ThemeText>
						<TextInput
							editable={desctiptionEditable}
							multiline
							onChangeText={(text) => {
								setDesctiption(text);
							}}
							value={desctiption}
							style={{ backgroundColor: Colors[colorScheme ?? "dark"].tabIconDefault }}
						/>
					</View>

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
					{selectedItem?.description}
				</Text>
			</View>

			{selectedItem?.content?.length > 0 ? (
				<FlatList
					data={selectedItem?.content}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							style={{
								backgroundColor: "lightgray",
								marginTop: index == 0 ? SIZES.padding : SIZES.base,
								flex: 1,
								alignItems: "center",
								alignSelf: "center",
								//justifyContent: "space-between",
								width: SIZES.width * 0.8,
								maxWidth: 500,
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
							params: { id: selectedItem?.id },
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
			{uploadImage && (
				<UploadImage
					isVisible={uploadImage}
					onClose={() => setUploadImage(false)}
					image={image}
					setImageLink={undefined}
					setUploadImage={undefined}
					planId={selectedItem.id}
				/>
			)}
		</ThemeView>
	);
};

export default addContent;

const styles = StyleSheet.create({
	main: { flex: 1 },
	text: { fontSize: 16 },
});
