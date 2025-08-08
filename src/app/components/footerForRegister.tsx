'use client';
import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1F2937] px-4 sm:px-8 lg:px-8 mt-[300px]">
      <div className="py-12 flex flex-col gap-12">
       
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 text-white text-sm">

          {/* Logo + Description */}
          <div className="flex flex-col gap-4 w-full max-w-full sm:max-w-[384px]">
            <div className="w-[160px] h-[40px]">
              <Image
                src="/images/A2SV-logo2.png"
                alt="A2SV Logo"
                width={160}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 font-normal text-[16px] leading-[24px] tracking-normal align-middle font-['Font_1'] break-words max-w-full sm:max-w-[384px]">
              Preparing Africa’s top tech talent for global opportunities.
            </p>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4 lg:w-[176px] lg:h-[120px] opacity-100">
            <h4 className="font-semibold text-[14px] leading-[20px] tracking-wide uppercase text-[#E5E7EB] font-['Font_1']">
              SOLUTIONS
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">Student Training</a>
              </li>
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">Corporate Partnership</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4 lg:w-[176px] lg:h-[120px] opacity-100">
            <h4 className="font-semibold text-[14px] leading-[20px] tracking-wide uppercase text-[#E5E7EB] font-['Font_1']">
              SUPPORT
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">Contact Us</a>
              </li>
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4 lg:w-[176px] lg:h-[120px] opacity-100">
            <h4 className="font-semibold text-[14px] leading-[20px] tracking-wide uppercase text-[#E5E7EB] font-['Font_1']">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">Privacy</a>
              </li>
              <li className="font-normal text-[16px] leading-[24px] tracking-normal font-['Font_1'] text-gray-400 hover:text-white transition">
                <a href="#">Terms</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Bottom Text */}
        <div className="w-full max-w-[1216px] pt-8 border-t border-[#374151] mx-auto">
          <div className="h-[24px] flex items-center justify-center bg-[#1F2937] text-[#9CA3AF] text-[16px] leading-[24px] font-normal font-['Font_1'] text-center">
            © 2023 A2SV. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;