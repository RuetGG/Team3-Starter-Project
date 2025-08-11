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

  const checkItem = (label: string, submitted: boolean | undefined) => (
    <li className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={submitted}
        readOnly
        className="cursor-default"
      />
      <span>{label}</span>
    </li>
  );

  // Calculate completion percentage
  let profileCompletePercent = 0;
  if (applicationDetail) {
    const checklistFields = [
      !!applicationDetail.degree,
      !!applicationDetail.leetcode_handle,
      !!applicationDetail.codeforces_handle,
      !!applicationDetail.essay_why_a2sv?.trim(),
      !!applicationDetail.essay_about_you?.trim(),
      !!applicationDetail.resume_url,
    ];
    const completedCount = checklistFields.filter(Boolean).length;
    profileCompletePercent = Math.round(
      (completedCount / checklistFields.length) * 100
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900">
          Welcome{fullName ? `, ${fullName}` : ""}
        </h1>
        <p className="text-gray-600 mt-1">
          Your journey to a global tech career starts now.
        </p>
      </section>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left large card */}
        <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-5 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">G7 November Intake</h2>
            <p className="text-sm">
              {applicationStatus?.id
                ? "Continue your application where you left off."
                : "It's time to submit your application and show us your potential."}
            </p>
          </div>
          <button
            onClick={handleStartApplication}
            className="mt-4 w-max bg-white text-indigo-700 font-semibold px-3 py-1.5 text-sm rounded hover:bg-gray-100 transition"
          >
            {applicationStatus?.id
              ? "Continue Application"
              : "Start Application"}
          </button>
        </div>

        {/* Right stacked cards */}
        <div className="flex flex-col space-y-6">
          {/* Complete Your Profile */}
          {applicationDetail && (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Complete Your Profile</h3>
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-xs font-semibold bg-indigo-200 text-indigo-800 rounded px-2 py-0.5">
                  {profileCompletePercent}% COMPLETE
                </div>
                <div className="flex-1 h-2 bg-indigo-100 rounded overflow-hidden">
                  <div
                    className="h-2 bg-indigo-600 rounded"
                    style={{ width: `${profileCompletePercent}%` }}
                  ></div>
                </div>
              </div>
              <a href="#" className="text-indigo-600 text-sm hover:underline">
                Go to profile &rarr;
              </a>
            </div>
          )}

          {/* Application Checklist */}
          {applicationDetail && (
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-2">Application Checklist</h3>
              <ul className="space-y-1 text-gray-700 text-sm">
                {checkItem("Degree", !!applicationDetail.degree)}
                {checkItem(
                  "LeetCode Handle",
                  !!applicationDetail.leetcode_handle
                )}
                {checkItem(
                  "Codeforces Handle",
                  !!applicationDetail.codeforces_handle
                )}
                {checkItem(
                  "Essay - Why A2SV",
                  !!applicationDetail.essay_why_a2sv?.trim()
                )}
                {checkItem(
                  "Essay - About You",
                  !!applicationDetail.essay_about_you?.trim()
                )}
                {checkItem("Resume Uploaded", !!applicationDetail.resume_url)}
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                Last Updated:{" "}
                {new Date(applicationDetail.updated_at).toLocaleString()}
              </p>
            </div>
          )}

          {/* Helpful Resources */}
          <div className="bg-white rounded-lg shadow p-4 text-sm text-indigo-700">
            <h3 className="font-semibold mb-2 text-gray-900">
              Helpful Resources
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Tips for a Great Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  A2SV Problem Solving Guide
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
