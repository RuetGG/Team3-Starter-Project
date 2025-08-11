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
      providesTags: (result, error, id) => [{ type: "Cycles", id }],
    }),
    createCycle: builder.mutation<any, Partial<Cycle> & { token?: string }>({
      query: (body) => ({
        url: `/admin/cycles/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cycles"],
    }),

    updateCycleStatus: builder.mutation<any, { id: number; is_active: boolean }>({
      query: ({ id, is_active }) => ({
        url: is_active
          ? `/admin/cycles/${id}/activate/`
          : `/admin/cycles/${id}/deactivate/`,
        method: "PATCH",
      }),
      async onQueryStarted({ id, is_active }, { dispatch, queryFulfilled }) {
        
        const patchResult = dispatch(
          cycleApi.util.updateQueryData("getCycle", id, (draft) => {
            if (draft?.data) draft.data.is_active = is_active;
          })
        );

        
        const patchListResult = dispatch(
          cycleApi.util.updateQueryData("getAllCycles", undefined, (draft) => {
            if (draft?.data?.cycles) {
              const cycle = draft.data.cycles.find((c) => c.id === id);
              if (cycle) cycle.is_active = is_active;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          patchListResult.undo();
        }
      },
      
    }),
  }),
});

export const {
  useGetCycleQuery,
  useGetAllCyclesQuery,
  useCreateCycleMutation,
  useUpdateCycleStatusMutation,
} = cycleApi;
