import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApplicantReview } from '@lib/redux/types/applicationReview';

export const applicationReviewApi = createApi({
  reducerPath: 'applicationReviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
    //   headers.set(
    //     "Authorization",
    //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ0OTM2OTgsInR5cGUiOiJhY2Nlc3MifQ.8JBEzlP9DHDwHVz2NIXLnxA9RtQwbVHQBUpUeI2rR-k"
    //   );
    //   return headers;
    },
  }),
  endpoints: (builder) => ({
    getApplicantReview: builder.query<ApplicantReview, string>({
      query: (id) => `/reviews/${id}`,
    }),
  }),
});

export const { useGetApplicantReviewQuery } = applicationReviewApi;
