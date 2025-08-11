"use client";
import React from "react";

const Confirmation: React.FC = () => {
  return (
    <div className="w-full  opacity-100 transform rotate-0 pt-[200px] pr-8 pb-[50x] pl-8 ">
      <div className="max-w-[448px] mx-auto opacity-100 flex flex-col gap-8 transform rotate-0 relative">
        <div className="w-full h-[156px] opacity-100 transform rotate-0 relative">
          <div className="w-full h-[40px] opacity-100 absolute top-[116px]">
            <p className="w-[429px] max-w-full mx-auto h-[40px] text-center text-gray-600 text-[14px] font-normal leading-[20px]">
              Your password has been reset. You can now log in with your new
              password.
            </p>
          </div>

          <div className="w-full h-[36px] absolute top-[72px] flex justify-center items-center">
            <p
              className="w-[282px] max-w-full h-[36px] text-center text-gray-900 font-extrabold font-font1 whitespace-nowrap"
              style={{ fontSize: "30px", lineHeight: "36px" }}
            >
              Action Successful!
            </p>
          </div>

          {/* Centered Checkmark circle */}
          <div className="absolute top-[6px] left-0 right-0 w-[48px] h-[48px] mx-auto opacity-100">
            <div className="w-[36px] h-[36px] rounded-full border-4 border-green-400 flex items-center justify-center mx-auto">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <button className="w-full max-w-[448px] h-[38px] bg-indigo-600 text-white px-4 py-2 rounded-md opacity-100 transform rotate-0 hover:bg-indigo-700 transition">
          Go to Login
        </button>
      </div>

      {/* Responsive font-size adjustment */}
      <style jsx>{`
        @media (max-width: 640px) {
          p[style] {
            font-size: 20px !important;
            line-height: 24px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Confirmation;
