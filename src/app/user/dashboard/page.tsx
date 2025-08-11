"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [applicationStatus, setApplicationStatus] = useState<{
    id?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications/me`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch application status");
        const statusJson = await res.json();
        setApplicationStatus(statusJson.data || null);
      } catch (err) {
        console.error("Error fetching application status:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, []);

  const handleStartApplication = () => {
    if (applicationStatus?.id) {
      router.push(`/applications/${applicationStatus.id}`);
    } else {
      router.push("/applications/new");
    }
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard!</h1>
      <p className="text-gray-600 mt-1">
        Your journey to a global tech career starts here.
      </p>

      <button
        onClick={handleStartApplication}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {applicationStatus?.id ? "Continue Application" : "Start Application"}
      </button>
    </main>
  );
}
