"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  profile_picture_url?: string | null;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] = useState<any>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    // Fetch user profile from /profile/me
    fetch(`${API_BASE_URL}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: ApiResponse<UserProfile>) => {
        if (data.success) {
          setUser(data.data);
          // Then fetch application status
          return fetch(`${API_BASE_URL}/applications/my`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } else {
          throw new Error(data.message || "Failed to fetch profile");
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setApplicationStatus(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleStartApplication = () => {
    if (!user) {
      router.push("/auth/signin");
      return;
    }

    if (applicationStatus && applicationStatus.id) {
      router.push(`/applications/${applicationStatus.id}`);
    } else {
      router.push("/applications/new");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold">
        Welcome{user ? `, ${user.full_name}` : ""}!
      </h1>
      <p className="text-gray-600 mt-1">
        Your journey to applying starts here.
      </p>
      <button
        onClick={handleStartApplication}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {applicationStatus && applicationStatus.id
          ? "Continue Application"
          : "Start Application"}
      </button>
    </main>
  );
}
