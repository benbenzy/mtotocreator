/** @format */

import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthSession } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { collection, doc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { ThemeText, ThemeView } from "../components/Themed";
import PlanCard from "../components/PlanCard";

import { useRouter } from "expo-router";
import { useSelectedItem } from "../context/SelectedItemContext";

const PublishedPlans = () => {
	const { user } = useAuthSession();
	const { setItemId, selectedItem } = useSelectedItem();
	const [data, setData] = useState<any>([]);
	const router = useRouter();
	useEffect(() => {
		const ref = query(collection(db, "plans"), where("authorId", "==", user?.id));
		const unsub = onSnapshot(ref, (snapshot) => {
			let plan: any = [];
			snapshot.forEach((doc) => {
				const document = doc.data();
				document.id = doc.id;
				plan.push(document);
			});
			setData(plan);
		});
		console.log("testing", data);

		return () => unsub();
	}, []);
	return (
		<ThemeView style={{ flex: 1 }}>
			<FlatList
				data={data}
				keyExtractor={(item) => `online-plans${item.id}`}
				renderItem={({ item, index }) => {
					return (
						<PlanCard
							item={item}
							onPress={() => {
								router.push({ pathname: "/addContent" }), setItemId(item.id);
							}}
						/>
					);
				}}
			/>
		</ThemeView>
	);
};

export default PublishedPlans;

const styles = StyleSheet.create({});
