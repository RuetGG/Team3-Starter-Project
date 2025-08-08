"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const ManagerNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const userName = session?.user?.email || "User";

  const isActive = (path: string) =>
    pathname === path
      ? "underline decoration-[#4F46E5] text-black"
      : "text-gray-500 hover:underline hover:decoration-[#4F46E5] hover:text-black";

  return (
    <nav className="bg-white shadow px-6 py-4">
      <div className="flex items-center justify-between max-w-[1280px] mx-auto w-full">
        <div className="flex items-center space-x-2">
          <Image src="/images/A2SV-logo1.png" alt="Logo" width={128} height={64} />
        </div>

        <div className="hidden md:flex justify-center flex-1 space-x-8">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link href="/profile" className="hover:text-[#4F46E5]">
            Your Profile
          </Link>
          {/* Dynamically show user name */}
          <span className="hover:text-[#4F46E5] cursor-default">{userName}</span>
          <Link href="/logout" className="hover:text-[#4F46E5]">
            Logout
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <Image src="/images/Hamburger.svg" alt="Menu" width={24} height={24} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4">
          <Link href="/dashboard" className={isActive("/dashboard")}>
            Dashboard
          </Link>
          <hr className="border-gray-200" />
          <Link href="/profile" className="hover:text-[#4F46E5]">
            Your Profile
          </Link>
          <span className="hover:text-[#4F46E5] cursor-default">{userName}</span>
          <Link href="/logout" className="hover:text-[#4F46E5]">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default ManagerNav;
