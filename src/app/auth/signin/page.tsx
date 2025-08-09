import LoginForm from "../../components/LoginForm";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../components/footerForRegister";
import NavBar from "@app/components/navBarForregister";

export default function SignInPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
   {/* Top Navigation */}
      
       <NavBar />
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm space-y-6 p-6">
        <div className="flex justify-center">
          <Image
            src="/images/A2SV-logo1.png"
            alt="A2SV Logo"
            width={192}
            height={48}
            priority
          />
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">
            Sign in to your account
          </h1>
          <p className="text-xs text-black mt-1 space-x-2">
            <Link
              href="/"
              className="text-[#4338ca] hover:text-[#4f46e5] hover:underline"
            >
              Back to Home
            </Link>
            <span className="mx-1 text-black">|</span>
            <Link
              href="/auth/signup"
              className="text-[#4338ca] hover:text-[#4f46e5] hover:underline"
            >
              Create a new applicant account
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
     {/* Footer */}
      <Footer />
      </div>
  );
}
