import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Action

export const createCategoryAction = createAsyncThunk(
    "category/create", 
    async(category, {rejectWithValue}) => {
    //   Api call
    }
)