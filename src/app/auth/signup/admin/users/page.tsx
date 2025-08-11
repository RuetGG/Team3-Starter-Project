"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import PaginationInfo from "@components/[PaginationInfo]";
import PaginationButton from "@components/[PaginationButton]";

const baseUrl = "https://a2sv-application-platform-backend-team3.onrender.com";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string; // backend returns lower-case like "admin" | "manager" | ...
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const session = await getSession();
        const token = (session as any)?.accessToken as string | undefined;
        if (!token) {
          setError("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${baseUrl}/admin/users/`, {
          params: { page, limit },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.success) {
          setUsers(res.data.data.users);
          setTotalCount(res.data.data.total_count ?? 0);
        } else {
          setError(res.data?.message || "Failed to load users");
        }
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

    fetchUsers();
  }, [page, limit]);

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === "All" || u.role === roleFilter.toLowerCase();
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q || u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const handleDelete = async (userId: string) => {
    setLoading(true);
    setError("");

    try {
      const session = await getSession();
      const token = session?.accessToken;

      if (!token) {
        setError("Authentication token not found. Please login again.");
        return;
      }

      const res = await axios.delete(`${baseUrl}/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        alert("User deleted");
        // Optionally refresh the user list
        setUsers(users.filter(user => user.id !== userId));
      } else {
        setError(res.data?.message || "Failed to delete user");
      }
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
    <div className="p-8 shadow rounded-2xl max-w-6xl mx-auto bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600 mt-1">Administer and manage all users on the platform.</p>
        </div>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
          onClick={() => router.push("/auth/signup/admin/admin_user_form")}
        >
          Create New User
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="All">All Roles</option>
          <option value="applicant">Applicant</option>
          <option value="reviewer">Reviewer</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {loading && <p className="text-center py-10 text-gray-500 font-semibold">Loading users...</p>}
      {error && <p className="text-center text-red-600 font-semibold mb-4">{error}</p>}

      {!loading && !error && (
        <>
          <div className="divide-y border rounded-lg shadow-sm">
            {filteredUsers.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No users found.</p>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 gap-4 border-b hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold text-gray-700">
                      {user.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold">{user.full_name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <p className="min-w-[90px] font-medium capitalize">{user.role}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => router.push(`/auth/signup/admin/users/${user.id}/edit`)}
                        className="px-4 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                        disabled={loading}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                        disabled={loading}
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <PaginationInfo currentPage={page} pageSize={limit} totalItems={totalCount} />
            <PaginationButton
              currentPage={page}
              totalPages={Math.ceil(totalCount / limit)}
              handlePageChange={setPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
