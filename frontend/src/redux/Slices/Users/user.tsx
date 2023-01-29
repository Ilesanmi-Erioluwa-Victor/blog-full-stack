import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface from my signup route
import { User } from "src/pages/auth/Signup";


// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (
    { firstName, lastName, email, password }: User,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { firstName, lastName, email, password },
        config
      );
      return response.data;
    } catch (error) {
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

const initialState : User = {
    firstName : "",
    lastName : "",
    email : "",
    password : "",
}

// Slices
const usersSlices = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) =>{
   
  },
});
