/** @format */

import {
	Animated,
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ThemeText, ThemeView } from "../components/Themed";
import PlanCard from "../components/PlanCard";
import { Colors, SIZES } from "../constants";
import { COLORS, FONTS } from "../constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import OfflinePlans from "../screens/OfflinePlans";
import PublishedPlans from "../screens/PublishedPlans";
import OnlinePlans from "../screens/OnlinePlans";
import UploadImage from "../components/uploadImage";

const DraftPlans = () => {
	const router = useRouter();
	const ref = React.useRef<any>();
	const screens = [
		{ id: 1, name: "offline" },
		{ id: 2, name: "online" },
		{ id: 3, name: "published" },
	];
	const [activeScreen, setActiveScreen] = useState("offline");
	const colorScheme = useColorScheme();
	const tabs = screens.map((tab) => ({ ...tab, ref: React.createRef() }));
	const [measureLayout, setMeasureLayout] = React.useState([]);
	const containerRef = React.useRef<any>();
	const onTabPress = React.useCallback((index: number) => {
		ref.current?.scrollToOffset({
			offset: index * SIZES.width,
		});
	}, []);

	React.useEffect(() => {
		let measure: any = [];
		tabs.forEach((tab: any) => {
			tab.ref?.current?.measureLayout(containerRef.current, ({ x, y, width, height }: any) => {
				measure.push({ x, y, width, height });
				if (tabs.length === measure.length) {
					setMeasureLayout(measure);
				}
			});
		});
	}, [containerRef.current]);
	const scrollX = React.useRef(new Animated.Value(0)).current;
	const TabIndicator = () => {
		const inputRange = tabs?.map((_, index) => index * SIZES.width);
		const Tabindicatorwidth = scrollX.interpolate({
			inputRange,
			outputRange: measureLayout?.map((measure: { width: any; height: any }) => measure.width),
		});
		const translateX = scrollX.interpolate({
			inputRange,
			outputRange: measureLayout?.map((measure: { x: any; y: any }) => measure.x),
		});
		return (
			<Animated.View
				style={{
					backgroundColor: COLORS.primary,
					height: 5,
					width: Tabindicatorwidth,
					position: "absolute",
					bottom: 0,
					transform: [{ translateX }],
				}}
			/>
		);
	};
	const switchTabs = () => {
		switch (activeScreen) {
			case "offline":
				return <OfflinePlans />;

			case "online":
				return <PublishedPlans />;
			case "published":
				return <OnlinePlans />;

			default:
				break;
		}
	};
	return (
		<ThemeView style={styles.container}>
			<View
				ref={containerRef}
				style={{ width: SIZES.width, flexDirection: "row" }}>
				{tabs.map((item, index) => {
					return (
						<>
							<TouchableOpacity
								key={`tabs-${index}`}
								onPress={() => setActiveScreen(item.name)}
								//onPress={() => onTabPress(index)}
								style={{
									alignItems: "center",
									justifyContent: "center",
									height: 60,
									paddingHorizontal: 15,
									flex: 1,
								}}>
								<ThemeText
									style={{
										...FONTS.h3,
										fontWeight: activeScreen === item.name ? "bold" : "normal",
										textTransform: "uppercase",
									}}>
									{item.name}
								</ThemeText>
							</TouchableOpacity>
						</>
					);
				})}

				{measureLayout.length > 0 && <TabIndicator />}
			</View>
			{switchTabs()}

			{/* <Animated.FlatList
				ref={ref}
				data={screens}
				contentContainerStyle={{}}
				pagingEnabled
				snapToAlignment={"center"}
				snapToInterval={SIZES.width}
				decelerationRate={"fast"}
				keyboardDismissMode={"on-drag"}
				//showsVerticalScrollIndicator={false}
				onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
					useNativeDriver: false,
				})}
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item) => `draftPlans${item.id}`}
				renderItem={({ item, index }) => {
					return (
						<View style={{ width: SIZES.width }}>
							{index === 0 && <OfflinePlans />}
							{index === 1 && <PublishedPlans />}
							{index === 2 && <ThemeText>{item.name}</ThemeText>}
						</View>
					);
				}}
			/> */}

			<TouchableOpacity
				style={{
					bottom: 10,

					backgroundColor: Colors[colorScheme ?? "dark"].tabIconDefault,
					position: "absolute",
					height: 50,
					width: SIZES.width * 0.8,
					maxWidth: 400,
					alignItems: "center",
					justifyContent: "center",
					borderRadius: 10,
					flexDirection: "row",
				}}
				onPress={() => {
					router.push("/createPlan");
				}}>
				<ThemeText style={{ textTransform: "capitalize" }}>new post</ThemeText>
			</TouchableOpacity>
		</ThemeView>
	);
};

export default DraftPlans;

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: "center" },
	planContainer: {
		height: 200,
		width: SIZES.width,
		flexDirection: "row",
	},
});
