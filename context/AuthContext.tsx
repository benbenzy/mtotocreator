/** @format */

import React, { createContext, PropsWithChildren } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";

type UserType = {
	email: string;
	name: string;
	phone: string;
};

const AuthProvider = createContext<UserType | null | undefined | any>({ user: null });

export const AuthSessionProvider = ({ children }: PropsWithChildren) => {
	const [userId, setUserId] = React.useState<string | undefined>("");
	const [user, setUser] = React.useState<UserType | null | undefined>(null);
	const segment = useSegments();
	const navigationState = useRootNavigationState();
	const router = useRouter();

	onAuthStateChanged(auth, (u) => {
		setUserId(u?.uid);
	});
	React.useEffect(() => {
		if (!navigationState?.key) {
			return;
		}
		const isAuthGroup = segment["0"] === "(auth)";
		if (!isAuthGroup && !user) {
			router.replace("/sign-in");
		}
		if (isAuthGroup && user) {
			router.replace("/");
		}
	}, [user, segment, navigationState?.key]);
	// get user from local storage

	React.useEffect(() => {
		const unsub = async () => {
			const localUser = await AsyncStorage.getItem("localUser");
			if (localUser) {
				setUser(JSON.parse(localUser));
			} else if (userId !== "") {
				try {
					const dt = await getDoc(doc(db, "Users", `${userId}`));
					if (dt.exists()) {
						await AsyncStorage.setItem("localUser", JSON.stringify(dt.data())).then(async () => {
							const loade = await AsyncStorage.getItem("localUser");
							if (loade) {
								setUser(JSON.parse(loade));
							}
						});
						//setUser(dt.data());
					}
				} catch (error) {
					console.error(error);
				}
			}
		};
		unsub();
	}, [userId]);

	return <AuthProvider.Provider value={{ user }}>{children}</AuthProvider.Provider>;
};

export const useAuthSession = () => React.useContext(AuthProvider);
