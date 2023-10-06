/** @format */

import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import { useDispatch } from "react-redux";
import { addContent } from "../store/plans/planSlice";

const PlanEditor = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const params = useSearchParams();
	const { id } = params;
	//console.log("key key", key);
	const [title, setTitle] = useState("");
	const [message, setMessage] = useState("");

	return (
		<View style={styles.main}>
			<View style={{ alignItems: "center", width: "90%" }}>
				<Text style={styles.text}>subtopic</Text>
				<TextInput
					value={title}
					onChangeText={(text) => setTitle(text)}
					autoFocus
					style={styles.input}
					placeholder="Enter subtopic //introduction"
				/>
			</View>
			<View style={{ height: Dimensions.get("window").height - 200, width: "90%" }}>
				<Text style={styles.text}>message</Text>
				<TextInput
					textAlign="left"
					textAlignVertical="top"
					value={message}
					onChangeText={(text) => setMessage(text)}
					multiline
					autoCorrect
					//autoFocus
					style={[styles.input, { flex: 1 }]}
					placeholder="write your content"
				/>
			</View>
			<TouchableOpacity
				onPress={() => {
					const res = dispatch(
						addContent({ planId: id, activity: { title, message, completions: [] } })
					);
					if (res) {
						router.back();
					}
				}}
				disabled={!title || !message}
				style={{
					position: "absolute",
					bottom: 10,
					width: "80%",
					height: 40,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: !title || !message.length ? "lightgray" : "blue",
					borderRadius: 10,
				}}>
				<Text style={styles.text}>Submit</Text>
			</TouchableOpacity>
		</View>
	);
};

export default PlanEditor;

const styles = StyleSheet.create({
	main: { flex: 1, alignItems: "center" },
	text: { color: "white" },
	input: {
		backgroundColor: "white",
		width: "100%",
		height: 50,
		borderRadius: 5,
	},
});
