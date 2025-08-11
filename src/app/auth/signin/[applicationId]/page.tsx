"use client";

import { useParams, useRouter } from "next/navigation";

export default function ApplicationDetailsPage() {
  const { applicationId } = useParams();
  const router = useRouter();

  return (
    <div>
      <h1>Application ID: {applicationId}</h1>
      <button onClick={() => router.push("/")}>Go Home</button>
    </div>
  );
}
