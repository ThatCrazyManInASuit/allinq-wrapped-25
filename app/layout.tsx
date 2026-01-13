"use client"


import { SessionProvider } from "next-auth/react";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>All Inquiries Wrapped 2025</title>
      <body className="h-screen w-screen">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
