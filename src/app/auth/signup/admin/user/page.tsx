"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import PaginationInfo from "@components/[PaginationInfo]";
import PaginationButton from "@components/[PaginationButton]";
import { useRouter } from "next/navigation";
import ManagerNav from "@app/components/[ManagerNav]";
import Footer from "@app/components/[Footer]";

const baseUrl = "https://a2sv-application-platform-backend-team1.onrender.com";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

export default function AdminUser() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
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
        const token = session?.accessToken;
        if (!token) {
          setError("Authentication token not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/admin/users`, {
          params: { page, limit },
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUsers(response.data.data.users);
          setTotalCount(response.data.data.total_count);
        } else {
          setError(response.data.message || "Failed to load users");
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

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setLoading(true);
    setError("");

    try {
      const session = await getSession();
      const token = session?.accessToken;
      if (!token) {
        setError("Authentication token not found. Please login again.");
        setLoading(false);
        return;
      }

      await axios.put(
        `${baseUrl}/admin/users/${editing.id}`,
        {
          full_name: editing.full_name,
          email: editing.email,
          role: editing.role,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers((prev) =>
        prev.map((user) => (user.id === editing.id ? editing : user))
      );
      setEditing(null);
    } catch {
      setError("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <>
      <ManagerNav />
      <div className="p-8 shadow rounded-2xl max-w-6xl mx-auto bg-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-600 mt-1">
              Administer and manage all users on the platform.
            </p>
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
            <option value="Applicant">Applicant</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {loading && (
          <p className="text-center py-10 text-gray-500 font-semibold">
            Loading users...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 font-semibold mb-4">{error}</p>
        )}

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
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                      {editing?.id === user.id ? (
                        <form
                          onSubmit={handleEdit}
                          className="flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                        >
                          <input
                            type="text"
                            value={editing.full_name}
                            onChange={(e) =>
                              setEditing({
                                ...editing,
                                full_name: e.target.value,
                              })
                            }
                            className="border border-gray-300 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                          />
                          <input
                            type="email"
                            value={editing.email}
                            onChange={(e) =>
                              setEditing({ ...editing, email: e.target.value })
                            }
                            className="border border-gray-300 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                          />
                          <select
                            value={editing.role}
                            onChange={(e) =>
                              setEditing({ ...editing, role: e.target.value })
                            }
                            className="border border-gray-300 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                          >
                            <option value="Applicant">Applicant</option>
                            <option value="Reviewer">Reviewer</option>
                            <option value="Manager">Manager</option>
                            <option value="Admin">Admin</option>
                          </select>
                          <div className="flex gap-3">
                            <button
                              type="submit"
                              disabled={loading}
                              className="px-4 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditing(null)}
                              disabled={loading}
                              className="px-4 py-1 text-sm border border-gray-600 text-gray-600 rounded hover:bg-gray-50 transition"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div>
                          <p className="font-semibold">{user.full_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      )}
                    </div>

                    {editing?.id !== user.id && (
                      <div className="flex items-center gap-8">
                        <p className="min-w-[90px] font-medium capitalize">
                          {user.role}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => setEditing(user)}
                            className="px-4 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            className="px-4 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                            disabled={loading}
                            onClick={() =>
                              alert("Delete functionality not implemented")
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center mt-8">
              <PaginationInfo
                currentPage={page}
                pageSize={limit}
                totalItems={totalCount}
              />
              <PaginationButton
                currentPage={page}
                totalPages={Math.ceil(totalCount / limit)}
                handlePageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
