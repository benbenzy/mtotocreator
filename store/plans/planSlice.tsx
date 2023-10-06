/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { Plan } from "../../interface";

interface Activity {
	// Properties of an activity
}

interface RootState {
	[x: string]: any;
	draftPlans: Plan[];
	selectedPlan: Plan | undefined;
	[key: number]: Plan;
}

interface AddPlanAction {
	type: "addPlan";
	payload: Plan;
}

interface UpdatePlanAction {
	type: "updatePlan";
	payload: Plan;
}

interface DeletePlanAction {
	type: "deletePlan";
	payload: { id: number };
}

interface UpdateSinglePlanAction {
	type: "updateSinglePlan";
	payload: Plan;
}

interface AddActivityAction {
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
	| AddPlanAction
	| UpdatePlanAction
	| DeletePlanAction
	| UpdateSinglePlanAction
	| ClearAllAction
	| AddActivityAction;

const initialState: RootState = {
	draftPlans: [],
	selectedPlan: undefined,
};
const planSlice = createSlice({
	name: "plans",
	initialState,
	reducers: {
		addPlan: (state: RootState, action) => {
			state.draftPlans.push(action.payload);
		},
		updatePlan: (state: RootState, action) => {
			const index = state.draftPlans.findIndex((plan) => plan.id === action.payload.id);
			state.draftPlans[index] = action.payload;
		},
		deletePlan: (state: RootState, action) => {
			const itemKey = action.payload.id;
			let newPlans = [...state.draftPlans];
			let index = state.draftPlans.findIndex((plan) => plan.id === itemKey);
			newPlans.splice(index, 1);
			state.draftPlans = newPlans;
		},
		clearAll: (state: RootState) => {
			state.draftPlans = [];
		},
		addContent: (state, action) => {
			const { planId, activity } = action.payload;
			let allPlans = [...state.draftPlans];
			let PLan = allPlans.find((item) => item.id == planId);
			let planContent = [...PLan!.content];
			planContent.push({ ...activity, key: planContent.length + 1 });
			PLan!.content = planContent;
			state.draftPlans = allPlans;
		},
		updateSinglePlan: (state, action) => {
			const index = state.draftPlans.findIndex((plan) => plan.id === action.payload.id);
			state.draftPlans[index] = action.payload;
		},

		deleteContent: (state: RootState, action) => {
			const { id, content } = action.payload;
			let allPlans = [...state.draftPlans];
			let PLan = allPlans.find((item) => item.id === id);
			let planContent = [...PLan!.content];
			const contentIndex = planContent.findIndex((item) => item === content);
			planContent.splice(contentIndex, 1);
			PLan!.content = planContent;
			state.draftPlans = allPlans;
		},

		// 	const plan =state.draftPlans.find((plan)=>plan===action.payload)
		// 	//const index =state.draftPlans.findIndex((plan)=>plan.key===action.payload.key)
		// 	if(!plan){
		// 		throw new Error("plan not found");

		// 	}
		// 	let planContent = [...plan!.content]
		// 	let index = planContent.findIndex((content)=>content.key===action.payload.key)
		// 	const newPlan=planContent.splice(index,1)

		// 	planContent=[...newPlan]

		// }
	},
});
export const { addPlan, updatePlan, deletePlan, addContent, clearAll, deleteContent } =
	planSlice.actions;

const PlansReducer = planSlice.reducer;

export default PlansReducer;
