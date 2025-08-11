"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../lib/api";

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  role: string;
};

interface UseProfileResult {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

export function useProfile(): UseProfileResult {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchWithAuth<Profile>("/profile/me");
        setProfile(data);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        if (error.message === "Not authenticated") {
          router.push("/login");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  return { profile, loading, error };
}
