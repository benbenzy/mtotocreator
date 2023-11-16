import { createSlice } from "@reduxjs/toolkit";
import { Book, Plan } from "../../interface";

interface Activity {
  // Properties of an activity
}

interface RootState {
  [x: string]: any;
  draftBooks: Book[];
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
  draftBooks: [],
};
const bookSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addBook: (state: RootState, action) => {
      state.draftBooks.push(action.payload);
    },
    updateBook: (state: RootState, action) => {
      const index = state.draftPlans.findIndex(
        (book: any) => book.key === action.payload.id
      );
      state[index] = action.payload;
    },
    deleteBook: (state: RootState, action) => {
      const itemKey = action.payload.key;
      let newPlans = [...state.draftPlans];
      let index = state.draftPlans.findIndex(
        (book: any) => book.key === itemKey
      );
      newPlans.splice(index, 1);
      state.draftPlans = newPlans;
    },
    clearAll: (state: RootState) => {
      state.draftPlans = [];
    },

    addChapter: (state, action) => {
      const { bookId, title } = action.payload;
      let allBooks = [...state.draftBooks];
      let Book = allBooks.find((item: Book) => item.id == bookId);
      let Chapters = [...Book!.chapters];
      Chapters.push({
        ...title,
        content: [],
        key: `Chapter ${Chapters.length + 1}`,
      });
      Book!.chapters = Chapters;
      state.draftPlans = allBooks;
    },
    updateChapter: (state, action) => {
      const { id, title } = action.payload;
      const index = state.draftPlans.findIndex((book: Book) => book.id === id);
      state.draftPlans[index].title = title;
    },
    addContentToChapter: (state: RootState, action) => {
      const { id, key, title, body } = action.payload;
      let AllBooks = { ...state.draftBooks };
      const index = AllBooks.findIndex((item) => item.id == id);
      let Chapters = [...AllBooks[index].chapters];
      let chapter = Chapters.findIndex((item) => {
        item.key == key;
      });

      Chapters[chapter].content.push({ ...title, body });
    },
    // deleteContent:(state:RootState,action)=>{

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
export const {
  addBook,
  updateBook,
  deleteBook,
  addChapter,
  updateChapter,
  clearAll,
} = bookSlice.actions;

const BooksReducer = bookSlice.reducer;
export const selectBooks = (state: RootState) => state.draftBooks;
export default BooksReducer;
