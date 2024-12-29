import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: []
};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
        },
        getData: (state, action) => {
            state.data = action.payload;
        },
        updateStock: (state, action) => {
            state.data.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.stock = action.payload.stock;
                }
            });
        },
        updateLike: (state, action) => {
            state.data.forEach((item) => {
                if (item.id === action.payload.id) {
                    item.like += 1;
                }
            });
        }
    }
});

export const { addData, getData, updateStock, updateLike } = dataSlice.actions;

export default dataSlice.reducer;
