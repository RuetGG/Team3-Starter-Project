"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("api/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="mb-6 flex justify-center items-center w-16 h-16 rounded-full bg-green-100">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
        Action Successful!
      </h1>

      <p className="text-sm text-gray-600 mb-6 max-w-xs text-center">
        Your password has been reset. You can now log in with your new password.
      </p>

      <button
        onClick={handleGoToLogin}
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
}
