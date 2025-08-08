import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Cycle, AllCycle } from "../types/cycle";

export const cycleApi = createApi({
  reducerPath: "cycleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTkyN2M0YS1kZTNjLTQ3YzgtYmY2Ny05NjMzZjNjNDhjNTYiLCJleHAiOjE3NTQ1MTE3OTgsInR5cGUiOiJhY2Nlc3MifQ.ecJA_yVoeeiNjBGB2Y8sxuM-bFNgde7QSHA7hjJKqrQ' );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllCycles: builder.query<AllCycle, void>({
      query: () => `/cycles`,
    }),
    getCycle: builder.query<Cycle, number>({
      query: (id) => `/cycles/${id}`,
    }),
  }),
});

export const { useGetCycleQuery, useGetAllCyclesQuery } = cycleApi;
