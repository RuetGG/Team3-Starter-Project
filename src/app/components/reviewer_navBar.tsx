"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserFullName } from "../../lib/redux/api/reviwer_dashboad_API";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await getUserFullName();
        setFullName(name);
      } catch (error) {
        console.error("Failed to fetch user full name:", error);
        setFullName("Guest");
      }
    };

    fetchUserName();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b bg-white mb-12 relative">
      <div className="max-w-[1216px] h-16 mx-auto px-6 flex items-center justify-between relative">
        {/* Logo - Left */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/images/A2SV.png"
            alt="A2SV Logo"
            width={118}
            height={30}
            className="object-contain"
          />
        </div>

        {/* Dashboard - Centered with small rectangle below */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Link href="#">
            <span className="relative text-sm font-semibold text-gray-800">
              Dashboard
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-20 h-1 bg-[#4f46e5] rounded-full" />
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Right */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
          <Link href="#">
            <span className="text-[#4f46e5] font-semibold">Your Profile</span>
          </Link>
          <Link href="#">
            <span>{fullName}</span>
          </Link>
          <Link href="#">
            <span>Logout</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
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
              <span className="text-[#4f46e5]font-semibold">Your Profile</span>
            </Link>
            <Link href="#">
              <span className="relative text-gray-800 font-semibold w-fit">
                Dashboard
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-3 h-1 bg-purple-600 rounded-full" />
              </span>
            </Link>

            <span>{fullName}</span>

            <Link href="#">
              <span>Logout</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
