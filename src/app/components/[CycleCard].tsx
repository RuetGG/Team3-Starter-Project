"use client";

import React from 'react';
import { useGetCycleQuery } from '@lib/redux/api/cycleApi';

interface CycleCardProps {
  cycleId: number;
}

const CycleCard: React.FC<CycleCardProps> = ({ cycleId }) => {
  const { data, error, isLoading } = useGetCycleQuery(cycleId);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading cycle data</p>;

  const cycle = data.data;

  return (
    <div className='bg-white p-6 shadow-md rounded-[8px] w-full max-w-[384px] m-auto sm:m-3 hover:shadow-xl'>
      <div className='flex justify-between items-center mb-2'>
        <h5 className='font-semibold'>{cycle.name}</h5>

        <span
          className={`rounded-[6px] w-[59px] h-[25px] flex items-center justify-center text-sm text-white ${
            cycle.is_active ? 'bg-green-600' : 'bg-[#E57046]'
          }`}
        >
          {cycle.is_active ? 'Active' : 'Close'}
        </span>
      </div>

      <p className='text-gray-600 mb-4 font-extralight'>
        {/* static description */}
        The seventh generation of A2SVians, November intake.
      </p>

      <div className='flex justify-between text-sm text-gray-500 font-light'>
        <span>
          Country: <span className='text-gray-600 font-semibold'>Ethiopia</span>
        </span>
        <span>
          Status:{' '}
          <span className={cycle.is_active ? 'text-green-600' : 'text-red-600'}>
            {cycle.is_active ? 'Active' : 'Closed'}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CycleCard;
