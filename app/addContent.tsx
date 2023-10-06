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
import React, { useCallback, useState } from "react";
import { Stack, useRouter, useSearchParams } from "expo-router";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { ThemeText, ThemeView } from "../components/Themed";
import icons from "../constants/icons";
import { useSelectedItem } from "../context/SelectedItemContext";
import UploadImage from "../components/uploadImage";
import { usePlanActions } from "../lib/firebae/planActions";
import { useDispatch, useSelector } from "react-redux";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Plan } from "../interface";
import { deleteContent, deletePlan, updatePlan } from "../store/plans/planSlice";

const addContent = () => {
	const params = useSearchParams();
	const { id, draft } = params;
	console.log("id", id, draft);
	const router = useRouter();
	//const { selectedItem } = useSelectedItem();
	const { selectImage, createPlan, uploadImage } = usePlanActions();
	const dispatch = useDispatch();

	const [image, setImage] = React.useState("");
	//const [uploadImage, setUploadImage] = React.useState(false);
	const isDarkMode = useColorScheme() === "dark";
	const colorScheme = useColorScheme();

	const [selectedItem, setSelectedItem] = useState<Plan | undefined | any>({});
	const [editable, setEditable] = useState(false);
	const [footerHeight, setFooterHeight] = useState(60);

	const draftPlans = useSelector((state: any) => state.plans?.draftPlans);

	const handleTitleChange = (text: string) => {
		setSelectedItem({ ...selectedItem, title: text });
	};

	const handleDescriptionChange = (text: string) => {
		setSelectedItem({ ...selectedItem, description: text });
	};
	const unsub = useCallback(() => {
		if (draft && id) {
			const epr = draftPlans.find((item: Plan) => item.id === id);
			setSelectedItem(epr);
			console.log(selectedItem);
		} else {
			onSnapshot(doc(db, "plans", `${id}`), (snapshot) => {
				if (snapshot.exists()) {
					setSelectedItem(snapshot.data());
				}
			});
		}
	}, [id, draftPlans]);

	React.useEffect(() => {
		unsub();
	}, [id,draftPlans]);

	return (
		<ThemeView style={styles.main}>
			<Stack.Screen
				options={{
					title: `${selectedItem?.title}`,
					headerTitle: `${selectedItem?.title}`,
					headerTitleStyle: { color: isDarkMode ? "white" : "black", fontSize: 20 },
					headerRight: () => (
						<View>
							{editable ? (
								<TouchableOpacity
									onPress={() => {
										dispatch(updatePlan(selectedItem));
									}}
									style={{
										marginRight: 20,
										backgroundColor: COLORS.blue,
										height: 30,
										width: 100,
										alignItems: "center",
										justifyContent: "center",
										borderRadius: 10,
									}}>
									<ThemeText style={{ textTransform: "uppercase" }}>save</ThemeText>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									onPress={() => {
										createPlan(selectedItem)
											.then((res: any) => {
												if (res) {
													uploadImage({ image, planId: res });
												}
											})
											.catch((error: any) => {
												console.log("error posting", error);
											});
									}}
									disabled={selectedItem?.content?.length < 1}
									style={{
										marginRight: 20,
										backgroundColor:
											selectedItem?.content?.length < 1 ? COLORS.transparentPrimray : COLORS.pink,
										height: 30,
										alignItems: "center",
										justifyContent: "center",
										borderRadius: 10,
									}}>
									<ThemeText style={{ textTransform: "uppercase" }}>publish</ThemeText>
								</TouchableOpacity>
							)}
						</View>
					),
				}}
			/>
			<TouchableOpacity
				style={{ alignSelf: "center", alignItems: "center" }}
				onPress={() => {
					selectImage()
						.then((res: any) => {
							setSelectedItem({ ...selectedItem, thumbnail: res });
						})
						.then(() => {
							dispatch(updatePlan(selectedItem));
						})
						.catch((error: any) => {
							alert(error);
						});
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
					<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
						<ThemeText style={{ ...FONTS.h3, fontWeight: "bold" }}>title</ThemeText>
						<TouchableOpacity
							onPress={() => setEditable(!editable)}
							style={{ flexDirection: "row" }}>
							<Image
								source={icons.filter}
								style={{ height: 20, width: 20, tintColor: COLORS.primary1 }}
							/>
							<ThemeText>{!editable ? " Edit" : "cancel"}</ThemeText>
						</TouchableOpacity>
					</View>

					<TextInput
						editable={editable}
						//placeholderTextColor={"black"}
						onChangeText={(text) => {
							handleTitleChange(text);
						}}
						autoFocus
						value={selectedItem?.title}
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: Colors[colorScheme ?? "dark"].tabIconDefault,
							height: 50,
						}}
					/>

					<View>
						<ThemeText style={{ ...FONTS.body5, fontWeight: "normal" }}>description</ThemeText>
						<TextInput
							editable={editable}
							multiline
							autoFocus
							onChangeText={(text) => {
								handleDescriptionChange(text);
							}}
							value={selectedItem?.description}
							onContentSizeChange={(e) => {
								const height = e.nativeEvent.contentSize.height;
								if (height <= 60) {
									setFooterHeight(60);
								} else if (height > 60 && height <= 100) {
									setFooterHeight(height);
								} else if (height > 100) {
									setFooterHeight(100);
								}
							}}
							style={{
								borderWidth: 1,
								borderColor: Colors[colorScheme ?? "dark"].tabIconDefault,
								flex: 1,
								height: footerHeight,
							}}
						/>
					</View>
				</View>
			</View>

			{selectedItem?.content?.length > 0 ? (
				<FlatList
					data={selectedItem?.content}
					renderItem={({ item, index }) => (
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								width: "100%",
							}}>
							<TouchableOpacity
								style={{
									backgroundColor: "lightgray",
									marginTop: index == 0 ? SIZES.padding : SIZES.base,
									flex: 1,
									alignItems: "center",
									//alignSelf: "center",
									//justifyContent: "space-between",
									//width: "80%",
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
							<TouchableOpacity
								onPress={() => dispatch(deleteContent({ id: selectedItem.id, item }))}
								style={{
									alignItems: "center",
									justifyContent: "center",
									position: "relative",
									right: -10,
								}}>
								<FontAwesome
									name="trash"
									size={24}
									color={COLORS.primary}
								/>
							</TouchableOpacity>
						</View>
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
					onClose={() => {}}
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
