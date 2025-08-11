'use client';

import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between p-6 lg:pl-8 max-w-[1280px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo-blue-fill.png"
            alt="a2sv"
            className="w-[90px] h-auto"
          />
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Home
          </a>
          <a href="/about" className="text-gray-600 hover:text-blue-600 transition duration-300">
            About
          </a>
          <a href="/success-stories" className="text-gray-600 hover:text-blue-600 transition duration-300">
            Success Stories
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="/apply"
            className="bg-blue-700 text-white rounded-lg py-2 px-4 hover:bg-blue-800 transition duration-300"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6 text-gray-700"
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
        <div className="md:hidden px-6 pb-4 space-y-4">
          <a href="/" className="block text-gray-600 hover:text-blue-600 transition duration-300">
            Home
          </a>
          <a href="/about" className="block text-gray-600 hover:text-blue-600 transition duration-300">
            About
          </a>
          <a href="/success-stories" className="block text-gray-600 hover:text-blue-600 transition duration-300">
            Success Stories
          </a>
          <a
            href="/apply"
            className="inline-block w-full text-center bg-blue-700 text-white rounded-lg py-2 hover:bg-blue-800 transition duration-300"
          >
            Apply Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
