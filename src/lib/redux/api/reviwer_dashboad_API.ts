import { getSession } from "next-auth/react";

const BASE_URL = "https://a2sv-application-platform-backend-team1.onrender.com";

export async function getAssignedReviews() {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  try {
    const res = await fetch(`${BASE_URL}/reviews/assigned/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch assigned reviews: ${res.status} ${JSON.stringify(
          errorData
        )}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("Error fetching assigned reviews:", err);
    throw err;
  }
}

export async function getUserFullName(): Promise<string> {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  try {
    const res = await fetch(`${BASE_URL}/profile/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Failed to fetch user profile: ${res.status} ${JSON.stringify(
          errorData
        )}`
      );
    }

    const data = await res.json();
    return data?.data?.full_name || "Unknown User";
  } catch (err) {
    console.error("Error fetching user full name:", err);
    throw err;
  }
}
