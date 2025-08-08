import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <header className="w-full border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="A2SV Logo" className="h-6" />
          </div>
          <nav className="flex space-x-6 text-gray-600 text-sm">
            <a href="#" className="hover:text-gray-900">The Journey</a>
            <a href="#" className="hover:text-gray-900">About</a>
            <a href="#" className="hover:text-gray-900">Testimonials</a>
            <a href="#" className="text-blue-600 font-medium hover:underline">Sign in</a>
          </nav>
        </div>
      </header>

      {/* Sign Up Form */}
      <main className="flex flex-1 justify-center items-center px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm">
          <div className="text-center mb-6">
            <img src="/logo.svg" alt="A2SV Logo" className="mx-auto h-8 mb-4" />
            <h1 className="text-xl font-semibold">Create a new applicant account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Or <a href="#" className="text-blue-600 hover:underline">sign in to your existing account</a>
            </p>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create account
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          
          {/* Logo & Description */}
          <div>
            <img src="/logo-white.svg" alt="A2SV Logo" className="h-6 mb-4" />
            <p className="text-gray-400">
              Preparing Africa’s top tech talent for global opportunities.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-2">SOLUTIONS</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Student Training</a></li>
              <li><a href="#" className="hover:text-white">Corporate Partnership</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-2">SUPPORT</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-2">LEGAL</h4>
            <ul className="space-y-1 text-gray-400">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="text-center text-gray-500 text-xs mt-6">
          © 2023 A2SV. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;