import {
	Alert,
	Button,
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import * as React from "react";

import EditScreenInfo from "../../components/EditScreenInfo";
import { ContainerView, ThemeText, ThemeView } from "../../components/Themed";
//import  selectPlans  from "../../store/plans/planSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	AntDesign,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { clearAll, deletePlan } from "../../store/plans/planSlice";
import { Plan } from "../../interface";
import Colors from "../../constants/Colors";
import HomeCard from "../../components/HomeCard";
import { SIZES } from "../../constants";
import { COLORS } from "../../constants/theme";
import PlanCard from "../../components/HomeComponents/PlanCard";
import BookCard from "../../components/HomeComponents/BookCard";
import SearchBar from "../../components/HomeComponents/SearchBar";
import AnalyticsCard from "../../components/HomeComponents/analyticsCard";
import ArticlesCard from "../../components/HomeComponents/ArticlesCard";
import { TOKEN } from "../../lib/api/config";

export default function HomeScreen() {
	

	const title = () => {
		return (
			<ThemeText style={{ fontSize: 20, fontWeight: "bold" }}>
				Mtoto<Text style={{ color: COLORS.red }}>Sharp</Text>
			</ThemeText>
		);
	};
	return (
		<ThemeView style={styles.container}>
			<Stack.Screen options={{ headerTitle: title }} />
			<SearchBar />
			
			<ScrollView
				contentContainerStyle={{
					alignSelf: "center",
					//alignItems: "center",
					//justifyContent: 'center',
					//width:"100%",
				}}
			>
				<HomeCard
					title="progress"
					subheader="This month"
					subheaderStyles={{ fontSize: 10 }}
					onpress={undefined}
					containerStyles={{ width: "95%" }}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<AnalyticsCard
							title={"plans"}
							data={"300"}
							dataDescription={"enrollment"}
						/>
						<AnalyticsCard
							title={"books"}
							data={"200"}
							dataDescription={"purchases"}
						/>
					</View>
				</HomeCard>
				<ArticlesCard />
				<PlanCard />
				<BookCard />
			</ScrollView>
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		//width:"100%"
		//backgroundColor: Colors.dark.background,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	card: {
		height: Dimensions.get("window").height / 2,
		backgroundColor: "#fff",
		width: Dimensions.get("window").width - 20,
		borderRadius: 20,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
