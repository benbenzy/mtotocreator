import { createSlice } from "@reduxjs/toolkit";
import { Book, Plan } from "../../interface";

interface Activity {
	// Properties of an activity
}

interface RootState {
	[x: string]: any;
	draftArticles: Book[];
	[key: number]: Book;
}

interface AddBookAction {
	type: "addPlan";
	payload: Book;
}

interface UpdateBookAction {
	type: "updatePlan";
	payload: Book;
}

interface DeleteBookAction {
	type: "deletePlan";
	payload: { id: number };
}

interface UpdateChapterAction {
	type: "updateSinglePlan";
	payload: Book;
}

interface CreateChapterAction {
	type: "addActivity";
	payload: {
		planId: number;
		activity: Activity;
	};
}
interface ClearAllAction {
	type: "clearAll";
}

type Action =
	| AddBookAction
	| UpdateBookAction
	| DeleteBookAction
	| CreateChapterAction
	| UpdateChapterAction
	| ClearAllAction;

const initialState: RootState = {
	draftArticles: [],
};
const articleSlice = createSlice({
	name: "articles",
	initialState,
	reducers: {
		addArticle: (state: RootState, action) => {
			state.draftArticles.push(action.payload);
		},
		updateArticle: (state: RootState, action) => {
			const index = state.draftArticles.findIndex(
				(book: any) => book.key === action.payload.id
			);
			state[index] = action.payload;
		},
		deleteArticle: (state: RootState, action) => {
			const itemKey = action.payload.key;
			let newPlans = [...state.draftArticles];
			let index = state.draftArticles.findIndex(
				(book: any) => book.key === itemKey
			);
			newPlans.splice(index, 1);
			state.draftArticles = newPlans;
		},
		clearAll: (state: RootState) => {
			state.draftArticles = [];
		},
    }

	
});
export const {
	addArticle,
	updateArticle,
	deleteArticle,
	clearAll,
} = articleSlice.actions;

const ArticlesReducer = articleSlice.reducer;
export const selectArticles = (state: RootState) => state.draftArticles
export default ArticlesReducer;
