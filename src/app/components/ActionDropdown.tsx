"use client";

import React, { useState } from "react";
import {
  useGetReviewerQuery,
  useUpdateAssignedReviewerMutation,
} from "@lib/redux/api/applicationListManagerApi";

type ActionDropdownProps = {
  applicationId: string;
   onAssigned?: (reviewerId: string, reviewerName?: string) => void;
};

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  applicationId,
  onAssigned,
}) => {
  const [open, setOpen] = useState(false);

  const {
    data: reviewersData,
    isLoading,
    error,
  } = useGetReviewerQuery(undefined, { skip: !open });

  const [assignReviewer, { isLoading: isAssigning }] =
    useUpdateAssignedReviewerMutation();

  const handleReviewerClick = async (reviewerId: string, reviewerName: string) => {
    try {
      await assignReviewer({ applicationId, reviewerId }).unwrap();
      setOpen(false);
      if (onAssigned) onAssigned(reviewerId, reviewerName);
    } catch (e) {
      alert("Failed to assign reviewer. Please try again.");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-blue-600 hover:underline text-sm"
        disabled={isAssigning}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {isAssigning ? "Assigning..." : "Actions ▾"}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded shadow-lg z-10">
          {isLoading && (
            <p className="p-2 text-sm text-gray-500">Loading reviewers...</p>
          )}
          {error && (
            <p className="p-2 text-sm text-red-500">Failed to load reviewers.</p>
          )}
          {!isLoading && !error && reviewersData && (
            <ul className="max-h-60 overflow-auto">
              {reviewersData.data.reviewers.length > 0 ? (
                reviewersData.data.reviewers.map((reviewer) => (
                  <li
                    key={reviewer.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleReviewerClick(reviewer.id, reviewer.full_name)}
                  >
                    {reviewer.full_name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No reviewers available</li>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;