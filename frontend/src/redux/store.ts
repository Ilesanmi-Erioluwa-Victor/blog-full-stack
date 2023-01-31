import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducers from "./Slices/Users/user"

export const store = configureStore({
  reducer: {
   users : userReducers,
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
