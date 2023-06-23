import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

export const apiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getComputers: builder.query({
      query: () => 'computer'
    }),
  })
});

export const { useGetComputersQuery } = apiSlice;
