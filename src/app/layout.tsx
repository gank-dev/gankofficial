import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GANK OFFICIAL",
    template: "%s | GANK OFFICIAL",
  },
  description:
    "GANK OFFICIAL. Professional device repair with a modern experience.",
  keywords: [
    "GANK OFFICIAL",
    "service HP",
    "servis HP",
    "repair smartphone",
    "phone repair",
  ],
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