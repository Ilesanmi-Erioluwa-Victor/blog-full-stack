import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Baseurl } from 'src/utils/Baseurl';
import { headers } from 'src/utils/headers';

export const userRegisterAction = createAsyncThunk(
  'users/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Baseurl}/users/register`,
        user,
        headers()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userLoginAction = createAsyncThunk(
  'users/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${Baseurl}/users/login`,
        user,
        headers()
      );
      localStorage.setItem('blog_user', JSON.stringify(response.data));
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
  'users/logout',
  async (payload, { rejectWithValue }) => {
    try {
      localStorage.removeItem('blog_user');
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return console.log('ERROR', error);
    }
  }
);

const getUserFromLocalStorage = localStorage.getItem('blog_user')
  ? JSON.parse(localStorage.getItem('blog_user') as any)
  : null;

interface initialStateProps {
  isAuthenticated: boolean;
  error: {
    appError: string | null;
    serverError: string | null;
  };
  user: null | userProps;
  isLoading: boolean;
}

interface userProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  isAdmin: boolean;
  token: string;
}

const usersSlices = createSlice({
  name: 'users',
  initialState: {
    user: getUserFromLocalStorage,
    isLoading: false,
    isAuthenticated: false,
    error: {
      appError: '',
      serverError: '',
    },
  } as initialStateProps,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(userRegisterAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      userRegisterAction.fulfilled,
      (state, action: PayloadAction<userProps>) => {
        state.isLoading = false;
        state.user = action?.payload;
        state.isAuthenticated = true;
        state.error.appError = null;
        state.error.serverError = null;
      }
    );
    builder.addCase(
      userRegisterAction.rejected,
      (state, action: any) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error.appError = action?.error;
        state.error.serverError = action?.payload?.message;
      }
    );

    // Login user
    builder.addCase(userLoginAction.pending, (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(userLoginAction.fulfilled, (state, action : PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload;
      state.Error.appError = undefined;
      state.Error.serverError = undefined;
    });
    builder.addCase(userLoginAction.rejected, (state, action) => {
      state.loading = false;
      state.userAuth = null;
      state.Error.appError = action?.error;
      state.Error.serverError = action?.payload;
      state.registered = null;
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
