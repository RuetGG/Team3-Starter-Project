// app/manager/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/authOptions";
import { redirect } from "next/navigation";

async function getApplications(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/manager/applications/?page=1&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch applications", res.status);
    return { applications: [], total_count: 0 };
  }

  const data = await res.json();
  return data.data;
}

export default async function ManagerDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.role !== "manager") {
    redirect("/auth/signin");
  }

  const data = await getApplications(session.accessToken);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      {/* Top Navigation */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-xl font-bold">Manager Dashboard</h1>
        <div className="flex space-x-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline">
            Your Profile
          </a>
          <span>|</span>
          <span>{session.user.email}</span>
          <span>|</span>
          <a href="/api/auth/signout" className="text-blue-600 hover:underline">
            Logout
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Applications" value="1,204" />
        <StatCard title="Under Review" value="750" />
        <StatCard title="Interview Stage" value="250" />
        <StatCard title="Accepted" value="82" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Applications Table */}
        <div className="col-span-2 bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">All Applications</h2>
            <select className="border rounded px-2 py-1 text-sm">
              <option>Filter by Status</option>
              <option value="new">New</option>
              <option value="under_review">Under Review</option>
              <option value="interview_stage">Interview Stage</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Applicant</th>
                <th className="text-left py-2">Submitted</th>
                <th className="text-left py-2">Assigned Reviewer</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.applications.map((app: any) => (
                <tr key={app.id} className="border-b">
                  <td className="py-2">{app.applicant_name}</td>
                  <td className="py-2">Oct 25, 2023</td>
                  <td className="py-2">
                    {app.assigned_reviewer_name || "Not Assigned"}
                  </td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        app.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2">
                    <ActionDropdown />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Team Performance */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold mb-4">Team Performance</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Jane R.</span>
              <span>12 Reviews</span>
            </div>
            <div className="flex justify-between">
              <span>Mike R.</span>
              <span>8 Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function ActionDropdown() {
  return (
    <div className="relative group">
      <button className="text-blue-600 hover:underline">Actions</button>
      <div className="absolute hidden group-hover:block bg-white border shadow rounded mt-1 z-10 w-40">
        <a href="#" className="block px-3 py-2 hover:bg-gray-100">
          Review
        </a>
        <a href="#" className="block px-3 py-2 hover:bg-gray-100">
          View Details
        </a>
        <div className="border-t" />
        <a href="#" className="block px-3 py-2 hover:bg-gray-100">
          Assign to Reviewer
        </a>
      </div>
    </div>
  );
}
