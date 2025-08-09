import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Cycle, AllCycle } from "../types/cycle";
import { getSession } from "next-auth/react";

export const cycleApi = createApi({
  reducerPath: "cycleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Cycles"], 
  endpoints: (builder) => ({
    getAllCycles: builder.query<AllCycle, void>({
      query: () => `/cycles`,
      providesTags: ["Cycles"], 
    }),
    getCycle: builder.query<Cycle, number>({
      query: (id) => `/cycles/${id}`,
    }),
    createCycle: builder.mutation<any, Partial<Cycle> & { token?: string }>({
      query: (body) => ({
        url: `/admin/cycles/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cycles"],
    }),
  }),
});

export const {
  useGetCycleQuery,
  useGetAllCyclesQuery,
  useCreateCycleMutation, 
} = cycleApi;
