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
      state.draftPlans.push({ ...action.payload, quize: [] });
    },
    updatePlan: (state: RootState, action) => {
      const { id, title, description } = action.payload;
      const index = state.draftPlans.findIndex((plan) => plan.id == id);
      state.draftPlans[index].title = title;
      state.draftPlans[index].description = description;
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
    updateImage: (state, action) => {
      const { id, image } = action.payload;
      const index = state.draftPlans.findIndex((item) => item.id === id);
      if (index != -1) {
        state.draftPlans[index].thumbnail = image;
      }
    },
    addContent: (state, action) => {
      const { planId, content } = action.payload;
      console.log("action payload", action.payload);
      let allPlans = [...state.draftPlans];
      let Plan = allPlans.findIndex((item) => item.id == planId);
      console.log("item to add content", allPlans[Plan].content);
      allPlans[Plan].content.push({ ...content });
      state.draftPlans = allPlans;
    },
    updateContent: (state, action) => {
      const { id, itemTitle, content } = action.payload;
      const index = state.draftPlans.findIndex((plan) => plan.id == id);
      const contentIndex = state.draftPlans[index].content.findIndex(
        (item) => item.title == itemTitle
      );
      state.draftPlans[index].content[contentIndex] = content;
    },

    deleteContent: (state: RootState, action) => {
      const { id, content } = action.payload;
      let allPlans = [...state.draftPlans];
      let PLan = allPlans.find((item) => item.id == id);
      let planContent = [...PLan!.content];
      const contentIndex = planContent.findIndex(
        (item) => item.title == content.title
      );
      planContent.splice(contentIndex, 1);
      PLan!.content = planContent;
      state.draftPlans = allPlans;
    },
    addQuiz: (state: RootState, action) => {
      const { planId, contentTitle, quiz } = action.payload;
      let allPlans = [...state.draftPlans];
      let planIndex = allPlans.findIndex((item) => item.id == planId);
      let contentIndex = allPlans[planIndex].content.findIndex(
        (item) => item.title == contentTitle
      );
      allPlans[planIndex].content[contentIndex].chapterQuize.push({
        ...quiz,
        id: allPlans[planIndex].content[contentIndex].chapterQuize.length + 1,
      });
      state.draftPlans = allPlans;
    },
    deleteQuiz: (state: RootState, action) => {
      const { planId, contentTitle, quizId } = action.payload;
      let allPlans = [...state.draftPlans];
      let planIndex = allPlans.findIndex((item) => item.id == planId);
      let contentIndex = allPlans[planIndex].content.findIndex(
        (item) => item.title === contentTitle
      );

      let quizIdex = allPlans[planIndex].content[
        contentIndex
      ].chapterQuize.findIndex((item) => item.id == quizId);

      allPlans[planIndex].content[contentIndex].chapterQuize.splice(
        quizIdex,
        1
      );
      state.draftPlans = allPlans;
    },
    updateQuiz: (state, action) => {
      let allPlans = [...state.draftPlans];
      const { planId, contentTitle, quizId, quiz } = action.payload;
      let planIndex = allPlans.findIndex((item) => item.id == planId);
      let contentIndex = allPlans[planIndex].content.findIndex(
        (content) => content.title == contentTitle
      );
      let quizIndex = allPlans[planIndex].content[
        contentIndex
      ].chapterQuize.findIndex((quiz) => quiz.id == quizId);
      // let questinIndex=allPlans[planIndex].content[contentIndex].chapterQuize[quizIndex]
      allPlans[planIndex].content[contentIndex].chapterQuize[quizIndex] = quiz;
    },
  },
});
export const {
  addPlan,
  updatePlan,
  deletePlan,
  addContent,
  clearAll,
  deleteContent,
  updateImage,
  updateContent,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} = planSlice.actions;

const PlansReducer = planSlice.reducer;

export default PlansReducer;
