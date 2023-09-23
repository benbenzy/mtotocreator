/** @format */

import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemeView } from "../Themed";
import { SIZES } from "../../constants";

const SearchBar = () => {
	return (
		<ThemeView
			style={{
				flexDirection: "row",
				height: 50,
				alignItems: "center",
				borderRadius: 10,
				alignSelf: "center",
			}}>
			<TextInput
				placeholder="Search your books/plans"
				inlineImageLeft="search"
				style={{
					backgroundColor: "lightgray",
					width: SIZES.width * 0.8,
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
