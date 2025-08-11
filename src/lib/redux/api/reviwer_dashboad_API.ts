import { getSession } from "next-auth/react";
import { Review } from "@app/types/applicant";

const BASE_URL = "https://a2sv-application-platform-backend-team3.onrender.com";

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

export async function getAssignedApplicationIds(): Promise<string[]> {
  const assignedData = await getAssignedReviews();

  const reviews = assignedData?.data?.reviews;

  if (!reviews || reviews.length === 0) {
    return [];
  }

  return reviews.map((review: Review) => review.application_id);
}

export async function getAllReviewsDetails() {
  const session = await getSession();
  const ids = await getAssignedApplicationIds();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  if (!ids.length) {
    return [];
  }

  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${BASE_URL}/reviews/${id}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(
            `Failed to fetch review for ID ${id}: ${
              res.status
            } ${JSON.stringify(errorData)}`
          );
        }

        return await res.json();
      })
    );

    return results;
  } catch (err) {
    console.error("Error fetching all reviews data:", err);
    throw err;
  }
}
export async function getAssignedReviewsWithTags(): Promise<
  (Review & { tag: "New" | "Under Review" | "Review Complete" })[]
> {
  const session = await getSession();

  if (!session?.accessToken) {
    throw new Error("No access token found. User might not be logged in.");
  }

  try {
    const assignedResponse = await getAssignedReviews();
    const assignedReviews: Review[] = assignedResponse?.data?.reviews;

    if (!Array.isArray(assignedReviews) || assignedReviews.length === 0) {
      return [];
    }

    const enrichedReviews = await Promise.all(
      assignedReviews.map(async (review) => {
        try {
          const res = await fetch(
            `${BASE_URL}/reviews/${review.application_id}/`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessToken}`,
              },
            }
          );

          if (!res.ok) {
            throw new Error(
              `Failed to fetch review detail for ${review.application_id}`
            );
          }

          const detail = await res.json();
          const reviewDetails = detail?.data?.review_details ?? null;

          const reviewStatus = detail?.status ?? "";

          let tag: "New" | "Under Review" | "Review Complete";

          if (reviewDetails === null) {
            tag = "New";
          } else if (
            review.status === "rejected" ||
            review.status === "accepted"
          ) {
            tag = "Review Complete";
          } else {
            tag = "Under Review";
          }
          console.log("Review ID:", review.application_id);
          console.log("Tag:", tag);
          console.log("Review Details:", reviewDetails);
          console.log("status:", review.status);

          return { ...review, tag };
        } catch (err) {
          console.error(
            `Error processing review ${review.application_id}`,
            err
          );

          return { ...review, tag: "New" }; // fallback
        }
      })
    );

    return enrichedReviews as (Review & {
      tag: "New" | "Under Review" | "Review Complete";
    })[];
  } catch (err) {
    console.error("Error fetching reviews with tags:", err);
    throw err;
  }
}
