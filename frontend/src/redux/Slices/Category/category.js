import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Baseurl } from 'src/utils/Baseurl';

// action for redirecting..
const redirectAction = createAction("category/reset");
//action
export const createCategoryAction = createAsyncThunk(
  'category/create',
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call

    try {
      const { data } = await axios.post(
        `${Baseurl}/categorys`,
        {
          title: category?.title,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all action
export const fetchCategoriesAction = createAsyncThunk(
  'category/fetch',
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${Baseurl}/categorys`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Update
export const updateCategoryAction = createAsyncThunk(
  'category/update',
  async ({ updateTitle, id }, { rejectWithValue, getState, dispatch }) => {
    console.log({ updateTitle, id });
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${Baseurl}/categorys/${id}`,
        { title: updateTitle },
        config
      );
      dispatch(redirectAction())
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete
export const deleteCategoryAction = createAsyncThunk(
  'category/delete',
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(`${Baseurl}/categorys/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch details
export const fetchCategoryAction = createAsyncThunk(
  'category/details',
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(`${Baseurl}/categorys/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const categorySlices = createSlice({
  name: 'category',
  initialState: {
    loading: false,
    category: "All",
    categories : [],
    appErr: undefined,
    serverErr: undefined,
    updateCategory: null,
     deletedCategory : null,
  },
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = null;
      state.serverErr = null;
      state.category = null;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = null;
      state.serverErr = null;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.category = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categories = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //update
    builder.addCase(updateCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
     
    builder.addCase(redirectAction, (state, action) => {
      state.isEdited = true;
    });

    builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.updateCategory = null;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //delete
    builder.addCase(deleteCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.deletedCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
       state.deletedCategory = null;
    });

    //fetch details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default categorySlices.reducer;
