// src/services/profileApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// --- Types ---
export interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
}

export interface ProfileResponse {
  success: boolean;
  data: ProfileData;
  message: string;
}

// Accept full_name, email, and optionally image in future
export type UpdateProfileInput = {
  full_name?: string;
  email?: string;
  image?: File | null; // for future-proofing
};

// --- API ---
export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => "/profile/me",
      transformResponse: (response: ProfileResponse) => response.data,
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileData, UpdateProfileInput>({
      query: (body) => {
        const formData = new FormData();

        if (body.full_name) formData.append("full_name", body.full_name);
        if (body.email) formData.append("email", body.email);
        if (body.image) formData.append("image", body.image); // optional

        return {
          url: "/profile/me",
          method: "PUT",
          body: formData,
          // No need to set headers for multipart/form-data — browser does it automatically
        };
      },
      transformResponse: (response: ProfileResponse) => {
        console.log("Update response:", response);
        return response.data;
      },
      invalidatesTags: ["Profile"],
      async onQueryStarted(updates, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          profileApi.util.updateQueryData("getProfile", undefined, (draft) => {
            Object.assign(draft, updates);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;