import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const URL = 'https://api.mercadolibre.com/';

interface Results {
  id: string;
  title: string;
  thumbnail: string;
  price: number;
  slice: (index: number, limit: number) => [];
}

interface Data {
  results: Results[];
}

export const apiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getComputers: builder.query<Data, void>({
      query: () => 'sites/MLB/search?q=computador'
    }),
    getDetails: builder.query<Data, string>({
      query: (id) => `items/${id}`
    })
  })
});

export const { useGetComputersQuery, useGetDetailsQuery } = apiSlice;
