'use client';
import {useEffect, useState } from "react";
import axios from "axios";
const baseUrl: string = "https://a2sv-application-platform-backend-team3.onrender.com";
interface User {
  full_name: string;
  email: string;
  password: string;
  role: string;}
export default function AdminUserForm() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    full_name: "", email: "",  password: "", role: "All",  });
  const [loading,setLoading] = useState<boolean>(false)
  const [error , setError] = useState<string>("");
   useEffect(() => { // we can change this according to our token management strategy
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  const SaveUser = async () => {
    try {
      setLoading(true)
      const response = await axios.post(`${baseUrl}/admin/users`, user,
      {headers: {Authorization: `Bearer ${token}`, }, }  );
      console.log("User created:", response.data);
      alert("user created")
      setUser({ full_name: "", email: "", password: "", role: "All" });
    } catch (err) {
      if (typeof err === "string") {
      setError(err);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("an unexpected error occurred");
    }
      setLoading(false)
  };}
  return (
    <div className=" text-gray-600 flex flex-col gap-10 w-full lg:w-3/4 mx-auto">
      <section className="p-10">
        <h1 className="font-bold text-2xl text-black">Create New User</h1>
        <p>Use this form to create a new user and assign them a role</p>
      </section>
      <div
        className="bg-white rounded shadow-lg
        flex flex-wrap gap-10 justify-around p-10
        w-full">
        <section className="flex flex-col gap-10">
          {/* name */}
          <div className="flex flex-col">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={user.full_name}
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
              className="shadow px-5 rounded focus:outline-0"/>
          </div>
          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="set an initial password"
              className="shadow px-5 rounded focus:outline-0" />
          </div>
          <span className="text-red-400 text-sm">{error}</span>
        </section>
        <section className="flex flex-col gap-10">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
              className="shadow px-5 w-[250px] rounded focus:outline-0"/>
          </div>
          {/* role */}
          <div className="flex flex-col">
            <label>Role</label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="shadow px-5 focus:outline-0 rounded">
                  <option value="All">All Roles</option>
                  <option value="Applicant">Applicant</option>
                  <option value="Reviewer">Reviewer</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-5">
            <button
              className="border-2 border-gray-500 rounded text-sm px-5 cursor-pointer"
              onClick={() => setUser({ full_name: "", email: "", password: "", role: "All" })}>
              cancel
            </button>
            <button
              className="border rounded bg-blue-700 text-white px-5 cursor-pointer w-"
              disabled={loading} onClick={SaveUser}>
              {loading?"saving.....":"save user"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
