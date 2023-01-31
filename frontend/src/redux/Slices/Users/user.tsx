import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface from my signup route
import { User } from "src/pages/auth/Signup";
import { Baseurl } from "src/utils/Baseurl";


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

// Login user
interface loginUser {
  email : string;
  password : string;
}
export const userLoginAction = createAsyncThunk(
  "users/login",
  async (user: loginUser, { rejectWithValue }) => {
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
      localStorage.setItem("userInfo", JSON.stringify(user))
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const getUserFromLocalStorage  = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") as string): null;

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
    userAuth: getUserFromLocalStorage,
    registered: {},
    loading: false,
    Error: "",
  },
  reducers: {},
  extraReducers: (builder : any) => {
    // Register user
    builder.addCase(userRegisterAction.pending, (state:any) => {
      state.loading = true;
    });
    builder.addCase(userRegisterAction.fulfilled, (state :any, action:any) => {
      state.registered = action?.payload;
      state.loading = false;
      state.registered = {};
    });
    builder.addCase(userRegisterAction.rejected, (state:any, action:any) => {
      state.loading = false;
      console.log(action.error);
      console.log(action.type);
    });

    // Login user 
    //  builder.addCase(userLoginAction.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(userLoginAction.fulfilled, (state, action) => {
    //   state.userAuth = action?.payload;
    // });
    // builder.addCase(userLoginAction.rejected, (state, action) => {
    //   state.loading = false;
    //   console.log(action.error);
    //   console.log(action.type);
    // });

  },
  
});

export default usersSlices.reducer;
