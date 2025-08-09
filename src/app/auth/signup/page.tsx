import { NextPage } from "next";
import NavBar from "@app/components/navBarForregister";
import Footer from "@app/components/footerForRegister";
import Form from "@app/components/formForregister";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar />

      <main className="flex-grow">
        <div className="flex justify-center items-start pt-12 px-4 sm:px-6 h-[600px]">
          <div className="w-full max-w-[448px] flex flex-col gap-[32px]">
            {/* Logo & Title */}
            <div className="w-full h-auto opacity-100 relative">
              <div className="flex justify-center mb-4">
                <img
                  src="/images/logo-blue-fill.png"
                  alt="Logo"
                  className="w-[120px] sm:w-[180px] md:w-[200px] object-contain"
                />

              </div>

              <div className="text-center">
                <h2
                  className="text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px]
                             font-extrabold tracking-normal text-[#111827] max-w-[340px] mx-auto"
                >
                  Create a new applicant account
                </h2>
                <p className="text-sm mt-1 text-[#111827]">
                  Or{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    sign in to your existing account
                  </a>
                </p>
              </div>
            </div>

            {/* Sign Up Form */}
            <Form />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
