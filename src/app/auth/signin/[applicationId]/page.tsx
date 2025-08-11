"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      {/* Checkmark circle */}
      <div className="mb-6 flex justify-center items-center w-14 h-14 rounded-full border border-green-400 bg-green-50">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-center font-bold text-lg md:text-xl mb-1 text-gray-900">
        Action Successful!
      </h1>
      <button
        onClick={() => router.push("/login")}
        className="w-48 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-md transition"
      >
        Go to Login
      </button>
    </div>
  );
}
