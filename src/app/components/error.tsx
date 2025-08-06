import React from "react";
import { useRouter } from "next/router";

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-7xl font-bold text-[#4338ca] mb-4">404</h1>
      <p className="text-gray-600 text-lg mb-6">
        Sorry, we can't find the page you're looking for.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-[#4338ca] text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
