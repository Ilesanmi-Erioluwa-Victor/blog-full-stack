import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface from my signup route
import { User } from "src/pages/auth/Signup";

// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async ({firstName, lastName, email, password}: User, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {firstName, lastName, email, password},
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

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  loading: false,
  errors: "" || undefined,
  // : {
  //     appError : "",
  //     serverError : ""
  // }
};

// Slices
const usersSlices = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state) => {
      state.loading = true;
      state.errors = undefined;
    });

    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.loading = false;
      state.firstName = action?.payload;
      state.lastName = action?.payload;
      state.email = action?.payload;
      state.password = action?.payload;
      state.errors = undefined;
    });

    builder.addCase(userRegisterAction.rejected, (state) => {
      state.loading = false;
      // state.errors = action?.payload?.message;
      // state.errors.serverError = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
