'use client'

import { Inter, Roboto_Mono } from 'next/font/google';
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from '../lib/redux/store';
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-robotoMono' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased">
        <SessionProvider>
          <Provider store={store}>
            {children}
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
