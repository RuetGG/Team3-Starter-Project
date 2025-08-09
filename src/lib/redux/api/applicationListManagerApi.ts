import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AllApplication, Application, AvailableReviewer } from "@lib/redux/types/applicationListManager";
import { getSession } from "next-auth/react";

export const applicationListManagerApi = createApi({
  reducerPath: "applicationListManagerApi",
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
    getAllApplication: builder.query<AllApplication, void>({
      query: () => `/manager/applications/`,
    }),
    getApplication: builder.query<Application, string>({
      query: (id) => `/manager/applications/${id}/`,
    }),
    getReviewer: builder.query<AvailableReviewer, void>({
      query: () => `/manager/applications/available-reviewers/`,
    }),
    updateAssignedReviewer: builder.mutation<Application, { applicationId: string; reviewerId: string }>({
      query: ({ applicationId, reviewerId }) => ({
        url: `/manager/applications/${applicationId}/assign/`,
        method: "PATCH",
        body: { reviewer_id: reviewerId },
      }),
    }),
    updateStatus: builder.mutation<AllApplication, { applicationId: string; finalStatus: string }>({
      query: ({ applicationId, finalStatus }) => ({
        url: `/manager/applications/${applicationId}/decide/`,
        method: "PATCH",
        body: { status: finalStatus,
          decision_notes: ""
         },
      }),
    }),
  }),
});

export const {
  useGetAllApplicationQuery,
  useGetApplicationQuery,
  useGetReviewerQuery,
  useUpdateAssignedReviewerMutation,
  useUpdateStatusMutation,
} = applicationListManagerApi;
