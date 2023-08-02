import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReviewState } from "./interfaces/Interfaces";

const initialState: ReviewState = {
  text:'',
  rating: '',
  user: '',
  idReview: '',
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
      state.idReview = action.payload.idReview;
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
