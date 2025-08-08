import React from 'react';

type StatCardProps = {
  title: string;
  value: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-xl hover:shadow-2xl">
      <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
};

export default StatCard;