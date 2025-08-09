'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path
      ? 'underline decoration-[#4F46E5] text-black'
      : 'text-gray-700 hover:underline hover:decoration-[#4F46E5] hover:text-black';

  return (
    <nav className="bg-white shadow px-6 py-4 mb-[20px]">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto w-full">
        {/* Logo wrapped in a Link */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo-blue-fill.png" alt="Logo" width={128} height={64} />
        </Link>

        {/* Center navigation links */}
        <div className="hidden md:flex justify-center flex-1 space-x-8">
          <Link href="/dashboard" className={isActive('/dashboard')}>
            Dashboard
          </Link>
          <Link href="/users" className={isActive('/users')}>
            Users
          </Link>
          <Link href="/admin_cycles" className={isActive('/admin_cycles')}>
            Cycles
          </Link>
          <Link href="/analytics" className={isActive('/analytics')}>
            Analytics
          </Link>
        </div>

        {/* Right-side links */}
        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link href="/profile" className="hover:text-[#4F46E5]">
            Your Profile
          </Link>
          <Link href="/admin" className="hover:text-[#4F46E5]">
            Admin User
          </Link>
          <Link href="/logout" className="hover:text-[#4F46E5]">
            Logout
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                // Close (X) icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Hamburger icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          <Link href="/dashboard" className={isActive('/dashboard')}>
            Dashboard
          </Link>
          <Link href="/users" className={isActive('/users')}>
            Users
          </Link>
          <Link href="/admin_cycles" className={isActive('/admin_cycles')}>
            Cycles
          </Link>
          <Link href="/analytics" className={isActive('/analytics')}>
            Analytics
          </Link>
          <hr className="border-gray-200" />
          <Link href="/profile" className="hover:text-[#4F46E5]">
            Your Profile
          </Link>
          <Link href="/admin" className="hover:text-[#4F46E5]">
            Admin User
          </Link>
          <Link href="/logout" className="hover:text-[#4F46E5]">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
