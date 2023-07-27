import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReviewState {
  text: string,
  rating: string,
  user: string,
  isReviewed: boolean,
}

const initialState: ReviewState = {
  text:'',
  rating: '',
  user: '',
  isReviewed: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    changeReview(state, action: PayloadAction<{[key:string]:string}>) {
      state.text = action.payload.text;
      state.rating = action.payload.rating;
      state.user = action.payload.user;
      state.isReviewed = true;
    },
    deleteReview(state){
      state.text = '';
      state.rating = '';
      state.user = '';
      state.isReviewed = false;
    },
    editReview(state) {
      state.isReviewed = false;
    }
  },
});

export const { changeReview, deleteReview, editReview } = reviewSlice.actions;
export default reviewSlice.reducer;
