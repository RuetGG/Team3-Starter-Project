"use client";

import { useState } from "react";
import { useResetPasswordMutation } from "@lib/redux/api/resetPasswordApi";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Footer from "@app/components/[Footer]";
import Navbar from "@app/components/Navbar";

export default function ResetPasswordPage() {
	const searchParams = useSearchParams();

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	// use mutation hook from RTK Query
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setMessage("");

		if (!newPassword || !confirmPassword) {
			return setError("Please fill in all fields.");
		}
		if (newPassword !== confirmPassword) {
			return setError("Passwords do not match.");
		}

		try {
			const token = searchParams.get("token");
			if (!token) {
				return setError("Reset token missing from URL.");
			}
			// call RTK Query mutation
			await resetPassword({ token, newPassword }).unwrap();

			setMessage("Password updated successfully!");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err: any) {
			setError(err?.data?.message || err.message || "Failed to reset password");
		}
	};

	return (
		<>
			<Navbar />
			<div className="flex my-48 items-center justify-center bg-gray-50 px-4 text-black">
				<div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
					<div className="flex flex-col items-center">
						<Image
							src="/images/A2SV-logo1.png"
							alt="A2SV Logo"
							width={48}
							height={48}
							className="w-32 h-auto"
						/>
						<h1 className="mt-4 text-xl font-semibold text-gray-900">
							Set a new password
						</h1>
						<p className="mt-1 text-sm text-gray-500 text-center">
							Please choose a strong, new password for your account.
						</p>
					</div>

					{error && (
						<p className="mt-4 text-sm text-red-500 text-center">{error}</p>
					)}
					{message && (
						<p className="mt-4 text-sm text-green-500 text-center">{message}</p>
					)}

					<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
						<input
							type="password"
							placeholder="New Password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className="w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						<input
							type="password"
							placeholder="Confirm New Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="w-full rounded border border-gray-300 p-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						/>
						<button
							type="submit"
							disabled={isLoading}
							className={`w-full rounded py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
								isLoading
									? "bg-indigo-300 cursor-not-allowed"
									: "bg-indigo-500 hover:bg-indigo-600"
							}`}
						>
							{isLoading ? "Updating..." : "Update Password"}
						</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
