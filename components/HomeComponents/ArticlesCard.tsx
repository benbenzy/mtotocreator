import {
	Animated,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import * as React from 'react'
import   { useCallback, useEffect, useRef, useState } from "react";
import { SIZES } from "../../constants";
import { COLORS } from "../../constants/theme";
import HomeCard from "../HomeCard";
import { useSelector } from "react-redux";
import { ThemeText } from "../Themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import icons from "../../constants/icons";
import BottomSheet from "../bottomSheet";
import { Plan } from "../../interface";

function ArticlesCard() {
	const router = useRouter();
	const draftPlans = useSelector((state: any) => state.articles.draftArticles);
	const [currentItem, setCurrentItem] = useState<Plan>();
	const [bottonSheeetActive, setBottonSheeetActive] = useState(false);
	//const currentItem = draftPlans[currentItemIndex];
	const FlatListRef = useRef(null);
	const scrollX = useRef(new Animated.Value(0)).current;
	const Dots = () => {
		const dotsPosition = Animated.divide(scrollX, SIZES.width);
		return (
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
				}}
			>
				{draftPlans.map((_item: any, index: number) => {
					const dotColor = dotsPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [COLORS.white, COLORS.primary, COLORS.white],
						extrapolate: "clamp",
					});
					const dotWidth = dotsPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [10, 30, 10],
						extrapolate: "clamp",
					});
					return (
						<Animated.View
							key={`dot-${index}`}
							style={{
								borderRadius: 5,
								width: 10, //dotWidth
								height: 10,
								marginHorizontal: 6,
								backgroundColor: dotColor,
							}}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<>
			{bottonSheeetActive && (
				<BottomSheet
					isVisible={bottonSheeetActive}
					onClose={() => setBottonSheeetActive(false)}
				>
					<View><Text>{currentItem?.title }</Text></View>
				</BottomSheet>
			)}
			{draftPlans.length > 0 ? (
				<HomeCard
					title={"Continue Planning"}
					subheader="showall"
					onpress={() => {}}
					containerStyles={{
						width: "100%",
						//alignSelf:"center",
						//height: SIZES.height / 2,
						//backgroundColor: COLORS.gray,
					}}
				>
					<ThemeText style={{ marginLeft: 20, fontSize: 12 }}>
						you have {draftPlans.length} unpublished article
					</ThemeText>

					<FlatList
						showsHorizontalScrollIndicator={false}
						ref={FlatListRef}
						horizontal
						pagingEnabled
						scrollEventThrottle={16}
						data={draftPlans}
						keyExtractor={(item) => item.key}
						snapToAlignment={"start"}
						//onViewableItemsChanged={onViewableItemsChanged}
						// viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
						// onScroll={Animated.event(
						// 	[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						// 	{ useNativeDriver: false }
						// )}
						renderItem={({ item, index }) => (
							<View style={styles.main}>
								<TouchableOpacity
									onLongPress={() =>{setCurrentItem(item),setBottonSheeetActive(true)}}
									onPress={() => {
										router.push({
											pathname: "/addContent",
											params: { itemKey: item.key },
										});
									}}
									style={[
										styles.touchableOPacity,
										{
											marginLeft: index == 0 ? SIZES.padding : 18,
											marginRight:
												index == draftPlans.length - 1 ? SIZES.padding : 0,
										},
									]}
								>
									<View
								
										style={styles.avatarContainer}
									>
										<Text style={{ fontWeight: "bold", fontSize: 50 }}>
											{item.title.charAt(0)}
										</Text>
									</View>
								</TouchableOpacity>
								<View style={styles.titleContainer}>
									<ThemeText>{item.title}</ThemeText>
								</View>
							</View>
						)}
					/>
				</HomeCard>
			) : (
				<View style={styles.main}>
					<TouchableOpacity
						onPress={() => {
							router.push({
								pathname: "/create",
							});
						}}
						style={styles.touchableOPacity}
					>
						<Ionicons name="add-circle" size={100} color={COLORS.white} />
					</TouchableOpacity>
					<View style={styles.titleContainer}>
						<ThemeText>write your first article </ThemeText>
					</View>
				</View>
			)}
		</>
	);
}

export default ArticlesCard;

const styles = StyleSheet.create({
	main: { alignItems: "center" },
	touchableOPacity: {
		backgroundColor: COLORS.purple,
		height: 120,
		width: SIZES.width * 0.75,
		borderRadius: SIZES.radius,
		//marginLeft: index == 0 ? SIZES.padding : 18,
		//marginRight: index == draftPlans.length - 1 ? SIZES.padding : 0,
		alignItems: "center",
		justifyContent: "center",
		paddingRight: SIZES.radius,
	},
	titleContainer: { alignItems: "center", justifyContent: "center" },
	avatarContainer: {
		height: 100,
		width: 100,
		borderRadius: 50,
		backgroundColor: COLORS.white,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
	},
});
