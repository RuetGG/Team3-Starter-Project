"use client";

import React, { useState, useEffect } from "react";
import ManagerNav from "@components/[ManagerNav]";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@lib/redux/api/profileApi";
import { useUpdatePasswordMutation } from "@lib/redux/api/passwordApi";

const Page = () => {
  const { data: profileData, error, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [
    updatePassword,
    {
      isLoading: isPasswordUpdating,
      isSuccess: isPasswordSuccess,
      error: passwordError,
    },
  ] = useUpdatePasswordMutation();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    role: "",
  });

  const [formError, setFormError] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");

  useEffect(() => {
    if (profileData) {
      setFormData({
        full_name: profileData.full_name || "",
        email: profileData.email || "",
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email) {
      setFormError("Both fields are required");
      return;
    }

    try {
      console.log("Sending to backend:", {
        full_name: formData.full_name,
        email: formData.email,
      });
      const result = await updateProfile({
        full_name: formData.full_name,
        email: formData.email,
      }).unwrap();

      if (
        result.full_name !== formData.full_name ||
        result.email !== formData.email
      ) {
        console.warn("Server returned different values:", {
          sent: formData,
          received: result,
        });
        setFormError(
          "Profile updated, but some fields were modified by server"
        );
      }

      setFormData((prev) => ({
        ...prev,
        full_name: result.full_name,
        email: result.email,
      }));

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setFormError("Failed to update profile. Please try again.");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPass || !newPass || !confPass) {
      alert("Please fill all fields.");
      return;
    }

    if (newPass !== confPass) {
      alert("New passwords do not match.");
      return;
    }

    try {
      await updatePassword({
        old_password: oldPass,
        new_password: newPass,
      }).unwrap();

      alert("Password updated successfully!");
      setOldPass("");
      setNewPass("");
      setConfPass("");
    } catch (err) {
      console.error("Password update failed:", err);
      alert("Failed to update password. Please try again.");
    }
  };

  if (isLoading) return <p className="text-center">Loading profile...</p>;
  if (error || !profileData) {
    return <p className="text-center text-red-500">Failed to load profile.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      <ManagerNav />

      {/* Header */}
      <div className="w-[80%] bg-gray-200 h-40 relative">
        <div className="max-w-4xl mx-auto px-6 h-full flex items-end">
          <div className="absolute left-6 bottom-[-60px] w-32 h-32 rounded-full border-4 border-white bg-gray-300" />
        </div>
        <div className="ml-40 mb-6">
          <h1 className="text-xl font-bold">{formData.full_name}</h1>
          <p className="text-gray-600">{formData.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center px-4 pt-20 pb-10 bg-gray-100">
        <div className="w-full max-w-4xl">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Section */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold mb-4">
                Personal Information
              </h2>
              {formError && (
                <div
                  className={`mb-4 p-3 rounded ${
                    formError.includes("modified")
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {formError}
                </div>
              )}
              <form className="space-y-6" onSubmit={handleUpdateProfile}>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        full_name: e.target.value,
                      })
                    }
                    className="w-full border-b border-gray-300 focus:outline-none px-2 py-2 bg-transparent text-gray-800 shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    className="w-full border-b border-gray-300 focus:outline-none px-2 py-2 bg-transparent text-gray-800 shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    readOnly
                    className="w-full border-b border-gray-300 focus:outline-none px-2 py-2 bg-transparent text-gray-500 shadow"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-md px-6 py-2 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* Password Section */}
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Change Password</h2>
              <form className="space-y-6" onSubmit={handleUpdatePassword}>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={oldPass}
                    onChange={(e) => setOldPass(e.target.value)}
                    className="w-full border-b border-gray-300 focus:outline-none px-2 py-2 bg-transparent shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full border-b border-gray-300 focus:outline-none px-2 py-2 bg-transparent shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confPass}
                    onChange={(e) => setConfPass(e.target.value)}
                    className="w-full border-b border-gray-300 px-2 py-2 shadow focus:outline-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isPasswordUpdating}
                    className={`bg-[#4F46E5] text-white rounded-md px-6 py-2 text-sm font-medium ${
                      isPasswordUpdating
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#4338CA]"
                    }`}
                  >
                    {isPasswordUpdating ? "Updating..." : "Save Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
