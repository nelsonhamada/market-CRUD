import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../features/loginSlice';

export const store = configureStore({
  reducer: {
    name: loginReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
