import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GANK OFFICIAL",
  description: "GANK OFFICIAL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}