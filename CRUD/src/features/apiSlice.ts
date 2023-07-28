import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Data } from './interfaces/Interfaces';

const URL = 'https://api.mercadolibre.com/';

export const apiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: URL}),
  endpoints: (builder) => ({
    getComputers: builder.query<Data, void>({
      query: () => 'sites/MLB/search?q=computador'
    }),
    getDetails: builder.query({
      query: (id) => `items/${id}`
    })
  })
});

export const { useGetComputersQuery, useGetDetailsQuery } = apiSlice;
