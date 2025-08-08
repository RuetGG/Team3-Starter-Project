"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateCyclePage() {
  const { data: session } = useSession();
  const router = useRouter();

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
      const res = await fetch(
        "https://a2sv-application-platform-backend-team1.onrender.com/admin/cycles/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify({
            name: formData.name,
            start_date: formData.start_date,
            end_date: formData.end_date,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create cycle");
      }

      alert("Cycle created successfully!");
      router.push("/auth/signup/admin/admin_cycles"); // redirect to cycles list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      


      {/* Main Content */}
      <div className="flex-grow bg-gray-50 flex justify-center items-start py-10">
        <div className="w-full max-w-4xl bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-2">Create new cycle</h1>
          <p className="text-sm text-gray-600 mb-8">
            Use this form to create a new cycle and assign periods.
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Cycle name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
              <div>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  className="w-full border rounded p-2 text-sm"
                />
              </div>
            </div>

    

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm"
              >
                {loading ? "Saving..." : "Save Cycle"}
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </main>
  );
}
