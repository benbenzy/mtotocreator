import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
    Image
} from "react-native";
import React from "react";
import { ThemeText } from "../../components/Themed";
import { COLORS, Colors, FONTS, SIZES, icons } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { fetchPlans } from "../../lib/api/plan";

const Analytics = () => {
	const plans = [1, 2, 3, 4, 5, 6,7,8,9,1,2,3,4,];

	const {data}=useQuery({
		queryKey:["publishedPlans"],
		queryFn:fetchPlans
	})
	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity style={{ flexDirection: "row",width:"90%",maxWidth:300 }}>
							<View
								style={{
									width: 100,
									height: 100,
									backgroundColor: COLORS.purple,
									alignItems: "center",
									justifyContent: "center",
									borderRadius: SIZES.radius,
									marginVertical: 5,
									marginHorizontal: 10,
								}}
							>
								<View
									style={{
										height: 75,
										width: 75,
										borderRadius: 100,
										backgroundColor: COLORS.white,
									}}
								>
									<Text
										style={{
											textTransform: "uppercase",
											color: COLORS.black,
											fontSize: 50,
											alignSelf: "center",
										}}
									>
										t
									</Text>
								</View>
							</View>
							<View style={styles.middleContainer}>
								<View style={styles.textContainer}>
									<ThemeText style={styles.title}>Title: </ThemeText>
									<ThemeText
										style={styles.title}
									>
										this is title
									</ThemeText>
								</View>
								<View style={styles.textContainer}>
									<ThemeText style={styles.title}>description:</ThemeText>
									<ThemeText
                                    numberOfLines={1}
										style={{textTransform:"lowercase"}}
									>
										this is title
									</ThemeText>
								</View>
                                <View style={styles.textContainer}>
									<ThemeText style={styles.title}>price:</ThemeText>
									<ThemeText
                                    numberOfLines={1}
										style={{textTransform:"lowercase"}}
									>
										<Text>Ksh </Text>700
									</ThemeText>
								</View>
							</View>
                            <View style={{height:100}}>
                                <Image source={icons.calories} style={{height:30,width:30,alignSelf:"flex-start",top:0}}/>
                               <Ionicons name="ellipsis-horizontal-circle" size={30} color={COLORS.gray} style={{alignSelf:"baseline",bottom:0}} />
                            </View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default Analytics;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
    middleContainer:{
        padding:10
    },
	textContainer: {
		flexDirection: "row",
		
	},
	title: { ...FONTS.body5, textTransform: "uppercase" },
});
