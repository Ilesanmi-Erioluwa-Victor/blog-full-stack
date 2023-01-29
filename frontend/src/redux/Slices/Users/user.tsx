import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// interface from my signup route
import { User } from "src/pages/auth/Signup";

// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async ( user: User, { rejectWithValue, getState, dispatch }) => {
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

interface Errormessage {
  Error : string;
}


// Slices
const usersSlices = createSlice({
  name: "users",
  initialState : {
    userAuth : "login",
    registered : {},
    loading : false,
    Error : "" || undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state, action) => {
      state.loading = true;
      state.Error = undefined;
    });

    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.Error = undefined;
    });

    builder.addCase(userRegisterAction.rejected, (state, action) => {
       toast.error(`${action.payload}`, {
              toastId: "fill_inputs",
                position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
            });
      console.log(action.payload)
      state.loading = false;
      // state.Error = action?.payload?.message;
      // state.errors.serverError = action?.error?.message;
    });
  },
});

export default usersSlices.reducer;
