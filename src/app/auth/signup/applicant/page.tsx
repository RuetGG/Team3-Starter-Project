"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://a2sv-application-platform-backend-team3.onrender.com";

type ApplicationInfo = {
  success: boolean;
  data: {
    id: string;
    status: "in_progress" | "submitted" | "accepted" | "rejected" | string;
    school: string;
    country: string;
    degree: string;
    submitted_at: string;
  } | null;
  message: string;
};

async function fetchMyApplicationInfo(): Promise<ApplicationInfo> {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  const res = await fetch(`${BASE_URL}/applications/my-status/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data: ApplicationInfo = await res.json();

  if (!res.ok) {
    try {
      const errorData = await res.json();
      if (res.status === 404 && errorData?.error_code === "NOT_FOUND") {
        return {
          success: false,
          data: null,
          message: "No application found.",
        };
      }
    } catch {}
    throw new Error(
      `Failed to fetch application info: ${res.status} ${JSON.stringify(data)}`
    );
  }

  return data;
}

const StageInfoMap: Record<
  string,
  { imageSrc: string; note: string; currStage: string }
> = {
  in_progress: {
    imageSrc: "/images/Inprogress.png",
    note: "Your application is currently in progress. Keep an eye on updates.",
    currStage: "In Progress",
  },
  submitted: {
    imageSrc: "/images/Done.png",
    note: "Your application has been submitted successfully! We're reviewing it.",
    currStage: "Submitted",
  },
  accepted: {
    imageSrc: "/images/Accepted.png",
    note: "Congratulations! Your application has been accepted.",
    currStage: "Accepted",
  },
  rejected: {
    imageSrc: "/images/Rejected.png",
    note: "We're sorry. Your application was not successful this time.",
    currStage: "Rejected",
  },
  default: {
    imageSrc: "/images/NotDone.png",
    note: "Status unknown. Please check back later.",
    currStage: "",
  },
};

const stages = [
  { key: "submitted", title: "Application Submitted" },
  { key: "under_review", title: "Under Review" },
  { key: "interview", title: "Interview Stage" },
  { key: "decision", title: "Decision Made" },
];

const ApplicationPage: React.FC = () => {
  const [appInfo, setAppInfo] = useState<ApplicationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMyApplicationInfo()
      .then((info) => {
        setAppInfo(info);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.message.includes("Failed to fetch application info: 404") &&
          err.message.includes('"error_code":"NOT_FOUND"')
        ) {
          router.push("/auth/signup/applicant/applicant-welcome");
          return;
        }
        setError(err.message || "Failed to fetch application info");
        setLoading(false);
      });
  }, [router]);

  if (loading)
    return (
      <p className="text-center mt-12">Loading your application info...</p>
    );
  if (error)
    return <p className="text-red-600 text-center mt-12">Error: {error}</p>;

  if (!appInfo?.success || !appInfo.data) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 p-8 bg-white max-w-md mx-auto rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          No Application Found
        </h1>
        <p className="text-center text-gray-600 mb-8">
          It looks like you haven't started your application yet. Click below to
          begin your journey!
        </p>
        <a
          href="/auth/signup"
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 transition"
        >
          Start Application
        </a>
      </div>
    );
  }

  const formattedDate = new Date(appInfo.data.submitted_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "2-digit" }
  );

  function getStageDetails(stage: string) {
    const status = appInfo?.data?.status;

    if (stage === "submitted") {
      return status === "submitted" || status === "in_progress"
        ? {
            imageSrc: "/images/Done.png",
            note: "Your application has been successfully submitted. We're excited to learn more about you!",
            currStage: formattedDate,
          }
        : StageInfoMap.default;
    }
    if (stage === "under_review") {
      return status === "in_progress"
        ? {
            imageSrc: "/images/Inprogress.png",
            note: "Our team is currently reviewing your application. This may take a few days. Thank you for your patience.",
            currStage: "Current Stage",
          }
        : StageInfoMap.default;
    }
    if (stage === "interview") {
      return status === "accepted"
        ? {
            imageSrc: "/images/Interview.png",
            note: "You are scheduled for an interview.",
            currStage: "Interview Stage",
          }
        : StageInfoMap.default;
    }
    if (stage === "decision") {
      if (status === "accepted") {
        return {
          imageSrc: "/images/Accepted.png",
          note: "Your application was accepted!",
          currStage: "Decision Made",
        };
      }
      if (status === "rejected") {
        return {
          imageSrc: "/images/Rejected.png",
          note: "Your application was rejected.",
          currStage: "Decision Made",
        };
      }
      return StageInfoMap.default;
    }
    return StageInfoMap.default;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Your Application Progress
          </h2>
          <p className="text-gray-600">
            You're on your way! Here's a summary of your application status.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Application Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-lg shadow p-8">
              <h3 className="text-xl font-bold mb-6">Application Timeline</h3>
              <div className="space-y-8">
                {stages.map(({ key, title }) => {
                  const { imageSrc, note, currStage } = getStageDetails(key);
                  return (
                    <div key={key} className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <Image
                          src={imageSrc}
                          alt={`${title} icon`}
                          width={32}
                          height={32}
                          priority
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900">{title}</h4>
                        {currStage && (
                          <p className="text-sm text-gray-500 mb-2">
                            {currStage}
                          </p>
                        )}
                        <p className="text-gray-700">{note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* Recent Activity */}
            <section className="bg-white rounded-lg shadow p-6">
              <h5 className="font-semibold mb-4">Recent Activity</h5>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Image
                    src="/images/Done.png"
                    alt="Done icon"
                    width={20}
                    height={20}
                    className="mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="text-gray-700">Application Submitted</p>
                    <p className="text-sm text-gray-500">{formattedDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Image
                    src="/images/Done.png"
                    alt="Done icon"
                    width={20}
                    height={20}
                    className="mt-1 flex-shrink-0"
                  />
                  <div>
                    <p className="text-gray-700">Interview Scheduled</p>
                    <p className="text-sm text-gray-500">November 5, 2023</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Important Updates */}
            <section className="bg-white rounded-lg shadow p-6">
              <h5 className="font-semibold mb-4">Important Updates</h5>
              <p className="text-gray-700">
                There are no new updates at this time. We will notify you by
                email when your application status changes.
              </p>
            </section>

            <section className="bg-indigo-600 text-white rounded-lg shadow p-6">
              <h5 className="font-semibold mb-3">
                Get Ready for the Interview!
              </h5>
              <p className="mb-2">
                While you wait, it's a great time to prepare. Practice your
                problem-solving skills on platforms like LeviCode and
                Codeforests.
              </p>
              <a href="#" className="font-medium hover:underline inline-block">
                Read our interview prep guide →
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
