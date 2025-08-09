// src/app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-bold text-[#4338ca] mb-2">404</h1>
      <h2 className="text-xl font-bold text-black mb-4">Page Not Found</h2>
      <p className="text-gray-600 text-sm mb-6">
        Sorry, we can&apos;t find the page you&apos;re looking for.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#4338ca] text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        Go Home
      </button>
    </div>
  );
}
