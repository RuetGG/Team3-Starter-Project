"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type ApplicationData = {
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

export default function ApplicationDetails() {
  const { applicationId } = useParams<{ applicationId: string }>();
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!applicationId) return;

    const fetchApplication = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(
          `${API_BASE_URL}/applications/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load application");
        }

        setApplication(data.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!application) {
    return <div>No application found.</div>;
  }

  return (
    <main className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>

      <p>
        <strong>ID:</strong> {application.id}
      </p>
      <p>
        <strong>Status:</strong> {application.status}
      </p>
      <p>
        <strong>School:</strong> {application.school}
      </p>
      <p>
        <strong>Degree:</strong> {application.degree}
      </p>
      <p>
        <strong>LeetCode Handle:</strong> {application.leetcode_handle}
      </p>
      <p>
        <strong>Codeforces Handle:</strong> {application.codeforces_handle}
      </p>
      <p>
        <strong>Why join A2SV:</strong> {application.essay_why_a2sv}
      </p>
      <p>
        <strong>About you:</strong> {application.essay_about_you}
      </p>
      <p>
        <strong>Submitted at:</strong>{" "}
        {new Date(application.submitted_at).toLocaleString()}
      </p>
      <p>
        <strong>Last updated:</strong>{" "}
        {new Date(application.updated_at).toLocaleString()}
      </p>
      <p>
        <strong>Resume:</strong>{" "}
        <a
          href={application.resume_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          View Resume
        </a>
      </p>
    </main>
  );
}
