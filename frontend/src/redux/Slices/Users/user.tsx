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
      if (!error) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

interface initialState {
  Error: any;
  userAuth: string;
  registered: object;
  loading: boolean;
}

// Slices
const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: "login",
    registered: {},
    loading: false,
    Error: "",
  } as initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state) => {
      state.loading = true;
      state.Error = undefined;
    })

    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.Error = undefined;
    })

    builder.addCase(userRegisterAction.rejected, (state, action) => {
      console.log(action)
        // state.Error = action.error;
        // state.loading = false;

    });
  },
});

export default usersSlices.reducer;
