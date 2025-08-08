'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b bg-white mb-[50px]">
      <div className="max-w-[1216px] h-16 mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo-blue-fill.png"
            alt="A2SV Logo"
            width={118.28}
            height={30}
            className="object-contain m-[50px]"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm leading-5 font-medium text-gray-600">
          <Link href="#">
            <span className="inline-block w-[84px] h-5 flex items-center justify-center">
              The Journey
            </span>
          </Link>
          <Link href="#">
            <span className="inline-block w-[49px] h-5 flex items-center justify-center">
              About
            </span>
          </Link>
          <Link href="#">
            <span className="inline-block w-[93px] h-5 flex items-center justify-center">
              Testimonials
            </span>
          </Link>
          <Link href="#">
            <span className="inline-block w-[56px] h-5 text-blue-600 hover:underline flex items-center justify-center">
              Sign in
            </span>
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col space-y-4 text-sm font-medium text-gray-600">
            <Link href="#">
              <span>The Journey</span>
            </Link>
            <Link href="#">
              <span>About</span>
            </Link>
            <Link href="#">
              <span>Testimonials</span>
            </Link>
            <Link href="#">
              <span className="text-blue-600 hover:underline">Sign in</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
