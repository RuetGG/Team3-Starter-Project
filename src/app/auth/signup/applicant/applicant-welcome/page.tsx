"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div>
      <h2>Add Yonas page</h2>
      <button
        onClick={() => {
          router.push("/auth/signup/applicant/applicant-form");
        }}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Go to Applicant Form
      </button>
    </div>
  );
};

export default Page;
