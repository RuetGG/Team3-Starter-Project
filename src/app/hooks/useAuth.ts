// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid, logout } from "../utils/authUtils";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(token ? isTokenValid(token) : false);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push("/auth/signin");
  };

  return { isLoggedIn, handleLogout };
}
