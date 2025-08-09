import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Password } from "../types/password";

export const passwordApi = createApi({
	reducerPath: "passwordApi",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_API_URL,
	}),
	endpoints: (builder) => ({
		// Reset password for logged-out users using reset token
		resetPassword: builder.mutation<
			Password,
			{ token: string; newPassword: string }
		>({
			query: ({ token, newPassword }) => ({
				url: `/auth/reset-password?token=${encodeURIComponent(token)}`,
				method: "POST",
				body: { password: newPassword },
			}),
		}),
	}),
});

export const { useResetPasswordMutation } = passwordApi;
