import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/loginSlice';
import reviewReducer from '../features/reviewSlice';
import { apiSlice } from "../features/apiSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    review: reviewReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
