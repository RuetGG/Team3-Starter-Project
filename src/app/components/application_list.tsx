// components/ApplicantList.tsx
"use client";
import React from "react";
import ApplicantCard from "@components/rCard";
import { useRouter } from "next/navigation";
import { Review } from "../types/applicant";

interface ApplicantListProps {
  applicants: Review[];
}

const statusMap = (status: string): "New" | "Under Review" | "Review Complete" => {
  switch (status.toLowerCase()) {
    case "new":
      return "New";
    case "under_review":
    case "under review":
      return "Under Review";
    case "review_complete":
    case "review complete":
      return "Review Complete";
    default:
      return "New"; 
  }
};

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants }) => {
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/reviewer/reviewer_detail/${id}`); // Navigate to detail page
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {applicants.map((applicant) => (
        <ApplicantCard
          key={applicant.application_id}
          applicantName={applicant.applicant_name}
          submissionDate={new Date(applicant.submission_date).toLocaleDateString()}
          status={statusMap(applicant.status)} // Use statusMap to determine status
          profileImageUrl={applicant.profile_picture_url || "/images/default-avatar.png"}
          applicationId={applicant.application_id}
          onClick={() => handleCardClick(applicant.application_id)} // Pass click handler
        />
      ))}
    </div>
  );
};

export default ApplicantList;