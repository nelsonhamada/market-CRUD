import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = 'https://api.mercadolibre.com/';

export const apiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getComputers: builder.query({
      query: () => 'sites/MLB/search?q=computer'
    }),
    getDetails: builder.query({
      query: (id) => `items/${id}`
    })
  })
});

export const { useGetComputersQuery, useGetDetailsQuery } = apiSlice;
