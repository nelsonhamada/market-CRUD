// DUCKS pattern
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  name: string;
  email: string;
  isLogged: boolean;
}

const initialState: LoginState = {
  name: 'Nelson',
  email: 'teste@teste.com',
  isLogged: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { changeName } = loginSlice.actions;
export default loginSlice.reducer;
