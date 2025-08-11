"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../lib/api";
import type { Profile } from "./useProfile";

export type ApplicationStatus = {
  id: string;
  status: string;
  school: string;
  submitted_at: string;
};

export type ApplicationDetails = {
  id: string;
  status: string;
  school: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
};

interface UseApplicationResult {
  status: ApplicationStatus | null;
  details: ApplicationDetails | null;
  loading: boolean;
  error: string | null;
}

export function useApplication(profile: Profile | null): UseApplicationResult {
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const [details, setDetails] = useState<ApplicationDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!profile) return;

    const loadApplication = async () => {
      setLoading(true);
      setError(null);

      try {
        const statusData = await fetchWithAuth<ApplicationStatus>(
          "/applications/my-status"
        );
        setStatus(statusData);

        if (statusData.id) {
          const detailsData = await fetchWithAuth<ApplicationDetails>(
            `/applications/${statusData.id}`
          );
          setDetails(detailsData);
        } else {
          setDetails(null);
        }
      } catch (err: unknown) {
        const error =
          err instanceof Error ? err : new Error("Failed to load application");
        if (error.message === "Not authenticated") {
          router.push("/login");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadApplication();
  }, [profile, router]);

  return { status, details, loading, error };
}
