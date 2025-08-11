"use client";

import React, { useState, useEffect, useMemo } from "react";
import ApplicantList from "../../../components/application_list";
import NavBar from "../../../components/reviewer_navBar";
import Footer from "../../../components/reviewer_footer";
import { getAssignedReviewsWithTags } from "../../../../lib/redux/api/reviwer_dashboad_API";
import { Review } from "../../../types/applicant";

type Tag = "New" | "Under Review" | "Review Complete";
type FilterStatus = "All" | "Under Review" | "Complete";

export default function Home() {
  const [applicants, setApplicants] = useState<(Review & { tag: Tag })[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applicantsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const taggedApplicants = await getAssignedReviewsWithTags();
        
       
        setApplicants(taggedApplicants);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const sortedApplicants = useMemo(() => {
    return [...applicants].sort(
      (a, b) =>
        new Date(b.submission_date).getTime() -
        new Date(a.submission_date).getTime()
    );
  }, [applicants]);

  const filteredApplicants = useMemo(() => {
    switch (activeTab) {
      case "Under Review":
        return sortedApplicants.filter((a) => a.tag === "Under Review");
      case "Complete":
        return sortedApplicants.filter((a) => a.tag === "Review Complete");
      default:
        return sortedApplicants;
    }
  }, [sortedApplicants, activeTab]);

  const pendingReviewCount = applicants.filter(
    (a) => a.tag === "New" || a.tag === "Under Review"
  ).length;

  const totalApplicants = filteredApplicants.length;
  const totalPages = Math.ceil(totalApplicants / applicantsPerPage);

  const startIndex = (currentPage - 1) * applicantsPerPage;
  const endIndex = Math.min(startIndex + applicantsPerPage, totalApplicants);

  const currentPageApplicants = filteredApplicants.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // 🔹 Pagination Component
  const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => {
    const getPages = (): (number | string)[] => {
      const pages: (number | string)[] = [];

      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 3) {
          pages.push(1, 2, 3, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, "...", currentPage, "...", totalPages);
        }
      }

      return pages;
    };

    return (
      <div className="inline-flex border border-gray-300 bg-white divide-x divide-gray-300">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm font-medium ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          &lt;
        </button>

        {/* Page Numbers */}
        {getPages().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="px-3 py-1 text-sm text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`px-3 py-1 text-sm font-medium ${
                currentPage === page
                  ? "bg-gray-100 text-[#4f46e5] font-bold"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex flex-col min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-2xl text-black mb-4">Assigned Applications</h1>

          <p className="text-gray-700 mb-4">
            You have <span className="font-semibold">{pendingReviewCount}</span>{" "}
            application{pendingReviewCount !== 1 && "s"} waiting for your
            review.
          </p>

          <div className="flex justify-between items-center mb-2">
            <div className="flex space-x-2">
              {(["All", "Under Review", "Complete"] as FilterStatus[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                      activeTab === tab
                        ? "bg-[#4338ca] text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            <div className="text-sm text-gray-600 ml-4">
              Sort by: <span className="font-medium">Submission Date</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-10 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : totalApplicants === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No applications found.
            </div>
          ) : (
            <>
              <div className="flex justify-center">
                <div className="w-full max-w-6xl">
                  <ApplicantList applicants={currentPageApplicants} />
                </div>
              </div>

              <div className="flex justify-between items-center w-full max-w-6xl mt-6">
                <p className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {endIndex} of {totalApplicants}{" "}
                  result{totalApplicants !== 1 && "s"}
                </p>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
}
