"use client";
import { useState } from "react";
import { NextPage } from "next";;
import Footer from "@app/components/footerForRegister";
import Navbar from "@app/auth/Confirmation/nav";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    // Simple regex for basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setEmailError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://a2sv-application-platform-backend-team3.onrender.com/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          callback_url: "https://a2sv-application-platform-backend-team3.onrender.com/reset-password",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Check your email for the reset link.");
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      < Navbar/>

      <main className="flex-grow mt-[100px]">
        <div className="flex justify-center items-start pt-12 px-4 sm:px-6 h-[600px]">
          <div className="w-full max-w-[448px] flex flex-col gap-[32px]">
            <div className="w-full h-auto opacity-100 relative">
              <div className="flex justify-center mb-4">
                <img
                  src="/images/logo-blue-fill.png"
                  alt="Logo"
                  className="
                    object-contain
                    w-[160px] h-[40px]        
                    sm:w-[192px] sm:h-[48px]  
                    md:w-[200px] md:h-[52px]  
                    relative top-0 left-0
                  "
                />
              </div>

              <div className="text-center">
                <h2
                  className="text-center font-extrabold text-[30px] leading-[36px] tracking-[0%] align-middle text-[#111827]"
                  style={{ fontFamily: "Font 1" }}
                >
                  Forgot your password?
                </h2>

                <p
                  className="text-center text-[#4B5563] font-normal text-[14px] leading-[20px] tracking-[0%] pt-2"
                  style={{ fontFamily: "Font 1" }}
                >
                  Enter your email and we'll send you a link to get back into your account.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="
                    w-full max-w-[448px]
                    flex flex-col gap-6 
                    p-6
                    mx-auto
                  "
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="
                        w-full
                        h-[38px]
                        px-[13px] py-[10px]
                        border border-t border-[#D1D5DB]
                        rounded-[6px]
                        text-[14px] leading-[100%]
                        font-normal bg-white
                        text-[#6B7280]
                        placeholder-[#6B7280]
                        focus:outline-none focus:ring-2 focus:ring-[#4F46E5]
                      "
                      style={{ fontFamily: "Font 1" }}
                    />
                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      h-[38px]
                      text-white
                      rounded-[6px]
                      bg-[#4F46E5]
                      text-[14px] leading-[20px]
                      font-medium
                      text-center
                      transition duration-200
                      hover:bg-[#4338CA]
                      active:bg-[#3730A3]
                    "
                    style={{ fontFamily: "Font 1" }}
                  >
                    {loading ? "Sending..." : "Send reset link"}
                  </button>

                  <div className="text-center mt-2">
                    {message && (
                      <p className="text-center text-[14px] text-[#4F46E5] mt-2">{message}</p>
                    )}
                    <p className="text-[14px] mt-4" style={{ fontFamily: "Font 1" }}>
                      <a
                        href="/login"
                        className="text-[#2563EB] font-medium hover:underline"
                      >
                        Back to login
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default ForgotPasswordPage;
