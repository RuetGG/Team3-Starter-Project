"use client";

import { useEffect } from "react";
import SignInPage from "@app/auth/signin/page";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "./applicant_dashbord_welcome";

export default function DashboardPage() {
  const { isLoggedIn, handleLogout } = useAuth();

  useEffect(() => {
    // Example: run any side effect if needed when component mounts
    console.log("DashboardPage mounted");
  }, []);

  return <>{isLoggedIn ? <Dashboard /> : <SignInPage />}</>;
}
