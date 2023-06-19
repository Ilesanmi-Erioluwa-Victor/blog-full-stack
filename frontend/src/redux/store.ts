import { configureStore } from '@reduxjs/toolkit';
import categoryReducers from './Slices/Category/category';
import users from './Slices/users/user';
import post from './Slices/Post/post';

export const store = configureStore({
  reducer: {
    users,
    category: categoryReducers,
    post,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
