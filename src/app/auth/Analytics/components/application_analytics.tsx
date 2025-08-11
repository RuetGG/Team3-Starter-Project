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
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxOWYzMzljOS03ZmIwLTQ3ODAtYjIzMy1hYzU5NzMxYzFmNTciLCJleHAiOjE3NTQ5MjU5NDQsInR5cGUiOiJhY2Nlc3MifQ.SFV2GFui9YQqbphk5kk2XLL1bvkJ_MlzxBmEaQqAODw`,
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
      backgroundColor: function (context: any) {
        const chart = context.chart;
        const { ctx, chartArea } = chart;

        if (!chartArea) return '#818CF8'; // fallback for early renders

        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, '#e0e7ff');  
        gradient.addColorStop(0.3, '#dcdffd'); 
        gradient.addColorStop(0.6, '#a5b4fc'); 
        gradient.addColorStop(1, '#818CF8');


        return gradient;
      },
      maxBarThickness: 70,
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

      <main className="flex-grow w-full py-6 px-4 sm:px-6 lg:px-25">
      
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Application Analytics</h1>
          <p className="text-gray-600 text-sm sm:text-base">Insights for the G7 November Intake</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Applicants" value={totalApplicants} />
          <StatCard label="Acceptance Rate" value={`${acceptanceRate}%`} />
          <StatCard label="Avg. Review Time" value={`${avgReviewTime} Days`} />
        </div>

      
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Funnel</h3>
            <p className="text-gray-500 text-sm mb-3">
              This chart visualizes the applicant's journey from submission to acceptance.
            </p>
            <div className="h-60 w-full">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>

        
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">University Distribution</h3>
            <p className="text-gray-500 text-sm mb-3">Breakdown of applicants by their university.</p>
            <div className="h-60">
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

       
          <div className="bg-white p-4 rounded-lg shadow-md lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Geographic Distribution</h3>
            <p className="text-gray-500 text-sm mb-3">Shows the number of applicants from each country.</p>
            <div className="h-56 w-full">
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
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-semibold text-gray-900">{value}</p>
  </div>
);

export default ApplicationAnalytics;
