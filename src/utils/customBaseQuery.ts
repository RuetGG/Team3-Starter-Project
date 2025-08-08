import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const customBaseQuery = async (args: any, api: any, extraOptions: any = {}) => {
  const session = await getSession();
  const token = session?.accessToken;

  // Ensure args is an object, not a string
  if (typeof args === "string") {
    args = { url: args };
  }

  // Inject Authorization header into args.headers
  args.headers = {
    ...args.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const result = await rawBaseQuery(args, api, extraOptions);

  return result;
};
