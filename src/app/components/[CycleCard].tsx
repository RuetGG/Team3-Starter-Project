"use client";

import React, { useState, useEffect } from "react";
import { useGetCycleQuery, useUpdateCycleStatusMutation } from "@lib/redux/api/cycleApi";

interface CycleCardProps {
  cycleId: number;
}

const CycleCard: React.FC<CycleCardProps> = ({ cycleId }) => {
  const { data, error, isLoading } = useGetCycleQuery(cycleId);
  const [updateCycleStatus] = useUpdateCycleStatusMutation();
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (data?.data) {
      setIsActive(data.data.is_active);
    }
  }, [data]);

  const handleToggle = async () => {
    if (isActive === null) return;

    const newStatus = !isActive;
    setIsActive(newStatus); 
    setIsUpdating(true);

    try {
      await updateCycleStatus({ id: cycleId, is_active: newStatus }).unwrap();
    } catch (err) {
      console.error("Failed to update status", err);
      setIsActive(!newStatus); 
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading || isActive === null) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading cycle data</p>;

  const cycle = data.data;

  return (
    <div className="bg-white p-6 shadow-md rounded-[8px] w-full max-w-[384px] m-auto sm:m-3 hover:shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-semibold">{cycle.name}</h5>

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={isUpdating}
          className={`rounded-[6px] w-[70px] h-[25px] flex items-center justify-center text-sm text-white transition-colors duration-200 ${
            isActive ? "bg-green-600 hover:bg-green-700" : "bg-[rgb(229,112,70)] hover:bg-red-700"
          } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUpdating ? "..." : isActive ? "Active" : "Close"}
        </button>
      </div>

      <p className="text-gray-600 mb-4 font-extralight">
        The seventh generation of A2SVians, November intake.
      </p>

      <div className="flex justify-between text-sm text-gray-500 font-light">
        <span>
          Country: <span className="text-gray-600 font-semibold">Ethiopia</span>
        </span>
        <span>
          Status:{" "}
          <span className={isActive ? "text-green-600" : "text-red-600"}>
            {isActive ? "Active" : "Closed"}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CycleCard;
