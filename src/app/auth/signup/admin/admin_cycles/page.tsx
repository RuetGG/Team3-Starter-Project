'use client';

import React, { useState } from "react";
import CycleCard from "@components/[CycleCard]";
import PaginationInfo from "@components/[PaginationInfo]";
import PaginationButton from "@components/[PaginationButton]";
import { useGetAllCyclesQuery } from "@lib/redux/api/cycleApi";
import Nav from "@app/components/[Nav]";
import { useRouter } from "next/navigation"; 
import Footer from "@app/components/[Footer]";

const Page = () => {
  const router = useRouter();

 
  const { data, error, isLoading } = useGetAllCyclesQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  if (isLoading) return <p className="text-center">Loading cycles...</p>;
  if (error || !data) return <p className="text-center text-red-500">Failed to load cycles.</p>;

  const allCycles = data.data.cycles;
  const totalItems = data.data.total_count;
  const totalPages = Math.ceil(totalItems / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = allCycles.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Nav/>

      <main className="flex-1 px-6 py-4">
        <div className="flex items-center mb-6 w-full max-w-[1280px] mx-auto px-4 mt-5 sm:px-0">
          <h3 className="text-lg sm:text-xl font-semibold">Application Cycles</h3>
          <div className="flex-grow" />
          <button
            className="bg-[#4F46E5] text-white hover:bg-[#4338CA] rounded-[6px] font-light
            h-[40px] px-4 sm:px-6 min-w-[30px] sm:min-w-[168px]
            text-sm sm:text-base flex items-center justify-center transition-colors duration-200"
            onClick={() => router.push("/auth/signup/admin/create-cycle")} 
          >
            <span className="sm:hidden text-2xl leading-none">+</span>
            <span className="hidden sm:inline">Create New Cycle</span>
          </button>
        </div>

        <div className="w-full flex justify-center pt-[39px] pb-[56px]">
          <div className="w-full max-w-[1280px] flex flex-col items-center gap-[40px]">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {currentItems.map((cycle) => (
                <CycleCard key={cycle.id} cycleId={cycle.id} />
              ))}
            </div>

            <div className="flex justify-between items-center w-full px-4 sm:px-0">
              <PaginationInfo
                currentPage={currentPage}
                pageSize={pageSize}
                totalItems={totalItems}
              />
              <PaginationButton
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={(page) => setCurrentPage(page)}
              />
            </div>

          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default Page;
