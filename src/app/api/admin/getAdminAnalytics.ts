import { AnalyticsResponse } from "./../../types/analytics";

export const getAdminAnalytics = async (token: string): Promise<AnalyticsResponse> => {
  const res = await fetch(
    "https://a2sv-application-platform-backend-team3.onrender.com/admin/analytics/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
};
