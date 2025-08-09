"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormData = {
  full_name: string;
  email: string;
  password?: string;
  role: "admin" | "manager" | "reviewer" | "applicant" | "";
};

export default function EditUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const userId = useMemo(() => params?.id, [params]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormData>({
    defaultValues: { full_name: "", email: "", password: "", role: "" },
  });

  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [headerName, setHeaderName] = useState<string>("");

  // Only admins
  useEffect(() => {
    if (status === "authenticated" && (session as any).role !== "admin") {
      router.replace("/");
    }
  }, [status, session, router]);

  // Fetch user details
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;

    const token = (session as any)?.accessToken as string | undefined;
    if (!token) return;

    (async () => {
      setLoadError("");
      try {
        const res = await fetch(
          `https://a2sv-application-platform-backend-team3.onrender.com/admin/users/${userId}/`,
          { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
        );

        const payload = await res.json();
        if (!res.ok || !payload?.data) {
          throw new Error(payload?.message || "Failed to load user");
        }

        const u = payload.data;
        setHeaderName(u.full_name);
        reset({
          full_name: u.full_name ?? "",
          email: u.email ?? "",
          role: (u.role as FormData["role"]) ?? "",
          password: "",
        });
      } catch (e: any) {
        setLoadError(e?.message || "Failed to fetch user");
      }
    })();
  }, [status, session, userId, reset]);

  const onSubmit = async (form: FormData) => {
    setSaveError("");

    const token = (session as any)?.accessToken as string | undefined;
    if (!token) {
      setSaveError("No valid session found.");
      return;
    }

    try {
      const body: Record<string, any> = {
        full_name: form.full_name,
        email: form.email,
        role: form.role,
        is_active: true,
      };
      if (form.password && form.password.trim() !== "") {
        body.password = form.password.trim();
      }

      const res = await fetch(
        `https://a2sv-application-platform-backend-team3.onrender.com/admin/users/${userId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const payload = await res.json();
      if (!res.ok || !payload?.success) {
        throw new Error(payload?.message || "Failed to update user");
      }

      // use returned user to show success on list page
      const updated = payload.data;
      const name = encodeURIComponent(updated?.full_name || "User");
      router.push(`/auth/signup/admin/users?updated=${name}`);
    } catch (e: any) {
      setSaveError(e?.message || "Failed to update user");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-1">
        {`Edit User${headerName ? `: ${headerName}` : ""}`}
      </h1>
      <p className="text-gray-500 mb-6">Update the user's details and role.</p>

      {loadError && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {loadError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-md shadow-sm p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              {...register("full_name", { required: "Full name is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.full_name && <p className="text-red-600 text-sm mt-1">{errors.full_name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Set a new password (optional)"
              {...register("password")}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="reviewer">Reviewer</option>
              <option value="applicant">Applicant</option>
            </select>
            {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>}
          </div>
        </div>

        {saveError && (
          <p className="text-red-600 text-sm border border-red-200 bg-red-50 rounded px-3 py-2">
            {saveError}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 rounded border border-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
}
