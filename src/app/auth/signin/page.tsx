"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/20/solid";

import { useAuth } from "@app/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

type JwtPayload = { exp: number };

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { setProfile } = useAuth();

  function isTokenValid(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded token exp:", decoded.exp);
      return decoded.exp > Date.now() / 1000;
    } catch (e) {
      console.warn("Token decode failed:", e);
      return false;
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (token && isTokenValid(token)) {
      try {
        const decoded = jwtDecode<{ role?: string }>(token);
        const role = decoded.role?.toLowerCase();
        console.log("User role from token:", role);

        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      } catch (e) {
        console.error("Failed to decode role from token:", e);
        // fallback
        router.push("/user/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Login attempt with email:", email);

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Login request
      const res = await fetch(`${API_BASE_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Save tokens — optionally persist longer if "remember me" checked
      if (rememberMe) {
        localStorage.setItem("accessToken", data.data.access);
        localStorage.setItem("refreshToken", data.data.refresh);
      } else {
        sessionStorage.setItem("accessToken", data.data.access);
        sessionStorage.setItem("refreshToken", data.data.refresh);
      }

      // Fetch profile after login
      const profileRes = await fetch(`${API_BASE_URL}/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.data.access}`,
          "Content-Type": "application/json",
        },
      });

      const profileJson = await profileRes.json();
      console.log("Profile fetch response:", profileJson);

      if (!profileRes.ok || !profileJson.success) {
        throw new Error(profileJson.message || "Failed to fetch profile");
      }

      setProfile(profileJson.data);

      // Redirect based on role (case insensitive)
      const role = profileJson.data.role?.toLowerCase();
      console.log("Redirecting user role:", role);
      router.push(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
    } catch (err: unknown) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/A2SV-logo1.png"
            alt="A2SV Logo"
            width={192}
            height={48}
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Back to Home
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link
              href="/auth/signup"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Create a new applicant account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
            autoComplete="current-password"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-black cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                disabled={loading}
                className="h-4 w-4 accent-white bg-gray border border-black rounded"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-[#4f46e5] hover:underline"
              tabIndex={0}
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="relative w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center"
          >
            <LockClosedIcon className="h-5 w-5 absolute left-4 opacity-50" />
            <span>{loading ? "Signing in..." : "Sign in"}</span>
          </button>
        </form>
      </div>
    </main>
  );
}
