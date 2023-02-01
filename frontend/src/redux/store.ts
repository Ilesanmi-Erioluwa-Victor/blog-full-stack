import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import categoryReducers from "./Slices/Category/category"
import userReducers from "./Slices/Users/user"

export const store = configureStore({
  reducer: {
   users : userReducers,
   category : categoryReducers
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
