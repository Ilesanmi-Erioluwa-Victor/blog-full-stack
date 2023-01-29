import { createSlice, createAsyncThunk } from "@reduxjs/toolkit" 

// Register User
export const userRegisterAction = createAsyncThunk(
    "users/register", async (user, {rejectWithValue, getState, dispatch})=> {
   
}); 