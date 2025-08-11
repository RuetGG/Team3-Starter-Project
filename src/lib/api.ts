const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function fetchWithAuth<T>(url: string): Promise<T> {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Not authenticated");

  const res = await fetch(`${API_BASE_URL}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data.data;
}
