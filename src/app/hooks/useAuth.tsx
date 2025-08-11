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
  refreshAccessToken: () => Promise<boolean>;
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
      return true;
    } catch (err) {
      console.error(err);
      setProfile(null);
      setAccessToken(null);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refresh access token using refresh token
  const refreshAccessToken = async (): Promise<boolean> => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      handleLogout();
      return false;
    }

    try {
      const res = await fetch(
        "https://a2sv-application-platform-backend-team3.onrender.com/auth/token/refresh",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to refresh token");
      }

      const json = await res.json();
      if (json.success && json.data?.access) {
        localStorage.setItem("accessToken", json.data.access);
        setAccessToken(json.data.access);
        // fetch profile again with new token
        await fetchProfile(json.data.access);
        return true;
      } else {
        throw new Error("Invalid refresh response");
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
      handleLogout();
      return false;
    }
  };

  // On mount, check tokens and fetch profile
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        if (isTokenValid(token)) {
          setAccessToken(token);
          await fetchProfile(token);
        } else {
          // token expired - try to refresh
          const refreshed = await refreshAccessToken();
          if (!refreshed) {
            setLoading(false);
          }
        }
      } else {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setProfile(null);
    setAccessToken(null);
    window.location.href = "/"; // or use router.push if in Next.js client component
  };

  const value: AuthContextType = {
    isLoggedIn: !!profile,
    profile,
    loading,
    accessToken,
    setProfile,
    setAccessToken,
    handleLogout,
    refreshAccessToken,
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
