"use client";
import React from "react";
import ApplicantCard from "./rCard";


import { Review } from "../types/applicant";

interface ApplicantListProps {
  applicants: (Review & { tag: "New" | "Under Review" | "Review Complete" })[];
}

const ApplicantList: React.FC<ApplicantListProps> = ({ applicants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
      {applicants.map((applicant) => (
        <ApplicantCard
          key={applicant.application_id}
          applicationId={applicant.application_id}
          applicantName={applicant.applicant_name}
          submissionDate={new Date(
            applicant.submission_date
          ).toLocaleDateString()}
          tag={applicant.tag}
          profileImageUrl={
            applicant.profile_picture_url || "/images/default-avatar.png"
          }
        />
      ))}
    </div>
  );
};

export default ApplicantList;
