import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Action

export const createCategoryAction = createAsyncThunk(
    "category/create", 
    async(category, {rejectWithValue}) => {
    //   Api call
    try {
        const { data } = axios.post(`${Baseurl}/category`, {
            title : category?.title
        })
    } catch (error) {
        
    }
    }
)