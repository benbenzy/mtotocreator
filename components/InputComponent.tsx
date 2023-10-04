/** @format */

import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { ThemeView, ThemeText } from "./Themed";
import { SIZES } from "../constants";
interface input {
	title: string;
	placeholder: TextInputProps["placeholder"];

	value: TextInputProps["value"];

	setValue: any;
	textInputProps?: TextInputProps;
}

const InputComponent = ({ setValue, placeholder, value, title, textInputProps }: input) => {
	return (
		<ThemeView style={styles.container}>
			<ThemeText style={styles.title}>{title}:</ThemeText>
			<TextInput
				{...textInputProps}
				style={styles.input}
				placeholder={placeholder}
				onChangeText={(text: string) => {
					setValue(text);
				}}
				value={value}
			/>
		</ThemeView>
	);
};

export default InputComponent;

const styles = StyleSheet.create({
	container: {
		marginVertical: SIZES.base,
	},
	title: {
		fontSize: 15,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	input: {
		borderWidth: 1,

		borderColor: "black",
		backgroundColor: "#fff",
		width: SIZES.width - 20,
		height: 60,
		borderRadius: 10,
	},
});
