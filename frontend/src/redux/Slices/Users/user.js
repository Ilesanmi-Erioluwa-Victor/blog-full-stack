import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface from my signup route
// import { User } from "src/pages/auth/Signup";
import { Baseurl } from "src/utils/Baseurl";


// Register User
export const userRegisterAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${Baseurl}/users/register`,
        user,
        config
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const userLoginAction = createAsyncThunk(
  "users/login",
  async (user, { rejectWithValue }) => {
        const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

    try {
     const response = await axios.post(
        `${Baseurl}/users/login`,
        user,
        config
      );
      // save user to local storage
      localStorage.setItem("userInfo", JSON.stringify(response.data))
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return console.log('ERROR', error);
    }
  }
);

// Logout user
export const userLogOutAction = createAsyncThunk(
  "users/logout",
  async (payload, { rejectWithValue }) => {
    try {
         localStorage.removeItem("userInfo");
    } catch (error) {
      if (error instanceof Error) {
          return rejectWithValue(error.message);
        }
        return console.log('ERROR', error);
    }
  }
);

const getUserFromLocalStorage  = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")): null;

// interface initialState {
//   Error: string | unknown;
//   userAuth: object;
//   registered: object;
//   loading: boolean;
// }

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: getUserFromLocalStorage,
    registered: {},
    loading: false,
    Error: {
      appError : "",
      serverError : ""
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // Register user
        builder.addCase(userRegisterAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegisterAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
    });
    builder.addCase(userRegisterAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
      console.log(action.type);
    });
    // Login user 
     builder.addCase(userLoginAction.pending, (state) => {
      state.loading = true;
      state.Error.appError = undefined;
      state.Error.serverError = undefined;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action) => {
      state.userAuth = action?.payload;
      state.registered = null;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.loading = false;
       state.Error.appError = action?.error
      state.Error.serverError = action?.payload
    });

    // Logout user
         builder.addCase(userLogOutAction.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(userLogOutAction.fulfilled, (state, action) => {
      state.userAuth = null;
      state.loading = false;
      state.registered = null;
      state.Error.appError = undefined;
      state.Error.serverError = undefined;
    });
    builder.addCase(userLogOutAction.rejected, (state, action) => {
      state.loading = false;
      console.log(action.error);
      console.log(action.type);
    });

  },
  
});

export default usersSlices.reducer;
