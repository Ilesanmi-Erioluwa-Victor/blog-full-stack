import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Create Post
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState }) => {
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const { data } = await axios.post(`${Baseurl}/posts`, post, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Slices
const postSlices = createSlice({
    name : "posts",
    initialState:{},
    extraReducers : (builder) => {
        builder.addCase(createPostAction.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(createPostAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postCreated = action?.payload;
              state.appError = undefined;
            state.serverError = undefined;
        })

          builder.addCase(createPostAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message
        })
    }
})


export default postSlices.reducer;