'use client';

import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md h-[50px]">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-[1216px] mx-auto">
        
       
        <div className="flex items-center">
          <img
            src="/images/logo-blue-fill.png"
            alt="a2sv"
            className="w-[60px] h-auto"
          />
        </div>

        
        <div className="hidden md:flex space-x-6">
          {['Home', 'About', 'Success Stories'].map((text, idx) => (
            <a
              key={idx}
              href={text === 'Home' ? '/' : `/${text.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[#374151] font-medium text-[14px] leading-[20px] font-['Font_1'] hover:text-[#4F46E5] transition duration-300"
            >
              {text}
            </a>
          ))}
          <div className="hidden md:block pr-[100px]">
          <a
            href="/apply"
            className="bg-[#4F46E5] text-white font-medium text-[14px] leading-[20px] font-['Font_1'] rounded-lg py-2 px-4 hover:bg-[#3730a3] transition duration-300"
          >
            Apply Now
          </a>
        </div>
        

        
        
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6 text-[#374151]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          {['Home', 'About', 'Success Stories'].map((text, idx) => (
            <a
              key={idx}
              href={text === 'Home' ? '/' : `/${text.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-[#374151] font-medium text-[14px] leading-[20px] font-['Font_1'] hover:text-[#4F46E5] transition duration-300"
            >
              {text}
            </a>
          ))}
          <a
            href="/apply"
            className="inline-block w-full text-center bg-[#4F46E5] text-white font-medium text-[14px] leading-[20px] font-['Font_1'] rounded-lg py-2 hover:bg-[#3730a3] transition duration-300"
          >
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
