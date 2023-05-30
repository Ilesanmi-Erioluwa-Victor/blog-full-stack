import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Create Post
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState }) => {
    console.log(post)
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
       formData.append("image", post?.image)
      const { data } = await axios.post(`${Baseurl}/posts`, formData, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Fetch all post
export const fetchPostsAction = createAsyncThunk(
  "post/postList",
  async (post, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(`${Baseurl}/posts`);
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
      // Create post
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

        // Get posts
              builder.addCase(fetchPostsAction.pending, (state, action) => {
            state.loading = true;
        })

        builder.addCase(fetchPostsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.postLists = action?.payload;
              state.appError = undefined;
            state.serverError = undefined;
        })

          builder.addCase(fetchPostsAction.rejected, (state, action) => {
            state.loading = false;
            state.appError = action?.payload?.message;
            state.serverError = action?.error?.message
        })
    }
})


export default postSlices.reducer;
