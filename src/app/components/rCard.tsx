"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ApplicantCardProps {
  profileImageUrl?: string;
  applicantName: string;
  submissionDate: string;
  tag: "New" | "Under Review" | "Review Complete";
  applicationId: string;
}

const statusColorMap: Record<ApplicantCardProps["tag"], string> = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Review Complete": "bg-green-100 text-green-800",
};

const buttonTextMap: Record<ApplicantCardProps["tag"], string> = {
  New: "Start Review",
  "Under Review": "Continue Review",
  "Review Complete": "View Details",
};

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  profileImageUrl = "/images/default-avatar.png",
  applicantName,
  submissionDate,
  tag,
  applicationId,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (status === "New") {
      router.push(`/review/start/${applicationId}`);
    } else if (status === "Under Review") {
      router.push(`/review/continue/${applicationId}`);
    } else {
      router.push(`/review/details/${applicationId}`);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white w-full max-w-2xl flex flex-col gap-3">
      {/* Row 1: Image + Name & Submitted Date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Image
          src={profileImageUrl}
          alt={`${applicantName} profile`}
          width={56}
          height={56}
          className="w-14 h-14 rounded-full object-cover shadow-md"
          unoptimized
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold text-gray-800">
            {applicantName}
          </h2>
          <p className="text-sm text-gray-500">
            Submitted:{" "}
            {new Date(submissionDate).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Row 2: Status Tag */}
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full w-fit ${statusColorMap[tag]}`}
      >
        {tag}
      </span>

      {/* Row 3: Action Button */}
      <div className="flex justify-center items-center">
        <button
          onClick={handleClick}
          className={`px-6 py-2 rounded-md text-base font-medium transition max-w-[180px] w-full sm:w-auto
    ${
      tag === "Review Complete"
        ? "bg-white text-black border border-gray-300 hover:bg-gray-100"
        : "bg-[#4338ca] text-white hover:bg-[#372e94]"
    }
  `}
        >
          {buttonTextMap[tag]}
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
