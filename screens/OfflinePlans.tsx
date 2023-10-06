/** @format */

import { Alert, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemeText, ThemeView } from "../components/Themed";
import { useDispatch, useSelector } from "react-redux";
import PlanCard from "../components/PlanCard";
import { SIZES } from "../constants";
import { useRouter } from "expo-router";
import { deletePlan } from "../store/plans/planSlice";
import { Plan } from "../interface";
interface planItem {
	item: Plan;
	index: number;
}

const OfflinePlans = () => {
	const dispatch = useDispatch();
	const draftPlans = useSelector((state: any) => state.plans.draftPlans);
	const router = useRouter();
	return (
		<ThemeView style={{ flex: 1 }}>
			<FlatList
				data={draftPlans}
				keyExtractor={(item) => `draft-plans${item.id}`}
				renderItem={({ item, index }: planItem) => {
					return (
						<PlanCard
							item={item}
							containerStyle={{ marginBottom: index === draftPlans.length - 1 ? 100 : SIZES.base }}
							onPress={() => {
								router.push({ pathname: "/addContent", params: { id: item.id, draft: true } });
							}}
							pressdelete={() =>
								Platform.OS != "web"
									? Alert.alert("do you want to delete", `${item.title}`, [
											{
												text: "cancel",
												onPress: () => {
													return;
												},
											},
											{ text: "continue", onPress: () => dispatch(deletePlan(item)) },
									  ])
									: confirm(`do you want to delete\n${item.title}`) === true && dispatch(deletePlan(item))
							}
							publish={undefined}
							more={undefined}
						/>
					);
				}}
			/>
		</ThemeView>
	);
};

export default OfflinePlans;

const styles = StyleSheet.create({});
