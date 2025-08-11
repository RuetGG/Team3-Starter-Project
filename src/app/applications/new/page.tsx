"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export default function NewApplication() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Redirect to signin if not logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const [school, setSchool] = useState("");
  const [studentId, setStudentId] = useState("");
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [leetcodeHandle, setLeetcodeHandle] = useState("");
  const [codeforcesHandle, setCodeforcesHandle] = useState("");
  const [essayWhy, setEssayWhy] = useState("");
  const [essayAbout, setEssayAbout] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any required field is empty
    if (
      !school ||
      !studentId ||
      !country ||
      !degree ||
      !leetcodeHandle ||
      !codeforcesHandle ||
      !essayWhy ||
      !essayAbout ||
      !resumeFile
    ) {
      setError("Please fill in all fields and upload your resume.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("school", school);
      formData.append("student_id", studentId);
      formData.append("country", country);
      formData.append("degree", degree);
      formData.append("leetcode_handle", leetcodeHandle);
      formData.append("codeforces_handle", codeforcesHandle);
      formData.append("essay_why_a2sv", essayWhy);
      formData.append("essay_about_you", essayAbout);
      formData.append("resume", resumeFile);

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("You must be logged in");

      const res = await fetch(`${API_BASE_URL}/applications/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application");
      }

      router.push(`/applications/${data.data.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
        <p className="text-gray-700">Checking authentication...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Start New Application
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="School"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            placeholder="Degree"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={leetcodeHandle}
            onChange={(e) => setLeetcodeHandle(e.target.value)}
            placeholder="LeetCode Handle"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            value={codeforcesHandle}
            onChange={(e) => setCodeforcesHandle(e.target.value)}
            placeholder="Codeforces Handle"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <textarea
            value={essayWhy}
            onChange={(e) => setEssayWhy(e.target.value)}
            placeholder="Why do you want to join A2SV?"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            rows={4}
            required
          />
          <textarea
            value={essayAbout}
            onChange={(e) => setEssayAbout(e.target.value)}
            placeholder="Tell us about yourself"
            disabled={loading}
            className="w-full px-4 py-2 border rounded"
            rows={4}
            required
          />
          <div>
            <label className="block mb-1 font-semibold">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) =>
                setResumeFile(e.target.files ? e.target.files[0] : null)
              }
              disabled={loading}
              required
            />
          </div>

          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </main>
  );
}
