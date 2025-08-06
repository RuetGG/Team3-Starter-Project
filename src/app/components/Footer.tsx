import React from "react";
import CopyrightFooter from "./CopyrightFooter";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "oklch(27.9% 0.041 260.031)",
        color: "white",
      }}
      className="lg:px-32"
    >
      <div
        className="footer sm:footer-horizontal  p-10"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <aside>
          <figure>
            <img src="/images/A2SV-logo2.png" alt="logo-log"></img>
          </figure>

          <p>
            Preparing Africa&#39;s top tech talent for global
            <br />
            opportunities
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">SOLUTIONS</h6>
          <a className="link link-hover">Student Training</a>
          <a className="link link-hover">Corporate Partnership</a>
        </nav>
        <nav>
          <h6 className="footer-title">SUPPORT</h6>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">FAQ</a>
        </nav>
        <nav>
          <h6 className="footer-title">COMPANY</h6>
          <a className="link link-hover">About</a>
          <a className="link link-hover">Blog</a>
        </nav>
      </div>
      <hr
        style={{ borderColor: "white", maxWidth: "1200px", margin: "0 auto" }}
      />
      <CopyrightFooter></CopyrightFooter>
    </footer>
  );
};

export default Footer;
