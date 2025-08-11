"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);
    setIsLoading(true);

    const callbackUrl = `${window.location.origin}/reset-password`;

    try {
      const res = await fetch(
        // The API endpoint was corrected from `/api/forgot-password` to `/api/auth/forgot-password`
        "https://a2sv-application-platform-backend-team3.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // The `callback_url` field was added to the request body as required by the API
          body: JSON.stringify({ email: email, callback_url: callbackUrl }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        // Use the success message from the API response
        setMessage(`✅ ${data.message}`);
        setIsError(false);
      } else {
        setMessage(
          `❌ ${data.message || "Something went wrong. Please try again."}`
        );
        setIsError(true);
      }
    } catch (err) {
      setMessage("❌ Unable to connect to the server. Please try later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <div className="flex justify-center mb-4">
          <img src="/images/A2SV-logo1.png" alt="Logo" className="h-10" />
        </div>

        <h1 className="text-center text-2xl font-bold mb-2">
          Forgot your password?
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded px-4 py-2 font-medium text-white transition
              ${
                isLoading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          {/* Use Next.js Link for better performance and client-side routing */}
          <Link
            href="/auth/signin"
            className="text-sm text-indigo-600 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
