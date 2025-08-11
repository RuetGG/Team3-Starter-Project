"use client";

import React, { useState } from "react";
import {
  useGetApplicationQuery,
  useUpdateAssignedReviewerMutation,
  useUpdateStatusMutation,
} from "@lib/redux/api/applicationListManagerApi";
import BacktoDashNav from "@components/[BacktoDashNav]";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ActionDropdown from "@app/components/ActionDropdown";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = String(params.id);

  const searchParams = useSearchParams();
  const reviewerNameFromQuery =
    searchParams.get("reviewerName") || "Not assigned";

  const { data, error, isLoading } = useGetApplicationQuery(id);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();
  const [updateAssignedReviewer, { isLoading: isAssigning }] =
    useUpdateAssignedReviewerMutation();

  const [statusUpdating, setStatusUpdating] = useState(false);
  const [assignedReviewerName, setAssignedReviewerName] = useState<string>(
    reviewerNameFromQuery
  );
  const [selectedReviewerId, setSelectedReviewerId] = useState<string | null>(
    null
  );

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error)
    return <p className="p-4 text-red-600">Failed to load review data</p>;

  const applicant = data?.data.application;
  const review = data?.data.review;

  const displayScore = (score?: number | string) => {
    if (!score || score === "0" || score === 0) {
      return "Not Graded";
    }
    return `${score}/100`;
  };

  const handleStatus = async (finalStatus: string) => {
    try {
      setStatusUpdating(true);
      await updateStatus({ applicationId: id, finalStatus }).unwrap();
      setStatusUpdating(false);
      localStorage.setItem("dashboardNeedsRefresh", "true");
      router.push("/auth/signup/manager");
    } catch {
      setStatusUpdating(false);
      alert("Failed to update the status");
    }
  };

  const handleConfirm = async () => {
    if (!selectedReviewerId) {
      alert("Please select a reviewer first");
      return;
    }
    try {
      await updateAssignedReviewer({
        applicationId: id,
        reviewerId: selectedReviewerId,
      }).unwrap();
      alert("Reviewer assigned successfully");
      localStorage.setItem("dashboardNeedsRefresh", "true");
    } catch {
      alert("Failed to assign reviewer");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BacktoDashNav />

      <div className="flex-col pt-10 pb-40 px-4 sm:px-6 md:px-16">
        <div className="pb-6">
          <h3 className="text-2xl font-semibold">
            Manage: {applicant?.applicant_name}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Applicant Profile */}
            <div className="shadow-xl rounded-lg p-6 bg-white space-y-4">
              <h3 className="text-lg font-semibold">Applicant Profile</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">School</p>
                  <p className="font-medium">{applicant?.school}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Student ID</p>
                  <p className="font-medium">{applicant?.student_id}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Profiles</p>
                <div className="flex gap-4 flex-wrap">
                  <a
                    href={`https://leetcode.com/${applicant?.leetcode_handle}`}
                    className="text-[#4F46E5] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LeetCode
                  </a>
                  <a
                    href={`https://codeforces.com/profile/${applicant?.codeforces_handle}`}
                    className="text-[#4F46E5] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Codeforces
                  </a>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Essay 1: Tell us about yourself?
                </p>
                <p className="font-medium">{applicant?.essay_about_you}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Essay 2: Why do you want to join us?
                </p>
                <p className="font-medium">{applicant?.essay_why_a2sv}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Resume</p>
                <a
                  href={applicant?.resume_url}
                  className="text-[#4F46E5] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </div>
            </div>

            {/* Applicant Evaluation */}
            <div className="shadow-xl rounded-lg p-6 bg-white space-y-4">
              <h3 className="text-lg font-semibold">Applicant Evaluation</h3>

              <div>
                <p className="text-sm text-gray-500">Activity Check</p>
                <p className="font-medium">{review?.activity_check_notes}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Resume Score</p>
                  <p className="font-medium">
                    {displayScore(review?.resume_score)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Essay Scores</p>
                  <p className="font-medium">
                    {review?.essay_about_you_score != null &&
                    review?.essay_why_a2sv_score != null ? (
                      <>
                        {displayScore(
                          (review.essay_why_a2sv_score +
                            review.essay_about_you_score) /
                            2
                        )}
                        <br />
                      </>
                    ) : (
                      "Not Graded"
                    )}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Tech Interview</p>
                  <p className="font-medium">
                    {displayScore(review?.technical_interview_score)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Behavioral Interview</p>
                  <p className="font-medium">
                    {displayScore(review?.behavioral_interview_score)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">Interviewer Notes</p>
                <p className="font-medium">{review?.interview_notes}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-white shadow-2xl space-y-6 h-fit">
              <h3 className="text-lg font-semibold">Manager Actions</h3>

              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Assigned Reviewer
                  <br />
                  <div className="bg-gray-300 w-[150px] text-center mt-2 mb-4 rounded">
                    <span className="text-black font-medium">
                      {assignedReviewerName || "Not Assigned"}
                    </span>
                  </div>
                </p>

                <ActionDropdown
                  applicationId={id}
                  onAssigned={(reviewerId, reviewerName) => {
                    setSelectedReviewerId(reviewerId);
                    setAssignedReviewerName(reviewerName ?? "Not Assigned");
                  }}
                />
              </div>

              <button
                disabled={statusUpdating || isUpdating || isAssigning}
                className="w-full bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-md px-6 py-2 text-sm font-medium"
                onClick={handleConfirm}
              >
                Confirm
              </button>

              <div className="border-t border-gray-200 pt-6 space-y-3">
                <h5 className="font-semibold">Final Decision</h5>
                <p className="text-sm text-gray-500">
                  This is final and will notify the applicant.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleStatus("rejected")}
                    disabled={statusUpdating || isUpdating}
                    className="bg-[#DC2626] w-full text-white hover:bg-[#B91C1C] rounded-md px-6 py-2 text-sm font-medium"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleStatus("accepted")}
                    disabled={statusUpdating || isUpdating}
                    className="bg-[#16A34A] w-full text-white hover:bg-[#15803D] rounded-md px-6 py-2 text-sm font-medium"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
