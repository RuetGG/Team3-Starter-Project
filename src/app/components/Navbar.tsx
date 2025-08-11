"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { isLoggedIn, profile, handleLogout } = useAuth();

  const dashboardLink =
    profile?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <nav className="shadow-sm">
      <div
        className="navbar bg-base-100"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Navbar Start */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {isLoggedIn && (
                <>
                  <li>
                    <a href={dashboardLink}>Dashboard</a>
                  </li>
                  {profile?.role === "admin" && (
                    <>
                      <li>
                        <Link href="/admin/profile">Your Profile</Link>
                      </li>
                      <li>
                        <Link href="/admin/reviewer">Reviewer Name</Link>
                      </li>
                    </>
                  )}
                </>
              )}
              <li>
                <Link href="/#journey">The Journey</Link>
              </li>
              <li>
                <Link href="/#about">About</Link>
              </li>
              <li>
                <Link href="/#alumni">Testimonials</Link>
              </li>

              {!isLoggedIn && (
                <li>
                  <a className="btn btn-primary mt-2" href="/auth/signin">
                    Apply Now
                  </a>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <button
                    className="btn mt-2"
                    onClick={handleLogout}
                    type="button"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link className="btn btn-ghost text-xl" href="/">
            <figure>
              <Image
                src="/images/A2SV-logo1.png"
                alt="logo"
                width={140}
                height={32}
                className="h-8"
              />
            </figure>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          {isLoggedIn && (
            <>
              <a href={dashboardLink}>Dashboard</a>
              {profile?.role === "admin" && (
                <>
                  <Link href="/admin/profile">Your Profile</Link>
                  <Link href="/admin/reviewer">Reviewer Name</Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Navbar End */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {(!isLoggedIn || profile?.role !== "admin") && (
              <>
                <li>
                  <Link href="/#journey">The Journey</Link>
                </li>
                <li>
                  <Link href="/#about">About</Link>
                </li>
                <li>
                  <Link href="/#alumni">Testimonials</Link>
                </li>
              </>
            )}
            {isLoggedIn ? (
              <li>
                <button
                  className="btn ml-1"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <a className="btn btn-primary" href="/auth/signin">
                  Apply Now
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
