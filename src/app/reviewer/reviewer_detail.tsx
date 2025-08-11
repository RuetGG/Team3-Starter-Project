'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getSession } from "next-auth/react";

const baseUrl = "https://a2sv-application-platform-backend-team3.onrender.com";

interface ApplicantDetails {
  id: string;
  applicant_name: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
}

interface ReviewDetails {
  id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
}

interface APIData {
  id: string;
  applicant_details: ApplicantDetails;
  review_details: ReviewDetails;
}

export default function ReviewerDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [token, setToken] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<APIData | null>(null);
  const [submitData, setSubmitData] = useState<ReviewDetails>({
    id: id,
    activity_check_notes: "",
    resume_score: 0,
    essay_why_a2sv_score: 0,
    essay_about_you_score: 0,
  });

  useEffect(() => {
    async function fetchToken() {
      const session = await getSession();
      if (session?.accessToken) {
        setToken(session.accessToken);
      } else {
        setToken(null);
      }
    }
    fetchToken();
  }, []);

  useEffect(() => {
    if (!token) return;

    async function fetchReview() {
      setLoading(true);
      setFetchError("");
      try {
        const response = await axios.get(`${baseUrl}/reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviewData(response.data.data);
        if (response.data.data.review_details) {
          setSubmitData({
            id: id,
            activity_check_notes: response.data.data.review_details.activity_check_notes || "",
            resume_score: response.data.data.review_details.resume_score || 0,
            essay_why_a2sv_score: response.data.data.review_details.essay_why_a2sv_score || 0,
            essay_about_you_score: response.data.data.review_details.essay_about_you_score || 0,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          setFetchError(error.message);
        } else {
          setFetchError("An unexpected error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [token, id]);

  const handleSubmit = async () => {
    if (!token) {
      setSubmitError("Authentication token missing. Please log in.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await axios.put(`${baseUrl}/reviews/${id}`, submitData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Review successfully submitted.");
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unexpected error occurred while submitting.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-5/6 m-auto p-5 flex flex-col gap-5 text-sm text-gray-700">
      <section>
        <Link href="/" className="flex cursor-pointer items-center gap-1 hover:underline">
          <ChevronLeft size={20} /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold mt-4">
          {fetchError
            ? "Error loading review"
            : loading
              ? "Loading..."
              : `Review: ${reviewData?.applicant_details.applicant_name ?? "---------"}`}
        </h1>
        {fetchError && <p className="text-red-600 mt-2">{fetchError}</p>}
      </section>

      <div className="flex flex-wrap gap-10">
        <section className="w-full lg:w-1/2 shadow-lg rounded flex flex-col gap-5 p-10">
          <h2 className="text-xl font-bold">Applicant Profile</h2>
          <div className="flex flex-wrap gap-10">
            <div>
              <h3 className="text-gray-400">School</h3>
              <p>{reviewData?.applicant_details.school ?? "-------"}</p>
            </div>
            <div>
              <h3 className="text-gray-400">Degree Program</h3>
              <p>{reviewData?.applicant_details.degree ?? "-------"}</p>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400">Coding Profiles</h3>
            <div className="flex gap-5">
              <a
                href={`https://github.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Github
              </a>
              <a
                href={reviewData?.applicant_details.leetcode_handle ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                LeetCode
              </a>
              <a
                href={reviewData?.applicant_details.codeforces_handle ?? ""}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline"
              >
                Codeforces
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gray-400">Essay 1: Tell us about yourself</h3>
            <p>{reviewData?.applicant_details.essay_about_you ?? "-------"}</p>
          </div>
          <div>
            <h3 className="text-gray-400">Essay 2: Why do you want to join us?</h3>
            <p>{reviewData?.applicant_details.essay_why_a2sv ?? "-------"}</p>
          </div>
          <div>
            <h3 className="text-gray-400">Resume</h3>
            {reviewData?.applicant_details.resume_url ? (
              <a
                href={reviewData.applicant_details.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Resume.pdf
              </a>
            ) : (
              <p>No resume available</p>
            )}
          </div>
        </section>

        <section className="w-full lg:flex-1 p-10 shadow-lg rounded flex flex-col gap-5">
          <h2 className="text-xl font-bold">Evaluation Form</h2>

          <label htmlFor="activity_notes" className="block font-medium">
            Activity check notes:
          </label>
          <textarea
            id="activity_notes"
            value={submitData.activity_check_notes}
            onChange={(e) =>
              setSubmitData({ ...submitData, activity_check_notes: e.target.value })
            }
            className="resize-none border border-gray-400 h-24 rounded p-2 text-sm focus:outline-none mb-4"
          />

          <div className="flex justify-center flex-wrap gap-10 border-b-2 border-gray-400 pb-6 mb-6">
            <section className="flex flex-col min-w-[120px]">
              <label htmlFor="resume_score" className="font-medium">
                Resume score
              </label>
              <input
                id="resume_score"
                value={submitData.resume_score}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || !isNaN(Number(val))) {
                    setSubmitData({
                      ...submitData,
                      resume_score: val === "" ? 0 : Number(val),
                    });
                  }
                }}
                className="shadow rounded px-2 py-1 focus:outline-0"
              />
            </section>

            <section className="flex flex-col min-w-[120px]">
              <label htmlFor="essay_why_score" className="font-medium">
                Essay 1 score
              </label>
              <input
                id="essay_why_score"
                value={submitData.essay_why_a2sv_score}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || !isNaN(Number(val))) {
                    setSubmitData({
                      ...submitData,
                      essay_why_a2sv_score: val === "" ? 0 : Number(val),
                    });
                  }
                }}
                className="shadow rounded px-2 py-1 focus:outline-0"
              />
            </section>
            <section className="flex flex-col min-w-[120px]">
              <label htmlFor="essay_about_score" className="font-medium">
                Essay 2 score
              </label>
              <input
                id="essay_about_score"
                value={submitData.essay_about_you_score}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || !isNaN(Number(val))) {
                    setSubmitData({
                      ...submitData,
                      essay_about_you_score: val === "" ? 0 : Number(val),
                    });
                  }
                }}
                className="shadow rounded px-2 py-1 focus:outline-0"
              />
            </section>
          </div>
          {submitError && <p className="text-red-600 mb-4">{submitError}</p>}
          <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className={`bg-blue-700 text-white p-2 rounded w-full sm:w-auto ${
              submitting || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {submitting ? "Saving..." : "Save & Submit Review"}
          </button>
        </section>
      </div>
    </div>
  );
}