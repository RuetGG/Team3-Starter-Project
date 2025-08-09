"use client";

import React, { useEffect, useState } from "react";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("User is not authenticated");
        }

        const res = await fetch(
          "https://a2sv-application-platform-backend-team3.onrender.com/profile/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          const message =
            errorData?.message || `Error: ${res.status} ${res.statusText}`;
          throw new Error(message);
        }

        const json = await res.json();

        if (!json.success) {
          throw new Error(json.message || "Failed to fetch profile");
        }

        setProfile(json.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profile) return <p>No profile data available.</p>;

  return (
    <main className="bg-gray-100 px-8 py-12 flex-1">
      <h1 className="text-3xl font-bold mb-2">Welcome, {profile.full_name}!</h1>

      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </main>
  );
}
