// src/types/next-auth.d.ts

import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    role: string;
    user: {
      email: string;
    };
    rememberMe?: boolean;
    expires: string; //
  }

  interface User {
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
    rememberMe?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    role: string;
    email: string;
    rememberMe?: boolean;
    exp?: number;
  }
}
