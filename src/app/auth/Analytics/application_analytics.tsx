'use client';

import { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import { Bar, Doughnut } from 'react-chartjs-2';

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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiMTg0NjFkMS03YTE2LTRkYzUtOTliNS0wNmNlMzY4NTYwMDAiLCJleHAiOjE3NTQ3MjY0MDUsInR5cGUiOiJhY2Nlc3MifQ.Su5XgernZ7YCE1bRH3KwkuR_09qzCmDEtv_k1UWgUBY`,
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
        backgroundColor: '#4F46E5',
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y' as const,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
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
      },
    ],
  };

  const geoOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-gray-100">
    
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Application Analytics</h1>
          <p className="text-gray-600 text-sm">Insights for the G7 November Intake</p>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
          <StatCard label="Total Applicants" value={totalApplicants} />
          <StatCard label="Acceptance Rate" value={`${acceptanceRate}%`} />
          <StatCard label="Avg. Review Time" value={`${avgReviewTime} Days`} />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Application Funnel</h3>
            <p className="text-gray-500 text-sm mb-4">
              This chart visualizes the applicant's journey from submission to acceptance.
            </p>
            <div className="h-[300px] w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">University Distribution</h3>
            <p className="text-gray-500 text-sm mb-4">Breakdown of applicants by their university.</p>
            <div className="h-[300px]">
              <Doughnut
                data={universityData}
                options={{
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>

        
        <section className="bg-white p-6 rounded-lg shadow-md max-w-full mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Geographic Distribution</h3>
          <p className="text-gray-500 text-sm mb-4">Shows the number of applicants from each country.</p>
          <div className="h-[300px] w-full">
            <Bar ref={geoChartRef} data={geoData} options={geoOptions} />
          </div>
        </section>
      </main>
     
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex-1 bg-white rounded-lg p-5 shadow flex flex-col text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold text-gray-900">{value}</p>
  </div>
);

export default ApplicationAnalytics;
