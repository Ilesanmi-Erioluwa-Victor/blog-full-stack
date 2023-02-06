import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Create Post
export const createPostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState }) => {}
);
