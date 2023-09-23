/** @format */

// Import the functions you need from the SDKs you need
import firebase, { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import * as firebaseAuth from "firebase/auth";
import { initializeAuth, getReactNativePersistence, browserLocalPersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
//import { ReactNativeAsyncStorage } from "firebase/auth";
import { Platform } from "react-native";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBmZKwroUT_-DoshOgwmmmJUzRaooSBelQ",
	authDomain: "mtotosharp-89c7d.firebaseapp.com",
	projectId: "mtotosharp-89c7d",
	storageBucket: "mtotosharp-89c7d.appspot.com",
	messagingSenderId: "400805567161",
	appId: "1:400805567161:web:1424d6d673a5cb86235968",
	measurementId: "G-33ZDHKMN80",
};

// Initialize Firebase
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

const app = initializeApp(firebaseConfig);
export const auth =
	getApps().length === 0
		? initializeAuth(app, {
				persistence:
					Platform.OS === "web" ? browserLocalPersistence : getReactNativePersistence(AsyncStorage),
		  })
		: getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);
