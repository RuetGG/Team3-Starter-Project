"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "../../../lib/api";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function AdminDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetchWithAuth("/profile/me");

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || `Error: ${res.status}`);
        }

        const json = await res.json();
        if (!json.success) throw new Error(json.message);

        if (json.data.role === "admin") {
          router.push("/admin/dashboard");
          return;
        }

        setProfile(json.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [router]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <h1>Welcome, {profile?.full_name}!</h1>
      <p>Email: {profile?.email}</p>
      <p>Role: {profile?.role}</p>
    </main>
  );
}
