// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  name: string;
  email: string;
  isLogged: boolean;
}

const initialState: LoginState = {
  name: '',
  email: '',
  isLogged: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<{[key: string]: string}>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLogged = true;
    },
    logout(state) {
      state.name = '';
      state.email = '';
      state.isLogged = false;
    }
  },
});

export const { changeName, logout } = loginSlice.actions;
export default loginSlice.reducer;
