import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeView } from "../Themed";

const SearchBar = () => {
	return (
		<ThemeView
			style={{
				flexDirection: "row",
				width: "90%",
				//backgroundColor: ,
				height: 50,
				justifyContent: "space-between",
				alignItems: "center",
				borderRadius: 10,
			}}
		>
			<TextInput
				placeholder="Search your books/plans"
				inlineImageLeft="search"
				style={{
					backgroundColor: "lightgray",
					width: "85%",
					borderRadius: 10,
					height: 40,
				}}
			/>
			{/* <ThemeView
				style={{ borderRadius: 10, backgroundColor: "#FF7754", height: 40 }}
			>
				<Ionicons name="search" size={40} color="#F0DB4F" />
			</ThemeView> */}
		</ThemeView>
	);
};

export default SearchBar;

const styles = StyleSheet.create({});
