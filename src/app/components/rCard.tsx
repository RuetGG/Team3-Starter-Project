// components/ApplicantCard.tsx
import React from "react";
import Image from "next/image";

interface ApplicantCardProps {
  profileImageUrl?: string;
  applicantName: string;
  submissionDate: string;
  status: "New" | "Under Review" | "Review Complete";
  applicationId: string;
  onClick: () => void; // Click handler
}

const statusColorMap = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Review Complete": "bg-green-100 text-green-800",
};

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  profileImageUrl = "/images/default-avatar.png",
  applicantName,
  submissionDate,
  status,
  onClick,
}) => {
  return (
    <div onClick={onClick} className="cursor-pointer border rounded-lg p-4 shadow-sm bg-white">
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
          <h2 className="text-lg font-semibold text-gray-800">{applicantName}</h2>
          <p className="text-sm text-gray-500">Submitted: {submissionDate}</p>
        </div>
      </div>

      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full w-fit ${statusColorMap[status]}`}>
        {status}
      </span>
    </div>
  );
};

export default ApplicantCard;