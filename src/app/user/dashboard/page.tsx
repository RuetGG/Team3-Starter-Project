"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ApplicationStatus = {
  id?: string;
  status?: string;
  school?: string;
  submitted_at?: string;
};

type ApplicationDetail = {
  id: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);
  const [applicationDetail, setApplicationDetail] =
    useState<ApplicationDetail | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth/signin");
          return;
        }

        // Fetch user profile
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/profile/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!profileRes.ok) throw new Error("Failed to fetch profile");
        const profileJson = await profileRes.json();
        setFullName(profileJson.data?.full_name || null);

        // Fetch brief application status
        const statusRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications/my-status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!statusRes.ok)
          throw new Error("Failed to fetch application status");
        const statusJson = await statusRes.json();
        setApplicationStatus(statusJson.data || null);

        // If application id exists, fetch full application details
        if (statusJson.data?.id) {
          const detailRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/applications/${statusJson.data.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!detailRes.ok)
            throw new Error("Failed to fetch application details");
          const detailJson = await detailRes.json();
          setApplicationDetail(detailJson.data || null);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Calculate completion percentage based on checklist fields
  const checklistFields = [
    !!applicationDetail?.degree,
    !!applicationDetail?.leetcode_handle,
    !!applicationDetail?.codeforces_handle,
    !!applicationDetail?.essay_why_a2sv?.trim(),
    !!applicationDetail?.essay_about_you?.trim(),
    !!applicationDetail?.resume_url,
  ];
  const completedCount = checklistFields.filter(Boolean).length;
  const completionPercent = Math.round(
    (completedCount / checklistFields.length) * 100
  );

  const checkItem = (label: string, submitted: boolean | undefined) => (
    <li className="flex items-center space-x-2" key={label}>
      <span className="text-lg">{submitted ? "✅" : "❌"}</span>
      <span>{label}</span>
    </li>
  );

  // Always navigate to /applications/new on button click
  const handleStartApplication = () => {
    router.push("/applications/new");
  };

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">
        Welcome{fullName ? `, ${fullName}` : ""}
      </h1>
      <p className="text-gray-600 mt-1">
        Your journey to a global tech career starts here.
      </p>

      <button
        onClick={handleStartApplication}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Continue Application
      </button>

      {/* Complete Your Profile */}
      <div className="mt-6 bg-white rounded-lg shadow p-4 max-w-md">
        <h3 className="font-semibold mb-2">Complete Your Profile</h3>
        <div className="flex items-center space-x-3 mb-2">
          <div className="text-xs font-semibold bg-indigo-200 text-indigo-800 rounded px-2 py-0.5">
            {applicationDetail
              ? `${completionPercent}% COMPLETE`
              : "0% COMPLETE"}
          </div>
          <div className="flex-1 h-2 bg-indigo-100 rounded overflow-hidden">
            <div
              className="h-2 bg-indigo-600 rounded"
              style={{
                width: applicationDetail ? `${completionPercent}%` : "0%",
              }}
            ></div>
          </div>
        </div>
        <a href="#" className="text-indigo-600 text-sm hover:underline">
          Go to profile &rarr;
        </a>
      </div>

      {/* Application Checklist */}
      <div className="mt-6 bg-white rounded-lg shadow p-4 max-w-md">
        <h3 className="font-semibold mb-2">Application Checklist</h3>
        <ul className="space-y-1 text-gray-700 text-sm">
          {checkItem("Degree", !!applicationDetail?.degree)}
          {checkItem("LeetCode Handle", !!applicationDetail?.leetcode_handle)}
          {checkItem(
            "Codeforces Handle",
            !!applicationDetail?.codeforces_handle
          )}
          {checkItem(
            "Essay - Why A2SV",
            !!applicationDetail?.essay_why_a2sv?.trim()
          )}
          {checkItem(
            "Essay - About You",
            !!applicationDetail?.essay_about_you?.trim()
          )}
          {checkItem("Resume Uploaded", !!applicationDetail?.resume_url)}
        </ul>
      </div>
    </main>
  );
}
