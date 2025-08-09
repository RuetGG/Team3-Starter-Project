import React from "react";

function Navbar() {
  return (
    <nav className="shadow-sm">
      <div
        className="navbar bg-base-100"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Navbar Start (Logo + Mobile Menu) */}
        <div className="navbar-start">
          {/* Mobile Menu Dropdown */}
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="#journey">The Journey</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#alumni">Testimonials</a>
              </li>
              <li>
                <a className="btn btn-primary mt-2" href="/auth/signin">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <a className="btn btn-ghost text-xl">
            <figure>
              <img src="/images/A2SV-logo1.png" alt="logo" className="h-8" />
            </figure>
          </a>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#journey">The Journey</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#alumni">Testimonials</a>
            </li>
          </ul>
        </div>

        {/* Navbar End (Apply Button) */}
        <div className="navbar-end hidden lg:flex">
          <a className="btn btn-primary" href="/auth/signin">
            Apply Now
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;