import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp: number; // expiration time in seconds
};

export function isLoggedIn(): boolean {
  const token =
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}

export function getAccessToken(): string | null {
  return (
    localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
  );
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
}
