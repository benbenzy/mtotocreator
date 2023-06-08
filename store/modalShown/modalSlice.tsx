import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modalShown:false,
};

const modalSlice =createSlice({
    name:'modalShown',
    initialState,
    reducers:{
        setModalVisible(state = initialState, action) {
			state.modalShown = action.payload
		},

    }
})
export const { setModalVisible} = modalSlice.actions
export default modalSlice.reducer;