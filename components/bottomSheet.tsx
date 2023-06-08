import {
	Modal,
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";

//import { SIZES, COLORS, FONTS, icons, images } from "../../constants";
//import { IconButton, TextButton } from "../../Components";

const UploadModal = ({ isVisible, onClose }) => {
	const modalAnimatedValue = useRef(new Animated.Value(0)).current;

	const [showUploadModal, setShowUploadModal] = useState(isVisible);

	useEffect(() => {
		function unsubscribe(params) {
			if (showUploadModal) {
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
		}
		unsubscribe();
	}, [showUploadModal]);

	const modalY = modalAnimatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [SIZES.height, SIZES.height - 500],
	});
	return (
		<Modal animationType="fade" transparent visible={isVisible}>
			<View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
				{/* transparent background*/}
				<TouchableWithoutFeedback
					style={{}}
					onPress={() => setShowUploadModal(false)}
				>
					<View
						style={{
							position: "absolute",
							top: 0,
							bottom: 0,
							right: 0,
							left: 0,
						}}
					></View>
				</TouchableWithoutFeedback>
				<Animated.View
					style={{
						position: "absolute",
						top: modalY,
						left: 0,
						width: "100%",
						height: "100%",
						padding: SIZES.padding,
						borderTopRightRadius: SIZES.padding,
						borderTopLeftRadius: SIZES.padding,
						backgroundColor: COLORS.white,
					}}
				>
					{/* header */}
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text
							style={{
								flex: 1,
								...FONTS.h3,
								fontSize: 16,
								textTransform: "uppercase",
							}}
						>
							Upload Book POster
						</Text>
						<IconButton
							containerStyle={{
								borderRadius: 10,
								borderWidth: 2,
								color: COLORS.lightGray2,
							}}
							icon={icons.cross}
							iconStyle={{
								tintColor: COLORS.gray2,
							}}
							onPress={() => setShowUploadModal(false)}
						/>
					</View>
					{children}

					<View
						style={{
							position: "absolute",
							bottom: 150,
							right: 0,
							left: 0,
							height: 100,
							paddingHorizontal: SIZES.padding,
							paddingVertical: SIZES.radius,
							backgroundColor: COLORS.white,
						}}
					>
						<TextButton
							disabled={isLoading}
							isLoading={isLoading}
							label2={progress}
							label={ButtonLabel}
							buttonContainerStyle={{
								height: 50,
								borderRadius: SIZES.base,
								backgroundColor: isLoading
									? COLORS.transparentPrimray
									: COLORS.primary,
							}}
							onPress={onPress}
						/>
					</View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default UploadModal;

const styles = StyleSheet.create({});
