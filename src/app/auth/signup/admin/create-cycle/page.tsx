"use client";
import ManagerNav from "@app/components/[ManagerNav]";
import Footer from "@app/components/[Footer]";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCreateCycleMutation } from "@lib/redux/api/cycleApi"; 


export default function CreateCyclePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [createCycle] = useCreateCycleMutation(); 

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    start_date: "",
    end_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await createCycle({
        ...formData,
        token: session?.accessToken,
      }).unwrap();

     
      alert(" Cycle created successfully!");
      router.push("/auth/signup/admin/admin_cycles");
    } catch (err: any) {
      setError(err.message || "Failed to create cycle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <ManagerNav />
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex justify-center items-start py-12">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
          <h1 className="text-3xl font-bold  mb-2">Create New Cycle</h1>
          <p className="text-sm text-gray-600 mb-6">
            Use this form to create a new cycle and assign periods.{" "}
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cycle Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Summer 2025"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="e.g., Ethiopia"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition-all duration-200"
              >
                {loading ? "Saving..." : "Save Cycle"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}
