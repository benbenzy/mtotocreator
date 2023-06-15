import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistedstore } from "../store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(tabs)",
};

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	return (
		<>
			{/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
			{!loaded && <SplashScreen />}
			{loaded && <RootLayoutNav />}
		</>
	);
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();
	const client = new QueryClient()

	return (
		<>
		<QueryClientProvider client={client}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistedstore}>
					<ThemeProvider
						value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
					>
						<Stack screenOptions={{ }}>
							<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
							<Stack.Screen name="modal" options={{ presentation: "containedTransparentModal",headerTitle:"settings" }} />
							<Stack.Screen name="addContent" options={{}}/>
							
						</Stack>
					</ThemeProvider>
				</PersistGate>
			</Provider>
			</QueryClientProvider>
		</>
	);
}
