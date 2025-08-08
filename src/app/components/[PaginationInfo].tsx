import React from "react";

interface PaginationInfoProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  pageSize,
  totalItems,
}) => {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <p className="text-sm text-gray-600">
      Showing {start} to {end} of {totalItems} results
    </p>
  );
};

export default PaginationInfo;