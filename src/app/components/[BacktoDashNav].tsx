"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const ManagerNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) =>
    pathname === path
      ? "underline decoration-[#4F46E5] text-black"
      : "text-gray-500 hover:underline hover:decoration-[#4F46E5] hover:text-black";
  console.log("Current pathname:", pathname);

  return (
    <nav className="bg-white shadow px-12 py-4">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <Link href="/auth/signup/manager/">
          <p className="text-sm text-gray-400 hover:text-[#4F46E5] cursor-pointer">
            &lt;   Back To Dashboard
          </p>
        </Link>

        <div className="hidden md:flex space-x-6 text-gray-600">
          {/* Add user name */}
          <Link href="/name" className="hover:text-[#4F46E5]">
            User Name
          </Link>
          <Link href="/logout" className="hover:text-[#4F46E5]">
            Logout
          </Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <Image src="/images/Hamburger.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

     {isOpen && (
  <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
    
    <hr className="border-gray-200" />
    
    <Link href="/admin" className={isActive("/admin")}>
      Admin User
    </Link>
    <Link href="/logout" className={isActive("/logout")}>
      Logout
    </Link>
  </div>
)}
    </nav>
  );
};

export default ManagerNav;
