import React from "react";
import Image from "next/image";

interface ApplicantCardProps {
  profileImageUrl?: string;
  applicantName: string;
  submissionDate: string;
  status: "New" | "Under Review" | "Review Complete";
}

const statusColorMap = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Review Complete": "bg-green-100 text-green-800",
};

const buttonTextMap = {
  New: "Start Review",
  "Under Review": "Continue Review",
  "Review Complete": "View Details",
};

const ApplicantCard: React.FC<ApplicantCardProps> = ({
  profileImageUrl = "/images/default-avatar.png",
  applicantName,
  submissionDate,
  status,
}) => {
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
          <p className="text-sm text-gray-500">Submitted: {submissionDate}</p>
        </div>
      </div>

      {/* Row 2: Status Tag */}
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full w-fit ${statusColorMap[status]}`}
      >
        {status}
      </span>

      {/* Row 3: Action Button */}
      <div className="flex justify-center items-center">
        <button className="bg-[#4338ca] text-white px-6 py-2 rounded-md text-base font-medium hover:bg-[#372e94] transition max-w-[180px] w-full sm:w-auto">
          {buttonTextMap[status]}
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
