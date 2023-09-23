/** @format */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	createTransform,
	persistReducer,
	persistStore,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlansReducer from "./plans/planSlice";
import BooksReducer from "./books/bookSlice";
import modalReducer from "./modalShown/modalSlice";
import ArticlesReducer from "./articles/artiicleSlice";

const persistConfig = {
	key: "root",
	version: 1,
	storage: AsyncStorage,
};
const reducer = combineReducers({
	books: BooksReducer,
	plans: PlansReducer,
	articles: ArticlesReducer,
	modal: modalReducer,
});
const persisted = persistReducer(persistConfig, reducer);

const store = configureStore({
	reducer: persisted,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});
export default store;
export const persistedstore = persistStore(store);
