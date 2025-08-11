"use client";
import React, { useEffect } from "react";
import { useGetAllApplicationQuery, useGetApplicationQuery } from "@lib/redux/api/applicationListManagerApi";
import StatCard from "@components/StatCard";
import ManagerNav from "@app/components/[ManagerNav]";
import ActionDropdown from "@app/components/ActionDropdown";
import { useRouter } from "next/navigation";

function formatStatus(status: string) {
  switch (status.toLowerCase()) {
    case "pending_review":
      return {
        label: "Pending Review",
        color: "bg-yellow-100 text-yellow-800",
      };
    case "under review":
      return { label: "Under Review", color: "bg-yellow-100 text-yellow-800" };
    case "in_progress":
      return { label: "In Progress", color: "bg-gray-100 text-gray-800" };
    case "accepted":
      return { label: "Accepted", color: "bg-green-100 text-green-800" };
    case "submitted":
      return { label: "Submitted", color: "bg-blue-100 text-blue-800" };
    case "rejected":
      return { label: "Rejected", color: "bg-red-100 text-red-800" };
    case "interview stage":
      return {
        label: "Interview Stage",
        color: "bg-indigo-100 text-indigo-800",
      };
    default:
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        color: "bg-gray-100 text-gray-600",
      };
  }
}

export default function ManagerDashboardPage() {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetAllApplicationQuery();

  useEffect(() => {
    if (localStorage.getItem("dashboardNeedsRefresh") === "true") {
      refetch();
      localStorage.removeItem("dashboardNeedsRefresh");
    }
  }, [refetch]);

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error || !data)
    return <p className="p-4 text-red-500">Failed to load applications</p>;

  const applications = data.data.applications;

  const totalApplications = data.data.total_count;
  const underReview = applications.filter(
    (app) => app.status === "under_review"
  ).length;
  const inProgress = applications.filter(
    (app) => app.status === "in_progress"
  ).length;
  const interviewStage = applications.filter(
    (app) => app.status === "interview_stage"
  ).length;
  const accepted = applications.filter(
    (app) => app.status === "accepted"
  ).length;
  const rejected = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  // Group applications by assigned_reviewer_name and count
  const reviewerCounts: Record<string, number> = {};
  applications.forEach((app) => {
    const reviewerName = app.assigned_reviewer_name || "Unassigned";
    reviewerCounts[reviewerName] = (reviewerCounts[reviewerName] || 0) + 1;
  });
  console.log(applications);

  return (
    <>
      <ManagerNav />

      <main className="min-h-screen bg-gray-100 px-8 py-10">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-8 max-w-[1280px] mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Manager Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-16">
          <StatCard
            title="Total Applications"
            value={totalApplications.toString()}
          />
          <StatCard title="Under Review" value={underReview.toString()} />
          <StatCard title="Interview Stage" value={interviewStage.toString()} />
          <StatCard title="Accepted" value={accepted.toString()} />
        </div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-x-32">
          {/* Applications Table */}
          <div className="col-span-2 bg-white shadow-xl rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                All Applications
              </h2>
              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Filter by Status</option>
                <option value="new">New</option>
                <option value="under_review">Under Review</option>
                <option value="interview_stage">Interview Stage</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            <table className="w-full text-sm border-collapse">
              <thead className="text-gray-600 border-b border-gray-300">
                <tr>
                  <th className="text-left py-3">Applicant</th>
                  <th className="text-left py-3">Submitted</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-left py-3">Reviewer</th>
                  <th className="text-left py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => {
                  const { label, color } = formatStatus(app.status);
                 
                  return (
                    <tr
                      key={app.id}
                      onClick={() =>
                        router.push(
                          `/auth/signup/manager/manager_detail/${
                            app.id
                          }?reviewerName=${encodeURIComponent(
                            app.assigned_reviewer_name || ""
                          )}`
                        )
                      }
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="py-3">{app.applicant_name}</td>
                      <td className="py-3">
                        {/* static data */}
                        Aug,6,2025
                        
                      </td>{" "}
                      <td className="py-3">
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${color}`}
                        >
                          {label}
                        </span>
                      </td>
                      <td className="py-3">
                        {app.assigned_reviewer_name || "Not Assigned"}
                      </td>
                      <td className="py-3" onClick={(e) => e.stopPropagation()}>
                        <ActionDropdown
                          applicationId={app.id.toString()}
                          onAssigned={() => refetch()}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-xl rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Team Performance
            </h2>

            <div className="space-y-3">
              {Object.entries(reviewerCounts).map(([reviewerName, count]) => (
                <div
                  key={reviewerName}
                  className="flex justify-between items-center border-b border-gray-200 py-4"
                >
                  <h6 className="font-medium text-gray-700">{reviewerName}</h6>
                  <p className="text-gray-600">{count} assigned applications</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
