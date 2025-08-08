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
