import { jwtDecode } from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

type Profile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type JwtPayload = { exp: number };

type AuthContextType = {
  isLoggedIn: boolean;
  profile: Profile | null;
  loading: boolean;
  accessToken: string | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isTokenValid = (token: string) => {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  };

  const fetchProfile = async (token: string) => {
    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team3.onrender.com/profile/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to fetch profile");
      }

      setProfile(json.data);
    } catch (err) {
      console.error(err);
      setProfile(null);
      setAccessToken(null); // clear invalid token
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && isTokenValid(token)) {
      setAccessToken(token);
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setProfile(null);
    setAccessToken(null);
    window.location.href = "/";
  };

  const value: AuthContextType = {
    isLoggedIn: !!profile,
    profile,
    loading,
    accessToken,
    setProfile,
    setAccessToken,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
