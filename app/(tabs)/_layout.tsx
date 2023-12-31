/** @format */

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return (
		<FontAwesome
			size={22}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				tabBarHideOnKeyboard: true,
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="home"
							color={color}
						/>
					),
					headerRight: () => (
						<Link
							href="/notifications"
							asChild>
							<Pressable>
								{({ pressed }) => (
									<Ionicons
										name="notifications"
										size={25}
										color={Colors[colorScheme ?? "light"].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>

			<Tabs.Screen
				name="analytics"
				options={{
					title: "analytics",
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="bar-chart"
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="content"
				options={{
					title: "Met",
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							name="connectdevelop"
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
