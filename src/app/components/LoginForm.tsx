"use client";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      rememberMe: rememberMe.toString(),
    });

    if (res?.ok) {
      const session = await getSession();

      if (!session) {
        setError("Session not found.");
        return;
      }

      const role = session.role;
      const token = session.accessToken
      

      console.log("User role:", role);

      // Redirect based on role
      switch (role) {
        case "admin":
          router.push("/auth/signup/admin/admin_cycles");
          break;
        case "manager":
          // router.push("/manager/dashboard");
          router.push("/auth/signup/manager");
          break;
        case "reviewer":
          router.push("/reviewer/dashboard");
          break;
        case "applicant":
        default:
          console.log(token);
          console.log(session.user);
          console.log(session.user)
          console.log("JWT expiry:", session.expires);

          //router.push("/");
          break;
      }
    } else {
      setError("Invalid email or password");
    }
  };
 

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]"
      />

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <div className="flex items-center justify-between text-sm">
        {/* Remember me on the left */}
        <label className="flex items-center space-x-2 text-black">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="h-4 w-4 accent-white bg-gray border border-black rounded"
          />
          <span>Remember me</span>
        </label>

        {/* Forgot password on the right */}
        <a href="/forgot-password" className="text-[#4f46e5] hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="relative w-full bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold py-2 px-4 rounded transition flex items-center justify-center"
      >
        {/* Lock icon on the left */}
        <LockClosedIcon className="h-5 w-5 absolute left-4 opacity-50" />

        {/* Centered text */}
        <span>Sign in</span>
      </button>
    </form>
  );
}
