"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path
      ? "underline decoration-[#4F46E5] text-black"
      : "text-gray-500 hover:underline hover:decoration-[#4F46E5] hover:text-black";
    console.log('Current pathname:', pathname);

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <div className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={128} height={64} />
        </div>

        <div className="hidden md:flex justify-center flex-1 space-x-8">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/users" className={isActive("/users")}>
            Users
          </Link>
          <Link href="/admin_cycles" className={isActive("/admin_cycles")}>
            Cycles
          </Link>
          <Link href="/analytics" className={isActive("/analytics")}>
            Analytics
          </Link>
        </div>

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

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <Image src="/Hamburger.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/users" className={isActive("/users")}>
            Users
          </Link>
          <Link href="/admin_cycles" className={isActive("/admin_cycles")}>
            Cycles
          </Link>
          <Link href="/analytics" className={isActive("/analytics")}>
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
