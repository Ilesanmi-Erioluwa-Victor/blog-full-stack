import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Action

export const createCategoryAction = createAsyncThunk(
    "category/create", 
    async(category, {rejectWithValue, getState}) => {
        // getState, for returning all your state in your request
    //   Api call
    try {
        const { data } = axios.post(`${Baseurl}/category`, {
            title : category?.title
        })
    } catch (error) {
        if(!error.response) {
            throw error
        }
        return rejectWithValue(error?.response?.data)
    }
    }
)

// Slices
const categorySlices = createSlice({
    name : "category",
    initialState : {

    },
    extraReducers : (builder) =>{
    builder.addCase(createCategoryAction.pending, (state, action) =>{
        state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) =>{
        state.loading = false;
        state.category = action?.payload;
        state.appError = undefined;
        state.serverError = undefined;
        // state.isCreated = true;
    });

      builder.addCase(createCategoryAction.rejected, (state, action) =>{
        state.loading = false;
        state.category = action?.payload;
           state.appError = action?.payload?.message;
        state.serverError = action?.error;
        // state.isCreated = true;
    });

    }
})

export default categorySlices.reducer