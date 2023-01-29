import { createSlice, createAsyncThunk } from "@reduxjs/toolkit" 
import axios from "axios";

// Register User
export const userRegisterAction = createAsyncThunk(
    "users/register", async (user, {rejectWithValue, getState, dispatch})=> {
       try {
        const config = {
            headers : {
             "Content-Type" : "application/json",
            }
        }

        const response = await axios.post("http://localhost:5000/api/users/register", user, config)
       } catch (error) {
        
       }
});   