"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { jwtDecode } from "jwt-decode";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  type JwtPayload = { exp: number };

  function isTokenValid(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && isTokenValid(token)) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team3.onrender.com/auth/token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid email or password");
      }

      localStorage.setItem("accessToken", data.data.access);
      localStorage.setItem("refreshToken", data.data.refresh);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
        className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
        className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            disabled={loading}
            className="h-4 w-4 accent-white bg-gray border border-black rounded"
          />
          <span>Remember me</span>
        </label>

        <a href="/forgot-password" className="text-[#4f46e5] hover:underline">
          Forgot password?
        </a>
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
  );
}
