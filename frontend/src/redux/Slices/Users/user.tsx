import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface formState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (
    { firstName, lastName, email, password }: formState,
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

// Slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    auth: "",
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase()
  },
});
