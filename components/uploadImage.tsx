/** @format */

import {
	Animated,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Image,
} from "react-native";

import React, { useState, useEffect, useRef } from "react";
import { SIZES, constants, COLORS, FONTS, icons } from "../constants";

import { ThemeText } from "./Themed";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { usePlanActions } from "../lib/firebae/planActions";

interface props {
	isVisible: boolean;

	onClose: () => void;
	image: string;
	setImageLink: any;
	setUploadImage: any;
	planId: string;
}

const UploadImage = ({ isVisible, onClose, setImageLink, setUploadImage, planId }: props) => {
	const { uploadImage, selectImage } = usePlanActions();
	const [image, setImage] = React.useState("");

	const modalAnimatedValue = useRef(new Animated.Value(0)).current;

	const [showFilterModal, setShowFilterModal] = useState(isVisible);
	const [progress, setProgress] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (showFilterModal) {
			Animated.timing(modalAnimatedValue, {
				toValue: 1,
				duration: 500,
				useNativeDriver: false,
			}).start();
		} else {
			Animated.timing(modalAnimatedValue, {
				toValue: 0,
				duration: 500,
				useNativeDriver: false,
			}).start(() => onClose());
		}
	}, [showFilterModal]);

	const modalY = modalAnimatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [SIZES.height, SIZES.height - 500],
	});

	return (
		<Modal
			animationType="fade"
			transparent
			visible={isVisible}>
			<View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
				{/* transparent background*/}
				<TouchableWithoutFeedback
					style={{}}
					onPress={() => setShowFilterModal(false)}>
					<View
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							right: 0,
							left: 0,
						}}></View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={{
						position: "absolute",
						top: modalY,
						left: 0,
						right: 0,
						height: "100%",
						width: SIZES.width,
						padding: SIZES.padding,
						borderTopRightRadius: SIZES.padding,
						borderTopLeftRadius: SIZES.padding,
						backgroundColor: COLORS.white,
					}}>
					{image != "" ? (
						<Image
							source={{ uri: image }}
							resizeMode="contain"
							style={{ height: 250, width: SIZES.width * 0.8 }}
						/>
					) : (
						<View style={{ alignItems: "center", alignSelf: "center" }}>
							<ThemeText style={{ ...FONTS.h3, fontWeight: "normal" }}>upload thumbnail</ThemeText>
							<TouchableOpacity
								onPress={() => {
									selectImage().then((res) => {
										console.log(res);
										setImage(res);
									});
								}}>
								<FontAwesome
									name="image"
									size={150}
								/>
							</TouchableOpacity>
						</View>
					)}

					<View
						style={{
							position: "absolute",
							bottom: 250,
							right: 0,
							left: 0,
							height: 100,
							paddingHorizontal: SIZES.padding,
							paddingVertical: SIZES.radius,
							backgroundColor: COLORS.white,
							alignItems: "center",
						}}>
						<Text style={{ color: COLORS.red }}>{error}</Text>
						{image != "" && (
							<TouchableOpacity
								onPress={() => {
									try {
										uploadImage(image, planId).then((res) => {
											console.log(res);
										});
									} catch (error) {
										console.log(error);
									}
								}}
								style={{
									alignSelf: "center",
									alignItems: "center",
									justifyContent: "center",
									height: 50,
									width: SIZES.width * 0.8,
									backgroundColor: COLORS.primary,
								}}>
								<Text>Upload Image</Text>
							</TouchableOpacity>
						)}
						<Text>{progress}</Text>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default UploadImage;

const styles = StyleSheet.create({});
