import {
	Dimensions,
	StyleSheet,
	TextInput,
	TextInputProps,
	TouchableOpacity,
	TouchableOpacityProps,
	FlatList,
} from "react-native";
import { ThemeText, ThemeView } from "../../components/Themed";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import CreatePlan from "../../screens/createPlan";
import CreateBook from "../../screens/createBook";

const screens = [
	{ id: 1, name: "plan" },
	{ id: 2, name: "book" },
];
interface actiontabs {
	active: string;
	setactive: any;
}
function SwitchTabs({ active, setactive }: actiontabs) {
	return (
		<ThemeView style={{ width: "100%" }}>
			<FlatList
				horizontal
				contentContainerStyle={{ justifyContent: "center", flex: 1 }}
				data={screens}
				renderItem={({ item, index }) => (
					<ThemeView style={{ alignItems: "center" }}>
						<TouchableOpacity
							style={{
								marginHorizontal: 20,
							}}
							onPress={() => setactive(item.name)}
						>
							<ThemeText
								style={{
									color: "white",
									textTransform: "uppercase",
									fontWeight: item.name == active ? "bold" : "normal",
								}}
							>
								{item.name}
							</ThemeText>
						</TouchableOpacity>
						{active == item.name && (
							<ThemeView
								style={{ height: 3, width: 50, backgroundColor: "white" }}
							/>
						)}
					</ThemeView>
				)}
			/>
		</ThemeView>
	);
}

export default function CreateScreen() {
	const [active, setActive] = useState("plan");
	function DisplayEditor() {
		switch (active) {
			case "plan":
				return <CreatePlan />;

			case "book":
				return <CreateBook />;

			default:
				break;
		}
	}

	return (
		<ThemeView style={styles.container}>
			<SwitchTabs active={active} setactive={setActive} />
			{DisplayEditor()}
		</ThemeView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		//justifyContent: "center",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});