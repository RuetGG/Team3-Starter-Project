import LoginForm from "../../components/LoginForm";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/images/A2SV-logo1.png"
            alt="A2SV Logo"
            width={192}
            height={48}
            priority
            className="object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Back to Home
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link
              href="/auth/signup"
              className="text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Create a new applicant account
            </Link>
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </main>
  );
}
