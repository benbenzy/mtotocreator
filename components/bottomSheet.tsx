import {
	Modal,
	StyleSheet,
	Text,
	View,
	Animated,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { SIZES } from "../constants";
import { COLORS, FONTS } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

//import { SIZES, COLORS, FONTS, icons, images } from "../../constants";
//import { IconButton, TextButton } from "../../Components";

interface params {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const BottonSheet = ({ isVisible, onClose, children }: params) => {
	const modalAnimatedValue = useRef(new Animated.Value(0)).current;

	const [showUploadModal, setShowUploadModal] = useState(isVisible);

	useEffect(() => {
		function unsubscribe() {
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
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							width: "100%",
							justifyContent: "center",
						}}
					>
						<View
							style={{
								height: SIZES.base / 2,
								width: 80,
								backgroundColor: COLORS.black,
								borderRadius: 5,
								alignSelf: "center",
							}}
						><TouchableOpacity onPress={()=>setShowUploadModal(false)}></TouchableOpacity></View>
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
					></View>
				</Animated.View>
			</View>
		</Modal>
	);
};

export default BottonSheet;

const styles = StyleSheet.create({});
