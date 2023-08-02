// apiSlice interfaces
export interface Results {
  id: string;
  title: string;
  thumbnail: string;
  pictures?: string;
  price: number;  
}

export interface Data {
  results: Results[];
  slice: (index: number, limit: number) => [];
}

//loginSlice interfaces 
export interface LoginState {
  name: string;
  email: string;
  isLogged: boolean;
}

// reviewSliceInterfaces
export interface ReviewState {
  text: string,
  rating: string,
  user: string,
  idReview: string,
  isReviewed: boolean,
}
