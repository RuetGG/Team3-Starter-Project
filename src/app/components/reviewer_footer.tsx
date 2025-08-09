"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#1F2937] px-4 sm:px-8 lg:px-8 mt-[300px]">
      <div className="w-full max-w-[1216px] mx-auto pt-9">
        <hr className="border-t border-[#374151] mb-4" />{" "}
        {/* Decreased from mb-4 to mb-1 */}
        <div className="h-[24px] flex items-center justify-center text-[#9CA3AF] text-[16px] leading-[24px] font-normal font-['Font_1'] text-center">
          © 2023 A2SV. All rights reserved.
        </div>
      </div>
    </footer>
  );

};

export default Footer;
