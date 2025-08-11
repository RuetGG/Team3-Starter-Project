'use client';

import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { Bar, Doughnut } from 'react-chartjs-2';
import Nav from './navbar';
import Footer from './footer';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ApplicationAnalytics: NextPage = () => {
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const geoChartRef = useRef(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch(
          'https://a2sv-application-platform-backend-team1.onrender.com/admin/analytics',
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ3Mjk4OTYsInR5cGUiOiJhY2Nlc3MifQ.Qas688xwGCMW89Zzz6yJaFtUs-9tp_EJIwiaOypxHfA`,
            },
          }
        );

        const json = await res.json();
        if (json.success) {
          setAnalyticsData(json.data);
        } else {
          console.error('Analytics Fetch Error:', json);
        }
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    return <div className="p-6 text-center">Loading analytics...</div>;
  }

  const totalApplicants = analyticsData.total_applicants;
  const acceptanceRate = analyticsData.acceptance_rate;
  const avgReviewTime = analyticsData.average_review_time_days;

  const funnelData = [
    { stage: 'Accepted', value: analyticsData.application_funnel.accepted },
    { stage: 'Rejected', value: analyticsData.application_funnel.rejected },
    { stage: 'Pending Review', value: analyticsData.application_funnel.pending_review },
    { stage: 'In Progress', value: analyticsData.application_funnel.in_progress },
  ];

  const barData = {
    labels: funnelData.map((item) => item.stage),
    datasets: [
      {
        label: 'Applicants',
        data: funnelData.map((item) => item.value),
        backgroundColor: '#818CF8',
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: { beginAtZero: true, ticks: { maxTicksLimit: 5, font: { size: 10 } } },
      y: { beginAtZero: true, ticks: { font: { size: 10 } } },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const universityData = {
    labels: Object.keys(analyticsData.school_distribution),
    datasets: [
      {
        data: Object.values(analyticsData.school_distribution),
        backgroundColor: ['#4F46E5', '#6366F1', '#A5B4FC'],
      },
    ],
  };

  const geoData = {
    labels: Object.keys(analyticsData.country_distribution),
    datasets: [
      {
        label: 'Applicants',
        data: Object.values(analyticsData.country_distribution),
        backgroundColor: '#818CF8',
        maxBarThickness: 40,
      },
    ],
  };

  const geoOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true, ticks: { font: { size: 10 }, maxTicksLimit: 5 } },
      y: { beginAtZero: true, ticks: { font: { size: 10 } } },
    },
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Nav />

      <main className="flex-grow max-w-4xl mx-auto px-3 sm:px-6 md:px-10 py-4 sm:py-6">
        <div className="mb-5">
          <h1
            className="text-xl sm:text-2xl md:text-3xl leading-tight font-bold"
            style={{
              color: 'var(--color-azure-11, #111827)',
              fontFamily: 'Font 1',
              letterSpacing: '0%',
              verticalAlign: 'middle',
            }}
          >
            Application Analytics
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm">Insights for the G7 November Intake</p>
        </div>

        <div className="w-full flex flex-col gap-3 mb-5">
          <StatCard label="Total Applicants" value={totalApplicants} />
          <StatCard label="Acceptance Rate" value={`${acceptanceRate}%`} />
          <StatCard label="Avg. Review Time" value={`${avgReviewTime} Days`} />
        </div>

        <section className="grid grid-cols-1 gap-5 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Application Funnel</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">
              This chart visualizes the applicant's journey from submission to acceptance.
            </p>
            <div className="h-48 sm:h-60 w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">University Distribution</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">Breakdown of applicants by their university.</p>
            <div className="h-48 sm:h-60">
              <Doughnut
                data={universityData}
                options={{
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        font: { size: 10 },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Geographic Distribution</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-3">Shows the number of applicants from each country.</p>
            <div className="h-40 sm:h-56 w-full">
              <Bar ref={geoChartRef} data={geoData} options={geoOptions} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-white rounded-lg p-4 shadow flex flex-col items-center text-center">
    <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    <p className="text-lg sm:text-xl font-semibold text-gray-900">{value}</p>
  </div>
);

export default ApplicationAnalytics;
