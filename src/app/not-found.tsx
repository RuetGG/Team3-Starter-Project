// src/app/not-found.tsx
"use client";

import { useRouter } from "next/navigation";
import NavBar from "./components/navBarForregister";
import Footer from "./components/footerForRegister";

 export default function NotFound() {
   const router = useRouter();

   return (
     <div className="flex flex-col min-h-screen bg-gray-50">
       {/* Top Navigation */}

       <NavBar />

       {/* Main 404 Content */}
       <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
         <h1 className="text-8xl font-bold text-[#4338ca] mb-2">404</h1>
         <h2 className="text-xl font-bold text-black mb-4">Page Not Found</h2>
         <p className="text-gray-600 text-sm mb-6">
           Sorry, we can&#39;t find the page you&#39;re looking for.
         </p>
         <button
           onClick={() => router.push("/")}
           className="bg-[#4338ca] text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition"
         >
           Go Home
         </button>
       </main>

       {/* Footer */}
       <div className="mt-auto">
         <Footer />
       </div>
     </div>
   );
 }

