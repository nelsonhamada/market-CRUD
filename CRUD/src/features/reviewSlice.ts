import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReviewState {
  text: string,
  rating: string,
}

const initialState: ReviewState = {
  text:'',
  rating: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    changeReview(state, action: PayloadAction<{[key:string]:string}>) {
      state.text = action.payload.text;
      state.rating = action.payload.rating;
    }
  },
});

export const { changeReview } = reviewSlice.actions;
export default reviewSlice.reducer;
