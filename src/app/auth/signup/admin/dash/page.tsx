"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAdminAnalytics } from "../../../../api/admin/getAdminAnalytics";
import { AnalyticsResponse } from "../../../../types/analytics";
import Nav from "@app/components/[Nav]";
import Footer from "@app/components/[Footer]";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeCycles, setActiveCycles] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || session.role !== "admin") {
      router.push("/auth/signin");
      return;
    }

    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${session.accessToken}` };

        const analyticsData = await getAdminAnalytics(session.accessToken);
        setAnalytics(analyticsData);

        const usersRes = await fetch(
          "https://a2sv-application-platform-backend-team3.onrender.com/admin/users/?page=1&limit=1",
          { headers }
        );
        const usersData = await usersRes.json();
        if (usersData.success) setTotalUsers(usersData.data.total_count || 0);

        const cyclesRes = await fetch(
          "https://a2sv-application-platform-backend-team3.onrender.com/cycles/?page=1&limit=100",
          { headers }
        );
        const cyclesData = await cyclesRes.json();
        if (cyclesData.success) {
          setActiveCycles(cyclesData.data.cycles.filter((c: any) => c.is_active).length);
        }
      } catch (err) {
        console.error("Fetch failed:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status, router]);

  if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!analytics?.success) return <div className="text-center py-10 text-red-600">Failed to load analytics.</div>;

  return (
    <div className="p-8">
      <Nav/>
      <h1 className="text-2xl font-bold mb-6">Admin Command Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded shadow">
          <div className="text-sm">Total Users</div>
          <div className="text-2xl font-bold">{totalUsers}</div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded shadow">
          <div className="text-sm">Total Applicants</div>
          <div className="text-2xl font-bold">{analytics.data.total_applicants}</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-4 rounded shadow">
          <div className="text-sm">Active Cycles</div>
          <div className="text-2xl font-bold">{activeCycles}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="font-semibold">Manage Users</div>
          <p className="text-sm text-gray-600">Create, edit, and manage user accounts and roles.</p>
          {/* ✅ real route to the users list */}
          <Link href="/auth/signup/admin/users" className="text-indigo-600 text-sm mt-2 inline-block">
            Go to Users →
          </Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="font-semibold">Manage Cycles</div>
          <p className="text-sm text-gray-600">Create and manage application cycles.</p>
          <a href="/auth/signup/admin/admin_cycles" className="text-indigo-600 text-sm mt-2 inline-block">Go to Cycles →</a>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="font-semibold">Recent Admin Activity</div>
          <ul className="text-sm text-gray-600 space-y-1 mt-2">
            <li>New user "Jane R" created. <span className="text-gray-400">2hrs ago</span></li>
            <li>Cycle "Q2 November" set to active. <span className="text-gray-400">1 day ago</span></li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="font-semibold">View Analytics</div>
        <p className="text-sm text-gray-600">Explore application data and platform insights.</p>
        <a href="/auth/Analytics" className="text-indigo-600 text-sm mt-2 inline-block">Go to Analytics →</a>
      </div>
      <Footer/>
    </div>
  );
}
