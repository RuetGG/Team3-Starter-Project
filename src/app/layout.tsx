'use client'
import { Geist_Sans, Geist_Mono } from 'next/font/google';
import "../styles/globals.css"
import { Provider } from "react-redux";
import { store } from '../lib/redux/store'
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
