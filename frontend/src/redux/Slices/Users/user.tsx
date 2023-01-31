import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface from my signup route
import { User } from "src/pages/auth/Signup";

// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (user: User, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        user,
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// Login user
// Register User
export const userLoginAction = createAsyncThunk(
  "users/register",
  async (user: User, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        user,
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

// interface initialState {
//   Error: any;
//   userAuth: string;
//   registered: object;
//   loading: boolean;
// }

// Slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: "login",
    registered: {},
    loading: false,
    Error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.registered = action?.payload;
    });
    builder.addCase(userRegisterAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
      console.log(action.type);
    });
  },
});

export default usersSlices.reducer;
