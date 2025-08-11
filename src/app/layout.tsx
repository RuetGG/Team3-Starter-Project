"use client";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";
import { AuthProvider } from "./hooks/useAuth";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar></Navbar>
        </AuthProvider>
        <Provider store={store}>
          <AuthProvider>{children}</AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
