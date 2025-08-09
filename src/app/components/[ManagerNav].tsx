"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ManagerNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Determine dashboard path based on role
  const getDashboardPath = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "/auth/signup/admin/dash";
      case "manager":
        return "/auth/signup/manager";
      case "reviewer":
        return "/reviewer/dashboard";
      case "applicant":
        return "/applicant/dashboard"; // or whatever applicant path is
      default:
        return "/dashboard";
    }
  };

 useEffect(() => {
  if (status === "loading") return;
  if (!session) return;

  const role = (session as any).role;
  if (!role) return;

  const dashboardPath = getDashboardPath(role);

  // Redirect only if user is at the root or a generic landing page
  const allowedRedirectPaths = ["/", "/login", "/some-initial-path"];

if (allowedRedirectPaths.includes(pathname)) {

    if (pathname !== dashboardPath) {
      router.push(dashboardPath);
    }
  }
}, [session, status, router, pathname]);


  const role = (session as any)?.role;
  const dashboardPath = getDashboardPath(role);
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
          <Link href={dashboardPath} className={isActive(dashboardPath)}>
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex space-x-6 text-gray-600">
          <Link href="/auth/signup/profile" className="hover:text-[#4F46E5]">
            Your Profile
          </Link>
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
          <Link href={dashboardPath} className={isActive(dashboardPath)}>
            Dashboard
          </Link>
          <hr className="border-gray-200" />
          <Link href="/auth/signup/profile" className="hover:text-[#4F46E5]">
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
