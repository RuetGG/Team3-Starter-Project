// utils/authUtils.ts
import { jwtDecode, JwtPayload } from "jwt-decode";

export function isTokenValid(token: string): boolean {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp! > currentTime;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}
