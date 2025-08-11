"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import ManagerNav from "@app/components/[ManagerNav]";
import Footer from "@app/components/[Footer]";

const baseUrl: string =
  "https://a2sv-application-platform-backend-team1.onrender.com";

interface User {
  full_name: string;
  email: string;
  password: string;
  role: string;
}

export default function AdminUserForm() {
  const [user, setUser] = useState<User>({
    full_name: "",
    email: "",
    password: "",
    role: "All",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchToken() {
      try {
        const session = await getSession();
        if (!session?.accessToken) {
          setError("Authentication token not found. Please login again.");
          return;
        }
        setToken(session.accessToken);
      } catch {
        setError("Failed to get authentication token.");
      }
    }
    fetchToken();
  }, []);

  const SaveUser = async () => {
    if (!token) {
      setError("No authentication token. Please login.");
      return;
    }
    if (user.role === "All") {
      setError("Please select a valid role.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${baseUrl}/admin/users`, user, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("User created successfully!");
      setUser({ full_name: "", email: "", password: "", role: "All" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ManagerNav />
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg text-gray-700 font-sans">
        <h1 className="text-3xl font-bold mb-2">Create New User</h1>
        <p className="mb-8 text-gray-500">
          Use this form to create a new user and assign them a role.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            SaveUser();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-semibold text-gray-600">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={user.full_name}
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={loading}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-gray-600">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={loading}
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 font-semibold text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Set an initial password"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={loading}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="mb-2 font-semibold text-gray-600">
              Role
            </label>
            <select
              id="role"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              disabled={loading}
              required
            >
              <option value="All" disabled>
                Select Role
              </option>
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Buttons spanning two columns */}
          <div className="md:col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={() =>
                setUser({ full_name: "", email: "", password: "", role: "All" })
              }
              disabled={loading}
              className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-6 text-center text-red-600 font-semibold">{error}</p>
        )}
        <Footer />
      </div>
    </>
  );
}
