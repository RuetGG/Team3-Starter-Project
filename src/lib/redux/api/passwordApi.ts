import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { Password } from "../types/password";

export const passwordApi = createApi({
  reducerPath: "passwordApi",
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
    updatePassword: builder.mutation<Password, Partial<Password>>({
      query: (body) => ({
        url: "/profile/me/change-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const { useUpdatePasswordMutation } = passwordApi;
