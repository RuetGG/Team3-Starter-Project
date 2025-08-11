import React from "react";
import Confirmation from "./confirmation";
import Footer from "@app/components/footerForRegister";
import Navbar from "./nav";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar />

    
      <main className="flex-grow">
        <Confirmation />
      </main>

      <Footer />
    </div>
  );
};

export default Page;
