import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Baseurl } from "src/utils/Baseurl";

// Action Create Category
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (title, { rejectWithValue, getState }) => {
    // getState, for returning all your state in your request
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //   Api call
    try {
      const { data } = await axios.post(
        `${Baseurl}/categorys`,
        {
          title
        },
        config
      );
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// Get all Categories
export const getCategoriesAction = createAsyncThunk(
  "category/getAll",
  async (category,{ rejectWithValue, getState }) => {
    // getState, for returning all your state in your request
    const user = getState()?.users;
          console.log(getState());
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //   Api call
    try {
      const { data } = await axios.get(`${Baseurl}/categorys`, config);

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

// Get  Category
export const getCategoryAction = createAsyncThunk(
  "category/getCategory",
  async (id, { rejectWithValue, getState }) => {
    // getState, for returning all your state in your request
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //   Api call
    try {
      const { data } = await axios.get(`${Baseurl}/categorys`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

// Update Category
// Get  Category
export const updateCategoryAction = createAsyncThunk(
  "category/updateCategory",
  async (id, { rejectWithValue, getState }) => {
    // getState, for returning all your state in your request
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //   Api call
    try {
      const { data } = await axios.put(`${Baseurl}/categorys${id}`, config);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error);
    }
  }
);

// Slices
const categorySlices = createSlice({
  name: "category",
  initialState: {
    category : "",
    loading: false,
    appError : "",
    serverError : "",
    categoryList : "",
    updateCatgory : ""
  },
  extraReducers: (builder) => {
    // Creaet category
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      // state.isCreated = true;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.categoryList = null;
      state.updateCatgory = null;
      state.appError = action?.payload?.message;
      state.serverError = action?.error;
      // state.isCreated = true;
    });

    // Get all Categories
    builder.addCase(getCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.categoryList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.updateCatgory = null
      // state.isCreated = true;
    });

    builder.addCase(getCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = null;
      state.appError = action?.payload?.message;
      state.serverError = action?.error;
      state.updateCatgory = null;
      // state.isCreated = true;
    });

      // Get Category
    builder.addCase(getCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.categoryList = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.updateCatgory = null
      // state.isCreated = true;
    });

    builder.addCase(getCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = null;
      state.appError = action?.payload?.message;
      state.serverError = action?.error;
      state.updateCatgory = null;
      // state.isCreated = true;
    });

    // update category
      // Get all Categories
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updateCatgory = action?.payload;
      state.appError = undefined;
      state.serverError = undefined;
      state.categoryList = null;
      // state.isCreated = true;
    });

    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.categoryList = null;
      state.updateCatgory = null;
      state.appError = action?.payload?.message;
      state.serverError = action?.error;
      // state.isCreated = true;
    });
  },
});

export default categorySlices.reducer;
