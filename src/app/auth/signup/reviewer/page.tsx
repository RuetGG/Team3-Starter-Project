"use client";
import React, { useState, useEffect, useMemo } from "react";
import ApplicantList from "@components/application_list";
import NavBar from "@components/reviewer_navBar";
import Footer from "@components/reviewer_footer";
import { getAssignedReviews } from "@lib/redux/api/reviwer_dashboad_API";
import { Review } from "@app/types/applicant";

type FilterStatus = "All" | "New" | "Under Review" | "Complete";

export default function Home() {
  const [applicants, setApplicants] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<FilterStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applicantsPerPage = 6;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAssignedReviews();
        const reviews = response?.data?.reviews;

        if (Array.isArray(reviews)) {
          setApplicants(reviews);
        } else {
          console.error(
            "Expected array in response.data.reviews, got:",
            reviews
          );
          setApplicants([]);
          setError("Invalid data format received.");
        }
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
    return [...(applicants || [])].sort(
      (a, b) =>
        new Date(b.submission_date).getTime() -
        new Date(a.submission_date).getTime()
    );
  }, [applicants]);

  const filteredApplicants = useMemo(() => {
    if (activeTab === "All") return sortedApplicants;
    return sortedApplicants.filter(
      (applicant) => applicant.status === activeTab
    );
  }, [sortedApplicants, activeTab]);

  const pendingReviewCount = applicants.filter(
    (a) => a.status === "New" || a.status === "Under Review"
  ).length;

  const totalApplicants = filteredApplicants.length;
  const totalPages = Math.ceil(totalApplicants / applicantsPerPage);

  const startIndex = (currentPage - 1) * applicantsPerPage;
  const endIndex = Math.min(startIndex + applicantsPerPage, totalApplicants);

  const currentPageApplicants = filteredApplicants.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional: better UX
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

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

                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-black hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          currentPage === page
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 text-black hover:bg-purple-600 hover:text-white"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-black hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </main>
  );
}