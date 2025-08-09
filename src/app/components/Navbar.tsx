import React from "react";
import Button from "./Button";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="shadow-sm w-full bg-white">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
          <Image
            src="/images/A2SV-logo1.png"
            alt="A2SV Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
  
          />

        {/* Menu */}
        <ul className="flex items-center space-x-8 text-gray-800">
          <li>
            <a href="#" className="hover:text-blue-500 transition-colors">
              The Journey
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-500 transition-colors">
              Testimonials
            </a>
          </li>
          <li>
            <Button>Apply Now</Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
