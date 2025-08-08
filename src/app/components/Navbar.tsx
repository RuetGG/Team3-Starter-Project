import React from "react";
import Button from "./Button";

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
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <figure>
              <img src="/images/A2SV-logo1.png" alt="logo-log" />
            </figure>
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>The Journey</a>
            </li>
            <li>
              <a>About</a>
            </li>
            <li>
              <a>Testimonials</a>
            </li>
            <li>
              <Button>Apply Now</Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
