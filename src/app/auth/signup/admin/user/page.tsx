'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
// backend url
const baseUrl:string ="https://a2sv-application-platform-backend-team3.onrender.com"; 
interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
}
export default function AdminUser() {
  const [users, setUsers] = useState<User[]>([]); // users
  const [editing,setediting] = useState<User | null>(null) 
  const [totalCount, setTotalCount] = useState(0); // total number of users
  const [page, setPage] = useState(1); // page number
  const [limit] = useState(10); // number of users per page
  const [loading, setLoading] = useState(false); // loading
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(''); 
  const [roleFilter, setRoleFilter] = useState('All'); // users role

  const HandleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return; 
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${baseUrl}/admin/users/${editing.id}`,
        {
          full_name: editing.full_name,
          email: editing.email,
          role: editing.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((user) => (user.id === editing.id ? editing : user))
      );
      setediting(null);
    } catch (err) {
      alert('Failed to update user');
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${baseUrl}/admin/users`,
          {
            params: { page, limit },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setUsers(response.data.data.users);
          setTotalCount(response.data.data.total_count);
        } else {
          setError(response.data.message || 'Failed to load users');
        }
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, limit]);
    const filteredUsers = users.filter((user) => {
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesSearch =
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
      return matchesRole && matchesSearch;
  });
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-500 text-sm">Administer and manage all users on the platform.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Create New User
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Roles</option>
          <option value="Applicant">Applicant</option>
          <option value="Reviewer">Reviewer</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="divide-y border rounded shadow-sm">
            {filteredUsers.length === 0 && (
              <p className="p-4 text-center text-gray-500">No users found.</p>
            )}
            {filteredUsers.map((user) => (
  <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border-b">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold text-gray-700">
        {user.full_name.charAt(0)}
      </div>
      {editing?.id === user.id ? (
        <form onSubmit={HandleEdit} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <input
            type="text"
            value={editing.full_name}
            onChange={(e) => setediting({ ...editing, full_name: e.target.value })}
            className="border px-2 py-1 rounded text-sm"
          />
          <input
            type="email"
            value={editing.email}
            onChange={(e) => setediting({ ...editing, email: e.target.value })}
            className="border px-2 py-1 rounded text-sm"
          />
          <select
            value={editing.role}
            onChange={(e) => setediting({ ...editing, role: e.target.value })}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value="Applicant">Applicant</option>
            <option value="Reviewer">Reviewer</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setediting(null)}
              className="px-3 py-1 text-sm border border-gray-600 text-gray-600 rounded hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="font-medium">{user.full_name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )}
    </div>

    {editing?.id !== user.id && (
      <div className="flex items-center gap-6">
        <p className="min-w-[80px]">{user.role}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setediting(user)}
            className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            Edit
          </button>
          <button className="px-3 py-1 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50 transition">
            Delete
          </button>
        </div>
      </div>
    )}  </div>))}
          </div>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <p>
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, totalCount)} of {totalCount} results
            </p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                &lt;
              </button>
              {[...Array(Math.ceil(totalCount / limit))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 border rounded hover:bg-gray-100 ${
                    page === i + 1 ? 'bg-blue-600 text-white' : ''
                  }`}>
                  {i + 1}
                </button>
              ))}
              <button
                disabled={page >= Math.ceil(totalCount / limit)}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
